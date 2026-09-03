# İkinci müşteri ne yaptığını söyler

Forward-deployed iş hakkında tekrarlanan, genelde Palantir'in modeline atfedilen bir cümle var, ve yanlış tarafında kalana kadar slogan gibi duruyor: **tek müşteri, çok yetenek** — SaaS şekli olan çok müşteri, tek yeteneğin karşıtı olarak.

SaaS şekli iyi anlaşılmış. Çok insanın ihtiyaç duyduğu tek bir şey bul, bir kez inşa et, tekrar tekrar sat, ve her ek müşteri sana neredeyse hiçbir şeye mal olmasın. Ürün yönetimi disiplininin tamamı o tek şeyi tespit etmek üzerine kurulu.

Forward-deployed iş ters yönde çalışıyor. Tek bir organizasyona yerleşiyorsun ve o organizasyonun gerçekten ihtiyaç duyduğu her şeyi inşa ediyorsun — ki bu on bir şey çıkıyor, çoğunu bina dışından kimse ürün olarak tanımaz. Ve sonra biri, yazılım şirketi mi yoksa şirket kılığında bir danışmanlık mı olduğuna karar veren soruyu soruyor: **bu on birden hangisi bir yetenek, hangisi bir daha asla satamayacağın ısmarlama iş?**

Bunu iki yönden birinde yanlış yapmak öldürücü, ve iki hata birbirine hiç benzemiyor.

**TL;DR**

- FDE işi SaaS şeklini tersine çeviriyor: çok müşteriye genişlik yerine tek müşteriyle derinlik. Bu, ürün keşfinden daha hızlı yetenek üretiyor ve hangilerinin genelleşeceğini anlamanın hiçbir yolunu vermiyor.
- Çok erken genelle, örneklem büyüklüğü bir olan bir duruma uydurulmuş konfigüre edilebilir bir soyutlama shiplersin. Değişen eksende ayarları vardır, değişmeyen ekseni hardcode eder.
- Hiç genelleme, her deployment ısmarlama olur. Marj gider, ikinci engagement birincisi kadar pahalıya patlar, ve gelirini "platform" altında dosyalayan bir danışmanlık olursun.
- İki müşterinin aynı özelliği istemesi sinyal değil. İki müşterinin ona **aynı alttaki sebeple** varması sinyal. Aynı istek, farklı sebepler; inşa ettiğin an ayrışacak bir tesadüf.
- En güvenilir kanıt istek değil. Geçici çözüm: kimse sormadan önce iki ekibin de elle kurmuş olduğu şey.

## İki hata

**Çok erken genellemek**, mühendislerin yaptığı; çünkü soyutlama zanaatkârlık gibi hissettiriyor. Bir müşteri için bir problemi çözdün, şeklini görebiliyorsun, ve şekil yeniden kullanılabilir görünüyor. Böylece spesifikleri konfigürasyona çıkarıp genel versiyonu shipliyorsun.

Tek bir deployment'ın içinden göremediğin şey, hangi eksenin gerçekten değiştiği. Tek veri kaynağın vardı, o yüzden veri kaynağını takılabilir yaptın. Tek onay akışın vardı, o yüzden onay akışını hardcode bıraktın. İkinci müşteri aynı veri kaynağı ve tamamen farklı bir onay akışıyla geliyor, ve şimdi elinde hiçbir şeyin kımıldamadığı yönde esnek, her şeyin kımıldadığı yönde katı bir soyutlama var. İki müşteri de ısmarlama bir yapımdan daha kötü bir sistem alıyor, ve soyutlama artık taşıyıcı olduğu için kaldırmak bir proje.

