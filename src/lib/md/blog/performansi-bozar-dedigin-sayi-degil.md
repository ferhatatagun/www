# "Performansı bozar" dediğin şey bir sayı değil

Odada birisi marketing'in chat widget'ının siteyi yavaşlattığını söylüyor. Bir başkası o widget'ın nitelikli lead'lerin üçte birini getirdiğini söylüyor. Muhtemelen ikisi de haklı, hiçbirinin elinde sayı yok, ve karar daha kendinden emin konuşana kalıyor. İki sprint sonra widget hala orada ve sayfa hala yavaş.

Bu konuşmanın her iki tarafında da bulundum ve bir kez bile kanıtla bittiğini görmedim. Kanıtı bulmak zor olduğundan değil — o kanıtı üretecek araç yok olduğundan. Elimizdeki bütün performans araçları şimdiki zamanda rapor veriyor. Lighthouse sana sayfanın maliyetini söylüyor. WebPageTest sana sayfanın maliyetini daha detaylı söylüyor. CrUX ve RUM sana sayfanın gerçek kullanıcılardaki maliyetini söylüyor. Hepsi "bu sayfa şu an ne yapıyor" sorusuna cevap veriyor, hiçbiri toplantının asıl konusu olan **"o şey olmasa ne olurdu"** sorusuna cevap vermiyor.

