# Çalıştığında değil, onlar değiştirebildiğinde bitti

En çok düşündüğüm deployment başarısız olmadı. UAT'yi geçti, canlıya çıktı, müşteri memnundu, ve sonunda gerçekten güzel bir e-posta vardı.

Altı ay sonra hâlâ çalışıyordu ve kimse ona dokunmamıştı. Bir kez bile. Prompt, bıraktığımla byte-byte aynıydı. Altında bir model sürümü kullanımdan kaldırılmıştı ve ekip yenisini test etmek yerine eskisini pinlemişti. Biri çıktı formatında küçük bir değişiklik istemiş ve riske değmeyeceği söylenmişti.

Hiçbir şey bozulmadı. Anlamam biraz zaman alan kısım bu. **Sistem çalışmayı bıraktığında ölmedi. Değiştirilmeyi bıraktığında öldü** — ve o altı ayın yaklaşık beşi boyunca, response dönmeye devam ederken ölüydü.

Kimsenin post-mortem yazmadığı hata modu bu, çünkü ortada olay yok. Sadece köşede duran, herkesin etrafından dolandığı bir şey var — ta ki bir reorg ya da sözleşme yenilemesi onu sessizce kaldırana kadar.

**TL;DR**

- Bir deployment'ın gerçek bitiş tarihi, bir isteğe son cevap verdiği an değil, birinin ona güvenle son kez dokunduğu andır.
- Dokümantasyon bir *durumu* tarif eder. Sahiplenme, bir *değişiklik* yapıp güvenli olduğunu bilmeyi gerektirir. Bunlar farklı teslimatlar ve ilk düzenlemeyle temasta sadece biri hayatta kalıyor.
- İşin senden sonra yaşayıp yaşamayacağını üç soru belirliyor: değiştirebiliyorlar mı, değişikliğin işe yaradığını anlayabiliyorlar mı, ve neden öyle olduğunu biliyorlar mı. Çoğu devir teslim sadece birincisini cevaplıyor.
- *Neden* en hızlı çürüyen ve en az yazılan. Kod *ne*yi kaydeder, git *ne zaman*ı kaydeder, ve tuhaf bir maddenin var olma sebebi tek bir kişinin hafızasında yaşar — ta ki gürültü gibi görünüp silinene kadar.
- Forward-deployed engineer olarak sen, tasarım gereği bus factor'sün. İş, bir takvime bağlı olarak kendini gereksiz kılmak, ve vazgeçilmez hissetmek bunun ters gittiğinin sinyali.

## Dokümantasyon tuzağı

Bir engagement'ın sonundaki içgüdü her şeyi yazmak. Mimari diyagram, çağrı sırası, deployment runbook, bileşen başına bir wiki sayfası. Özen gibi hissettiriyor ve son toplantıda işaret edebileceğin bir çıktı üretiyor.

Aynı zamanda biri ilk değişikliği yaptığı anda bayatlıyor — ve kimse değişiklik yapmıyorsa, yazmış olman zaten fark etmedi.

Rahatsız edici versiyonu: kapsamlı bir doküman işleri *kötüleştirebilir*, çünkü asıl işe yarayacak şeyin yerine geçiyor. Ekip okuyor, sistemin şeklini anlıyor, ve yine dokunmuyor — çünkü onları durduran şey hiçbir zaman mimariyi anlamamak değildi. Onları durduran şey, bir değişiklik yapıp bir şeyi bozup bozmadıklarını öğrenmenin bir yolu olmamasıydı.

Dokümantasyon "bu nedir"i cevaplıyor. Sahiplenmenin ihtiyacı "bunu değiştirirsem ne olur"a bir cevap. Birincisinin hiçbir miktarı ikincisini üretmiyor.

## Üç soru

Bir deployment'ın devir teslimden sağ çıkıp çıkmayacağı üç şeye bakıyor, ve sırayla ele alınma ihtimalleri düşüyor.

**1. Değiştirebiliyorlar mı?**

Mekanik olan. Kimlik bilgileri, repo erişimi, deploy yolu, geri alma imkânı var mı. Bu, her devir teslim kontrol listesinin kapsadığı soru, ve gerçekten gerekli.

