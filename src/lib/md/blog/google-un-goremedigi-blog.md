# Google'un göremediği bir blog yayınladım

Sitemdeki her blog yazısı tarayıcıda gayet iyi görünüyordu.
`/blog/something` aç, yazı orada — başlık, paragraflar, kod blokları, her şey.

Sonra bir tahminle `curl https://ferhatatagun.com/blog/four-tools-in-two-weekends`
çalıştırdım, ve HTML'de yazı gövdesinin **sıfır** karakteri vardı. `<head>` içinde başlık,
layout chrome, mükemmel boş bir `<div class="markdown-container" />`, ve
hepsi bu. Yazı sadece JavaScript yüklendikten sonra render oluyordu — yani
Google'ın indekslediği versiyonda hiç yazı yoktu.

Bu durum **sitedeki her blog yazısı için, aylardır** geçerliydi.

**TL;DR**

- Site `adapter-static` + `prerender = true` kullanıyordu, ki bu "tüm route'lar build zamanında HTML'e render edilir" anlamına gelir. Bu sayfa chrome'u için doğru — ama gövde için değil.
- Markdown bileşeni `content`'i `onMount` içinde parse ediyordu, dolayısıyla diskteki HTML iskelet ve başka bir şey değildi. Yazı sadece hydration sonrası belirdi.
- Bu iki şekilde gözden saklanıyor: test ettiğin her tarayıcı JS çalıştırıyor, sayfa iyi görünüyor; ve sayfa sağlıklı 200 dönüyor, monitör yeşil kalıyor.
- Düzeltme mekanik (markdown'ı modül scope'unda parse et, `{@html}` ile bas) ama yan etkileri kademeli oldu: prerender worker heap'i taştı, prerender crawler gömülü `.md` linkleri takip edip 404 verdi, statik adapter'ın fallback'i prerendered home'u eziyordu. Her sorun, öncekisi düzeltildikten sonra ortaya çıktı.

Bu yazı regresyonun yazımı: neyi kaçırdım, nasıl saklı kaldı, kod seviyesinde gerçek düzeltme, ve düzeltmenin tetiklediği üç ikincil hata.

## Sayfa aslında neyi serve ediyordu

Svelte bileşeni zararsız görünüyordu:

```svelte
<script lang="ts">
    import { marked } from 'marked';
    import { gfmHeadingId } from 'marked-gfm-heading-id';
    import { mangle } from 'marked-mangle';
    import createSanitizer from 'dompurify';
    import Prism from 'prismjs';
    import { onMount } from 'svelte';

    let container: HTMLDivElement;
    export let content: string;

    onMount(() => {
        marked.use(gfmHeadingId());
        marked.use(mangle());
        const sanitizer = createSanitizer(window);
        const parsed = marked.parse(content);
        container.innerHTML = sanitizer.sanitize(parsed);
        Prism.highlightAllUnder(container);
    });
</script>

<div bind:this={container} class="markdown-container" />
```

Tüm bu işler — markdown parse, sanitize, highlight — `onMount` içinde.
O callback sadece tarayıcıda, hydration'dan sonra çalışıyor. SvelteKit'in prerender
adımı `onMount`'u asla çalıştırmaz. Diskteki HTML tam olarak template'te ne varsa
onu içerir: boş bir `<div class="markdown-container" />`.

Yazı gövdesi *runtime'da DOM'a imperatif olarak ekleniyordu*.
Bu Google için görünmez. OG/Twitter card scraper'ları için görünmez.
URL'i `curl` ile çekenler için görünmez.

Bunu yakalayabilecek iki kontrol yapmamıştım:

1. **Tarayıcı sekmelerim hep doğru şeyi render ediyordu**, çünkü JS çalışıyordu.
   Canlı sayfayı *bakarak* test etmek hydrate edilmiş versiyonu test etmektir,
   indekslenen versiyonu değil.
