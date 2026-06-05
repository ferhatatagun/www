# Prompt caching, Claude'un en ucuz optimizasyonu. Kimse ölçmüyor.

Claude-tabanlı bir ürün shipliyorsan, son haftanın Anthropic API faturasını aç. Üçte ikisi muhtemelen, cache'ten onda bir fiyatına okuyabileceği context için para ödüyor. Çoğu bunu bilmiyor, çünkü dashboard söylemiyor ve SDK'lar da söylemiyor — response geldiğinde tek bakılan sayı `output_tokens`, o da çoğu zaman bir şey pahalı görünüyor diye.

Bilgi her response'da var. Anthropic `usage`'ın içine koyuyor:

```json
"usage": {
  "input_tokens": 312,
  "cache_creation_input_tokens": 4180,
  "cache_read_input_tokens": 0,
  "output_tokens": 187
}
```

Dört sayı. Cache'lenmiş prompt'un ilk çalışması, cache'i *yazmak* için input fiyatının 1.25 katı. TTL içindeki her sonraki çağrı *okumak* için input'un 0.1 katı. Bu iki satır arasındaki oran, ayda $3,000'lık bir fatura ile $300'lık bir fatura arasındaki farktır. Ve neredeyse kimse bunu grafiklemiyor.

**TL;DR**

- Her Claude response'u `usage` içinde cache-hit verisi taşıyor. Çoğu uygulama bunu hiçbir yere loglamıyor.
- Cache miss'ten sonraki ilk çağrı `1.25× input` extra; her hit ise `0.1× input`. Break-even: iki okumada.
- Cache TTL'i varsayılan 5 dakika. Altı dakikada bir tetiklenen bir istek pattern'i, write penalty'yi sonsuza dek ödüyor ama hiç fayda görmüyor.
- Çözüm kod değil, observability: cache hit oranını zamanla grafiklersen ve düştüğünde alert atarsan, faturadan önce bug'ı bulursun.
- 150 satırlık bir tarayıcı tool'u, Messages API'den stream'leyen herhangi bir projeye bunu yapmak için yetiyor.

## Dört sayı aslında ne anlama geliyor

Mesajlarının bir yerine `cache_control: { type: "ephemeral" }` koyup istek attığında, API son 5 dakika içinde aynı prefix'i görüp görmediğini kontrol ediyor. Üç sonuç olabilir:

1. **Cache miss, yeni içerik.** Tüm prompt normal işleniyor. `input_tokens` cache-dışı kısmı yansıtıyor; `cache_creation_input_tokens` bir sonraki sefer için cache'e yazılanı yansıtıyor.
2. **Cache hit.** Cache'lenmiş prefix fiyatın %10'una okunuyor. `cache_read_input_tokens` ne kadar okunduğunu, `input_tokens` yalnızca yeni suffix'i gösteriyor.
3. **TTL doldu.** Miss ile aynı şekil — creation surcharge'ı tekrar ödüyorsun.

Yani tek bir response, hangisinin olduğunu sana tam olarak söylüyor. "Aşağı yukarı" değil. Tam olarak. Her istek için. Ücretsiz.

Fiyat matematiği (Sonnet 4.5, Haziran 2026) için, 5,000 token'lık bir system prompt'un bir kere sorulup dört dakika sonra tekrar sorulması senaryosu:

| Senaryo                  | İlk çağrı              | İkinci çağrı           | Toplam       |
|--------------------------|------------------------|------------------------|--------------|
| Caching yok              | 5,000 × $3 = $0.015    | 5,000 × $3 = $0.015    | **$0.030**   |
| Cache, hit               | 5,000 × $3.75 = $0.019 | 5,000 × $0.30 = $0.0015| **$0.020**  |
| Cache, miss (TTL doldu)  | 5,000 × $3.75 = $0.019 | 5,000 × $3.75 = $0.019 | **$0.038**   |

Üçüncü satır failure mode. Caching'i açtın, write penalty'yi ödüyorsun, ama kimse cache'e hit etmiyor. Ölçüm olmadan, bu satır kodda ikinci satırla aynı görünüyor — aynı header'lar, aynı prompt yapısı, aynı response — ama caching'i hiç açmamış olmaktan **%90 daha pahalı**.

## Kötü bir cache hit oranı sessizce nasıl sızar

Ekiplerin shipleyip sonra sessizce kanadığını izlediğim üç pattern:

**1. Kullanıcı-başına system prompt.** Birisi "kişiselleştirilmiş hissetsin" diye kullanıcının adını veya org ID'sini system prompt'a interpolate etmiş. Her cache write artık kullanıcıya özgü ve o kullanıcı beş dakika içinde ikinci bir istek atmazsa, her çağrı creation surcharge ödüyor. Çözüm: kişiselleştirmeyi user mesajına taşıyıp system prompt'u statik tutmak — ama bu fixe ihtiyacın olduğunu, hit oranı grafiği sıfırda yataysa görüyorsun.

**2. Hafif sürüklenen prompt'lar.** Belki current timestamp ekliyorsun, belki bir "bugün ..." satırı, belki non-deterministic sırada gelen tool tanımlarını yeniden generate ediyorsun. Cache key tam byte dizisi; tek bir karakter sürüklenme ile tüm prefix'i invalidate ettin. Tool tanımlarını gönderim öncesi serialize eden araçlar özellikle eğlenceli bir kaynak — anahtarları karışık bir nesnede `JSON.stringify`, farklı byte üretiyor, hit yok.

**3. Trafiğine yanlış TTL.** Yaklaşık on dakikada bir mesaj alan bir chatbot, 5-dakikalık ephemeral cache ile yapısal olarak uyuşmuyor. Her conversation turn'ünde write penalty'yi ödüyorsun. Ya 1-saatlik cache'e geç (daha pahalı write, çok daha uzun ömür) ya da caching trafik şeklin için ekonomik değil diye kabul et — ama hangi kararı verirsen ver, veri lazım.

