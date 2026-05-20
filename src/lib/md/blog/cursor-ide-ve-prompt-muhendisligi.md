# Cursor IDE ve Prompt Mühendisliği

Cursor, VS Code tabanlı bir IDE olarak AI’ı doğrudan editörün içine taşıyor. Etkili kullanım için **prompt mühendisliği** ve **bağlam yönetimi** önemli.

## Doğru Bağlam Vermek

- **@dosya**: Belirli bir dosyayı referans gösterin; model sadece o dosyayı değil, proje yapısını da daha iyi anlar.
- **@web**: Güncel dokümantasyon veya API referansı için web’i ekleyin.
- **@docs**: Proje içi dokümantasyon klasörünü işaret edin.

Böylece “bu API’nin son sürümüne göre örnek yaz” gibi istekler doğru sonuç verir.

## Kısa ve Net Talimatlar

- Tek seferde tek görev: “Bu component’e loading state ekle” gibi.
- Format belirtin: “TypeScript ile yaz”, “tailwind class’ları kullan”.
- Reddedeceklerinizi söyleyin: “inline style kullanma”, “any kullanma”.

## Cursor Rules (.cursorrules)

Proje kökünde `.cursorrules` dosyası ile sabit kurallar tanımlayabilirsiniz:

- Varsayılan dil (ör. TypeScript)
- Stil tercihleri (Tailwind, BEM, vb.)
- Test yazma beklentisi
- Kod tabanına özel kısaltmalar

Bu sayede her sohbette tekrarlamak zorunda kalmazsınız.

## Özet

Cursor’da verimlilik, doğru bağlam (@dosya, @web) ve net, kısa prompt’larla artar. `.cursorrules` ile tutarlılık sağlayarak AI’dan daha öngörülebilir çıktı alırsınız.
