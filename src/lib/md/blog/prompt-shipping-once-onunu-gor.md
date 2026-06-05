# Prompt'u shiplemeden önce gör

Çoğu ekip prompt'larının çok uzun olduğunu **faturada** öğreniyor. Çoğu ekip prompt'larının context window'a yaklaştığını **model system instruction'ları silmeye başladığında** öğreniyor. Çoğu ekip prompt-caching boundary'sinin yanlış yerde olduğunu **hit oranı %30'un üstüne çıkmayınca** öğreniyor.

Üçü de önceden, dört saniyede, ücretsiz teşhis edilebilir. Olmaya devam etmelerinin nedeni: her Claude developer'ının uzandığı araçlar — chat playground'ları, IDE eklentileri, resmi SDK — *post-hoc*. Sana ne *az önce olduğunu* gösteriyorlar. Hiçbiri prompt'unun göndermeden *önce* nasıl göründüğünü göstermiyor.

Bu suite'te shiplediğim diğer dört tool da post-hoc. [claudoscope](https://claudoscope-labs.vercel.app) biten bir response'u x-ray'liyor. [agent-replay](https://agentreplay.vercel.app) biten bir trace'i scrub ediyor. [prompt-lab](https://prompt-lab-promptly.vercel.app) biten iki çalıştırmayı karşılaştırıyor. [tool-lab](https://tool-lab-bice.vercel.app) agent loop'unu sandbox'lıyor. Hepsi "az önce ne oldu" mikroskopları. Hiçbiri "yapmak üzere olduğun şeye bak" lensi değil.

[**context-lens**](https://context-lens.vercel.app) öyle. Bir system prompt ve user mesajı yapıştır; API'nin onları tam olarak nasıl sayacağını, 200K window içinde nerede durduğunu, caching boundary'lerinin nereye düştüğünü ve her çağrının ne kadara mal olacağını gör. Tahmini ölçüme çeviren pre-flight check.

**TL;DR**

- Token cost, context-window pozisyonu ve prompt-caching layout'u — hepsi prompt'tan tek başına bilinebilir, istek göndermene gerek yok.
- Anthropic'in `count_tokens` endpoint'i sana kesin sayıyı veriyor; `~3.7 chars/token` heuristic'i yazarken yeterli tahmin veriyor.
- En faydalı tek sayı "token × günlük çağrı × dolar/token" — bunu deploy etmeden hesaplayabildiğinde, "bu prompt'u shiple" estetik bir karar olmaktan çıkıp bütçe kararı oluyor.
- Anlam olarak eşdeğer iki prompt arasında input uzunluğunda 4× fark normal. Production'a gitmeden yakalamak, tool'un kendisini kurmaktan daha çok tasarruf ediyor.

## Aslında pre-flight ne yapabilirsin

Üç şey, hepsi prompt metninden türetilebilir:

**1. Kesin token sayısı.** Tahmin değil. Anthropic bir `/v1/messages/count_tokens` endpoint'i sunuyor — `/v1/messages` ile tam aynı şekli (system, messages, tools) alıyor ve sadece `input_tokens` sayısını dönüyor. Asıl API çağrısının kullanacağı aynı tokenization. Model invocation yok, output yok, tek bir küçük istek dışında ücret yok.

**2. Context window pozisyonu.** Sonnet 4.5'in 200K-token window'u var. Aşmak hata vermiyor; model sessizce en eski içeriği bırakıyor — ki bu genellikle system instruction'larını bırakmak demek, ki bu da modelin istediğin şeyi yapmayı bırakması demek. Matematik: `(input + max_output) / 200_000`. Production'da bilmediğin bir "window'un %78'i" durumunu asla görmemelisin.

**3. Çağrı başına cost.** Input token'ları input fiyatıyla çarp (Sonnet'te `$3/M`), output token'ları output fiyatıyla çarp (`$15/M`), ve bir çağrının cost'u için tek bir sayı al. Trafiğinle çarpınca fatura çıkıyor. İlginç hamle: bunu prompt tasarımına commit etmeden *önce* yap, sonra değil.

Dördüncü şey — prompt-caching boundary'lerinin nereye oturması gerektiği — saf olarak metinden türetmek daha zor, ama hala pre-flight: `cache_control`'u nereye koyacağını, gerçek trafiğinde hangi prefix'in *stabil* olduğuna göre seçiyorsun. context-lens senin için seçmiyor, ama seçtiğin boundary'leri sana gösterip sanity check yapmana izin veriyor.

## Kimsenin aramadığı dört-kat cost farkı

Gerçek bir örnek, çalıştırılmış olanından. Aynı agent system prompt'unun iki versiyonu:

- **Versiyon A** — Markdown başlıklar, örnekler, uzun taksonomi, JSON şema gömülü — **3,847 input token**
- **Versiyon B** — Tek paragraf, şema bir örnekle ima edilmiş, preamble yok — **612 input token**

Aynı model (Sonnet 4.5). Aynı user input'ları (code review görevi). Output beş gerçek trafik örneğinde anlam olarak eşdeğerdi — ikisi de aynı kritik bug'ları yakaladı, ikisi de geçerli JSON üretti, ikisi de 800 output token'ın altında kaldı.

Cost farkı mekanik:

- A: `(3847 × 3 + 800 × 15) / 1_000_000` = **$0.0235** çağrı başına
- B: `(612 × 3 + 800 × 15) / 1_000_000` = **$0.0138** çağrı başına

Günde 10,000 çağrıda bu **$97/gün tasarruf**, ya da **$3,000/ay**. context-lens'te iki saatlik bir prompt yeniden yazımıyla.

Önemli detay: versiyon B'yi daha ucuz olsun diye *yazmadım*. Daha okunabilir olsun diye yazdım. Cost azalması bir yan etkiydi ki pre-flight sayı olmadan fark etmeyecektim, çünkü bir editörde ikisi de bana "yaklaşık aynı uzunlukta" hissettirdi. context-lens bana birinin diğerinin 6.3×'i kadar uzun olduğunu söyledi — önemli olan tek metrikte: API'nin kullandığı metrikte.

Ders şu: "yaklaşık aynı" token sayısı için tutarlı olarak kötü bir estimator. Shiplemeden önce ölçmeye başladığın gün hatayı yapmayı bırakıyorsun.

## Heuristic mode neden var

context-lens iki şey yapıyor:

- Yazarken canlı: kabaca İngilizce-benzeri metin için `3.7 chars/token` hızlı bir heuristic, her tuş vuruşunda güncellenir. API call yok, key gerekmez, anlık.
- İstek üzerine: gerçek `count_tokens` API call'u — Anthropic'in kullanacağı kesin sayıyı verir.

Heuristic tam doğru değil — Türkçe, kod ve JSON İngilizce düzyazıdan farklı tokenize oluyor, bazen %30 farkla. Ama iterate ederken real-time sinyal — accurate-ama-asenkron olandan daha faydalı. Commit etmeye hazır olduğunda butonu tıklıyorsun ve kesin sayıyı alıyorsun. İki mod kasıtlı: biri iteration için, biri verification için.

Pattern genelleşiyor. Hızlı-yaklaşık ve yavaş-kesin metriklerinin olduğu her yerde, ikisini de shiple, açıkça etiketle, varsayılan olarak hızlıyı kullan. Hızlı metriği ~%30'dan fazla yanlış olmamalı; yoksa faydalı bir yaklaşıklık değil. ~3.7 chars/token context-lens'in handle etmesi gereken diller için bu çıtayı geçiyor.

## Prompt caching tarafı

Caching, çoğu ekibin yetersiz kullandığı kaldıraç — ve context-lens'in boundary'leri yüzeye çıkararak en çok yardım ettiği şey. Anthropic prompt'unun herhangi bir segmentini `cache_control: { type: "ephemeral" }` ile cache-able işaretlemeye izin veriyor. Sonraki 5 dakikada, o tam prefix'i paylaşan istekler cache'lenmiş kısmı **input fiyatının %10'una** alıyor. Matematik dönüyor: çağrı başına `$0.012`'lık 4,000 token'lık bir system prompt warm çağrıda `$0.0012` ediyor. Bu 10×.

Çıkmaz: `cache_control` boundary'sinden önceki her byte aynı olmalı. System prompt'a user'ın adını interpolate ediyorsan — gitti. Tool list'in istekler arası reorder oluyorsa — gitti. Timestamp ekliyorsan — gitti.

context-lens sana gönderdiğin yapıyı gösteriyor. Otomatik cacheability tespit etmiyor, ama "input cache-read varsayılır" toggle'ı ile caching'in çalışsa cost'un ne olacağını görebiliyorsun. Eğer `$0.012 → $0.0012` senin trafik seviyende ilginçse, gerçekten çalıştığını doğrulamanın yolu [claudoscope](https://claudoscope-labs.vercel.app)'ta — sana canlı bir çağrıda gerçek cache-read ve cache-write breakdown'ını gösteriyor. İki tool birbirini tamamlıyor: context-lens tahmin ediyor, claudoscope ölçüyor.

Caching observability case'i üzerine daha uzun bir yazı yazdım: [Prompt caching, Claude'un en ucuz optimizasyonu. Kimse ölçmüyor.](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi) — full argümanı isteyenler için.

