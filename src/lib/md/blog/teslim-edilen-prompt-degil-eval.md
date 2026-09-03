# Teslim ettiğin şey prompt değil. Eval.

Forward-deployed işe dair her saha rehberi aynı şeyin bir versiyonunu söylüyor: bir şey inşa etmeden **önce** değerlendirme çerçeveni tanımla.

Ve gerçekten bir müşterinin ortamına inmiş her mühendisin aynı tepkisi oluyor: neyle?

Üçüncü günde etiketli verin yok. Alan uzmanlığın yok — o uzmanlığa sahip olanlar zaten senin için inşa ettiğin insanlar ve meşguller. Elinde birinin paylaşılan ekranda gösterdiği beş örnek var, dokümantasyonundan kimsenin yazmadığı yerlerden sapan bir workflow var, ve mevcut sürecin çok uzun sürdüğüne dair kaba bir his var. Bundan golden dataset kurmak bir görev değil. Bir hayal.

Böylece tavsiye atlanıyor. Tembellikten değil — pratiklikten. Ve yaklaşık doksan gün sonra sistem sessizce kaymaya başlıyor, ve müşteri fark edene kadar kimse görmüyor.

Bence tavsiye doğru, çerçeve yanlış. Sana eval'i atla denmiyor. Sana önce **yanlış türünü** kur deniyor.

**TL;DR**

- Standart eval tavsiyesi — golden dataset, rubrik, etiketli örnek — doğru ve birinci haftada kullanılamaza yakın; ki tam olarak reçete edildiği an o.
- "Eval" kelimesi iki farklı soruya birden bakıyor. *Bu çıktı iyi mi?* ground truth istiyor. *Bu değişti mi?* sadece bir snapshot istiyor.
- İkincisi üçüncü günde kurulabilir ve deployment'ları asıl öldüren şeylerin çoğunu yakalar: bir prompt düzenlemesinden sonraki sessiz kayma, model sürümü sıçraması, kimsenin loglamadığı bir parametre değişikliği.
- Düz metni diff'leme — LLM çıktısı deterministik değil, gürültüde boğulursun. **Kararı** diff'le: kelimelerin altındaki yapılandırılmış iddiayı.
- Regresyon koşum takımı sonra golden dataset'ini senin yerine yazıyor. Yakaladığı her hata, hayal etmek zorunda kalmadığın etiketli bir örnek.
- Eval'in teslimat olmasının sebebi bu. Sen gittiğinde prompt, herkesin düzenleyebileceği bir metin dosyası — ve biri düzenleyecek. Düzenlemenin güvenli olup olmadığını onlara söyleyen şey eval.

## Aynı kelimeyi giyen iki farklı soru

Bunu benim için açan ayrım şu.

| | Kalite eval'i | Regresyon eval'i |
|---|---|---|
| Soru | Bu çıktı doğru mu? | Kabul ettiğimizden değişti mi? |
| Gerekenler | Ground truth, alan uzmanlığı, rubrik | Dondurulmuş bir snapshot |
| 3. günde kurulabilir | Hayır | Evet |
| Yakaladığı | Kötü tasarım | Sessiz kayma |
| Kurma maliyeti | Haftalar | Bir öğleden sonra |

İkisine de "eval" diyoruz, ucuz olanın pahalı olanla birlikte ertelenmesi de böyle oluyor.

Pahalı olan gerçekten pahalı ve gerçekten sonra. Ucuz olanın hiçbir ön koşulu yok, ve onu atlamak çalışan bir deployment'ı gizemli biçimde bozulmuş bir deployment'a çeviren şey.

## Üçüncü günde gerçekten ne kurabilirsin

Somut olarak beş adım, hiçbiri "iyi"nin ne demek olduğunu bilmeni gerektirmiyor:

**1. Gerçek input topla.** Sentetik değil. İşi yapan kişinin yanına otur ve ekranından beş-on gerçek vaka al — özür dileyerek gösterdiği o iki tuhaf olan dahil. Tuhaf olanlar bütün mesele; sistemin kırılacağı ve dokümantasyonun sustuğu yer orası.

**2. Çalıştır ve çıktıyı yazdır.** Puanlama yok, rubrik yok.

