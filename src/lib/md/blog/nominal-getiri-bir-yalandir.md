# Nominal getiri bir yalandır

2005 Ocak'ında 100.000 TL'niz olduğunu düşünün. Riske girmek istemediniz, mevduata koydunuz. Vadesi doldukça yenilediniz, faizi de üstüne eklediniz. Yirmi bir yıl boyunca tek bir kötü ay görmediniz, çünkü mevduatta kötü ay diye bir şey yok; ekrandaki rakam her ay bir öncekinden büyük.

2026 Mayıs'ında hesabınızda **3.816.658 TL** var. Paranız 38 katına çıkmış.

Aynı dönemde TÜFE 35,8 katına çıktı.

Yani o 3,8 milyon TL, bugünün parasıyla **106.642 TL** ediyor. Yirmi bir yılda, kesintisiz faiz işleterek, alım gücünüzü **%6,6** artırmışsınız. Yılda %0,3.

Bu yazı o %0,3'ün nasıl hesaplandığı, TCMB'nin veri servisinden bu sayıları çekerken çarptığım iki duvar, bir gün boyunca fark etmediğim kendi hatam ve altı yatırım aracını aynı anda tuttuğunuzda aslında kaç ayrı bahis oynadığınızı söyleyen bir matris hesabı hakkında.

## TL;DR

- 2005-01 ile 2026-05 arası (257 ay), TÜFE'den arındırılmış reel getiriler: **altın +%911, BİST 100 +%140, mevduat +%6,6, dolar −%6,2, euro −%16,8, gecelik repo −%44,7.**
- Mevduatın reel en derin düşüşü **−%53**. Hesabınızdaki rakam hiç azalmadan alım gücünüzün yarısını kaybedebiliyorsunuz. 2021 Eylül – 2024 Haziran arasında tam olarak bu oldu: **−%49,1.**
- Dolar, euro ve altını birlikte tutmak üç ayrı yatırım gibi görünüyor ama korelasyon matrisinin özdeğerlerine bakınca **1,91 bahis** çıkıyor. Mevduat + repo ikilisi ise **1,04**; yani tek bir bahis.
- EVDS 2025'te evds3'e taşındı. İnternetteki bütün örnek kodlar artık çalışmıyor, ama kimse bunu yazmamış. Çözümü aşağıda.
- Kendi hatam: bir boolean parametre yüzünden bütün serilerim 1000'i aştıkları ayda sessizce bitti. Veri kaynağını suçlamadan önce kendi parser'ınıza bakın.

Kodun tamamı ve hesaplar çalışır durumda; yazının sonunda ne yapmadığımı da açıkça yazdım.

## Neden nominal getiri konuşmak anlamsız

Türkiye'de yatırım konuşmalarının neredeyse tamamı nominal. "Mevduat %50 veriyor." "Dolar bu yıl %30 yaptı." Bu cümlelerin tek başına hiçbir bilgi değeri yok, çünkü ölçtükleri birim — Türk Lirası — ölçüm süresince küçülüyor.

Bir metreyle masa ölçüyorsunuz ama metre her ay kısalıyor. Masa uzuyor gibi görünüyor.

Doğrusu şu: her serinin her ayını aynı ayın TÜFE'sine bölmek. Geriye kalan sayı, o yatırımın alım gücünüzü ne yaptığıdır. Ben de tam olarak bunu yaptım — TCMB'nin EVDS'sinden altı aracın ve TÜFE'nin aylık serilerini çekip hepsini deflate ettim.

Sonuç tablosu şöyle (2005-01 → 2026-05, 257 ay):

| Araç | Nominal | Reel toplam | Reel yıllık | Yıllık oynaklık | Reel en derin düşüş |
|---|---:|---:|---:|---:|---:|
| Külçe altın (TL/gr) | 362,1x | **+%911,7** | +%11,5 | %17,0 | −%36,9 |
| BİST 100 (getiri endeksi) | 85,9x | **+%140,1** | +%4,2 | %27,6 | −%61,6 |
| TL mevduat (3 ay) | 38,2x | **+%6,6** | +%0,3 | %5,6 | −%53,0 |
| ABD doları (nakit) | 33,6x | **−%6,2** | −%0,3 | %12,5 | −%43,8 |
| Euro (nakit) | 29,8x | **−%16,8** | −%0,9 | %12,3 | −%41,9 |
| Gecelik repo | 19,8x | **−%44,7** | −%2,7 | %5,7 | −%64,5 |

