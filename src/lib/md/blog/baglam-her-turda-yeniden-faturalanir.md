# Bağlam biriktirilmez, her turda yeniden faturalanır

Claude Code bu hafta oturumumu dördüncü kez compact etti, ve ilk tepkim normal olanıydı: sinirlendim. Her şeyi sildi, yarısını yeniden anlatmam gerekecek.

Sonra Claude Code'u kendi transkript dosyalarına yönlendirdim, sinirlenmek yerine hesabı yaptım. Transkriptler diskte duran JSONL dosyaları — her istek, her token sayısı, zaman damgalı. Üç oturum, 5.288 istek, birkaç dakikalık parse işlemi.

Çıkan yeniden çerçeveleme şu: **compaction vergi değil. Verginin ödenme anı.** Vergi, ondan önceki her tur.

**TL;DR**

- Her tur, o ana kadarki tüm konuşmayı yeniden gönderir. Hiçbir şey bedavaya "hatırlanmaz" — 900K token'lık bir bağlam, 901. turda indirimli bir biçimde yeniden okunur.
- Üç gerçek oturumda: cache'ten okunan 1,99 milyar token, cache'e yazılan 62 milyon token. **32:1** oran — bağlama koyduğun her token, oradan çıkana kadar ortalama otuz iki kez daha faturalanıyor.
- Dört otomatik compaction, 968K, 996K, 999K ve 771K token'da tetiklendi. Her biri sadece özetleme yaparken **108–140 saniye** sürdü. Hemen sonrasında cache-read ~990K'dan 0'a düştü.
- Liste fiyatıyla, cache indirimi compaction hiç devreye girmeden bile her turda tam fiyat ödemeye kıyasla tahmini **%86** tasarruf sağladı — mekanizmanın amaçlandığı gibi çalışması bu, ve 1M token'lık bir bağlamın 50. turda kimseyi batırmamasının nedeni de bu.

## 500. turda gerçekte ne oluyor

Bir konuşma boyunca kalıcı bir çalışma belleği yok. Her API çağrısı durumsuz (stateless) — model isteğe konan metni görür, başka hiçbir şeyi görmez. Yani bir kodlama oturumunun "hafızası" tamamen yeniden-göndermeden ibaret bir yanılsama: her önceki dosya okuması, her araç sonucu, her mesaj, birleştirilip her tekil turda yeniden gönderilir.

Prompt caching, bunu sürdürülebilir kılan şey — [bu indirimin mekaniğini](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi) Messages API'yi doğrudan faturalandıran ekipler için daha önce yazmıştım. Bu yazı o fatura hakkında değil. İndirimin silmediği şey hakkında: bir kodlama *ajanının* bağlamı, beş dakika sabit kalan bir sistem prompt'u değil — her araç çağrısında büyüyor, ve 500. turda ne kadarının yeniden gönderileceğine sizin uygulamanızın istek deseni değil, ajanın kendisi karar veriyor.

"Büyük indirim var" ile "bedava" aynı şey değil. Bağlamdaki token sayısı, o dosyayı yapıştırdığınız anda ödediğiniz tek seferlik bir maliyet değil — oturumdaki her kalan tur için tekrar eden bir kalem.

## Kendi oturumlarım neye benziyordu

Bunu üç Claude Code proje transkriptinden çıkardım — `~/.claude/projects/` altında duran `.jsonl` dosyaları, olay başına bir satır, her asistan mesajında bir `usage` nesnesi.

| Oturum | İstek | Cache okuma | Cache yazma | Çıktı |
|---|---|---|---|---|
| A | 498 | 132M | 2,2M | 0,34M |
| B | 2.138 | 670M | 24M | 1,5M |
| C | 2.652 | 1.191M | 36M | 2,3M |
| **Toplam** | **5.288** | **1.993M** | **62M** | **4,2M** |

Okuma:yazma oranı — bir token'ın *yeniden görülerek* kaç kez faturalandığı, *yeni eklenerek* bir kez faturalandığına kıyasla — toplamda **32:1**'de duruyor, ve herhangi bir tek uzun oturum içinde bağlam büyüdükçe tırmanıyor.

Oturum C daha çarpıcı örnek. Dört otomatik compaction'a çarptı:

| Tetikleyici | Compaction'daki bağlam boyutu | Süre |
|---|---|---|
| otomatik | 968.704 token | — |
| otomatik | 996.078 token | 108,7s |
| otomatik | 999.313 token | 139,5s |
| manuel | 771.369 token | 140,5s |