2. **Sayfa 200 dönüyordu.** Uptime monitörleri yeşil. Status sayfası yeşil.
   Lighthouse da iyi puanlıyordu, çünkü Lighthouse JS çalıştırır.

Regresyonu görmenin tek yolu JS'i atlamak. `curl` atlar. Googlebot'un render önizlemesi de.
Tarayıcının üç menü derinde sakladığı View Source da. Aylardır post-hydration DOM'u
DevTools'tan inceliyordum, raw response'a hiç View Source yapmamıştım.

Bakınca rakamlar:

```
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \
    | wc -c
32280
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \
    | grep -c "claudoscope"
0
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \
    | grep -c "TL;DR"
0
```

Sayfa 32 KB ve yazı gövdesinin hiçbir parçasını içermiyor. "claudoscope" yazıda
yarım düzine yerde geçer; HTML'de sıfır. "TL;DR" için aynı. HTML %100 layout chrome'du.

## `prerender = true` neden yetmedi

Statik adapter'ın prerender adımı her route'u dolaşır, sayfanın `load`'ını çağırır,
ve sonucundaki component ağacını HTML'e render eder. Tüm top-level Svelte
component kodunu çalıştırır. *Çalıştırmadığı* şey `onMount` gibi lifecycle hook'lar,
çünkü onlar açıkça browser-only sözleşmesindedir.

Yani `prerender = true` tam olarak iddia ettiğini yapıyordu. Hata, veri bağımlılığının
prerender'ın atladığı bir lifecycle'ın arkasında yaşıyor olmasıydı.

Düzeltme: markdown parse'ı lifecycle-level değil, module-level yapmak:

```svelte
<script lang="ts">
    import { marked } from 'marked';
    import { gfmHeadingId } from 'marked-gfm-heading-id';
    import { mangle } from 'marked-mangle';
    import { onMount } from 'svelte';
    import 'prismjs/themes/prism-tomorrow.css';

    marked.use(gfmHeadingId());
    marked.use(mangle());

    export let content: string;
    $: parsed = marked.parse(content) as string;

    let container: HTMLDivElement;

    onMount(async () => {
        const Prism = (await import('prismjs')).default;
        await import('prismjs/components/prism-typescript');
        if (container) Prism.highlightAllUnder(container);
    });
</script>

<div bind:this={container} class="markdown-container">{@html parsed}</div>
```

Üç şey değişti:

1. `marked.use(...)` modül scope'una taşındı. Hem prerender hem hydration sırasında
   çalışıyor, aynı extension'lar her iki ortamda da aktif.
2. `parsed = marked.parse(content)` reactive bir top-level statement. Component'ın
   render pass'ında senkron olarak çalışıyor, çıktısı diske giden HTML'de.
3. Prism syntax highlighting `onMount` içinde kalıyor, dynamic-import edilmiş.
   Prism import zamanında `self`'e dokunuyor, tarayıcıda sorun yok ama prerender
   worker'da var. Highlighting kozmetik — prerender'da kaybetmek JS yüklenene
   kadar görünmez, bu kabul edilebilir.

DOMPurify'ı da çıkardım. Orijinal kod marked'ın çıktısını ona pipe edip sonra inject ediyordu.
Bu sanitizer'ın bundle maliyetini + render-time maliyetini ödüyordu, ama input bizim
kendi `?raw`-import edilmiş markdown dosyalarımızdı, user content değil. Kendimize karşı
defans defansif tiyatroydu. Eğer kötü niyetli biri markdown kaynağına yazabiliyorsa,
output'u sanitize etmek yanlış katmanda yapmaktır.

Düzeltmenin sonucu:

```
$ wc -c www/build/blog/four-tools-in-two-weekends.html
45292
$ grep -c "claudoscope" www/build/blog/four-tools-in-two-weekends.html
3
$ grep -c "TL;DR" www/build/blog/four-tools-in-two-weekends.html
1
$ grep -c "<h1 id=" www/build/blog/four-tools-in-two-weekends.html
1
```

