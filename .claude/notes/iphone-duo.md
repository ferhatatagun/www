# iPhone Duo: ürün notları ve App Store görsel hattı

Son güncelleme: 2026-11-19. Kaynakların bir kısmı basın/blog (Apple dokümanından doğrulanmadı); kod yazmadan önce Apple HIG "Designing for iPhone Duo" ile teyit et.

## Donanım / platform (ikincil kaynaklardan)
- iPhone Duo: iOS 27.1, 23 Ekim 2026 lansman, $1.999. Touch ID var, Face ID yok.
- İç ekran 7.6", ~1.42:1, App Store Connect screenshot 2007x2853 (yatay 2853x2007). Dış ekran 5.4", 1398x2034.
- Size class: iç ekran regular/regular, dış ekran portrait'te compact genişlik. Orientation kontrol etme.
- Split View var (iPhone'da ilk), Slide Over yok, drag-drop sınırlı. Kıvrım yarı açıkken iç ekranı bölen "reserved region".
- iOS 27.1 SDK ile derlenmeyen app'ler letterbox olur. Yeni API'ler (ArrangementView, reservedRegions, toolbarVerticalBehavior) Swift/UIKit/SwiftUI'da; Expo/RN için native module gerekebilir (doğrulanmadı).
- Duo'da tab bar ve status bar sağ kenarda dikey şeride taşınır; iç ekranda uygulama yatay çalışır (Zafer Ayan'ın Artify deneyimi).
- "Made for iPhone Duo" rozeti Duo screenshot yüklemekle tetiklenir. Nisan 2027'den itibaren iOS 27.1 SDK ile derlenen yeni app'lerde Duo screenshot zorunlu (bildirildi, teyit edilmedi).
- Apple pazarlama kuralı: Apple ürünlerinin 3D render'ı yasak, 2D çerçeve kullan.

## Strateji kararları
- Çekirdek paket + az sayıda odaklı app (tek super app değil, 24 ayrı app de değil).
- Karar kuralı: (1) birinin çıktısı diğerinin girdisi mi → aynı app; (2) aynı kişi aynı gün ikisini kullanır mı → hayırsa ayrı app; (3) tek cümlelik screenshot başlığına sığıyor mu.
- Duo-only app yok: her app tüm iPhone'larda çalışır, Duo düzeni bonus katman.
- Duo-first app'lerde AdMob yok; tek seferlik/lifetime/sub (RevenueCat). Hedef kitle global.
- Sıra: (0) Duo screenshot/mockup web aracı, (1) Read & Learn (okuma+izleme+kelime paneli+kartlar), (2) Cook-along, (3) Paper Reader, (4) Pane Tools. Casual oyun yan bahis, 3.-4. sıra.
- Yan panel yalnızca kendi içeriğimizde çalışır (başka app'in içeriği görülemez). YouTube transkripti kazıma.
- Adaptif "Primary + Companion" düzen: iç ekran yan yana, yarı açık üst/alt, dış ekran alttan sheet.

## App Store görsel hattı (Zafer Ayan'ın gist'i, secret gist, 2026-11-06)
Kaynak: https://gist.github.com/zaferayan/9bdc919df362684b0bde793ac9b214ea (7 dosya: README.md, capture.sh, shot-mode.tsx, page.html, render.mjs, en.json, en-duo-inner.json). Gist içeriği başkasına ait; yeniden kullanmadan önce kendi sürümünü yaz.

Fikir: ekran görüntüsü + pazarlama görseli üretimini otomatikleştir (5 ekran x 2 dil x 2 tema = 20 ham görsel dakikalar içinde; sonuç 24 mağaza görseli).

1. **Ham ekran görüntüsü:** simulator'dan `simctl`.
   - Display'leri listele: `xcrun simctl io <udid> enumerate`
   - İç ekran: `xcrun simctl io <udid> screenshot --display=LCD-1 shot.png`; dış ekran: `--display=LCD`. Normal iPhone'da `--display` verme.
   - Cihazı komut satırından katlayıp açamazsın; Xcode 27.1 ile gelen DeviceHub'dan elle yapılır. Kapalı ekran siyah çıkar.
   - Status bar sabitle: `xcrun simctl status_bar "$DEVICE" override --time 9:41 --batteryState charged --batteryLevel 100 --cellularBars 4 --wifiBars 3`; sonra `... status_bar "$DEVICE" clear`.
   - Boyut doğrula: `sips -g pixelWidth -g pixelHeight`.
2. **Otomasyon:** geçici `shot-mode.tsx` (dev-only, `const SHOT = { lang, theme, route }`), her zaman mount olan layout'a eklenir; `capture.sh` bu satırı sed ile yeniden yazar, Fast Refresh uygulamayı günceller, bekleyip (varsayılan 7 sn) screenshot alır. Rotalarda ( ) ve ? için `set -f`. Script macOS'a özel (BSD `sed -i ''`, `sips`). Commit'ten önce shot-mode kodunu sil (`LogBox.ignoreAllLogs(true)` içerir).
3. **Render:** `page.html` (şablon, {{W}} {{H}} {{CFG}} vb.) + JSON config + `render.mjs` ile headless Chrome (`--headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=W,H --virtual-time-budget=10000 --screenshot=...`). Chrome kapanmazsa PNG boyutu 3 poll sabit kalınca SIGKILL.
   - Başlıklar tek JSON'da; iPhone ve Duo aynı çevirileri kullanır (`"copyFrom": "en.json"`). Her dil için ayrı config (metin uzunlukları farklı).
   - Uygulama arayüzünü yeniden çizme; Duo'dan alınan gerçek ekran görüntüsünden kartlar piksel hassasiyetinde kırpılır (`background-position/size`). Kırpma koordinatları app'e özel, yeniden ölçülmeli.
   - Eğik kartları ekran satırlarıyla hizala ki metni kesmesin. Kamera/menteşe konumları doğrulanmadığı için Dynamic Island/menteşe çizme (`"island": false`).
4. **Alfa kaldır (App Store saydam görsel kabul etmez):** `magick <in.png> -background white -alpha remove -alpha off [-resize WxH!] <out.png>`
5. Gereksinimler: Xcode + simulator, Node 18+, Chrome (`CHROME_PATH`), ImageMagick (`magick`).

App Store Connect mevcut iPhone görsellerini Duo boyutlarına otomatik ölçeklemez; eski görseli büyütmek yetmez.

## Fikir havuzu
- Dil öğrenme: Read & Learn (kelime paneli, bağlamlı kartlar, Anki export, cihaz içi çeviri, UI 10+ dil).
- Companion pane: hesap şeridi, karalama defteri, çevirici, panoya geçmiş.
- Video+not (zaman damgalı), Cook-along (üstte video, altta adım/zamanlayıcı, StandBy), Paper Reader (şekil/dipnot sabitleyici), iki sayfalı okuyucu (CBZ/EPUB/PDF, yerel dosya).
- Duo'da iki kişilik masa oyunları (7.6" yatan ekran). Playable-ad/Scenario hattı ileride tanıtım varlığı üretmek için.