Aynı zamanda en kolayı, ve onu geçmek biraz yanıltıcı biçimde ilerleme gibi hissettiriyor — çünkü tam production erişimi olan ve özgüveni olmayan bir ekip hiçbir şeyi değiştirmiyor, ki bu gözlemsel olarak hiç erişimi olmayan bir ekiple aynı şey.

**2. Değişikliğin işe yaradığını anlayabiliyorlar mı?**

Bu, [bir önceki yazının tüm argümanı](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval), ve menteşe burası.

Dondurulmuş snapshot — gerçek input'lar ve mevcut sistemin onlarda verdiği kararlar — öncelikle bir kalite aracı değil. Asıl işlevi *izin*. "Bu prompt düzenlemesi sanırım sorunsuz"u "on dört vakanın on ikisi değişmedi, kayan iki tanesi de şunlar"a çeviren şey. Birinci cümle review'da geri çevriliyor. İkincisi merge ediliyor.

Bu olmadan bir ekip prompt'u düzenlemeyecek. Düzenlememekte de haklılar. Patlama yarıçapını kontrol etmenin yolu olmadan prompt düzenlemek tedbir değil, başkasının workflow'uyla kumar oynamaktır, ve aklı başında insanlar bunu reddeder.

**3. Neden öyle olduğunu biliyorlar mı?**

Neredeyse hiç ele alınmayan, ve sessizce her şeyi belirleyen.

Gerçeklikle karşılaşmış her sistemin içinde yanlış görünen maddeler vardır. Prompt'ta gereksiz görünen bir formatta ısrar eden bir cümle. Tuhaf biçimde spesifik bir backoff'lu bir retry. Gösterilmeden önce temizlenen bir alan. Her biri var çünkü bir şey oldu — belirli bir gün, belirli bir varsayımı kıran belirli bir müşteri kaydıyla, belirli bir hata.

Altı ay sonra devralan kişi açıklaması olmayan çirkin bir madde görüyor ve makul olanı yapıyor: temizliyor. Ve orijinal hata geri geliyor, ancak artık odada ilkini hatırlayan kimse olmadığı için yeni bir bug gibi görünüyor.

Kod *ne*yi kaydeder. Git *ne zaman*ı, ve şanslıysan bir commit mesajı *neden*in sıkıştırılmış bir versiyonunu kaydeder. Hiçbir şey gerekçeyi, birinin o kararla karşılaşacağı yerde kaydetmiyor.

## Nedeni şeyin yanına değil, içine iliştir

Bende gerçekten işe yaramış pratik gösterişsiz: **gerekçeyi karar hakkındaki bir dokümana değil, kararın olduğu yere koy.**

Prompt'lar için bu, prompt dosyasının kendi içinde, her bariz olmayan talimatı üreten hatayı adlandıran bir yorum bloğu demek. "Kısa ol" değil — *"kısa ol: ikinci haftadaki 2.400 kelimelik cevaplar aşağı akışta 500 karakter sınırı olan bir alana yapıştırılıyor, cümle ortasında kesiliyor ve model hatası gibi görünüyordu."*

Davranış için bu, fonksiyonun değil olayın adını taşıyan bir test demek. `keeps_the_account_number_when_the_name_is_missing` adlı bir vaka, işle ilgili bir cümle. `test_parse_edge_case_3` adlı bir vaka hiçbir şeyle ilgili bir cümle, ve kırmızıya döndüğünde silinen o oluyor.

Bu, dondurulmuş eval setiyle aynı hamlenin davranış yerine gerekçeye uygulanmış hali. İkisi de işe yarıyor çünkü çalışan bir şeye iliştirilmişler. Bir wiki sayfası sessizce bayatlayabilir; adlandırılmış bir test gürültüyle kırmızıya döner, ve adı ona bakan kişiye neyi kırmak üzere olduğunu söyler.

Test şu: orada olmayan biri maddeyi okuyup, kendi başına, gerekçenin hâlâ geçerli olup olmadığına karar verebiliyor mu. Bütün çıta bu. "Sistemi anlıyorlar" değil — *benimle güvenle aynı fikirde olmayabiliyorlar.*

## Bus factor sensin, bilerek

