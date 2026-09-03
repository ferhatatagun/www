# Kimsenin modeli patlamadı. Arayüz patladı.

Üç sayı, ve yan yana durunca rahatsız ediyorlar.

Tek bir iş unvanı için — forward deployed engineer — ilan sayısı **2025'te yaklaşık %800** arttı. Frontier lab'lerde toplam paket orta-kıdemli için **$350–550K** civarına oturdu. Ve kurumsal AI pilotları, hangi araştırmayı okuduğunuza bağlı olarak hâlâ **%70 ile %90** arasında bir oranda başarısız oluyor. Yaygın olarak alıntılanan bir rakam, AI girişimlerini terk eden şirketlerin oranını tek yılda %17'den %42'ye çıkarıyor.

Darboğaz modeller olsaydı, çözüm daha iyi bir model olurdu. Bunun yerine sektörün cevabı insan işe alıp müşterinin binasının içine koymak oldu. Bu, bir teknoloji problemine verilen alışılmadık bir cevap. Bozuk olan şey teknoloji değilken verdiğin cevap.

Peki tam olarak ne patlamaya devam ediyor?

**TL;DR**

- Kanonik FDE başarı hikâyesi — Morgan Stanley'deki OpenAI — 6–8 haftalık teknik iskele kurmayı, ardından danışmanlara bu şeyi gerçekten kullandırmak için harcanan yaklaşık **dört ayı** anlatıyor. Raporlanan kazanma koşulu **%98 adoption**; doğruluk da değil, latency de değil.
- Adoption sayısı bir model metriği değil. Bir insanın ekranındakine güvenmeye karar verip vermediğinin ölçüsü. O karar arayüzde veriliyor.
- Güvenin düzenli olarak öldüğü üç yer — gizlenmiş belirsizlik, görünmez maliyet, ve işini göstermeyen bir sistem — hepsi rendering kararı, modelleme kararı değil.
- FDE rolleri backend/ML/infra rolü olarak yazılıyor ve öyle dolduruluyor. Bir düzine ilan okuyun ve kaçının operatörün ne gördüğünden bahsettiğini sayın. Başarısızlık yüzeyiyle işe alım yüzeyi hizalanmıyor.
- Bu, backend önemsiz demek değil. Backend'in altı hafta, son kilometrenin ise dört ay olduğunu söylemek.

## Oturmayan sayı

Forward-deployed modeli anlatan her yazı eninde sonunda aynı vaka çalışmasına uzanıyor: Morgan Stanley'e yerleşmiş OpenAI mühendisleri, wealth advisor'lar için bir asistan kuruyor.

Herkesin alıntıladığı kısım sonu — %98 adoption. Bakmaya değer kısım ise onu üreten zaman çizgisinin şekli. Kabaca altı-sekiz hafta teknik iskele: entegrasyon, veri bağlantıları, eval'ler. Sonra gerçek danışmanlarla pilot çalıştırılan yaklaşık dört ay.

Dört ay. Sistem çalıştıktan **sonra**.

O dört ayda her ne oluyorsa, model eğitimi değildi. Model bitmişti. Entegrasyon bitmişti. Geriye kalan, deneyimli bir grup profesyonelin, tek tek, bir makinenin ürettiği cevabın altına adlarını yazmaya razı olup olmadıklarına karar vermesiydi.

Son kilometre bu. Ve nasıl ölçüldüğüne dikkat edin: "model eval setimizde 0.91 aldı" değil, "%98'i kullanıyor". Kimsenin açmadığı bir deployment, çalışmayan bir deployment'tan ayırt edilemez.

## Adoption bir arayüz sayısıdır

Savunacağım yeniden çerçeveleme şu.

Adoption'ı bir change-management problemi gibi ele alıyoruz — eğitim oturumları, şampiyonlar, yönetici direktifleri. Bunların bir kısmı gerçek. Ama bir profesyonelin sisteme güvenip güvenmeyeceğini belirleyen şeyin çoğu bir memo değil. Kullanmanın biriken deneyimi: ona ne gösterdi, neyi sakladı, ve aradaki fark konusunda dürüst müydü.

Bir wealth advisor bir modele, birisi ona F1 skorunu söylediği için güvenmez. Üç hafta boyunca model ona kendinden emin bir tavırla yanlış bir şey verip önceden uyarmadığı için güvenir — ve *emin olmadığında* bunu, kişinin harekete geçebileceği bir şekilde söylediği için.

