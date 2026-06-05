# Claude agent'larını trace replay ile debug ediyorum

Agent'ın production'da garip bir şey yaptı. Bir kullanıcı rapor etti, başarısız çalışmayı log'larında buldun, ve şimdi 400 mesajlık bir JSON dosyasına bakıyorsun, yarısı ufak veritabanları büyüklüğünde `tool_result` block'ları, ve bir yerde agent'ın yanlış şeyi yapmaya karar verdiği an var.

Agent'ı yeniden çalıştıramazsın: API state'i ilerledi, tool şimdi farklı davranıyor, prompt o zamandan beri üç kere güncellendi. Yalnızca trace'in var.

Çoğumuzun agent trace'lerini okuma şekli: JSON'u editörde aç, ctrl+F ile şüphelendiğin tool adını ara, escape edilmiş string duvarlarında scroll yap, sırayı zihinsel olarak yeniden kur. Otuz dakika sürüyor, sonunda üç cevaptan birine sahip oluyorsun — "evet ne olduğunu görüyorum," "muhtemelen ne olduğunu görüyorum," ya da "hiçbir fikrim yok." Yaklaşık üçte birinde üçüncüsü oluyor, ve asıl problemi düzeltip düzeltmeyen bir band-aid shipliyorsun.

Kimsenin söylemediği şey: bu zor bir problem değil. JSON tüm bilgiyi içeriyor. Mesele tamamen *sunumsal* — okunması neredeyse imkansız.

**TL;DR**

- Agent trace'leri bir karar dizisi ama wall of nested JSON olarak depolanıyor. Sinyal orada; problem format.
- Doğru primitive bir JSON viewer değil — bir timeline. Her düşünce, tool çağrısı, tool sonucu ve final cevap kendi ayrık, renk-kodlu adımı oluyor.
- Trace'i adım adım scrub edebildiğinde, başarısızlık noktası dakikalar yerine saniyelerde görsel olarak bariz oluyor.
- Bu post-hoc, etkileşimli değil. Agent'ı yeniden çalıştırman ya da API'yi vurman gerekmiyor — replay yalnızca raw trace üzerinde çalışıyor.
- Tarayıcı-only bir tool bunu 4 saniyede yapıyor. Backend yok, key yok, sadece JSON'u yapıştır.

## Agent trace gerçekte ne içeriyor

Bir Claude agent çalışmasını kaydettiğinde, genellikle `messages` array'ini persist ediyorsun — modelin response'ları ve geri beslediğin tool result'lar dahil tüm konuşma. Altı adımlı bir agent çalışması yaklaşık şöyle görünüyor:

```jsonc
[
  { "role": "user", "content": "IST'tan LAX'a önümüzdeki Salı en ucuz uçuşu bul" },
  { "role": "assistant", "content": [
    { "type": "text", "text": "Uçuşları aratıp fiyatlara bakacağım." },
    { "type": "tool_use", "id": "tu_01", "name": "search_flights", "input": {...} }
  ]},
  { "role": "user", "content": [
    { "type": "tool_result", "tool_use_id": "tu_01", "content": "[<2KB JSON>]" }
  ]},
  { "role": "assistant", "content": [
    { "type": "text", "text": "Üçünü inceliyorum..." },
    { "type": "tool_use", "id": "tu_02", "name": "get_price", "input": {...} }
  ]},
  // ...dört adım daha...
]
```

Agent davranışının ilginç her anı orada: hangi tool'u seçti, hangi argümanları kurdu, kendi muhakemesi hakkında ne söyledi, sonucu nasıl yorumladı. Yapı temelde bir **ayrık olay dizisi**, bir "döküman" değil.

Ama sen bunu bir döküman olarak okuyorsun, çünkü bir editor sana onu öyle gösteriyor. Beyin "alternatif role: assistant / role: user tool_result content block'larıyla" → "adım 3, get_price'a X argümanıyla yapılan bir tool çağrısıydı, Y döndü, ki agent bunu Z olarak yorumladı" dönüşümünü yapmak zorunda.

Bu dönüşüm debug süreni öldüren şey. 12-adımlı bir trace için manuel yapmak dakikalar alıyor. Kompleks bir görev üzerinde 60-adımlı bir agent için yapmak saatler alıyor.

## Doğru primitive: karar timeline'ı

Yeniden çerçeveleme: trace'i JSON olarak okumayı bırak, kararların dizisi olarak izlemeye başla. Her adım şunlardan biri:

