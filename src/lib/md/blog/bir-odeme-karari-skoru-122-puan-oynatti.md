# Bir ödeme kararı skoru 122 puan oynattı

24 aylık bir kredi skoru simülasyonu yazdım. Adı SKOR24: her ay bir finansal karar geliyor — ekstreni nasıl ödeyeceksin, kaç bankaya başvuracaksın, eski hesabını kapatacak mısın — ve bu kararlar skoru FICO'nun kamuya açık faktör ağırlıklarına göre etkiliyor.

İlk oynanışımda ay 1'de "Ekstrenin tamamını öde"ye bastım. Skor 1197'den 1319'a çıktı.

Tek karardan **+122 puan.**

## Matematik doğruydu

Skor modeli beş faktörü ağırlıklı topluyor — ödeme geçmişi %35, kullanım oranı %30, kredi geçmişi uzunluğu %15, yeni sorgular %10, kredi çeşitliliği %10 — ve toplamı Findeks'in 0-1900 ölçeğine taşıyor: `round(ağırlıklı_toplam / 100 * 1900)`.

Ekstreyi tam ödemek kullanım oranını yüksek oranda düşürüyordu. Kullanım oranının ağırlığı %30. On dört puanlık bir faktör hareketi, tek başına, ölçeğe taşınınca seksen puanın üzerinde bir skor hareketine dönüşüyordu. Geri kalanı ödeme geçmişi faktöründen geldi.

Kod hatalı değildi. Her adım doğru çalışıyordu. Sonuç yine de yanlıştı.

## Neden yanlıştı

Bu bir kredi skoru hesap makinesi değil, bir eğitim aracı. Aracın tek işi şunu öğretmek: skor tek bir kararla değil, süreklilikle şekillenir. Bir ekstreyi tam ödemek elbette iyi bir şey, ama gerçek hayatta bir aylık bir karar 24 aylık bir geçmişi bu kadar ezmiyor.

Oyun matematiksel olarak tutarlıydı ve pedagojik olarak yanlış bir şey öğretiyordu: "bir kere doğru yap, kurtul." Asıl mesaj bunun tam tersi olmalıydı.

## Düzeltme

On dört karar-sonucu çiftinin delta değerlerini gözden geçirdim ve çoğunu aşağı çektim — özellikle iyi kararların ödülünü. Kötü kararları (gecikme, art arda beş bankaya başvuru gibi) orantılı ama daha az ekstrem bıraktım; onların cezası zaten daha gerçekçiydi, asıl şişkinlik pozitif tarafta.

Aynı "ekstrenin tamamını öde" kararı, düzeltmeden sonra +44 verdi. Otomatik bir 24 aylık oynanışla uç durumları test ettim: en kötü senaryo skoru ~193'e kadar düşürüyor, sürekli en iyi seçimlerle ~1660-1700 bandına çıkıyor. Aradaki mesafe artık tek bir ekrana sığmıyor — 24 ayı gerektiriyor. Amaçlanan da buydu.

## Borç oyunlaştırılmıyor

Tasarımda bilinçli bir sınır var: oyun kredibiliteyi iyileştirmeyi oyunlaştırıyor, borçlanmayı değil. Hiçbir karar "daha çok kredi kullan, skorun patlasın" demiyor. Kredi teklifi kabul etmek kısa vadede kredi çeşitliliğini artırabilir ama sorgu sayısını da düşürür — net etki her zaman pozitif değil. Skip/gecikme seçenekleri her zaman belirgin şekilde cezalandırılıyor. Bu bir finansal tavsiye aracı değil ve gerçek KKB/Findeks algoritmasını birebir yansıtmıyor; skor faktör ağırlıkları eğitim amaçlı, kamuya açık FICO oranlarından basitleştirilmiş bir yaklaşım.

## Deneyin

Oyun tarayıcıda çalışıyor, kurulum gerektirmiyor: **[ferhatatagun.github.io/skor24](https://ferhatatagun.github.io/skor24/)**

Kaynak kod açık: [github.com/ferhatatagun/skor24](https://github.com/ferhatatagun/skor24)

Bir sayının doğru hesaplanmış olması, doğru bir şey öğrettiği anlamına gelmiyor. İkisini karıştırdığımda fark etmem 24 ayı, yani bir oyunun tamamını oynamamı aldı.