Bu bir model özelliği değil. Bir rendering özelliği. Confidence 0.98 yerine 0.51 olduğunda ekranda ne görüneceğine dair birinin verdiği karar.

## Güvenin öldüğü üç yer — hepsi ekranda

AI destekli arayüzlerde tekrar eden üç başarısızlık modu olduğunu ve hiçbirinin model kusuru olmadığını savunuyorum.

**1. Belirsizlik düzleştiriliyor.** Model yarı tahmin ettiği bir şeyi, emin olduğu bir şeyle birebir aynı formatta döndürüyor. Aynı font, aynı özgüven, aynı ton. Operatörün ayırt etme imkânı yok. Zor yoldan öğreniyor — bir kez — ve ondan sonra her şeyi iki kez kontrol ediyor, ki bu sistemin ona zaman kazandırmayı bıraktığı anlamına geliyor, ki bu da kullanmayı bıraktığı anlamına geliyor.

Çözüm bir tasarım kararı: düşük güvenli çıktıya farklı bir affordance ver. Korkutucu kırmızı bir banner değil. Meşgul birinin bir bakışta gerçekten okuyacağı şekilde *şuna bir bak* diyen bir şey.

**2. Maliyet faturaya kadar görünmez.** Yenilemeyi onaylayan insanlar, aracı kullanan insanlar değil. Bütçe sahibinin bir sayı gördüğü tek an aylık fatura ise, sistemle ilgili her konuşma bir sürprizle ilgili konuşmadır. Daha önce [prompt caching'i kimsenin neden ölçmediği](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi) ve [prompt'u göndermeden önce pre-flight etmek](https://ferhatatagun.com/blog/prompt-shipping-once-onunu-gor) üzerine yazmıştım; geriye dönüp bakınca ikisi de aslında bunu anlatıyordu: maliyet birinci sınıf bir arayüz durumudur, ve onu bir ops metriği gibi ele almak, projenin yaşayıp yaşamayacağına karar veren kişiden gizler.

**3. Sistem işini göstermiyor.** Çıktı yanlış olduğunda ve operatör *nedenini* göremediğinde, bug açmıyor — doğru olan kısımlar dahil olmak üzere her şeye olan güvenini kaybediyor. İncelenemeyen bir sisteme ya güvenilir ya da terk edilir, ve insanlar terk eder.

[Agent çalıştırmaları için trace replay](https://ferhatatagun.com/blog/claude-agent-debug-trace-replay) yazmamın sebebi bu. Trace'ler ilginç olduğu için değil, "bunu neden yaptı" sorusu bir deployment'ın ilk kötü haftasını atlatıp atlatmayacağına karar verdiği için.

Üçü de arayüz katmanında çözülüyor. Hiçbiri daha iyi bir modelle çözülmüyor.

## Karşı argümanın en güçlü hali

Karşı tarafı düzgün savunayım, çünkü zayıf halini devirmek kolay ve bunu yapmak istemiyorum.

Ciddi itiraz şöyle: *son kilometre bir UI problemi değil, bir veri problemi.* Müşterinin şeması dokümante edilmemiş. Workflow'un yarısı birinin asistanının güncellediği bir spreadsheet'te yaşıyor. Sana vaat edilen API yok. Hiçbir şey doğru render olmuyor çünkü yukarı akışta hiçbir şey doğru değil. OpenAI'ın FDE ekibinin başı aşağı yukarı bunu söyledi — müşterinin scoping sırasında tarif ettiği şey, sahadaki sistemlerin gerçekliğiyle rutin olarak uyuşmuyor.

Bu doğru, ve işin en zor kısmı. İtiraz etmiyorum.

Ama zaman çizgisine tekrar bakın. O iş, altı hafta. Gerekli, ve kesinlikle yeterli değil — kanıtı da şu: proje sekizinci haftada başarılı olmadı, dört ay sonra, tamamen farklı türde bir işin ardından başarılı oldu.

İki yarı da gerçek. Benim iddiam "önemli olan UI'dır"dan daha dar. Şu: ikinci yarı daha büyük yarı, projelerin asıl öldüğü yarı, ve neredeyse hiç kimsenin ona göre işe alınmadığı yarı.

## İşe alım açığı

Bir tutam forward-deployed engineer ilanı okuyun. Şunları göreceksiniz: production LLM deneyimi, ileri prompt engineering, agent framework'leri — LangGraph, LangChain, CrewAI, DSPy — evaluation framework'leri, ölçekte deployment, çok adımlı tool-use zincirleri, bazen air-gapped ve bare-metal provisioning.

Hepsi meşru. Hepsi gerekli.

Şimdi operatörün ne gördüğüne dair satırları sayın. Belirsizliğin nasıl yüzeye çıkarıldığına dair. İşi yapan kişinin emin bir cevapla bir tahmini ayırt edip edemediğine dair.

Rol, entegrasyon problemini çözen insanlar tarafından tanımlandı ve entegrasyon probleminde çok iyi olan insanlarla dolduruldu. Bu sırada herkesin kazanma koşulu olarak raporladığı sayı — adoption — bambaşka bir yerde belirleniyor.

Bunun bir komplo ya da ciddiyetsiz insanların gözden kaçırması olduğunu düşünmüyorum. Bir rol, problemi ilk fark eden disiplin tarafından zaman baskısı altında icat edildiğinde olan şey bu. Palantir bu modeli 2000'lerde, ihtiyacını kelimenin tam anlamıyla tarif edemeyen istihbarat müşterileri için icat etti. O zamanki problem gerçekten çoğunlukla veri ve erişimdi. Şimdiki problemin büyük bir insana bakan bileşeni var, ve iş tanımı henüz yetişemedi.

## Bu hafta gerçekten ne yapardım

Bir AI özelliğini başkasının workflow'una gönderiyorsanız, ucuzdan pahalıya üç somut hamle:

**1. Belirsizliğe görsel bir kimlik verin.** Modelinizin zaten ürettiği bir sinyal seçin — bir confidence skoru, bir reddetme, iki örneklenmiş çalıştırmadan düşük uyum sonucu — ve onu farklı render edin. Bir öğleden sonralık iş. Sisteminizi "güven ya da güvenme"den "buraya güven, şurayı kontrol et"e çeviriyor, ki bu ayrım insanların tuttuğu bir araçla sessizce açmayı bıraktığı bir araç arasındaki tüm fark.

**2. Yenilemeyi imzalayan kişi için maliyeti ekrana koyun.** Açmayı hatırlaması gereken bir dashboard'da değil. Zaten baktığı şeyin içinde. Güncellenen bir sayı, asla sürprize dönüşmeyen bir sayıdır — ve yenilemeleri öldüren şey sürprizlerdir.

**3. Bir şeyi incelenebilir yapın.** Sisteminizin verdiği en sonuç doğurucu tek kararı seçin ve operatöre oraya nasıl vardığını görme imkânı verin. Tam observability değil — tek bir yol, tek bir açıklama. Bir şey ilk kez ters gittiğinde, o yol bir bug raporuyla kaybedilmiş bir hesap arasındaki fark oluyor.

Hiçbiri modele dokunmayı gerektirmiyor. Hepsi FDE modelinin kazanma koşulu dediği sayıyı hareket ettiriyor.

## Bundan sonrası

Argüman tutuyorsa — son kilometrenin büyük ölçüde bir arayüz problemi olduğu — ciddiye alınmaya değer bir devam sorusu var: o kilometrede çalışan bir mühendis aslında ne taşıyor?

Çünkü kısıtlar acımasız ve spesifik. Başkasının ortamındasınız. Altı haftalık bir güvenlik incelemesi olmadan hiçbir şey kuramıyorsunuz. Veri onların sınırından çıkamıyor. Getirdiğiniz her bağımlılık, güvenlik ekiplerinin sorabileceği bir soru. Ve bir paydaş omzunuzun üstünden bakarken hâlâ "bunu neden yaptı"yı cevaplamanız gerekiyor.

Bir yıldır tam olarak bu kısıtlar altında araç yazıyorum, ve yakın zamana kadar bunu estetik sebeplerle yaptığımı sanıyordum.

Sonraki yazı bu.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin birinci yazısı.
İkinci: [Kazara bir forward-deployed engineer saha çantası kurmuşum](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) ·
Üçüncü: [Teslim ettiğin şey prompt değil. Eval.](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) ·
Dördüncü: [Çalıştığında değil, onlar değiştirebildiğinde bitti.](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti) ·
Beşinci: [İkinci müşteri ne yaptığını söyler](https://ferhatatagun.com/blog/ikinci-musteri-ne-yaptigini-soyler)*