32 yerine 45 KB. 13 KB fark yazı gövdesi — Google'ın boş olarak gördüğü kısım.

## Anasayfa daha da kötüydü

Anasayfanın aynı problemin farklı bir versiyonu vardı. SvelteKit'in `adapter-static`'i
SPA-stil hosting için bir `fallback` seçeneği alır; bir path'in prerendered HTML
dosyası yoksa, sunucu fallback'i serve edip client-side router'ın çözmesine izin verir.

Config şuydu:

```js
fallback: 'index.html'
```

Bu fallback shell'i *`index.html`'e* yazar. `/`'deki home route'u da *aynı
index.html'e* prerender eder. Yani aynı path'e yazan iki operasyon var. Fallback kazanıyor,
çünkü adapter onu prerender'dan *sonra* yazıyor. 40 KB prerendered home, 13 KB
SPA shell ile eziliyor.

```
$ wc -c www/build/index.html
13096
```

Bu bundler'ın SPA'nın entry'si olarak emit ettiği bare HTML — sadece JS bundle'ları
için import'lar, gövde içeriği yok. `/`'a JS olmayan bir user agent ile gelen herkes
*bunu* alıyordu.

Düzeltme bir karakter niyet:

```js
fallback: '200.html'
```

`200.html` bazı statik host'ların (Surge, konfigüre edilmiş Netlify) "SPA fallback"
anlamında kullandığı bir konvansiyon. Statik adapter ismi umursamıyor; fallback'i ne
path verirsen oraya yazar. `200.html`'e rename etmek bilinmeyen path'ler için
fallback'i tutar, prerendered home ile çakışmaz.

```
$ wc -c www/build/index.html
40871
```

3.1× büyüme, hepsi gerçek render edilmiş home içeriği.

## Düzeltmenin ortaya çıkardığı üç sorun

Her biri yalnızca *bir öncekisi düzeltildiği için* görünür hale geldi.

### 1. Prerender worker OOM

Markdown gerçekten prerender sırasında parse edilmeye başlayınca, GitHub Actions
build'i şu hatayla başarısız olmaya başladı:

```
Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching
memory limit: JS heap out of memory
```

`ubuntu-latest` üzerinde varsayılan Node heap'i ~1.4 GB. Prerender adımı artık
gerçek iş yapıyordu — her blog yazısının markdown kaynağında `marked.parse`,
her biri 10–15 KB HTML üretiyor. 14 blog yazısı + diğer route'lardaki markdown
render'larıyla, worker sınırı aştı.

İki düzeltme:

```yaml
env:
  NODE_OPTIONS: --max-old-space-size=4096
```

Bu tek başına unblock etti. Belt-and-suspenders olarak, `marked.use(...)` çağrılarını
da guard'ladım ki Vite SSR modülü route'lar arası re-import etse de extension'lar
sadece bir kez kaydolsun:

```ts
const __markedKey = '__omni_marked_configured__';
const __markedScope = globalThis as unknown as Record<string, boolean>;
if (!__markedScope[__markedKey]) {
    marked.use(gfmHeadingId());
    marked.use(mangle());
    __markedScope[__markedKey] = true;
}
```

### 2. Prerender crawler render edilen HTML'deki her link'i takip ediyor

Birkaç blog yazısı çeviri veya `contributing.md` dosyalarına relative link'ler içeriyor —
referans verdikleri kaynak repolarda yaşayan ama site route'u olmayan `[/i18n/README.tr.md]`,
`[/contributing.md]` tarzı. Markdown rendering client-side iken bunlar `<a>` tag'lerine
hydrate oluyordu ama prerender crawler hiç görmüyordu.

Şimdi crawler görüyor, takip ediyor, ve 404'leri build hatası olarak değerlendiriyor:

```
Error: 404 /contributing.md (linked from /skills/nextjs)
```

Bunlar benim sahip olduğum site route'ları değil — yazı gövdeleri içindeki içerik
link'leri. Düzeltme prerender 404'lerini error'dan warning'e indirgemek:

```js
prerender: {
    handleHttpError: 'warn',
    handleMissingId: 'warn'
}
```

### 3. Shared host gh-pages'i çekmiyordu

Repo'nun CI'ı `gh-pages`'e deploy ediyor. `ferhatatagun.com` domain'i Spaceship shared
host'a point ediyor, ki ben oraya FTP ile yüklüyorum. İkisi alakasız, yani her CI deploy
gh-pages'i güncelliyor ve live site olduğu gibi kalıyordu.

Bu bir CI bug'ı değildi; deployment-pipeline'ın drift etmesine izin verdiğim bir şekildi.
Düzeltme kod değil — "gh-pages içeriklerini manuel olarak shared host'un `public_html`'ine
FTP'le ya da deploy pipeline'ını direkt push edecek şekilde yeniden kur". Bir seferlik
çözüm için FTP yolunu seçtim.

## Bir dahaki regresyonu shiplemeden nasıl yakalanır

Bu regresyonun aylarca hayatta kalmasının sebebi, doğrulamamın hiçbirinin JS kapalı
çalışmıyor olmasıydı. Bir dahakini engellemek için:

1. **Kritik bir route deploy sonrası her zaman view source yap.** DevTools değil —
   o hydrate edilmiş DOM'u gösterir. Tarayıcının "View Source"'u wire'a gelene bakar.
   İkisi trivial şekillerde farklı olmalı (hydration marker'ları, attribute sırası);
   *içerik* olarak farklı olmamalı.
2. **En önemli sentinel'ini `curl | grep` ile kontrol et.** Blog için: gövdede
   olduğunu bildiğin bir cümle. Ürün sayfası için: fiyat. Pazarlama sayfası için:
   value prop. 10 saniyelik deploy-sonrası kontrol yap.
3. **JavaScript kapalı bir kez test et.** Bu, major template değişikliği başına
   bir seferlik kontrol. Critical body text'in JS-disabled sayfada eksik olduğu
   ilk sefer, cevap elinde olur.
4. **Statik siteler için, zamanla sayfa boyutlarını diff'le.** Tek route'ta
   40 KB → 13 KB düşüş alarma neden olurdu. Benim alarm yoktu çünkü baseline
   ölçmemiştim.

SvelteKit özelinde, pattern tek kural: render edilen DOM'a veri materialize eden
her şey reactive veya top-level olmalı, `onMount` içinde değil. `onMount` sadece
browser-only side effect'ler için — DOM ölçümü, üçüncü-parti widget init, `window`
gerektiren her şey. İçerik üretimini oraya koyduğun an, prerender görmüyor.
Aynı şekil React'te (`useEffect`), Vue'da (`onMounted`), ve hydration'ı render'dan
ayıran her framework'te var.

## Bunun maliyeti

Bulmak için iki akşam. Düzeltmek için kırk beş dakika. Düzeltmenin ortaya çıkardığı
ikincil hatalarla başa çıkmak için üç follow-up commit.

Daha zor maliyet, her yazının gövdesinin boş olduğu aylarca süren indeksleme.
Google'ın o sayfalar için görüşünde şimdi başlık + OG image + boş bir `<div>` var.
Yazıların yedi tanesinin dev.to mirror'ları, ki `canonical_url` siteme point eden
şekilde yayımladım, orijinallerinden *daha* indekslenebilirdi.

Arama motorları yeniden tarayacak. Mirror'lar eventually yakalayacak. Ama bu
anında geri sarmayan tipte bir bug — düzeltmeden sonra doğru hamle taze sitemap
göndermek, en önemli URL'lerin reindex'ini talep etmek, ve beklemek.

İzlediğim kazanma koşulu, hatayı ortaya çıkaran aynı `curl | grep`, prod URL'sine
karşı koşturulduğunda:

```
$ curl -s https://ferhatatagun.com/blog/four-tools-in-two-weekends \
    | grep -c "TL;DR"
1
```

Sıfır hatadır. Bir düzeltmedir.
