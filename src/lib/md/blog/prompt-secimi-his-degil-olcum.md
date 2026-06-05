# Prompt'un daha iyi değil. Sadece daha iyi hatırlıyorsun.

Claude-tabanlı bir özellik shipleyen herkes kendiyle bir kere şu konuşmayı yapmıştır:

> "Tamam, eski prompt fazla uzundu, bu daha kompakt — *galiba* daha iyi cevap veriyor… ve daha hızlı sanki? Yayına alalım."

Yayına alıyorsun. Bir hafta sonra bir şey ters geliyor — belki edge case'lerde çıktılar daha tutarsız, belki fatura arttı, belki bir iş arkadaşın "AI artık anlamıyor" diyor. Önceki prompt'un tam halini hatırlamıyorsun. Baseline'ın yok. Geri alıyorsun. Ya da almıyorsun, sessiz bir regression ile bir ay yaşıyorsun.

Bunu kırk kere yapmışımdır. Çoğumuz yapmışızdır. Sebep prompt iteration'ın zor olması değil. Sebep *prompt iteration'ı değerlendirmenin* zor olması, ve bunun için tooling'imiz olmadığı için yerine *tat*'ı koyuyoruz — bu da işe yarıyor, ta ki yaramayana kadar.

**TL;DR**

- "Daha iyi hissettiriyor" veri değil. Sample size'ın bir sorgu, hafızan taze, prior'ın ise yatırım yapılmış maliyetin.
- Minimum işe yarayan karşılaştırma: aynı input'u iki prompt'tan paralel geçirmek; üç sayıyı yan yana koymak: çıktı (aynı şeyi mi söylüyorlar?), latency (her biri ne kadar sürdü?), cost (her biri ne harcadı?).
- Modeller de değişiyor — Sonnet 4.5 vs Haiku 4.5 üzerinde GPT-stili uzun system prompt'ları karşılaştırınca, eşdeğer puanlayacağın çıktılar için ~10× cost farkı görüyorsun.
- Paralel çalıştırmak adil yapıyor: aynı saat, aynı API state, aynı input. Chat penceresinde sıralı çalıştırmak yapmıyor.
- Tarayıcı-only bir tool bunu 4 saniyede yapıyor. Benchmark framework'üne ihtiyacın yok. Yan yana görmen gerekiyor.

## "Vibes" aslında ne kadara mal oluyor

Prompt tuning'in tuzağı şu: chat-stili UI sana yalnızca *tek* boyut gösteriyor — çıktı text'i. Okuyorsun, doğru görünüyor mu karar veriyorsun, devam ediyorsun. Üç şey saklanıyor:

**1. Latency.** Bu 3 saniye mi sürdü 11 saniye mi? Sıktıraktı, yarım hatırladın, ama kronometre tutmuyordun. Production'da bin istekte bu farkın anlamı "akıcı" ile "yavaş" arasındaki uçurum.

**2. Cost.** Güzel yapılandırılmış output üreten uzun system prompt 4,000 input token kullanıyor. Kısa olan 600. İkisi de ~800 output token üretiyor. Sonnet fiyatlandırmasında bu, bin çağrı başına $14 ile $4 farkı. Tek bir response'a bakarak görmüyorsun.

**3. Output drift.** "Daha temiz" çıktılar bazen modelin işe yarayan bir kısıtı kaybetmesi anlamına geliyor. Çıkardığın kibar preamble aslında bir şey yapıyormuş. Eklediğin yapılandırılmış format düzenli görünüyor ama uzun input'larda kesiliyor. Side-by-side bunu ortaya çıkarıyor; sıralı çıkarmıyor, çünkü önceki cevabın özünü hatırlıyorsun, detayını değil.

A/B testing'in tüm amacı bu üçünü aynı görüş alanına, aynı input üzerinde, aynı zamanda yükseltmek. O kadar. Tüm fikir bu. Çoğumuzun yapmamasının nedeni tool'umuzun olmaması — ve iki tab arasında geçmek, iki kez send'e basmak, çıktıları bir diff viewer'a kopyalamak, dashboard'tan cost'a bakmak'tan oluşan friction, omuzlarımızı silkip yayına almamıza yetiyor.