**Hiç genellememek** daha sessiz ve canını yakması daha uzun sürüyor. Her engagement sıfırdan yapım. Her biri iyi gidiyor. Mühendisler çok iyileşiyor ve teslimat çok güvenilir oluyor, ve onuncu deployment'ın maliyeti kabaca birincinin maliyeti kadar. Bu geçerli bir iş — sadece danışmanlık, ve genellikle ürünmüş gibi değerleniyor ve kadrolanıyor; dağıldığı yer de burası. Açık önce marj olarak, sonra işe alım olarak, sonra da şirketin ne sattığını kimseye açıklayamamak olarak görünüyor.

İki hata da aynı eksik şeyden geliyor: bir yeteneğin ne zaman gerçek olduğuna dair bir test.

## İstek sinyal değil

Sezgisel test tekrar. İki müşteri aynı özelliği istiyor, o zaman düzgün inşa et.

Bunun tuttuğunu sanmıyorum, ve sebebi bu işin daha ilginç yarısı.

İki organizasyon aynı şeyi tamamen ilgisiz sebeplerle isteyebilir. İkisi de CSV export istiyor: biri analistleri Excel'de yaşadığı için, diğeri compliance ekibinin denetim izi için değiştirilemez bir çıktıya ihtiyacı olduğu için. Aynı istek, ticket'ta aynı üç kelime. Genel versiyonu inşa et, birincinin canlı veri ve sütun sıralaması istediğini, ikincisinin ise checksum'lı ve saklama politikalı dondurulmuş bir dosyaya ihtiyacı olduğunu keşfedeceksin. İkisini birden karşılayan özellik, adı ortak olan iki özellik.

Genelleşmeyi asıl öngören şey isteğin yakınsaması değil. *Kısıtın* yakınsaması.

Bu, [iki yazı önce kendi araçlarım hakkında](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) yaptığım argümanın öbür ucundan hali. Beş şeyi kişisel tercih gibi hissettiren sebeplerle yalnızca-tarayıcı ve BYOK yaptım, ve sonradan fark ettim ki bunlar tam olarak başkasının regüle ortamında çalışmanın kısıtları — kurulacak bir şey yok, sınırı geçen veri yok, güvenlik ekibinin threat-model'leyeceği bir şey yok. Bunu hiçbir yerden kopyalamamıştım. Aynı *şekle* sahip iki problem, ilgili insanlar hiç konuşmadan aynı mühendislik kararlarını üretiyor.

Bu bağımsızlık bütün sinyal. İki müşteri aynı tasarıma, durumları yapısal bir kısıtı paylaştığı için varıyorsa — verinin geçemediği bir sınır, gerekçenin saklanmasını isteyen bir düzenleyici, sahibi izne çıkınca da ayakta kalması gereken bir workflow — ikisi için inşa ettiğin şey gerçekten tek bir şey. Aynı isteğe farklı kısıtlardan varıyorlarsa, bir isim çakışmasına bakıyorsun.

Yani tekrar eden bir istek hakkında sorulacak soru *bunu kaç müşteri istiyor* değil. **Onları isteten şey ne, ve aynı şey mi.**

## İsteğe değil, geçici çözüme bak

Bulduğum en faydalı kanıt müşterilerin istediklerinde değil. Zaten elleriyle kurmuş olduklarında.

Gerçek bir workflow yürüten her organizasyonda birikmiş bir manuel telafi katmanı var: birinin güncellediği bir spreadsheet, kuyruk işlevi gören bir Slack kanalı, her sabah dokuzda bir şeyi kontrol eden bir kişi. Bunlar var çünkü sistemde bir şey yapılması gereken bir işi yapmıyor, ve biri boşluğu kendi zamanıyla dolduracak kadar önemsedi.

Aynı geçici çözümü bağımsız olarak kurmuş iki müşteri, sana aynı özelliği isteyen iki müşteriden çok daha güçlü bir şey söylüyor. Bir istek özlem olabilir, bir konferans konuşmasından sana geri okunuyor olabilir, ya da bir paydaşın tercihi olabilir. Geçici çözüm ise *bedeli ödenmiş*. Biri günde bir saatini harcıyor. Kimse "olsa iyi olur" için bunu sürdürmez.

