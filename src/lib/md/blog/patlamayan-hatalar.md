# Patlamayan hatalar

Modelden `{"risk": "high" | "medium" | "low", "score": 0-100}` istiyorsun. Çalıştırıyorsun, tam da onu alıyorsun, bağlayıp shipliyorsun.

Altı hafta sonra biri, açıkça onaylanmaması gereken birkaç talebin otomatik onaylandığını fark ediyor. Hiçbir şey hata vermemiş. Log'da exception yok, başarısız istek yok, alarm yok. Satırlarda sadece yanlış değer var, ve altı haftadır orada.

Olan şu: kırk çağrının biri `"high"` yerine `"HIGH"` dönmüş, ve kodun şunu yapmış:

```ts
switch (result.risk) {
  case "high":   return escalate(claim);
  case "medium": return queue(claim);
  case "low":    return autoApprove(claim);
  default:       return autoApprove(claim);
}
```

Default dalı neredeyse her zaman izin veren daldır, çünkü kuyruğu akıtan odur. Yani model *maksimum risk* dedi ve sistemin bunu *otomatik onayla* diye okudu. Hata kararı bozmadı. Tersine çevirdi.

[**guard-lab**](https://guard-lab.vercel.app) tam da bu sınıf bug'ı bulmak için var: bir şema tanımla, bir prompt'u ona karşı N kez çalıştır, ve bozulma biçimlerinin dağılımına bak.

**TL;DR**

- Şema hataları dağılımsaldır. Tek temiz çalıştırma sana hiçbir şey söylemez, beş tanesi de neredeyse hiçbir şey.
- Tek bir "%94 uyumlu" sayısı, hiç sayı olmamasından kötüdür; çünkü ilginç soru kaçının patladığı değil — kodunun her biri hakkında ne yaptığı.
- Üç kova: **crash** (patlıyor, zaten error rate'inde), **recoverable** (doğru payload, sarmalanmış), ve **silent** (parse oluyor, kabul ediliyor, yanlış). Sadece üçüncüsü görünmez, ve alet gerektiren tek şey o.
- Elli çalıştırmada sıfır hata, sıfır hata oranı demek değil. n = 50'de veri hâlâ yaklaşık %7 ile tutarlı. %1'i elemek 381 temiz çalıştırma alıyor.
- Constrained decoding bunun çoğunu kaldırıyor ve ilk hamlen o olmalı. Ama sana oranını söylemiyor, ve şekli kısıtlıyor, anlamı değil.

## Hata saymak yanlış alet

Bunu kurmanın bariz yolu bir uyum yüzdesi. Elli kez çalıştır, kaçının eşleştiğini say, %94 yazdır.

Önce onu yaptım ve bir saat içinde işe yaramaz olduğu ortaya çıktı; sebebini dile getirmem gerekenden uzun sürdü: **hatalar eşit derecede tehlikeli değil, ve tek bir sayı tam da önemli olan tek ayrımın üstünden ortalama alıyor.**

İkisi de %94 raporlayan iki çalıştırma düşünün.

Birincisinde %6 markdown fence — model nesneyi ` ```json ` içine sarmış. Parser'ın ya fence temizliyordur ya temizlemiyordur. Temizliyorsa bu %6 sana hiçbir şeye mal olmuyor. Temizlemiyorsa isteklerin %6'sına mal oluyor, gürültüyle, birinci günde, ve öğle yemeğinden önce düzeltiyorsun.

İkincisinde %6 enum kayması ve string olarak gelen sayılar. Hiçbir şey patlamıyor. O yanıtların her biri kodun tarafından kabul ediliyor, veritabanına yazılıyor, ve birinin ekranında render ediliyor. Bir müşteri öğrendiğinde öğreneceksin.

Aynı sayı. Tamamen farklı durum. Biri bir sabah; diğeri bu yazının başındaki altı hafta.

## Üç kova

Bu yüzden guard-lab hataları ne olduklarına göre değil, kodunun onlar hakkında ne yaptığına göre ayırıyor:

**Crash** — çıktı parse olmuyor. `JSON.parse` patlıyor, istek başarısız oluyor, ve zaten izlediğin bir error rate'te görünüyor. Gerçekten sorun değil. Gürültülü hatalar düzeltilir.

**Recoverable** — payload doğru ama sarmalanmış. Bir markdown fence, bir giriş cümlesi, yardımsever bir kapanış notu. Temizliyorsan bedava, gövdenin sadece JSON olduğunu varsayıyorsan öldürücü. Her iki durumda da hemen öğreniyorsun.

**Silent** — çıktı parse oluyor, kodun kabul ediyor, ve değer yanlış.

Üçüncü kova bütün mesele, ve göründüğünden büyük. Sadece enum kayması değil:

- **Eksik alan** `undefined` olarak okunuyor. Template'ler boş render ediyor, karşılaştırmalar sessizce false'a düşüyor, hiçbir şey patlamıyor.
- **String olarak `"score": "85"`** aritmetikte `NaN` veriyor, ya da `+ 10` ile `"8510"`. İkisinde de hata yok.
- **Uydurulmuş enum** — `"very high"` — beklediğin değerler için yazdığın her kontrolden geçiyor ve rutinmiş gibi default dalına düşüyor.
- **0–100 alanında `"score": 150`** geçersiz bir konumda geçerli bir sayı. Render ediliyor, grafiğe giriyor, yanıltıyor.
- **Değer beklenen yerde `null`** çoğu kodda varlık kontrolünden geçiyor ve çok uzakta, sebepten kopuk bir yerde tip kontrolünde patlıyor.

Bunların her biri JavaScript tarafından itirazsız kabul ediliyor. Hiçbiri error rate'inde asla görünmeyecek. Bu monitoring'inde bir boşluk değil — monitoring'inin *göremeyeceği* bir kategori, çünkü dışarıdan bakınca hiçbir şey ters gitmedi.

## Sıfır hata, sıfır hata oranı değil

En çok önemseyeceğimi beklemediğim kısım burası.

Aracı çalıştırıyorsun, elli kez, ve hepsi geçiyor. Baştan aşağı yeşil. Bu kanıt gibi okunuyor, ve değil.

Elli temiz çalıştırma bir örneklem. Gerçek hata oranı her neyse o, ve örneklemin bir değerler aralığıyla tutarlı — n = 50'de sıfır gözlenen hatayla %95 Wilson üst sınırı **%7.1**. Günde bin çağrıda bu, test çalıştırmanın tespit etme gücü olmayan, günde yetmiş bir bozuk kayda kadar demek.

Bu yüzden guard-lab asla çıplak bir sıfır göstermiyor. Temiz bir tarama bir aralık ve neyi eleyip neyi elemediğini söyleyen bir cümle alıyor; çünkü o ekranın rahatlatıcı versiyonu aracın yapabileceği en yanıltıcı tek şey olurdu. Birinin bunu çalıştırmasının tüm sebebi bir örnekliğe güvenmeyi bırakmak; ona elli örnekliği kesinlik kılığında vermek aynı hatayı daha pahalı bir yere taşımaktan ibaret olurdu.

Moral bozucu doğal sonuç: %1'lik bir hata oranını elemek **381 temiz çalıştırma** alıyor. Gerçek ekiplerin çalıştırmayacağı gerçek bir sayı, ve bunu bilmek yine de beş çalıştırmanın meseleyi kapattığına inanmaktan iyi.

## Karşı argümanın en güçlü hali

Karşı tarafı düzgün savunayım, çünkü burada iyi bir itiraz var ve zayıf halini devirmeye değmez.

*Bu çözülmüş bir problem. Structured output kullan.* JSON şemasıyla tool use, ya da bir constrained-decoding modu, modelin çıktısını token seviyesinde uymaya zorluyor. Fence'ler, düz metin, parse olmayan çıktı, eksik alanlar, yanlış tipler — yukarıdaki taksonominin çoğu düpedüz olamaz hale geliyor.

Bu doğru, ve ilk hamlen o olmalı. Constrained decoding kullanabiliyorsan kullan; kısıtlanmamış bir prompt'un arkasına validator koymak, ona ihtiyaç duymamaktan kötü bir tasarım.

İki şey hayatta kalıyor.

**Şekli kısıtlıyor, anlamı değil.** `"risk"` üç string'den biri diyen bir şema sana üç string'den birini verecek. Doğru olanı seçip seçmediğini söylemeyecek, ve kodlamadığın bir aralık ihlalini yakalamayacak — çoğu insan 0–100 sınırını değil `"type": "number"` yazıyor, yani `150` geçiyor. Constrained decoding bir sözdizimi problemini anlam problemine çeviriyor. Bu büyük bir iyileşme ve bir çözüm değil.

**Çok sayıda production kodu onu kullanacak konumda değil.** Bir satıcı ürününün içindeki prompt template'i. İstekleri normalize edip tool-use bloğunu düşüren bir iç gateway. Birinin 2024'te entegre ettiği ve kimsenin elden geçirmeye bütçesi olmayan eski bir endpoint. Sadece `messages` ileten bir proxy'nin arkasındaki model. Bunlar egzotik değil; başkasının ortamına giren bir mühendisin gerçekte bulduğu şeylerin çoğu.

Ve ikisinin de altında: **constrained decoding sana bir oran vermiyor.** Hata olasılığını düşürüyor, muhtemelen epeyce, hâlâ bilmediğin bir sayıya. "Bu ne sıklıkla bozuluyor"un cevabı "eskisinden az" ise hiçbir şey ölçmemişsin — sadece sayıyı göremediğin bir yere taşımışsın.

## İçine gönderdiğim iki bug

Bunu yapmanın faydalı kısmı, tam da aracın var olma sebebi olan türden hatayı iki kez işlemem oldu.

**Birincisi, sessiz-hata dedektörünün içindeki sessiz bir hataydı.** Neyin kurtarılabilir sayılacağı konusunda cömert olmak için parser, çevreleyen düz metnin içinden JSON'u ilk `{` ile son `}` arasındaki en geniş aralığı alarak çıkarıyor — ki savunmacı production kodunun yaptığı aşağı yukarı bu. Sonra bir test vakası ona `[{...}, {...}]` verdi: tek nesne yerine sonuç dizisi dönen bir model.

Kurtarma çalıştı. İlk nesneyi çekti, temiz bir kurtarma raporladı, ve ondan sonraki her elemanı sessizce attı.

Bu tam olarak okuduğunuz yazıdaki hata modu — parse oluyor, kabul ediliyor, yanlış — onu yakalamak için yapılmış şeyin içinde işlenmiş halde. Çözüm, yanıtı önce olduğu gibi, tam da gerçek kodun yapacağı şekilde parse etmek, ve ancak o başarısız olunca kurtarmaya düşmek. Yanlış şekildeki geçerli JSON artık çağırana bozulmadan ulaşıyor ve crash olarak yargılanıyor, çünkü öyle.

**İkincisi istatistiksel bir kendiyle çelişmeydi.** "%1'lik bir hata oranını elemek kaç temiz çalıştırma alır" için rule of three kullandım: n denemede sıfır olay, oranı 3/n civarında sınırlıyor, yani 300 çalıştırma. Ders kitabı, doğru, yaygın.

Ne var ki araç başka her yerde Wilson aralığı raporluyor, ve Wilson sıfırda biraz daha muhafazakâr. 300 temiz çalıştırsan sana **%1.26** derdi — 300'ün seni %1'e götüreceğine söz verdikten sonra. Tek tek savunulabilir iki yöntem, birbiriyle çelişiyor, ve tüm iddiası sayılarına güvenmen olan bir aracın içinde.

Artık gösterdiği aralığı tersine çeviriyor. Cevap 300 değil 381: daha az tatmin edici, ve aracın sonrasında sana söyleyeceğiyle tutarlı.

İki bug da uygulamayı kullanarak yakalanmadı. İkisi de referans değerlere karşı yazılmış testlerle yakalandı — on yedi sınıflandırıcı vakası, ve yayınlanmış aralıklara karşı kontrol edilmiş Wilson. Ki bu, [iki yazı önce eval'ler hakkında yazdığım şeyin](https://ferhatatagun.com/blog/teslim-edilen-prompt-degil-eval) kendi küçük argümanı: ekrana bakıp makul sayılar görmek doğrulama değildir.

## Sana söylemediği şey

Cevapların *iyi* olup olmadığına dair hiçbir şey.

Bir yanıt şemadaki her alanı karşılayabilir — doğru enum, aralıkta skor, bütün alanlar mevcut — ve talep konusunda tamamen yanlış olabilir. guard-lab sözleşmenin tutup tutmadığını ölçüyor. Sözleşmenin içindeki yargının iyi olup olmadığı diğer tür eval, ground truth isteyen tür, ve bu ona dokunmuyor.

Sözleşme uyumu taban. Sadece çoğu ekip tabanı hiç ölçmemiş, ve tabanın sandıkları yerde olmadığı ortaya çıkıyor.

---

**[guard-lab](https://guard-lab.vercel.app)** ücretsiz, açık kaynak ve yalnızca tarayıcıda — BYOK, ve anahtar sekmenden hiç çıkmıyor çünkü gönderilecek bir backend yok. Kaynak kod [GitHub'da](https://github.com/ferhatatagun/guard-lab).

Tek bir kısıt altında yapılmış araç setinin altıncısı: hiçbir şeyin kurulamadığı ve verinin çıkamadığı bir odada çalışmak zorundalar. [Diğerleri burada.](https://ferhatatagun.com/tools)