Üçü de code review'dan görünmez. Yalnızca usage telemetrisinde görünür.

## Minimum viable observability

Bunun için bir metrik stack'ine ihtiyacın yok. İstek başına dört alanı log'lamana ve grafiklemene ihtiyacın var. Çoğu ekibin sahip olduğu, faydasız versiyon:

```ts
logger.info("claude response", { tokens: r.usage.output_tokens });
```

Bir haftada kendini ödeyen versiyon:

```ts
const u = r.usage;
const hitRate = u.cache_read_input_tokens / 
                (u.cache_read_input_tokens + u.cache_creation_input_tokens || 1);

logger.info("claude.usage", {
  input: u.input_tokens,
  output: u.output_tokens,
  cache_create: u.cache_creation_input_tokens ?? 0,
  cache_read: u.cache_read_input_tokens ?? 0,
  hit_rate: hitRate,
  cost_estimate: estimateCost(u, model),
});
```

Önemli olan alan `hit_rate`. Route'a, model'e, user-agent'a göre grupla — trafik boyutların ne ise. Cache kullanan herhangi bir endpoint'te sıfıra doğru trend olan bir şey para sızıntısıdır.

`cost_estimate` dashboard'u mühendis-dışı insanlarla yapılan konuşmalarda taşımayı sağlayan şey. Anthropic token tier'ına göre fiyat yayınlıyor; dönüştürme mekanik:

```ts
function estimateCost(u: Usage, model: string) {
  const p = pricing[model]; // { input, output, cache_write, cache_read }
  return (
    u.input_tokens * p.input +
    u.output_tokens * p.output +
    (u.cache_creation_input_tokens ?? 0) * p.cache_write +
    (u.cache_read_input_tokens ?? 0) * p.cache_read
  ) / 1_000_000;
}
```

Bu kadar. Beş satır aritmetik ile uygulamanın yaptığı her Claude çağrısında istek başına dolar hesaplandı.

## Bunun için neden bir tool yaptım

[**claudoscope**](https://claudoscope-labs.vercel.app)'u, bu veriyi response stream'lerken canlı görmek istediğim için yaptım — üstünde iterate ettiğim uygulamayı her seferinde instrument etmeden. Use case "bir prompt değişikliği shipleyeceğim, cache davranışım az önce regress mi etti?" — yavaş ve pahalı yol bunu deploy edip bir saat sonra loglara bakmak; hızlı yol isteği 4 saniyede sana söyleyen bir tool'a yapıştırmak.

Tamamen tarayıcı-only client. Bring your own key, backend yok. SSE stream'inin her event'i parse edilir, `usage` nesnesi bir panel'e ayrılır:

```
┌─ X-Ray ────────────────────────────────────────┐
│ input         312      $0.0009                 │
│ cache write 4,180      $0.0157  ◄─ ilk çalışma │
│ cache read      0      $0.0000                 │
│ output        187      $0.0028                 │
│ ─────────────                                  │
│ toplam                 $0.0194                 │
│                                                │
│ hit oranı: 0% (soğuk) — 5dk içinde tekrar çalış│
└────────────────────────────────────────────────┘
```

TTL içinde "send"e ikinci kez bas, bar'lar yeniden düzenleniyor — cache write sıfıra düşüyor, cache read doluyor, cost sayısı %90 düşüyor. Hareket ederken görünce bariz olan, görünmeyince görünmez olan tipinden bir şey.

Gzipped yaklaşık 100KB ve kaynak [tek bir dosyada](https://github.com/ferhatatagun/claudoscope). Pricing tier mantığı ayrı bir dosyada. Üçüncü dosya yok.

## Bugün ne yapmanı tavsiye ediyorum

Artan efor sırasıyla operasyon adımları:

1. **Şu an (5 dakika):** claudoscope'u aç, en pahalı prompt'unu yapıştır, iki kere çalıştır. Farka bak. Hit oranı ikinci çağrıda ~%99 değilse, optimizasyon fırsatın yok, *cacheability bug'ın* var.
2. **Bu hafta (bir öğleden sonra):** Uygulamanın Claude çağrılarına yukarıdaki usage logging block'unu ekle. Ship et. Henüz dashboard kurmaya gerek yok — log'larını `grep`'le ve en kötü offender'ları on beş dakikada bulursun.
3. **Bu ay (bir sprint):** Dört `usage` alanını gerçek metrik pipeline'ına taşı (Datadog/Honeycomb/Grafana/her ne ise). Endpoint başına cache hit oranını grafikle. Tabanın altına düştüğünde alert at.
4. **İsteğe bağlı (eğer bensen):** Görseli inşa et, çünkü real-time hareket ederken görmek, takıldığı için yapışan şey.

Dördünden üçü kod değil, configuration. İlginç olan kısım implementation değil; neredeyse hiç kimsenin bunu yapmamış olması. Dashboard'larını kuran konuştuğum ekipler — istisnasız — ilk haftada bir cache misconfiguration buldular ve işin maliyetinden daha fazlasını tasarruf ettiler. Kurmayan ekipler, çoğu zaman cache creation surcharge'ı boşuna ödüyor.

Anthropic API caching'inin çalışıp çalışmadığını bilmen için ihtiyacın olan her şeyi sana veriyor. Tek soru bakıp bakmamak.

---

Bu görselleştirmeyi [**claudoscope**](https://claudoscope-labs.vercel.app)'a shipledim — bring-your-own-key, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/claudoscope](https://github.com/ferhatatagun/claudoscope).

Aynı SSE client ayrıca üç kardeş tool'a güç veriyor — [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
