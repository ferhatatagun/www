# İki hafta sonunda dört açık kaynak Claude dev-tool shiplerken neler öğrendim

Yaklaşık bir ay önce Anthropic SDK'sını bir Next.js projesine import etmeye çalıştım ve bundler çöktü. Çözüm basitti — Messages API'ye doğrudan konuş, SDK'yı yaklaşık 150 satır TypeScript ile replace et — ama yan etkisi şuydu: artık elimde el yapımı bir SSE client vardı, ve Claude'un tüm streaming davranışı protokol seviyesinde ilk kez bana açıktı.

O client, iki hafta sonu üzerinde shiplediğim dört küçük açık kaynak tool'un tohumu oldu. Her biri aynı protokole farklı bir mikroskop tutuyor:

- [**claudoscope**](https://claudoscope-labs.vercel.app) — token ekonomisinin canlı x-ray'i: input, cache write, cache read, output, hepsi response stream'lerken görünür.
- [**agent-replay**](https://agentreplay.vercel.app) — bir Claude agent trace'i yapıştır, sinematik bir timeline'da adım adım replay et.
- [**prompt-lab**](https://prompt-lab-promptly.vercel.app) — aynı input üzerinde iki prompt'u (veya model'i) yan yana çalıştır, output/cost/latency karşılaştır.
- [**tool-lab**](https://tool-lab-bice.vercel.app) — Claude tool'larını bir JSON editor'da tanımla, mock response'ları el ile yaz, agent loop'un oynanışını izle.

Dördü de yalnızca tarayıcında çalışıyor, BYOK, backend yok, MIT lisanslı. Birlikte yaklaşık 400 KB gzipped; paylaşılan SSE client dört repo'da da aynı dosya. [ferhatatagun.com/blog](https://ferhatatagun.com/blog) ve Medium'da beş uzun yazı her birinin arkasındaki mühendislik kararlarını anlatıyor.

İş bitti — şimdi benim için daha ilginç olan soru, bunları bu şekilde, bu zaman çizelgesinde shiplemenin AI-tooling çağında developer tool inşa etmek hakkında bana öğrettiği şey.

**TL;DR**

- Resmi SDK'nın direnci en üretken kısıt oldu. Çöküş olmasaydı parser'ı asla yazmazdım, parser olmasaydı SDK'nın ne kadar şey gizlediğini asla fark etmezdim.
- "İçgörü başına bir tool" yaklaşımı "her şey için bir tool" yaklaşımını yeniyor. Dört tool'un her biri tam olarak bir şeyi görünür kılıyor. Birbirini kompoze ediyorlar, çünkü bunu yapmaya *çalışmıyorlar*.
- BYOK + tarayıcı-only bir güvenilirlik çarpanı. "Bunu deneyeceğim" eşiği, açılacak hesap olmadığında ve güvenilecek sunucu olmadığında dramatik şekilde düşüyor.
- Dört proje arasında `<150-satırlık` paylaşılan protokol client'ı, "bir kütüphaneye çıkar" pattern'inden daha ilginç bir reuse pattern'i. Niyetle yapılmış copy-paste ile yolculuk ediyor.
- Yazılar reklam değil — iskele. Her tool, *ne yaptığını* değil *neden var olduğunu* anlatan bir uzun-form artefakta ihtiyaç duyuyor.

## İşi mümkün kılan kısıt

Anthropic SDK'sı Next.js bundle'ıma temiz import edilseydi, bunların hiçbiri olmazdı. SDK'yı kullanırdım, SSE event stream'ini hiç görmezdim, dört `usage` alanının her response'da orada beklediğini fark etmezdim, ve onun yerine sıkıcı bir ürün özelliği shiplerdim.

İlk kırılan bundler'dı — `node:fs/promises`, SDK'nın transitive import'larının derinindeki bir agent-toolset modülünden. Çözüm ince değildi: SDK'yı kullanma. `api.anthropic.com`'a doğrudan `fetch` ile konuş. `anthropic-dangerous-direct-browser-access` header'ını ekle. SSE stream'i el ile parse et. Yaklaşık 150 satır.

İlginç olan kısım parser değildi — parser *yüzünden* gördüğüm şeydi. Aylardır Claude'u çağırıyordum ve `cache_creation_input_tokens` ile `cache_read_input_tokens`'in farklı alanlar olduğunu hiç fark etmemiştim. `content_block_delta` event'lerinin granüler sırasına hiç bakmamıştım. `tool_use` input'larının biriktirmen gereken partial-JSON delta'ları olarak geldiğini hiç fark etmemiştim. SDK bunları gizleyerek bana bir iyilik yapıyordu, ben de SDK'nın yapmasına izin vererek uygulamalarıma bir kötülük yapıyordum.

Yeniden ifade edilmiş ders: bir SDK seninle didişiyorsa, didişme bir hediye. Onu bypass etmek için yaptığın iş, kendin alamayacağın ground-truth görünürlüğü veriyor.

## Bir tool, görünür kıldığı bir şey

SSE parser'ı elime aldığımda cazibe, "bir Claude developer dashboard" inşa etmekti — her şeyi yapan bir tool. Neredeyse yaptım. Yapmamamın nedeni şu: hayatımda kullandığım en yararlı diagnostic tool'ların (Wireshark, Chrome DevTools'un belirli panelleri, React Profiler) hepsi bir özelliği paylaşıyor: her panel başka hiçbir tool'un yapmadığı şekilde *tam olarak bir şeyi* görünür kılıyor.

Bu yüzden işi dörde böldüm:

| Tool | Görünür kıldığı şey |
|------|--------------------|
| claudoscope | Dört `usage` alanı, canlı, dolar olarak cost |
| agent-replay | `messages` array'inin içindeki karar dizisi |
| prompt-lab | İki varyant arasındaki latency/cost/output diff |
| tool-lab | Modelin senin tool schema'larınla gerçekten ne yaptığı |

Her biri ufak bir surface area. Hiçbiri diğer üçünün işini yapmıyor. Hepsi aynı şekilde — bir-JSON-yapıştır, bir-output-izle, şeyi-gör — ama "şey" her birinde kasıtlı olarak farklı.

Bu ayrıştırma bana bir şeye mal oldu: dört landing page'i, dört README'yi, dört set cross-link'i sürdürmem gerekiyor. Ama asimetrik bir şey kazandırdı: tool başına net bir pitch. "Bir Claude API çağrısını x-ray'le" cümlesi "her şey için bir Claude developer console" cümlesinden paylaşılması daha kolay. Bir Show HN front page'inde ya da bir Twitter timeline'da, küçük ve spesifik iddia kazanıyor.

## Güvenilirlik çarpanı olarak BYOK + browser-only

Kafamda her tool'un ilk versiyonunun bir backend'i vardı. Küçük bir Node servis, server tarafında tutulan bir API key, belki bir rate limiter. İlkini bu şekilde inşa etmeye başladım, sonra deploy adımında durdum ve sordum: kullanıcıyı bana key'iyle güvenmeye neden zorluyorum?

İyi bir cevap yok. Kullanıcının kendi işini debug etmek için on dakika kullanacağı bir developer tool için backend gerekmez. Onun key'i, onun istekleri, onun verisi. Tarayıcı doğru runtime; `localStorage` doğru persistence katmanı; "hiçbir şey tab'ını terk etmiyor" doğru gizlilik garantisi.

Bunun değiştirdiği şey: "deneme" eşiği çöktü. Hesap açma yok. OAuth dansı yok. "Bu siteye key'imi vermek zorunda mıyım?" tereddüdü yok. URL'yi aç, key yapıştır, send'e bas. Tool otuz saniyenin altında senin. `anthropic-dangerous-direct-browser-access` adlı Anthropic header'ı, açıkça bu tür kullanım için inşa edilmiş — bir developer kendi makinesinde, kendi credential'larıyla protokole doğrudan bakmak istiyor.

Diğer taraf: bu tasarım yalnızca *yaratıcıları tarafından kullanılan developer tool'lar* için çalışıyor. Kullanıcılarına key gönderen bir production app'in hala backend'i gerekirdi. Ama diagnostic case için, BYOK + tarayıcı-only doğru mimari.

## 150-satırlık client, dört kez kopyalandı

Paylaşılan SSE streaming client dört repo'da da `src/lib/anthropic.ts`. Aynı dosya. Aynı 150 küsur satır. Bir npm package'a çıkarmayı düşündüm — `@ferhatatagun/claude-fetch` ya da benzeri — ve üç kez aksini kararlaştırdım.

Extraction'a karşı dava bir kez ölçekte çalıştığında sezgisel: dört tool üzerinde paylaşılan bir kütüphane fan-out problemi yaratıyor. Kütüphanedeki bir breaking change dördünü de kırar; non-breaking bir değişiklik version-pin'ling mantığı gerektirir; bir hotfix dört PR'lık deploy gerektirir. Bu arada dört tool *dosyanın beş dakikada review edilebilecek kadar küçük*. Soyutlanacak bir şey yok.

Onun yerine yaptığım: her repo'daki `src/lib/anthropic.ts`'nin başındaki bir yorum, son nereden sync edildiğini söylüyor. Bir tool'da parser'ı iyileştirdiğimde, dört repo'da dosyayı diff'leyip uzlaştırıyorum. Saatler değil dakikalar alıyor, ve dört tool, yayınlanmış bir paketin ceremony'si olmadan sync kalıyor.

Bu evrensel bir pattern değil — on proje için yıkılır, yüz için açıkça yanlış. Ama hafta sonları tek kişi tarafından shiplenen dört tool için, npm-and-versioning alternatifinden kesinlikle daha iyi.

## Yazılar marketing değil — iskele

Dört tool'un her birinin var olma sebebini anlatan bir uzun yazısı var. claudoscope'un ikisi var (biri streaming client'ın kendisi, biri cache observability üzerine). prompt-lab, tool-lab ve agent-replay'in her birinin bir tane var. Ayrıca ferhatatagun.com'da beş eşleşen Türkçe çeviri var.

Bu yazılar marketing anlamında promosyon değil. Onları SEO için optimize etmiyorum ve impression için LinkedIn'de pompalamıyorum. (Tamam, LinkedIn'de azıcık pompalıyorum. Ama önemli olan o değil.)

Önemli olan şu: belirli bir şey yapan bir tool, o belirli şeyin yapılmaya değer olduğunu *anlatan* bir artefakttan büyük fayda görür. "İşte Claude prompt'larını A/B test etmek için bir tool" pitch'i "prompt'ları vibe ile seçiyorsun; işte side-by-side'ın sıralı versiyonun göstermediği şey, çalıştırılmış bir örnek ve onun için bir tool" pitch'inden daha az ikna edici. Yazı ikna ediyor; tool ikna edilmiş okuyucuyu yakalıyor.

Yazı olmadan tool'lar oyuncak gibi görünüyor. Yazıyla, bir argümanın doğal sonucu gibi görünüyor. İkisi çift olarak çalışıyor.

## Farklı yapardım

Yeniden başlasaydım önden yapacağım birkaç küçük şey:

1. **Birinci günden demo mode.** Dört tool'un üçüne `?demo=1`'i sonradan ekledim. En yüksek dönüşüm özelliği — bir tool'a inip key'i olmayan kullanıcılar hala bakacak bir şeye ihtiyaç duyuyorlar, yoksa bounce. İlk commit'te orada olmalıydı.

2. **Tool başına OG card'lar.** Her tool'u generic bir OG image ile shipledim ve iki gün sonra geri dönüp doğru brand renginde tool başına 1200×630 card'lar yaptım. Paylaşılan linkler üzerinden gelen ilk iki gün trafiği generic görünüyordu. Launch'ta orada olmalıydı.

3. **Tool'ların içinde cross-link.** Her tool'un footer'ı diğer üçüne işaret ediyor. Bunu ikinci hafta sonunda ekledim. İlk hafta sonu her tool bir siloydu, ve ziyaretçiler onları teker teker keşfediyorlardı. Template'e baştan dahil edilmeliydi.

4. **Landing page'de "bunun bana ne faydası var" satırı.** "Claude'un ne yaptığını gör" gibi dört hero açıklamam vardı. Daha iyisi: "prompt caching'in faturanı %90 düşürmesini, canlı, debug ederken gör." Spesifik sonuç > muğlak kabiliyet. Bunu ikinci geçişte düzelttim.

Bunların hiçbiri büyük fix değil. Hepsi, eğer bir kez küçük bir developer tool shiplediyseniz, zaten bildiğiniz şeyler. Bilmek ve shipleme anında hatırlamak farklı şeyler.

## Bundan sonra

API surface'ı bundan sonra ne eklerse eklesin, aynı pattern geçerli: indiği gün onun için küçük bir visualizer shiple. Anthropic geçen yıl MCP, batch, files, computer-use ve citations shipledi, ve çoğunun hala developer tarafında iyi observability tool'u yok. Her biri inşa edilmeyi bekleyen 200-300 satırlık bir tool.

Şu an dört-tool'lu suite doğal bir durma noktasında. Şimdi ilgilendiğim iş benimsenme etrafında — bu tool'lara ihtiyaç duyan insanların onları bulabilmesi için yeterince görünür yapmak. Bunu buraya kadar okuduysan ve dördünden biri sana geçen hafta zaman kazandıracak gibi geliyorsa, bir deneme yap ve neyin eksik olduğunu söyle.

---

Dört tool: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).

Kaynak: [github.com/ferhatatagun](https://github.com/ferhatatagun). MIT, BYOK, backend yok.

Her biri üzerine yazılar: [ferhatatagun.com/blog](https://ferhatatagun.com/blog).