## Bu hafta ne yapmanı tavsiye ediyorum

Üç eskalasyon hamlesi:

1. **Bugün (5 dakika):** Ekibinizin şu an shiplediği herhangi bir prompt'u al. context-lens'e temsili bir user mesajıyla yapıştır. Token sayısını not et. Şimdi aynı prompt'un 1-paragraflık bir versiyonunu yaz ve yapıştır. Üç gerçek input'ta kalite regression'ı olmadan sayı %50 düşerse, ücretsiz bir production cost cut'ın var.

2. **Bu sprint (bir öğleden sonra):** Prompt değişikliği workflow'una pre-merge bir adım ekle: prompt'a dokunan her PR description'da context-lens token sayılarını (önce / sonra) içermek zorunda. Code review'da test sonuçlarını gösterir gibi. Bir PR input token'larını üçe katlıyorsa, bu bir konuşma olmalı — stealth deploy değil.

3. **Bu çeyrek (bir alışkanlık):** Ürünün boyunca prompt-cost-per-feature sayısını gerçek bir metrik olarak takip et. Feature X çağrı başına `$0.02` ediyor ve feature Y `$0.20` ediyorsa, bu fatura sana öğretmeden önce bilmen gereken bir bilgi. context-lens onu toplamaya başlamak için en ucuz yer — `count_tokens` çağrılması ücretsiz.

LLM uygulamalarının 2026 ekonomisi model seçimi hakkında değil, çoğunlukla. Prompt tasarımı hakkında. Prompt'larını shiplemeden görebilen ekipler göremeyenleri yenecek, önce cost'ta sonra kalitede. Eksik olan "görme" kısmı, ve context-lens onun için.

---

Bu [**context-lens**](https://context-lens.vercel.app)'a shipledim — Claude prompt'u yapıştır, shiplemeden ne kadar tutacağını gör. BYOK, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/context-lens](https://github.com/ferhatatagun/context-lens).

Aynı protokol-seviye yaklaşımı ayrıca dört kardeş tool'a güç veriyor — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app), [tool-lab](https://tool-lab-bice.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