- 💭 **Düşünce** — model text yazdı (response'unun tool çağrısı olmayan kısmı)
- 🔧 **Tool çağrısı** — model belirli argümanlarla bir tool çağırdı
- 📥 **Tool sonucu** — geri gelen şey, bir sonraki turn'e besleniyor
- ✅ **Final cevap** — modelin `end_turn`'ü, artık tool yok

Bu dört event tipini renk-kodla. Sıralı bir biçimde diz, her event için bir kart. Şimdi scrub edebileceğin, adım adım gezebileceğin, geri oynatabileceğin bir timeline'ın var. Kart başına bilgi yoğunluğu, tüm trace'i bir bakışta okuyabilmen için yeterince yüksek, ve yalnızca şüpheli görünen kartlara zoom yapıyorsun.

Yapısal içgörü: agent debugging, source code okumaya değil breakpoint'lerle bir script debug etmeye daha yakın. Adım atmak istiyorsun, scan etmek değil. JSON sana adım vermiyor; timeline başka bir şey vermiyor.

## Bu view'da bariz olan bug'lar

Bir trace'i timeline'a düşürdüğümde tekrar tekrar gördüğüm üç failure mode:

**1. Yanlış tool, sessizce seçildi.** Model `search_recent`'i çağırması gerekirken `search_archive`'ı çağırdı. JSON'da bu 200 satırın bir tanesi, gözünün önünden uçuyor. Timeline'da beklemediğin bir tool adı olan bir kart, ve tıklıyorsun.

**2. Halüsine edilmiş argümanlar.** Model doğru tool'u ama şemaya uymayan bir argüman şekliyle çağırdı — genellikle şema belirsiz olduğu için. JSON'da `{"q": "foo", "limit": "10"}`'u görüyorsun ve `limit`'in integer olması gerektiğini fark etmiyorsun. Timeline'da hemen sonraki tool sonuç kartı bir 400 hatası gösteriyor ve bir adım geri izini sürüyorsun.

**3. Sonsuz loop habercisi.** Bazı agent'lar aynı tool'u biraz farklı input'larla çağırmaya devam edip hiç sonuca varmayan bir pattern'e kapılıyor. JSON'da bir wall of near-identical block'lar. Timeline'da görsel bir ritim — aynı tool adıyla beş mor kart üst üste — periferik görüşünde scroll ettiğin anda görüyorsun.

Üç durumda da bug ince değil. Yalnızca JSON'da gizlendiğinde *ince görünüyor*.

## Replay'ın yeniden-çalıştırmadan farkı

Bir agent başarısız olduğunda cazibe, print statement'larla yeniden çalıştırmak, ne olacağını görmek, iterate etmek. Yapma. Üç sebep:

**API call'lara mal oluyor.** 15 tool çağıran başarısız bir agent'ı yeniden çalıştırmak sana 15× input token maliyetinde. Cache ile belki daha az; her halükarda fatura gerçek. Replay bedava.

**API state'i ilerledi.** Bugün çağırdığın tool, orijinal çalıştırmada dönen veriden farklı veri dönebilir. Artık orijinal başarısızlığı debug etmiyorsun; *şu an ne oluyorsa* onu debug ediyorsun, ki tamamen farklı bir bug olabilir.

**Model stokastik.** Sıcaklık 0'da bile retry'lar farklı output üretebilir. Bir agent'ı yeniden çalıştırıp *farklı* bir failure mode almak, soruşturulacak iki bug'ın olduğu anlamına geliyor. Trace gerçekte ne olduğunun kanonik artefakt'ı.

Replay üçünü de devre dışı bırakıyor. Donmuş bir artefakt'ı, deterministik şekilde, istediğin hızda inceliyorsun. Bug sen ona bakarken hareket etmiyor.

## agent-replay'de nasıl görünüyor

[**agent-replay**](https://agentreplay.vercel.app), bunun için yaptığım tool. Trace'ini sol taraftaki bir JSON paneline yapıştırıyorsun. Sağ panel sinematik bir timeline olarak render ediyor:

- Her event bir icon ve renkle bir kart
- Trace'i 1× hızda (saniyede bir event) çalıştırmak için space'e bas, ya da manuel scrub et
- Tam içeriği görmek için herhangi bir karta tıkla — düşünce text'i, tool çağrısının input JSON'u, raw tool result, hepsi expanded
- Event tipine göre filtrele — "yalnızca tool call'ları göster" ya da "yalnızca assistant düşüncelerini göster" — odaklanmak istediğinde
- Her şey tarayıcında; key gerekmiyor, backend yok, trace'in tab'ı asla terk etmiyor

12 adımlı bir agent'ın nasıl göründüğünü kendi veriyi kopyalamadan görmek istersen `?demo=1`'de seed'lenmiş bir örnek trace var.

Sürekli fark ettiğim şey: debug ettiğim an artık "JSON'un neresinde agent batırdı" değil. "Hangi kart yanlış görünüyor, ve sonraki kart bunun sonucunu ne olarak gösteriyor" oldu. 30 dakikalık bir araştırma 30 saniyelik bir araştırma haline geldi. Tool'un akıllı bir şey yapması yüzünden değil — sadece aynı veriyi doğru şekilde gösterdiği için.

## Bu hafta ne yapmanı tavsiye ediyorum

Üç eskalasyon hamlesi:

1. **Bugün (5 dakika):** Trace'ini elinde tuttuğun son garip agent çalışmasını bul. agent-replay'e yapıştır. Failure noktasını bulmanın ne kadar sürdüğüne bak. Olağan JSON-scroll yaklaşımından hızlıysa, debugging workflow'unu az önce değiştirdin.

2. **Bu hafta (bir öğleden sonra):** Agent'ına bir trace-export endpoint'i ekle. Bitmiş ya da başarısız her agent çalışması `messages` array'ini S3'e ya da bir database satırına dump ediyor. Trace'e debug etmeden *önce* ihtiyacın oluyor, sonra değil.

3. **Bu çeyrek (bir alışkanlık):** Bir kullanıcı "agent garip bir şey yaptı" rapor ettiğinde, ilk hareketin trace'i çekip timeline view'ında açmak, kullanıcının raporunu dikkatlice okumadan *önce*. Çoğu zaman bug raporunu bitirmeden ne olduğunu biliyor olacaksın.

Agent debugging, ortaya çıkan bir mühendislik disiplini olarak sunuluyor. Değil — non-AI sistemler için defalarca çözdüğümüz bir tooling problemi. Yalnızca bu için tool'ları henüz yapmadık. Trace doğru şekle geldiğinde, bug'lar bariz. İş veriyi yorumlamak değil, sergilemek.

---

Bu [**agent-replay**](https://agentreplay.vercel.app)'e shipledim — trace yapıştır, timeline scrub et. Key yok, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/agent-replay](https://github.com/ferhatatagun/agent-replay).

Aynı SSE client (streaming event içeren trace'ler için) ayrıca üç kardeş tool'a güç veriyor — [claudoscope](https://claudoscope-labs.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