Ben de [**perf-lab**](https://perf-lab-topaz.vercel.app)'i yazdım. Bir Lighthouse JSON raporu bırak, kaynakları tek tek kapat, skorun hareket edişini izle. *"Bu kütüphane performansı bozar"*ı *"bu kütüphane 0.4 s LCP ve 7 puana mal oluyor"*a çeviriyor — ki bu, ticket'a yazabileceğin bir cümle.

**TL;DR**

- Bütün performans araçları ölçüm aracı. Ekiplerin tartıştığı kararlar ise karşı-olgusal, ve karşı-olguyu hiçbir şey ölçmüyor.
- Bir projeksiyon ancak paydaşların zaten ekran görüntüsünü aldığı skalaya düşerse tartışılmaya değer. Bu yüzden perf-lab Lighthouse'un gerçek skorlamasını yeniden yazıyor — log-normal eğriler, yayınlanmış control point'ler, kategori ağırlıkları. Gerçek bir raporda Lighthouse'un raporladığı 57'ye karşı 57 hesaplıyor.
- Byte'a göre sıralamak aktif olarak yanıltıcı. LCP'den *sonra* yüklenmesi biten 410 KB'lık bir görsel **sıfır puan**; 124 KB'lık render-blocking bir script **on bir puan**.
- Kazançlar örtüşüyor. Dört ayrı "+7 puan" düzeltmesi 28 etmiyor, ve ettiğini ima eden bir araç sana hüsranla biten bir retro hazırlıyor.
- Her şey ölçülmüş değerlerin üstüne delta, asla uydurulmuş bir mutlak değil — ve bir sayı ölçülmüş değil de modellenmişse, arayüz bunu söylüyor.

## Skor neden Lighthouse'un skoru olmak zorunda

Bu fikrin ilk taslağında kendi 0–100 index'im vardı. Bir gün içinde işe yaramaz olduğu ortaya çıktı.

Bütün mesele bir tartışmayı bitirmek, ve o tartışmayı Lighthouse'a bakan insanlar yapıyor. Benim aracım uydurduğum bir skalada "bu sana 12 puan kazandırır" diyorsa, cevap "neyin 12'si" oluyor ve artık chat widget'ı yerine benim skalamı tartışıyoruz. Projeksiyon, ticket'taki ekran görüntüsüyle **aynı birimde** gelmek zorunda.

Yani `scoring.ts` gerçek olanın yeniden yazımı. Lighthouse metrikleri doğrusal skorlamıyor — her birini iki control point'e kalibre edilmiş log-normal bir eğriden geçiriyor: gerçek sitelerin 10. persentili ve medyanı.

```ts
export const METRIC_WEIGHTS = {
  fcp: 0.1, si: 0.1, lcp: 0.25, tbt: 0.3, cls: 0.25
} as const;

export const CONTROL_POINTS = {
  fcp: { p10: 1800, median: 3000 },
  si:  { p10: 3387, median: 5800 },
  lcp: { p10: 2500, median: 4000 },
  tbt: { p10: 200,  median: 600  },
  cls: { p10: 0.1,  median: 0.25 }
};
```

Bu sayılardan çıkan ve aracı hiç açmasan bile bilmeye değer iki şey var.

**TBT skorunun %30'u, CLS ise %25'i.** Yani sayfanın ne kadar *hızlı göründüğüyle* alakası olmayan iki metrik, sayının %55'i. Herkesin konuştuğu LCP ise %25.

**Eğri tepede acımasız, ortada affedici.** LCP'yi 4.0 s'den 3.5 s'ye çekmek sana çok az şey kazandırıyor. 2.8 s'den 2.4 s'ye çekmek çok şey kazandırıyor. Yani "LCP'yi yarım saniye iyileştirdik" cümlesi, nereden başladığını bilmeden fiyatlandırabileceğin bir olgu değil.

Yeniden yazıma güvenmek yerine sonunda doğruladım — ki bunu yaptığımdan çok daha önce yapmalıydım. Kendi siteme gerçek Lighthouse çalıştırıp JSON'u doğrudan parser'a verdim:

```
reported: 57   recomputed: 57
```

Bu uyuşma, aracın bütün güvenilirliği. Repo'da bir `scripts/probe.ts` var ve çıktısının ilk satırı tam olarak bu karşılaştırma — implementasyon Lighthouse'unkinden saparsa, yanlış skalada makul görünen sayılar üretmek yerine yüksek sesle patlasın diye.

## Byte'a göre sıralanmış raporları yalancı yapan tersine çevirme

perf-lab'in içinde gelen demo sayfası şöyle — gayet sıradan bir marketing sayfası, 1.1 MB, skoru 57. Her kaynağı kaldırmanın gerçekte ne ettiğine göre sıralanmış hali:

| Kaynak | Boyut | Değeri |
|---|---|---|
| `consent-banner.js` | 124 KB | **+11** |
| `intercom.js` | 168 KB | **+11** |
| `framework.bundle.js` | 178 KB | **+10** |
| `gtm.js` | 92 KB | **+7** |
| `below-fold-gallery.webp` | **410 KB** | **0** |

Sayfadaki en büyük dosya hiçbir şey etmiyor. Ekranın altında kalan, LCP çoktan tetiklendikten sonra yüklenmesi biten bir galeri görseli — yani hiçbir zaman kritik yolda değildi. Kaldırmak sayfayı hafifletiyor, hızlandırmıyor. Bu arada listedeki üçüncü en küçük dosya on bir puan ediyor, çünkü render'ı blokluyor.

Bu egzotik bir uç durum değil. Bir web sayfasının normal şekli bu, ve her performans raporundaki "en büyük varlıklar" tablosunun ekipleri yanlış şeyi optimize etmeye göndermesinin sebebi de bu. Soru hiçbir zaman *ne ağır* değildi. *Ne ağır **ve** kritik yolda* idi.

## Tezi kanıtlayan bug

Bu konuda dürüst olmak istiyorum, çünkü yazıdaki en faydalı şey bu.

Aracı shipledim, açtım, ve demo `below-fold-gallery.webp`'yi **+12 puan** gösterdi — aracın düzeltmek için var olduğu tam o tersine çevirme, aracın içinde, ilk ekranda. Herhangi bir kaynağı kaldırmak toplam transfer'i küçültüyordu ve ben transfer kazancını FCP ile LCP'ye, o kaynağın onlarla bir ilgisi olup olmadığına bakmadan uyguluyordum.

Onu düzelttim, sonra aynı hatanın bir katman aşağıda, parser'ın içinde saklanan ikinci versiyonunu buldum:

```ts
beforeLcp: endTime <= metrics.lcp || startTime <= metrics.lcp
```

Bir sayfadaki neredeyse her istek LCP tetiklenmeden *önce başlar*. O ikinci koşul neredeyse her şeyi kritik yol olarak işaretliyordu — ki bu, aracın merkezî iddiasını her gerçek raporda sessizce çökertiyor.

Hayatta kaldı çünkü örnek veri `beforeLcp`'yi elle set ediyor, yani sürekli baktığım şey olan demo o kod yolundan hiç geçmiyordu. Yakalamanın tek yolu parser'a gerçek bir Lighthouse raporu vermekti, ki bunu araç zaten canlıya çıkana kadar yapmamıştım. **Bir aracı göstermesi kolay kılan demo verisi, tam da asıl önemli kısmı test etmeni engelleyen veridir.**

## Kazançlar toplanmaz, toplandığını varsaymak işe yaramazdan da kötüdür

İlk versiyon her kaynağı dokunulmamış rapora göre sıralıyordu. Kulağa doğru geliyor — ta ki her kaldırmaya tam kazancı bağımsız olarak vaat ettiğini fark edene kadar. Slayt'ta 28 eden, production'da 11 eden dört tane "+7 puan", çünkü örtüşüyorlar. İki analytics tag'ini düşürdükten sonra TBT zaten inmiştir ve üçüncü tag'in geri verecek daha az şeyi kalmıştır.

Bu yüzden sıralama artık marjinal: zaten kapattıklarının üstüne yeniden simüle ediyor. Demo'da Intercom'u kaldırmak hero görselini **+11'den +6'ya** düşürüyor — aynı dosya, aynı byte, LCP zaten hareket ettiği için yarı değerinde.

Bu davranış aracın en ikna edici kısmı çıktı. Bir şeyleri kapattıkça listenin yeniden sıralanışını izlemek örtüşmeyi on beş saniyede öğretiyor — ekiplerin normalde retro'da öğrendiği türden bir şeyi.

## Ne ölçülmüş, ne modellenmiş

Geleceği kestiren bir araç, çok kolay bir şekilde kendinden emin biçimde uyduran bir araca dönüşebilir. Tuttuğum kural: **ölçülmüş bir sayı varken asla mutlak bir sayı uydurma.** Her şey Lighthouse'un gerçekte kaydettiği metriklerin üstüne uygulanan delta'lar üzerinden çalışıyor, yani baseline her zaman ground truth ve sadece fark modelleniyor.

Doğrudan rapordan alınanlar: istek başına transfer boyutu ve zamanlama (`network-requests`), script başına parse ve execute süresi (`bootup-time`), render-blocking durumu *ve ölçülmüş kazancı* (`render-blocking-resources`), third-party ataması (`third-party-summary`).

Modellenmiş, dolayısıyla yaklaşık olanlar: throttled bir bağlantıda geri kazanılan transfer süresi, bir script'in execution'ının ne kadarının TBT penceresine düştüğü, ve bir şeyi kaldırmanın LCP'yi hareket ettirip ettirmediği. TBT oranı bile sektör ortalamasına değil rapora demirlenmiş — *bu sayfanın* sergilediği oranı kullanıyor, yani ölçülmüş TBT bölü ölçülmüş toplam CPU.

Her projeksiyon bir güven etiketi taşıyor — `measured`, `modelled` ya da `speculative` — ve rapor hangi koşullarda alındıysa ondan uzaklaştıkça etiket düşüyor. Throttling preset'ini değiştirip Lighthouse'un hiç ölçmediği bir şeyi kaldırırsan, araç sana sahte bir otoriteyle sayı vermek yerine bunun sadece yön gösterdiğini söylüyor.

## Yayınlandığı sitede bug buldu

Skorlamayı doğrulamak için aldığım gerçek Lighthouse raporu kendi `/tools` sayfamdaydı. Madem zahmet etmişim, raporun kalanını da okudum.

Mobil skor 57. LCP 7.2 s — ki eğriler bunu kaybettiğim 43 puanın yaklaşık 23'ü olarak fiyatlandırıyor. Ve LCP elementi — raporda adı geçiyor — ilk tool kartının ekran görüntüsüydü.

O sayfadaki her kart görseli `loading="lazy"` işaretliydi.

Skorun üzerinden ölçüldüğü tek görsel, kasten geciktirdiğim görseldi. Lazy-loading iyi bir pratik, ben de tekdüze uygulamıştım, ve tekdüze uygulamak tam olarak hatanın kendisi: LCP elementi asla lazy olmamalı. İlk kart artık `eager` ve `fetchpriority="high"`, geri kalanı lazy kaldı.

Araç ayrıca WebP olması gereken PNG'lerde duran 238 KiB'ı da işaretledi. Dönüştürmek 620 KB kazandırdı.

O sayfa üzerinde haftalardır, hem de açıkça SEO ve performansı düşünerek çalışıyordum, ve görmemeye devam edecektim. Aslında bütün kategorinin gerekçesi bu. Ölçüm sana sayfanın yavaş olduğunu söylüyor. Bunu zaten tahmin ediyordun. Bir kararı değiştiren şey, aksi halde neye mal olacağını bilmek — ve karşı-olguya bir sayı koyamadığın sürece, odadaki en yüksek sesli kişi haklı olmaya devam edecek.

---

**[perf-lab](https://perf-lab-topaz.vercel.app)** ücretsiz, açık kaynak ve yalnızca tarayıcıda çalışıyor — rapor senin sekmende parse ediliyor ve hiçbir şey yüklenmiyor, ki bu rapor bir müşterinin staging ortamından geldiğinde önemli. Kaynak kod [GitHub'da](https://github.com/ferhatatagun/perf-lab).

Rapor üretmek için:

```
npx lighthouse https://example.com --only-categories=performance \
  --output=json --output-path=./report.json
```

Ya da DevTools → Lighthouse → çalıştır → ⋮ → *Save as JSON*. Elinde rapor yoksa, tek tıkla örnek veri var.