Her biri ~1M tavanına tam yakın kümeleniyor — otomatik compactor tam olarak yapması gerekeni yapıyor, pencere taşmadan önce tetikleniyor. Ve her biri ham usage verisinde aynı imzayı gösteriyor: bir önceki istekte cache-read ~990K, ondan sonraki ilk istekte **0**. Sonraki her turu kademeli olarak daha maliyetli kılan, biriken bağlamın tamamı atılıyor ve bir özetle değiştiriliyor. 901. tur yeniden ucuz.

Yeniden çerçeveleme burada: compaction, bağlamınızı kaybetmiyor. İki dakikalık bir duraklama ve özetin koruyamadığı her şey bedeliyle, tekrar eden faturanın sıfırlandığı an.

## Dürüst maliyet hesabı

Yayınlanmış liste fiyatlarında, bu üç oturumdaki gerçek token karışımını cache'li ve cache'siz fiyat formüllerinden geçirmek şunu veriyor:

- Caching ile: kabaca **4.500 dolar**
- Caching olmadan (her token, her turda, tam giriş fiyatıyla): kabaca **31.000 dolar**

Bu, compaction hiç devreye girmeden, sadece caching'den gelen %86'lık bir azalma.

İki uyarı var, çünkü bunu yanlış anlatmak tam da [daha önce yazdığım](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) türden bir doğrulanmamış sayıyı gerçek sanma hatası olurdu:

1. **Bu bir abonelik, API faturalandırması değil.** 4.500 dolarlık bir çek yazmadım — sabit bir plan ödüyorum. Sayı sadece bir *oran* olarak (cache'li vs cache'siz) anlamlı, gerçek harcama olarak değil. Onu gerçek harcama gibi sunmak, tam da makul görünen bir sayıyı doğrulanmış sanma hatasının kendisi olurdu.
2. **Liste fiyatı, efektif fiyat değil.** Gerçek API cache fiyatlandırması sağlayıcıya ve model katmanına göre değişir; çarpan mekanizmayı gösteriyor, bir teklif değil.

## En güçlü karşı argüman

*Bu caching'in çalışması gerektiği şekilde çalışması değil mi?* Evet. Nokta da tam burası, ve bağlam şişkinliğini bir hata gibi ima etmek yerine açıkça söylemekte fayda var: caching, uzun oturumları ekonomik olarak mümkün kılan şey, ve işini iyi yapıyor — %86 indirim yuvarlama hatası değil.

Ama "indirim var" ile "maliyet yok" — kırk araç çağrısı derinliğinde bir hata ayıklama oturumundaysanız sessizce aynı şey gibi ele alınıyor, ve değiller. İndirimli tekrar eden bir ücret, hâlâ tekrar eden bir ücret. %90 indirimli olması, o token pencerede kaldığı sürece bir sonraki turda da, ondan sonraki turda da yeniden faturalanacağını değiştirmiyor.

## Bununla gerçekte ne yapılır

Egzotik bir şey değil — kaldıraçlar Claude Code'un kendi tasarımında zaten oturuyordu, bu sadece göründüklerinden daha çok önemli olduklarını açıklıyor:

- **İlgisiz iş için yeni oturum aç**, 600K token'lık bir bağlamı hiçbirine ihtiyacı olmayan bir göreve sürüklemek yerine. Bağlam, konuştuğunuz her şeyin bedava bir cache'i değil — konuştuğunuz her şeyin faturası.
- **Geniş keşfi bir subagent'a devret**, on dosyayı ana thread'e okumak yerine. Subagent'ın bağlamı kendisiyle birlikte ölür; sizinki, direkt çektiğiniz her şey için ödemeye devam eder.
- **Konu değiştirmeden önce manuel compact**, bir taviz değil, meşru bir hamle — bakiyeyi otomatik olanın siz düşüncenin ortasındayken yapmasını beklemek yerine bilerek kapatmak.

Bunun hiçbiri "AI bağlam pencereleri pahalı" diye çerçevelenmiş bir haber değil. Mühendislerin istek başına ölçülen her şey için zaten sahip olduğu barındırma faturası içgüdüsüne daha yakın — sadece bir kodlama ajanının kendi konuşmasına şimdiye kadar yöneltilmemişti, çoğunlukla çünkü hiçbir bağlam penceresi faturayla birlikte gelmiyor. Bu geliyor. Sadece bir JSONL dosyasında, tur başına bir satır olarak duruyor, toplanmayı bekliyor.