## Aynı input, iki prompt, paralel

Mekanizma yavan:

```ts
const [outA, outB] = await Promise.all([
  runClaude({ system: promptA, messages, model }),
  runClaude({ system: promptB, messages, model }),
]);
```

İşin özü bu. Aynı `messages`'a karşı paralel iki istek. İşin püf noktası: iki stream eş zamanlı oluyor — aynı network koşulları, aynı API yükü, aynı saat-time cache sıcaklığı. Sıralı A→B adil bir karşılaştırma değil; ilk çağrıda API yoğunsa ve ikinci çağrı cache'lendiyse, sinyal değil hava ölçüyorsun.

Bu iki çıktıyla ne yaptığın işin ilginçleştiği yer. Sıkıcı versiyon: ikisini de logla, gözle bak, birini seç. Asıl işe yarayan versiyon: side-by-side render, her birinin kendi latency saati, kendi token sayısı ve cost dolar değeri, ve istediğinde nereye ayrıldıklarını gösteren bir diff highlight'ı.

Fark ettiğim şu: zamanın %80'inde iki prompt da *anlamlı ölçüde eşdeğer* çıktı üretiyor. Birini tercih etme nedenin saf olarak cost veya latency — semantik bir iyileşme yok, sadece aynı cevabın 4× daha ucuz versiyonu var. Kalan %20'de çıktılar gerçekten anlamlı şekilde ayrışıyor — orada göz lazım, ama en azından nereye bakacağını biliyorsun.

## "Daha iyi" sayılarda nasıl görünür

Geçen haftadan somut bir örnek. Bir code review tool'u için iki versiyon system prompt'um vardı:

**Versiyon A** — 1,800 token, issue tiplerinin tam taksonomisi, her biri için örnekler, açık JSON şema:

```
You are a senior staff engineer reviewing a pull request. For each
issue you find, classify it under one of:
- correctness (the code is wrong)
- security (the code is exploitable)
- performance (the code is slow)
- maintainability (the code is hard to read)
...
```

**Versiyon B** — 280 token, taksonomi yok, şema bir örnekle ima ediliyor:

```
Review this code. For each problem, return JSON like:
[{"severity": "high"|"medium"|"low", "line": 42, "issue": "..."}]
Don't comment on style; focus on bugs and security.
```

Aynı input (600 satırlık Python dosyası). İkisi de Sonnet 4.5'a gitti. Side-by-side çalıştırma:

|                   | Versiyon A         | Versiyon B         |
|-------------------|--------------------|--------------------|
| Input token       | 2,640              | 1,120              |
| Output token      | 820                | 740                |
| Latency           | 5.3s               | 3.1s               |
| Cost              | $0.0202            | $0.0145            |
| Bulunan issue     | 7                  | 6                  |

Diff'e bakınca: ikisi de aynı 5 kritik issue'yu işaretledi. Versiyon A ayrıca bir `# TODO`'yu maintainability issue'su olarak işaretledi ve karmaşık bir fonksiyonu iki refactor'a böldü. Versiyon B daha sıkıydı — daha az ufak şey yakaladı ama yakaladığı her şey aksiyon-edilebilirdi.

B'yi shipledim. Soft anlamda "daha iyi" olduğu için değil; bir insanın önemli işte eşdeğer kabul edeceği çıktılar için %28 daha ucuz ve %41 daha hızlıydı. *İşte* bir A/B framework'ünün sana chat UI'nin vermediği şey: "doğru hissettiriyor" olmayan bir karar zemini.

Eğer A'yı silip B'yi sıralı çalıştırsaydım, karşılaştırmayı kaybetmiş olurdum ve B'nin aslında olduğundan çok daha iyi veya çok daha kötü olduğuna kendimi ikna ederdim.

## Cross-model açısı

Aynı kurulum daha kurnaz bir şeyi de yüzeye çıkarıyor: **doğru model de bir prompt seçimi**.

Aynı prompt, iki model — Sonnet 4.5 vs Haiku 4.5 — aynı input üzerinde:

|                       | Sonnet 4.5  | Haiku 4.5  |
|-----------------------|-------------|------------|
| Latency               | 4.1s        | 0.9s       |
| Cost (input+output)   | $0.011      | $0.0008    |
| Output kalitesi       | 9/10        | 8/10       |

Doğru tür görev için bu ~13× cost azalması, çoğu kullanıcının UI'de fark etmeyeceği bir kalite düşüşü ile. Yanlış tür görev — kompleks çok-adımlı reasoning gerektiren herhangi bir şey — Haiku patlayacak ve Sonnet patlamayacak, ve karşılaştırma seni bundan da koruyor. Hangi tür görevinin olduğunu *tahmin etmek* zorunda değilsin; beş gerçek input'ta beş dakikada ölçebilirsin.

## prompt-lab bunu nasıl yapıyor

[**prompt-lab**](https://prompt-lab-promptly.vercel.app)'ı yaptım çünkü kendi işimde prompt A/B testing'in friction'ı, adımı atlayıp vibe ile shipleyecek kadar yüksekti. Tool'un tüm işi bu friction'ı kaldırmak:

- İki prompt paneli. Soldaki prompt A, sağdaki prompt B.
- Tek input paneli. User mesajını bir kere yaz.
- Run'a bas. İki response da kendi paneline eş zamanlı stream'leniyor.
- Her panelin altında küçük bir scoreboard: input token, output token, latency, cost.
- En altta bir verdict satırı — "A: $0.0202 / 5.3s · B: $0.0145 / 3.1s · B %28 daha ucuz, %41 daha hızlı."

Tüm UI bu. Tarayıcı tool'u, BYOK, backend yok. İlgili mantığı yaklaşık 8KB ve [önceki yazıdaki](https://ferhatatagun.com/blog/tarayicida-claude-streaming-sdk-siz) streaming client'ı kullanıyor.

Aynı-prompt-farklı-model ya da farklı-prompt-farklı-model de yapabilirsin. Arena hangisini test ettiğine bakmıyor — iki sütunu ayarlıyorsun ve run'a basıyorsun.

## Bu hafta ne yapmanı tavsiye ediyorum

Üç adım, artan efor sırası:

1. **Bugün (5 dakika):** prompt-lab'i aç. Ekibin şu an shiplediği prompt ne ise al. Daha kısa bir versiyonunu yap. Üç gerçek input'ta ikisini de çalıştır. Kısa olan, önem verdiğin input'larda semantik kayıp olmadan cost+latency'de kazanırsa, haftanın ödemesini çıkardın.

2. **Bu sprint (bir öğleden sonra):** Küçük bir eval harness'i kur. Gerçek trafiğini temsil eden 10 input seç. Her prompt değişikliğini merge öncesi bunlardan geçir. Süslü olmasına gerek yok — bir JSON file input'lar + diff'leyen bir script en kötü regression'ları yakalar.

3. **Bu çeyrek (bir alışkanlık):** A/B karşılaştırmasını prompt review process'inizin bir parçası yapın. Bir prompt'u değiştiren her PR, aynı 10 input için çalıştırma çıktılarını cost ve latency sayıları ile birlikte description'a koymalı. Code review'da test sonuçlarını gösterir gibi.

LLM uygulamalarının ekonomisi giderek prompt tasarımı ve model seçimi etrafında dönüyor. Rekabet eden ekipler ikisini de ölçen ekipler olacak. Etmeyenler vibe-tabanlı prompt değişiklikleri shipleyip neden faturanın sürünerek arttığını ve kullanıcıların "daha kötü hissettiriyor" diye şikayet ettiğini merak etmeye devam edecek.

Gelecekteki kendinden daha akıllı olmana gerek yok. Sadece geriye bakıp neyin gerçekten değiştiğini bilmeyi mümkün kılman yeterli.

---

Bu [**prompt-lab**](https://prompt-lab-promptly.vercel.app)'a shipledim — iki prompt yan yana, BYOK, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/prompt-lab](https://github.com/ferhatatagun/prompt-lab).

Aynı SSE client ayrıca üç kardeş tool'a güç veriyor — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