Nominal sütunuyla reel sütununu yan yana koyunca ne demek istediğim daha net oluyor sanırım. Mevduat parayı 38 katına çıkarmış. Bu, tek başına bakıldığında olağanüstü bir rakam. Reel karşılığı yirmi bir yılda %6,6.

## Tablodan çıkan üç şey

**Birincisi: döviz nakit tutmak uzun vadede koruma değil.** Dolar 21 yılda alım gücünün %6'sını, euro %17'sini kaybetmiş. Bu sezgiye ters geliyor, çünkü herkesin aklında 2018 ve 2021 kurları var. Ama 2005-2013 arasında kur uzun süre yatay kalırken TÜFE çalışmaya devam etti. Dövizin koruduğu şey **kriz anı**; ortalama değil.

Burada dürüst olayım: modelde dövizi nakit olarak tuttum. Faizsiz, yastık altı. Döviz mevduatı hesaplasaydım tablo daha iyi görünürdü. Ama "dolar aldım" diyen insanların çoğunun yaptığı şey gerçekten bu — alıp bekliyorlar.

**İkincisi: mevduatın riski yok değil, sadece görünmüyor.** Mevduatın reel en derin düşüşü −%53. Dolardan (−%43,8) ve altından (−%36,9) daha kötü. Üstelik altın 2014'teki dibinden 2018'de toparlandı; mevduat 2019 Eylül'ündeki zirvesine hâlâ dönemedi.

En çarpıcı aralık şu: **2021 Eylül – 2024 Haziran.** Mevduatta bu 33 ayın hiçbirinde hesabınızdaki rakam azalmadı. Her ay faiz yattı. Reel kaybınız −%49,1.

Aynı dönemde BİST 100 +%102, altın +%29,5 yaptı.

Bu bence yazının en önemli satırı. Risksiz zannedilen aracın risk taşımadığı değil, riskinin ekstrede görünmediği anlamına geliyor. Ekstreye bakan insan kendini güvende hissediyor — ölçüm yanlış olduğu için.

**Üçüncüsü: gecelik repo alım gücünün yarısını yakmış.** Bu sonuç beni şaşırtmadı ama büyüklüğü şaşırttı. Para piyasası araçları "bekleme yeri" olarak pazarlanıyor; 21 yıl beklenirse geriye %55 kalıyor.

Not: repo için TCMB politika faizini vekil olarak kullandım, gerçek likit fon getirisi yönetim ücreti kadar daha düşük. Yani yukarıdaki −%44,7 iyimser taraf.

## Altın meselesi

Altının +%911'i tabloyu domine ediyor ve buradan "altın alın" sonucu çıkarmak çok cazip. Çıkarmayın, ben de çıkarmıyorum. İki sebebi var.

Birincisi başlangıç tarihi. 2005, altın için dünya genelinde uzun bir boğa piyasasının başlangıcı. Ölçümü 2011 Eylül'ünden başlatsaydınız 2014 Kasım'ına kadar reel olarak %37 kaybedip zirvesine ancak 2018'de dönen bir varlık görecektiniz. Yedi yıl.

İkincisi, geçmiş getiri geleceği söylemiyor. Bu cümle klişe ama burada teknik bir anlamı var: 257 aylık bir örneklemden yıllık ortalama tahmin ederken standart hata, ortalamanın kendisiyle kıyaslanabilir büyüklükte. Yani "altın yılda %11,5 getirir" cümlesi, veriden çıkarılabilecek bir cümle değil. Veriden çıkan cümle şu: "2005-2026 arasında altın yılda %11,5 getirdi."

Aradaki fark, yatırım tavsiyesiyle tarih arasındaki fark.

## Şimdi matris kısmı

Buraya kadar olan her şeyi bir Excel'de yapabilirdiniz. Asıl ilginç soru şu:

**Dolar, euro ve altını birlikte tutuyorsunuz. Kaç farklı yatırım yapmış oluyorsunuz?**

Sezgi "üç" diyor. Matematik hayır diyor.

