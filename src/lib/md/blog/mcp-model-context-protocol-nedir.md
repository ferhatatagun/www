# Model Context Protocol (MCP) Nedir?

**Model Context Protocol**, AI asistanlarının dosya sistemine, API’lere ve diğer araçlara **güvenli ve standart** bir şekilde erişmesini sağlayan açık bir protokoldür. Anthropic ve ekosistem tarafından destekleniyor.

## Problem

LLM’ler varsayılan olarak sadece verilen metni bilir. Gerçek projelerde ise:

- Kod tabanı
- Dokümantasyon
- Canlı API’ler
- Veritabanı şemaları

gibi bağlama ihtiyaç var. Her araç (Cursor, Claude Desktop, vb.) bunu kendi yöntemiyle yapınca tekrarlar ve güvenlik riskleri ortaya çıkıyor.

## MCP’nin Getirdiği Standart

MCP ile:

1. **Kaynaklar (Resources)**: Dosyalar, URL’ler, veritabanı sorgu sonuçları vb. tek tip bir modelle sunulur.
2. **Araçlar (Tools)**: AI, belirli işlemleri (ör. “bu API’yi çağır”, “şu dosyayı oku”) tanımlı araçlar üzerinden yapar.
3. **Prompts**: Önceden tanımlı prompt şablonları paylaşılabilir.

Böylece bir MCP sunucusu yazdığınızda, bu sunucu MCP destekleyen her istemci (Cursor, Claude Desktop, vs.) tarafından kullanılabilir.

## Örnek Kullanım

- **Dosya sistemi**: Proje kökündeki dosyaları listeleme, okuma
- **Git**: Commit geçmişi, branch’ler
- **API’ler**: Özel backend’inize güvenli çağrı
- **Veritabanı**: Şema sorgulama (sadece okuma, güvenlik için)

## Sonuç

MCP, AI asistanlarının “bağlam” ihtiyacını tek bir protokolde topluyor. Geliştirici araçları bu protokolü destekledikçe, aynı MCP sunucusu ile farklı editör ve asistanlarla çalışmak mümkün olacak.