**3. Workflow'un sahibinden ikili bir cevap al.** "Bunu 1–5 arası puanla" değil. Sadece: *sistem bunu kendi başına yapsaydı rahat eder miydin?* Evet ya da hayır. İnsanlar bunda hızlı ve güvenilir, rubriklerde yavaş ve güvenilmez.

**4. Evetleri dondur.** O dosya senin eval'in. Eval'in prototipi değil, kendisi.

**5. Her değişiklikte tekrar çalıştır.** Prompt düzenlemesi, model sıçraması, parametre oynaması, context yeniden yapılandırması. Her şeyde.

Dondurulmuş dosya kasıtlı olarak sıkıcı:

```json
[
  {
    "id": "claim-2024-0871",
    "input": "…gerçek vaka, kelimesi kelimesine…",
    "decision": { "risk": "high", "route": "manual-review" },
    "acceptedBy": "ops lead",
    "acceptedOn": "2026-03-04"
  }
]
```

Ve runner yaklaşık yirmi satır:

```ts
for (const c of frozen) {
  const output   = await run(currentPrompt, c.input);
  const decision = extractDecision(output);      // sadece yapılandırılmış iddia

  if (!deepEqual(decision, c.decision)) {
    report({ id: c.id, was: c.decision, now: decision });
  }
}
```

Hepsi bu. Burada framework yok, olmamalı da. Dosyası olan bir alışkanlık.

## Düz metni değil, kararı diff'le

Bariz itiraz: LLM çıktısı deterministik değil, diff'lemek gürültüden başka bir şey üretmez. Doğru — yanlış şeyi diff'lersen.

Aynı prompt'u iki kez çalıştır, düz metin farklı olacak. Kelime sırası, çekinceler, açıklamanın kurgusu. Bunların hiçbiri regresyon değil. Response gövdesini string olarak diff'lersen her çalıştırma patlar ve bir hafta içinde koşum takımını kapatırsın.

O yüzden yapma. **Kararı** çıkar ve onu diff'le.

Bir production workflow'undaki neredeyse her faydalı LLM adımı, düz metnin içine gömülü küçük bir yapılandırılmış iddiaya iniyor: bir kategori, bir sayı, bir yönlendirme tercihi, bir evet/hayır. Etrafındaki metin sunum. İddia ise davranış.

```ts
// metin değişir; bu değişmemeli
type Decision = {
  risk: 'high' | 'medium' | 'low';
  route: 'auto' | 'manual-review';
};
```

Model claim-0871'i pazartesi `manual-review`'a, cuma `auto`'ya yönlendiriyorsa, kendini ne kadar güzel açıkladığından bağımsız olarak bu bir regresyon. İkisinde de tamamen farklı cümlelerle `manual-review`'a yönlendiriyorsa, hiçbir şey olmamış.

Bunun beklemediğim bir yan faydası da var: karar tipini adlandırmaya kendini zorlamak tasarımı netleştiriyor. O tipi yazamıyorsan, modelin ne için olduğunu henüz bilmiyorsun demektir — ve çıktısı bir iddiaya indirgenemeyen bir adım, genellikle iki adım olması gereken bir adımdır.

## Bunun yakaladığı, başka hiçbir şeyin yakalamadığı

Hepsi gerçek, sessiz, ve dondurulmuş set olmadan görünmez:

- **A vakasını düzeltip D vakasını bozan prompt düzenlemesi.** En yaygını. Bir şikâyete karşılık bir şeyi iyileştiriyorsun, shipliyorsun, ve *henüz* kimsenin şikâyet etmediği bir vakayı sessizce geriletiyorsun.
- **Model sürümü sıçraması.** Davranış kenarlarda kayıyor. Happy path'in iyi. İki tuhaf vakan değil.
- **Parametre kayması.** Biri debug ederken temperature'ı değiştiriyor ve geri almıyor.
- **Uzunluğun tetiklediği davranış değişimi.** Input aylar içinde büyüyor; model eskiden tutan talimatları kesmeye ya da önceliksizleştirmeye başlıyor. [Bunu shiplemeden önce görmek](https://ferhatatagun.com/blog/prompt-shipping-once-onunu-gor) üzerine yazmıştım — dondurulmuş set ise zaten olmuş olduğunu öğrenme şeklin.
- **Caching sınırının kayması.** Biri eskiden stabil olan bir prefix'in içine timestamp yerleştiriyor. Maliyet üçe katlanıyor. [O sayıya da kimse bakmıyor.](https://ferhatatagun.com/blog/prompt-caching-kimsenin-olcmedigi)

Hiçbiri kendini ilan etmiyor. Hepsi yirmi satırlık bir script'te diff olarak çıkıyor.

## Bunun kulağa geldiğinden zayıf olduğu yerler

Sen keşfetmektense ben söyleyeyim.

**Bir bug'ı dondurabilirsin.** Üçüncü gündeki çıktı ince biçimde yanlışsa ve evet aldıysa, onu artık kutsallaştırdın ve koşum takımın onu savunacak. Çözümü gösterişsiz: daha çok şey öğrendiğinde dondurulmuş sete geri dön, ve erken kabulü kalıcı değil geçici say.

**Küçük N bir şeyleri kaçırır.** On vaka, gerçek çeşitliliği olan bir workflow'u kapsamaz. Bu bir taban, tavan değil — ama üçüncü günde sahip olduğun bir taban, üçüncü ayda elde ettiğin bir tavanı yener.

**Kalite hakkında hiçbir şey söylemez.** Bir regresyon koşum takımı, vasat sisteminin hâlâ tam olarak eskisi kadar vasat olduğunu memnuniyetle doğrular. Bu gerçek bir sınırlama, ve bunun neden tek eval değil de *ilk* eval olduğunun sebebi.

## Yükseltme yolu bedava

Sevdiğim kısım burası.

Regresyon koşum takımının yakaladığı her hata, etiketli bir örnek. A vakasını düzeltince D vakası mı bozuldu? Artık elinde doğru cevabı bilinen ve hata modu bilinen bir vaka var — bir planlama toplantısında hayal edilmiş değil, gerçek davranıştan keşfedilmiş.

Bir ay sonra golden dataset'e sıfırdan başlamıyorsun. Gerçek hatalardan kendi kendine derlenmiş birini küratörlüyorsun — ki bu, birinin önceden neyin ters gidebileceğini tahmin ederek yazdığından belirgin şekilde daha iyi bir dataset.

Ucuz eval, sonunda değiştireceğin bir taviz değil. Pahalı olanın toplama mekanizması.

## Bu neden teslimat

Bu argümanın bir versiyonunu daha önce, iki prompt arasında seçim yapan tek kişilik bir geliştirici için yapmıştım — [prompt'un daha iyi değil, sadece daha iyi hatırlıyorsun](https://ferhatatagun.com/blog/prompt-secimi-his-degil-olcum). O yazı kişisel ölçekte kendini kandırmayla ilgiliydi ve bahis bir öğleden sonraydı.

Bir şeyi devrettiğinde bahis değişiyor.

Sen gittiğinde prompt bir metin dosyası. Biri onu düzenleyecek — makul biçimde, iyi bir sebeple, gerçek bir şikâyete karşılık. Bu bir hata modu değil, sistemin çalışması. Hata modu, düzenlemelerinin başka bir yerde neye mal olduğunu bilmelerinin hiçbir yolu olmaması.

Eval'i olmayan bir prompt, kimsenin dokunmasına izin verilmeyen bir config dosyasıdır — ki bu ya hiç iyileşmemesi ya da öngörülemez biçimde bozulması demektir. İkisi de bir deployment'ın sessizce ölme biçimi. Dondurulmuş seti *olan* bir prompt ise, sen gittikten sonra bir ekibin gerçekten sahiplenebileceği bir şey — ve işin yaşayıp yaşamayacağına, sahiplenip sahiplenemedikleri karar veriyor.

Ki sonraki yazının asıl konusu bu: ne inşa ettiğin değil, geride ne bıraktığın.

---

*Bu, kurumsal AI'ın son kilometresi üzerine bir serinin üçüncü yazısı.
Birinci: [Kimsenin modeli patlamadı. Arayüz patladı.](https://ferhatatagun.com/blog/kimsenin-modeli-patlamadi) ·
İkinci: [Kazara bir forward-deployed engineer saha çantası kurmuşum](https://ferhatatagun.com/blog/kazara-fde-saha-cantasi) ·
Dördüncü: [Çalıştığında değil, onlar değiştirebildiğinde bitti.](https://ferhatatagun.com/blog/degistirebildiklerinde-bitti) ·
Beşinci: [İkinci müşteri ne yaptığını söyler](https://ferhatatagun.com/blog/ikinci-musteri-ne-yaptigini-soyler)*