Yöntem şöyle: altı aracın aylık reel log getirilerinden 257×6'lık bir matris kuruyorsunuz. Bunun korelasyon matrisini alıyorsunuz. Sonra o matrisin özdeğer ayrışımını (eigendecomposition) hesaplıyorsunuz. Özdeğerler, portföydeki birbirinden bağımsız risk yönlerinin büyüklüğünü verir. Özdeğerleri toplamlarına bölüp payları `p_i` elde ediyorsunuz, sonra bunların entropisinin üstelini alıyorsunuz:

```
etkin bahis = exp(−Σ p_i · ln p_i)
```

Bu sayı, "aslında kaç bağımsız bahis oynuyorsunuz" sorusunun cevabı. Her şey mükemmel bağımsızsa araç sayısına eşit çıkar. Her şey birlikte hareket ediyorsa 1'e iner.

Çıkan sonuçlar:

| Portföy | Araç sayısı | Etkin bahis |
|---|---:|---:|
| Dolar + euro | 2 | **1,33** |
| Dolar + euro + altın | 3 | **1,91** |
| Mevduat + repo | 2 | **1,04** |
| Altısı birden | 6 | **3,78** |

Dolar ve euro birlikte 1,33 bahis. İkisini de tutmak, bir tanesini tutmanın üstüne 0,33 yeni şey ekliyor — çünkü aralarındaki korelasyon 0,84. Altını eklediğinizde 1,91'e çıkıyor; altın gerçekten bir şey katıyor ama üç bağımsız yatırım değil, iki.

Mevduat + repo'nun 1,04'ü ise bence komik. İkisi de aynı faiz kararına bağlı, ikisi de aynı enflasyonla eziliyor. Farklı ürünler gibi satılıyorlar; matematiksel olarak tek bir şeyin iki ambalajı.

Aynı ayrışım ana bileşenleri (PCA) de veriyor:

- **PC1 — toplam değişimin %40,7'si.** Yükleri: dolar 0,58, euro 0,58, altın 0,51, BİST −0,24, mevduat −0,08, repo −0,07. Bu faktörün adı "TL'nin erimesi". Döviz ve altın aynı yöne, BİST ters yöne gidiyor.
- **PC2 — %33,2.** Yükleri: mevduat 0,70, repo 0,70, gerisi sıfıra yakın. Bu da "reel faiz" faktörü.

Altı araçlık bir portföyün oynaklığının dörtte üçünü iki faktör açıklıyor. Birincisi kurun, ikincisi faizin. Türkiye'de yatırım yapmak, farkında olsanız da olmasanız da, çoğunlukla bu iki şeye bahis oynamak.

BİST'in PC1'deki eksi yükü bu tablonun içindeki en kullanışlı bilgi bence. BİST'in dolar, euro ve altınla korelasyonu −0,16 ile −0,24 arasında; yani negatif. Portföy kurarken aradığınız şey tam olarak budur ve altı araç içinde bunu sağlayan tek şey BİST.

## EVDS'den veri çekmek: iki duvar

Bu kısım yatırımla değil, veriyle ilgilenenler için.

**Duvar 1: evds2 öldü, kimse yazmamış.** TCMB veri servisini 2025'te evds3'e taşıdı. İnternette bulabileceğiniz bütün örnekler `evds2.tcmb.gov.tr/service/evds/...` adresini kullanıyor. Bu adres artık 302 verip sizi bir SPA kabuğuna yönlendiriyor — yani kodunuz hata almıyor, HTML alıyor. JSON bekleyen parser'ınız patlıyor ve neden patladığını anlamıyorsunuz.

Yeni adres: `https://evds3.tcmb.gov.tr/igmevdsms-dis/`, veri için `POST /fe`.

**Duvar 2: `ozelFormuller` boş string kabul etmiyor.** `POST /fe`'ye gönderdiğim gövde ısrarla HTTP 400 döndü. Dönen cevap genel bir HTML hata sayfası; hangi alanın yanlış olduğuna dair tek kelime yok.

Birkaç saat denedikten sonra parametreleri `itertools.product` ile taramaya başladım. Üç şüpheli alanın bütün kombinasyonlarını denedim. Tek geçen kombinasyon şuydu:

```python
"ozelFormuller": [],   # boş liste. "" HTTP 400 veriyor.
```

Boş string değil, boş liste. Aradaki fark, bir günümün yarısı.

## Ve kendi hatam

Veriler gelmeye başladıktan sonra bir tuhaflık fark ettim: TÜFE serisi 2022 Haziran'ında bitiyordu. BİST 100, 2014 Mart'ında. Altın, 2022 Ekim'inde.

