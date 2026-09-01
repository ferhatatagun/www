# Kazara bir forward-deployed engineer saha çantası kurmuşum

Bir yıl önce bir projeden `@anthropic-ai/sdk`'yı sildim ve yerine yaklaşık 150 satır TypeScript yazdım.

Kendime verdiğim gerekçe dürüst ve sıkıcıydı. SDK, bir agent-toolset modülü üzerinden `node:fs/promises` çekiyordu ve bu browser bundle'ını kırıyordu. Browser'a temiz bir entry point çıkmasını bekleyebilirdim. Bunun yerine elle bir SSE parser yazdım ve [nedenini anlatan bir yazı yazdım](https://ferhatatagun.com/blog/tarayicida-claude-streaming-sdk-siz).

Bunu bir bundler hikâyesi diye kaldırdım.

Sonra forward-deployed engineer'lar — bir AI deployment'ını gerçekten çalıştırmak için müşterinin binasına gönderilen insanlar — için araç geliştirmeye dair bir yazıda bir cümle okudum. Kabaca: her framework bağımlılığı, müşterinin güvenlik ekibinin soracağı bir sorudur, ve bare-metal kod senin olmayan bir ortamda debug etmesi daha kolaydır.

Aynı karar. Aynı gerekçe. Farklı disiplin, farklı unvan, tamamen farklı bir problem — ama farklı bir problem değilmiş.

Bir bundler sorunu çözmemişim. Adını hiç koymadan bir **deployment** problemi çözmüşüm, ve bu yüzden onu zevk sanmışım.

Bu yazı, shiplediğim beş araçtaki her mimari kararı geri dönüp hiç sormadığım bir soruyla incelediğimde çıkanlar: burada aslında hangi kısıt işliyordu?

**TL;DR**

- Beş araç; hepsi yalnızca tarayıcıda, hepsi BYOK, hiçbirinde backend yok. Bunları tercih ve hafif tembellik gibi hissettiren şeylerle seçtim.
- Bunlar, neredeyse tam olarak, başkasının regüle ortamında çalışmanın kısıtları: kurulacak bir şey yok, sınırdan çıkan veri yok, güvenlik ekibinin threat-model'leyeceği bir şey yok, savunulacak minimum bağımlılık yüzeyi.
- Kısıtlar yakınsar. Aynı *şekildeki* problemi çözen iki disiplin, birbiriyle hiç konuşmadan aynı mühendislik kararlarına varır.
- FDE araçlarının genelde ayrıldığı dört kategoriye — observability, evaluation, orchestration, guardrails — göre eşleştirdiğimde üçü var. Dördüncüsü eksik, ve aksini iddia etmek yapabileceğim en az ilginç şey olurdu.
- Aktarılabilir kısım benim repo'larım değil. Bir aracı oyuncaktan ayıran şeyin *dile getirilmiş bir kısıt* olması, ve çoğu yan projenin hiçbir zaman bir kısıt dile getirmemesi.

## Karar, ve altındaki gerçek sebep

SDK kararıyla ilgili o zaman yanlış anladığım şey şu.

Şöyle çerçeveledim: *SDK benim ortamımda çalışmıyor, o yüzden çalışan minimumu yazayım.* Makul. Aslında yaptığım şey, aracın bağımlılık yüzeyini `fetch` ve bir `TextDecoder`'a indirmekti — ve bunun bir kez bile düşünmediğim sonucu şu: runtime'ın tamamı incelenebilir. Kodumla tel arasında akıllıca bir şey yapan bir framework yok. Bir stream tuhaf biçimde sonlandığında kendi parser'ımı okuyorum.

Bu özellik, kendi laptop'unda, debugger bağlı ve dünya kadar zamanın varken debug ederken beş para etmez.

Başkasının mühendisiyle telefondayken, başkasının network'ündeyken, ve sana response'un neden kesildiğini sorduklarında, ve dürüst cevabın önümüzdeki doksan saniye içinde gelmesi gerektiğinde ise oyunun tamamı budur.

Onun için yapmadım. Ama o.

## Dört karar daha, aynı şekil

Bakmaya başlayınca desen bitmedi.

**BYOK — kendi anahtarını getir.** Kendime söylediğim: proxy çalıştırmak istemiyorum, kimsenin kimlik bilgisini tutmak istemiyorum, ve yabancıların token'ları için ödeme yapmayı *hiç* istemiyorum. Hepsi doğru. Aslında olan şey: müşterinin anahtarı tarayıcısından hiç çıkmıyor ve prompt'u benim kontrol ettiğim bir altyapıya hiç değmiyor. Müzakere edilecek bir veri işleme sözleşmesi yok çünkü veri işleme yok. "Backend çalıştıramayacak kadar tembelim" versiyonuyla "bu bir compliance incelemesinden geçer" versiyonu aynı mimari.

**Hiç backend yok.** Kendime söylediğim: statik hosting bedava ve yan proje için sunucu bakmak istemiyorum. Aslında olan şey: threat-model'lenecek sunucu yok, dokümante edilecek saldırı yüzeyi yok, anlatılacak uptime hikâyesi yok, ve geçmesi altı hafta süren tedarikçi güvenlik anketi yok. Bir güvenlik ekibinin en hızlı onayladığı şey, var olmayan şeydir.

**Her araç bir URL.** Kendime söylediğim: link paylaşmak, birine repo klonlayıp `npm install` çalıştırmasını söylemekten kolay. Aslında olan şey: sıfır kurulum. Müşterinin makinesine hiçbir şey girmiyor. Bir teşhis aracına en çok ihtiyacı olan insanlar, tam olarak kurmasına en az izin verilen insanlar.

**Maliyet loglanmıyor, canlı render ediliyor.** Kendime söylediğim: sayı ilginç ve hareket edişini görmek istedim. Aslında olan şey: yenilemeyi onaylayan kişi kimseye sormadan okuyabiliyor. [Prompt caching'in kimsenin ölçmediği en ucuz optimizasyon olduğuna dair koca bir argüman](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi) yazdım ve yine de onu bir mühendislik hijyeni meselesi gibi çerçeveledim. Değil. Bir [güven meselesi](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi), ve bir deployment'ın yaşayıp yaşamayacağına güven karar veriyor.

Dört karar. O zaman verdiğim, doğru ama yüzeysel dört gerekçe. Hepsinin altında, hiç yüksek sesle söylemediğim tek bir kısıt.

## Yalnızca-tarayıcı gerçekte neye mal oluyor

Bunu olduğundan temiz göstermek istemiyorum, o yüzden bir saniye kendime karşı çıkayım.

Yalnızca-tarayıcı, birçok yazılım için gerçekten kötü bir seçim. Sunucu tarafı secret yönetimi yok. Sürekli CORS'la boğuşuyorsun — ve bazı sağlayıcılarda düpedüz kaybediyorsun, çünkü header'ları göndermiyorlar ve bir sekmeden yapabileceğin hiçbir şey yok. Adı gibi kalıcı depolama yok, zamanlanmış iş yok, arka plan işleme yok, hesaplama açısından ciddi bir şey yapmanın yolu yok. Bu şekilde ürün yapamazsın. Yapabilirsin gibi davranmayacağım.

Ama bu sınırlamaların hiçbiri bir *teşhis aleti* için bağlayıcı değil.

Multimetrenin veritabanına ihtiyacı yok. Sana sistemin neden garip davrandığını söyleyen araç, sistemin kendisi değil. Güvenilir, taşınabilir ve okunabilir olmak zorunda — ve tam da daha ağır olan her şeyin sana kapalı olduğu anda çalışmak zorunda. Maliyet diye saydığım her kısıt bu iş için alakasız, ve ikisi (depolama yok, sunucu yok) gerçek bir deployment'ı reddedecek bir yerde kullanılabilmesinin sebebi.

Sınırlama ile yeterlilik, aynı olgunun iki yüzü.

## Harita

FDE araçları oldukça tutarlı bir şekilde dört kategoride tarif ediliyor: agent orchestration, evaluation, guardrails ve observability. Gidip kendi şeylerimi kutulara koydum.

| Kategori | Araç | Ne yapıyor |
|---|---|---|
| Observability | [claudoscope](https://claudoscope-labs.vercel.app) | Canlı bir çağrıyı röntgenliyor — token bileşimi, cache okuma/yazma, maliyet; response akarken |
| Observability / debugging | [agent-replay](https://agentreplay.vercel.app) | Biten bir agent trace'ini iç içe JSON duvarı yerine zaman çizgisi olarak oynatıyor |
| Pre-flight | [context-lens](https://context-lens-sigma.vercel.app) | Prompt'u göndermeden sayıyor — window pozisyonu, maliyet, caching sınırları |
| Evaluation | [prompt-lab](https://prompt-lab-promptly.vercel.app) | İki prompt, tek input; çıktı, latency ve maliyette yan yana |
| Orchestration | [tool-lab](https://tool-lab-bice.vercel.app) | Tool-use döngüsünü sandbox'lıyor — tool tanımla, response mock'la, elle sür |
| **Guardrails** | — | — |

Üç kategori kapsanmış, bir pre-flight bonusu, bir delik.

Burada dikkatli olmak istiyorum, çünkü bu yazının FDE şapkası takmış bir portföy turu olan bir versiyonu var ve o versiyon beş para etmez. Yani: bu haritayı planlamadım. Sonradan giydirme. Araçlar birkaç hafta sonunda birer birer yapıldı ve o zaman dile getirebileceğim tek ortak çizgi ["Claude API'yi okunur kılmak"](https://ferhatatagun.com/blog/iki-hafta-sonu-dort-tool) idi. Kategoriler başkasının disiplininden geldi. Uyum gerçek, ve aynı zamanda bir kaza, ve ikisi birden doğru olabilir.

## Üstünü örtemediğim boşluk

Guardrails eksik, ve sahada en çok canı yakacak olan da o.

Guardrails, model çıktısını kodunun güvenle tüketebileceği bir şeklin içinde tutan katman. `{"risk": "high"|"medium"|"low", "score": 0-100}` istiyorsun. Yeterince çağrıda gerçekte dönen:

- markdown fence'ine sarılmış JSON
- `"high"` yerine `"HIGH"` — enum kayması
- `"very high"` — var olmayan, anında uydurulmuş bir enum değeri
- string olarak `"score": "85"`, aşağı akıştaki aritmetiği sessizce bozuyor
- `score` tamamen yok
- JSON başlamadan önce bir cümle düz metin

Bunların her biri ya parser'ını çökertiyor ya da — daha kötüsü — çökertmiyor ve birinin dashboard'una sessizce yanlış bir kategori koyuyor.

Bunun unit test değil de alet gerektirmesinin sebebi, hataların **dağılımsal** olması. Bir kez çalıştırıyorsun, çalışıyor, shipliyorsun. Sonra kırk çağrının biri halüsinasyon bir enum dönüyor ve sen hiç görmüyorsun, çünkü tek bir örneğe baktın. İhtiyacın olan şey, elli çalıştırma boyunca, hata tipine göre kırılmış hata *oranı*. Bu, "çalışıyor mu"dan farklı bir soru.

Yani altıncı araç bu, ve sırada yapılacak dürüst şey de bu: bir şema tanımla, bir prompt'u ona karşı N kez çalıştır, bozulma biçimlerinin dağılımını göster. Geri kalanla aynı kısıtlar — yalnızca tarayıcı, BYOK, backend yok; çünkü artık bunlar tercih değil, şartname.

## Bu neden genelleşiyor

Repo'larımı çıkar, geriye tutmaya değer tek bir fikir kalıyor.

Çoğu yan projenin kısıtı yoktur. Oyuncak gibi okunmalarının sebebi bu — küçük ya da yarım oldukları için değil, haklarında hiçbir şey *zorunlu* olmadığı için. Her karar öbür türlü de verilebilirdi ve hiçbir şey kırılmazdı. Okuyucu bunu hissediyor.

Dile getirilmiş kısıtı olan bir araç, elli satır bile olsa tamamen farklı okunuyor. "Bu bir sekmede çalışıyor çünkü hiçbir şeyin kurulamadığı yerde çalışmak zorunda" bir tasarım brief'i. "Bu bir React uygulaması" değil. Birincisi yazarın neye karşı olduğunu söylüyor; ikincisi ne yazdığını.

Benim için rahatsız edici kısım, kısıtın başından beri elimde olması ve adını koyamamam. Bilinçsizce uyduğum bir kural altında beş şey shipledim, ve hiç yüksek sesle söylemediğim için, işin *neyin* kanıtı olduğunu da söyleyemedim. Beş küçük araç gibi görünüyordu. Bir pozisyondu.

Şu anki AI işe alım piyasasına bakıp ona nasıl okunur hale geleceğini düşünen bir frontend mühendisiyseniz: büyük ihtimalle repo'larınızda zaten kısıt-şeklinde iş duruyor. Hamle yeni bir şey yapmak değil. Geri dönüp aslında ne için çözdüğünüzü bulmak, sonra da onu README'ye yazmak.

Benimki bir yıl ve bir yabancının güvenlik ekipleri hakkındaki bir cümlesini aldı.

---

**Güncelleme, 1 Eylül 2026.** Boşluk kapandı. Altıncı aracı yazdım —
[guard-lab](https://guard-lab.vercel.app) — aşağı yukarı yukarıdaki bölümdeki
şartnameye göre: bir şema tanımla, bir prompt'u ona karşı N kez çalıştır,
bozulma biçimlerinin dağılımını göster.

Yazarken yanlış anladığım iki şey var. İşi bir hata *oranı* raporlamak diye
tarif etmişim, oysa tek başına oran yanıltıcı olanı: asıl önemli olan, çöken
hatalarla, temizleyip geçebileceğin hatalarla, ve temiz parse olup yanlış
olanlar arasındaki ayrım. Sadece üçüncüsü görünmez, ve bu şeyi yapmanın tüm
sebebi de o. Bir de temiz çalıştırmayı hiç düşünmemişim — elli geçiş, sıfır
hata kanıt gibi okunuyor ama değil, o yüzden araç rahatlatıcı bir sıfır yerine
bir aralık raporluyor.

Artık bir yedinci de var, [perf-lab](https://perf-lab-topaz.vercel.app); Claude
API'yle değil performans bütçesiyle ilgili. Bu yazıdaki sayı beş olarak
bırakıldı, çünkü yazıldığında doğru olan buydu.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin ikinci yazısı.
Birinci: [Kimsenin modeli patlamadı. Arayüz patladı.](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi) ·
Üçüncü: [Teslim ettiğin şey prompt değil. Eval.](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) ·
Dördüncü: [Çalıştığında değil, onlar değiştirebildiğinde bitti.](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti) ·
Beşinci: [İkinci müşteri ne yaptığını söyler](https://ferhatatagun.com/blog/ikinci-musteri-ne-yaptigini-soyler)*