Ve geçici çözümler, alttaki kısıt hakkında isteklerin olmadığı şekilde okunabilir. Sabah kontrolü var çünkü süreç asenkron ve kimse gürültüyle patlayacağına güvenmiyor. Spreadsheet var çünkü sistemin iş modeli gerçeklikten bir alan eksik. Kısıt bu, ve müşteriler arasında karşılaştırabileceğin bir formda ifade edilmiş — kısıtları karşılaştırmak da özellik istek listesinin senin yerine yapamayacağı şey.

## FDE sensördür, ve sorun raporlama hattı

Bu doğruysa, deployment'a yerleşmiş kişi şirketin sahip olduğu en yüksek bant genişlikli ürün keşif aleti. Anket okumuyor. Geçici çözümün, sabah dokuzda, onu kuran kişi tarafından kullanılışını izliyor.

Ki bu, hafife alındığını düşündüğüm yapısal bir soruyu doğuruyor: **o kişinin öğrendiğini kim okuyor?**

Çoğu düzende forward-deployed engineer teslimat üzerinden raporluyor. Teslimat ise bu deployment'ı zamanında shiplemekle ölçülüyor. Üçüncü müşterinin, birinci müşteriyle aynı spreadsheet'i bağımsız olarak yeniden kurduğu gözlemi bir teslimat çıktısı değil. Genelde onun için bir alan, indiği bir mecra, ve meşgul bir mühendisin yazması için bir teşvik yok.

Böylece tek bir kişinin kafasında kalıyor — ki [bir önceki yazının müşteri devir teslimi hakkında savunduğu gibi](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti), bu var olmamakla aynı şey. Hata modu birebir aynı, sadece içeriye dönük: bağlam bir bireyde birikiyor, organizasyona akıtılmıyor, ve o kişi gidince gidiyor. Bir şirket ürün yol haritasını, sahip olduğunu hiç fark etmeden bu şekilde kaybedebilir.

Çözüm karmaşık değil, sadece kimsenin işi değil: yerleşik mühendislerin *istek* değil *kısıt* raporlaması için sürekli, düşük törenli bir yol. "Müşteri export istiyor" değil, "bu yıl verisi sınırdan çıkamayan üçüncü müşteri, üçü de manuel bir extract kurmuş". Arka arkaya üç tane böylesi, kendi kendini vermiş bir ürün kararıdır.

## Serinin aslında konusu neydi

Beş yazı, ve altındaki desen başlarken beklediğimden daha tutarlı.

Pilotlar modelde değil arayüzde patlıyor. Hayatta kalan araçlar, dile getirilmiş kısıtı olanlar. Teslimat eval'dir, çünkü eval başkasının o şeyi değiştirmesini sağlayan şey. Devir teslim, bir ekip bir değişiklik yapıp güvenli olduğunu bilebildiğinde işliyor. Ve yetenek, iki müşteri ona aynı kelimelerle değil aynı kısıtla vardığında genelleşiyor.

Bunların her biri aynı iddianın farklı bir yerdeki hali: **zor kısım devir, inşa değil.** Modelden insana, prototipten workflow'a, senden kalan ekibe, bir müşteriden diğerine. Model hiçbir zaman darboğaz değildi, ve her çeyrek daha az darboğaz oluyor.

Ki bence rolün var olma sebebi bu, ve eskisinin sekiz katı sıklıkta işe alınmasının da — teknoloji zorlaştığı için değil, devir hiç kolaylaşmadığı için; ve pahalı kısmın hep o olduğu ortaya çıktığı için.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin beşinci ve son yazısı.
Birinci: [Kimsenin modeli patlamadı. Arayüz patladı.](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi) ·
İkinci: [Kazara bir forward-deployed engineer saha çantası kurmuşum](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) ·
Üçüncü: [Teslim ettiğin şey prompt değil. Eval.](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) ·
Dördüncü: [Çalıştığında değil, onlar değiştirebildiğinde bitti.](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti)*