İlk düşüncem "EVDS'nin bazı serileri güncellenmiyor" oldu. Bu düşünceyle bir süre alternatif seri kodları aradım.

Sonra tarihlere tekrar baktım. Üç seri de birbirinden farklı tarihlerde bitiyordu ve hiçbiri anlamlı bir tarih değildi. Değerlere baktım. Her seri, **1000'i ilk aştığı ayda** bitiyordu.

Sebep, isteğin içindeki tek bir parametreydi:

```python
"groupSeperator": True,
```

Bu açıkken EVDS sayıları binlik ayraçla gönderiyor: `1.234,56`. `pd.to_numeric` bunu sayıya çeviremiyor, `NaN` üretiyor, benim `dropna()` çağrım da seriyi tam o noktadan kesiyordu. Hiçbir uyarı yok, hiçbir istisna yok. Sadece daha kısa bir seri.

`False` yaptım, önbelleği sildim, seriler 2026'ya kadar uzadı.

Bu hatayı yazıya koymamın sebebi şu: yanlış cevap değil, **daha az veri** aldım. Daha az veri hatalı görünmüyor, sadece daha az. Ve "bu API'de eski seriler yok" diye bir sonuca varıp geçseydim, yazdığım her şey yanlış olacaktı — hem de her sayı tutarlı görüneceği için.

Bir veri kaynağını suçlamadan önce kendi parser'ınıza bakın. Ben bakmadım, yarım gün kaybettim.

## Ne yapmadım

Bu kısım önemli, çünkü yukarıdaki tabloyu birinin kendi parasıyla ilgili bir karara dayanak yapmasını istemem.

- **Mevduat brüt.** Stopaj yok. Vergi sonrası reel getiri yukarıdakinden belirgin şekilde düşük.
- **Döviz nakit modellendi.** Alış-satış makası ve döviz mevduat faizi hesaba katılmadı.
- **İşlem maliyeti yok.** Altında, BİST'te ve döviz alımında gerçek hayatta ödediğiniz makas dahil değil.
- **Gerçek bir tahvil bacağı yok.** EVDS'de DİBS verisi ISIN bazında var (4.208 seri) ama toplulaştırılmış bir gösterge getirisi yok. 3.920 seri adını ayrıştırdım; "Değer" alanının fiyat veya getiri olmadığını gördüm — bir hafta arayla itfa olan iki tahvilin değerleri 6,9 ve 13,5'ti, yani bu alan bir hacim büyüklüğü. Belgelenmemiş bir alandan getiri türetmektense tahvil bacağını eksik bıraktım ve yerine TCMB politika faizini, **açıkça etiketleyerek**, para piyasası vekili olarak koydum. Düzgün bir tahvil bacağı için doğru kaynak TEFAS borçlanma araçları fonları; o ayrı bir iş.
- **Yalnızca tek seferlik yatırım.** Düzenli alım (DCA) senaryosu yok. DCA, özellikle altın ve BİST için tabloyu değiştirir.
- **Geçmişe bakıyor.** Hiçbir ileriye dönük tahmin, hiçbir "şunu al" cümlesi yok. Olmamasının sebebi yer darlığı değil; yatırım danışmanlığı lisans gerektiren bir faaliyet ve ben lisanslı değilim.

## Son olarak

Bu işe "Türkiye'de kimse reel getiri hesaplamıyor" fikriyle başladım. Bitirirken fikrim biraz değişti: hesaplamıyor değiller, **hesaplayamıyorlar**. Çünkü veri var ama ulaşılabilir değil; EVDS ücretsiz ve kapsamlı, ama az önce anlattığım iki duvar yüzünden pratikte bir hafta sonunuzu yiyor.

Aradaki boşluk matematikte değil. Matematik zaten kitapta yazıyor — korelasyon matrisi, özdeğer ayrışımı, entropi. Boşluk, o matematiğe veri taşıyan borularda.

Eğer kendi paranızla ilgili tek bir şey alacaksanız şu olsun: bir yatırımın getirisini gördüğünüzde, aynı dönemin TÜFE'sine bölün. Bölmeden önceki sayı size bir şey anlatmıyor.

Ekrandaki rakamın büyümesi, zenginleşmenizle aynı şey değil.