Bu rolle ilgili açıkça söylenmeye değer garip bir şey var.

Forward-deployed engineer, yapısal olarak, kasten devreye sokulmuş tek nokta arızasıdır. Oradasın çünkü müşterinin ekibi o şeyi henüz yapamıyor. Orada geçirdiğin her hafta, başka hiçbir yerde olmayan bağlam biriktiriyorsun — hangi workflow dokümantasyonundan sapıyor, hangi paydaşın itirazı gerçek hangisi pozisyon alma, ikinci veri kaynağına pazartesileri neden güvenilmez.

Seni etkili kılan şey o bağlam. Aynı zamanda, aktif olarak dışarı akıtmazsan, sen gittiğinde deployment'ın ölme sebebi.

Ve teşvikler ters yönde işliyor. Sistemi anlayan kişi olmak iyi iş çıkarmak gibi hissettiriyor. Başka kimse debug edemediği için aranmak değer gibi hissettiriyor. Vazgeçilmez diye okunuyor, ve vazgeçilmez, postmortem olana kadar başarı gibi hissettiriyor.

Asıl önemli metrik optimize etmesi rahatsız edici olan: **ne kadar hızlı gereksizleştiğin.** Ne kadar shiplediğin değil. Kalanların seni odada istemeyi ne kadar çabuk bıraktığı.

Ki bu ölçülmesi garip bir şey, ve çoğu engagement'ın bunu hiç ölçtüğünü sanmıyorum — teslimatı ölçüyorlar, teslimat da sen hâlâ oradayken olan kısım.

## Gerçekte ne bırakırdım

Somut olarak, kulağa hoş gelip hayatta kalmayan kısımlardan arındırılmış hali:

- **Dondurulmuş set**, repo'nun içinde, tek komutla çalıştırma yoluyla. Notebook değil, birinin hatırlaması gereken bir süreç değil. `npm run eval` ya da eşdeğeri, yazarı olmayan birinin okuyabileceği çıktı.
- **Bir kararlar dosyası**, ama sıkı kapsamlı: sadece bariz seçeneğin reddedildiği kararlar, her biri onu bariz-ama-yanlış yapan şeyi adlandırarak. Varsayılanları belgeleyen altmış madde değil, önemli olan on madde.
- **Gerekçeler satır içinde** — prompt'ta, test adlarında, retry sabitinin yanında. Birinin onu değiştirmeyi düşünürken duracağı her yerde.
- **Bir değişikliği onlar yapsın, ben değil.** Başka birinin prompt'u düzenlediği, eval'i çalıştırdığı, diff'i okuduğu ve shiplediği anda orada oturmak. Bir ekibin bunu bir kez yaptığını izlemek, yerine başka bir şey konabildiğini hiç görmediğim tek devir teslim adımı. Diğer her şey iyi bir dokümanla taklit edilebilir; bu edilemez.

Sonuncusu aslında bütün mesele. Ondan öncekilerin hepsi, senden başka birinin sistemi değiştirdiği ve kötü bir şey olmadığı ana hazırlık. O an sen gitmeden önce gerçekleşmiyorsa, gerçekleşebileceğine dair hiçbir kanıtın yok.

Ve "gerçekleşebileceğine dair kanıt yok", pratikte "gerçekleşmeyecek" ile aynı şey — ki bu da altı aylık saati geri getiriyor, ve hâlâ cevap verirken çoktan ölmüş olan sistemi.

---

Bütün bunların rahatsız edici iması şu: iş aslında modelle, prompt'la, hatta arayüzle ilgili değil — bir ekibin bir yeteneği başka bir ekibe devredip devredemeyeceğiyle ilgili. Ki bu, bu alandaki her şeyden çok daha eski bir problem, ve serinin son yazısının konusu.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin dördüncü yazısı.
Birinci: [Kimsenin modeli patlamadı. Arayüz patladı.](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi) ·
İkinci: [Kazara bir forward-deployed engineer saha çantası kurmuşum](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) ·
Üçüncü: [Teslim ettiğin şey prompt değil. Eval.](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) ·
Beşinci: [İkinci müşteri ne yaptığını söyler](https://ferhatatagun.com/blog/ikinci-musteri-ne-yaptigini-soyler)*
