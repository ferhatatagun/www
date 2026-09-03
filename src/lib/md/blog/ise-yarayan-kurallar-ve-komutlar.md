# Gerçekten işe yarayan kurallar ve komutlar

Proje kuralları ve slash komutları ancak kullanırsan işe yarıyor. Bariz geliyor. Ama çoğu ekip bir kere uzun bir `.cursorrules` yazıyor, unutuyor, ve aynı talimatları her sohbette tekrar etmeye devam ediyor. Kuralların ve komutların kalıcı olmasının yolu şu.

## Teoriden değil, acıdan başla

"Kuralımız olması lazım" diye kural yazma. Bir şey sürekli ters gittiğinde yaz. Biri sürekli `any` kullanıyordur, ya da loading state eklemeyi unutuyordur, ya da 400 satırlık component yazıyordur. Bunu bir review'da yakala, `.cursorrules`'a tek satır ekle: "`any` yok. Düzgün tip kullan." Bir dahakine model kod önermeden önce onu görüyor. Gerçek bir problemi çözdüğü için kalıcı olan bir kural bu.

Komutlar için de aynısı. Her gün aynı prompt'u yazdığını fark ediyorsan ("error handling ekle ve bizim toast helper'ı kullan"), onu bir custom instruction'a ya da kayıtlı bir prompt'a çevir. En iyi komutlar, zaten yaptığın tekrarlardan çıkıyor.

## Listeyi kısa tut

Uzun kural dosyaları görmezden geliniyor. Model bir metin duvarı alıyor ve ya atlıyor ya da tutarsız uyguluyor. Proje geneli kurallarda 20 satırın altını hedefliyorum. Şunun gibi şeyler: varsayılan dil, inline style yok, design token'larımızı kullan, component'leri nasıl adlandırıyoruz. Fikir başına bir satır. Bir kural bir cümleden uzunsa, muhtemelen iki kuraldır ya da fazla muğlaktır.

Komutlar: aynı fikir. Yüksek kaldıraçlı birkaç tanesi uzun bir menüyü yener. "Bunu shared hook'u kullanacak şekilde refactor et." "Happy path ve bir hata durumu için test ekle." 3–5 tanesini hatırlar ve kullanırsın; 20 tanesini unutursun.

## Kuralları önemli oldukları anda görünür yap

Modelin okuduğu bir dosyadaki kurallar iyi. Akışın içinde beliren kurallar daha iyi. Örneğin: "`src/ui/` içindeki component'leri düzenlerken design system'imizi tercih et; yeni renk ya da spacing değeri ekleme." Böylece model o klasördeyken kural alakalı oluyor. Bunu her zaman yapamıyorsun (Cursor henüz klasör bazlı kuralları desteklemiyor), ama kural dosyasını odaklı tutabilirsin ki model alakasız şeylerin içinde boğulmasın.

Komutlar için, her gün kullandıklarını gerçekten tıkladığın bir yere koy: Cursor'ın custom instruction'ları, ya da repo'da küçük bir kopya kâğıdı. Kimsenin açmadığı bir dokümanın içine gömülüyse kalıcı olmayacak.

## Gerçek kullanımdan iterasyon yap

Birkaç haftada bir, review'larda neyi düzeltmek ya da yeniden prompt'lamak zorunda kaldığına bak. Yeni kural ve komut adayları onlar. Ve bir kurala hiç uyulmuyorsa (ya da sürekli kapatıyorsan), sil ya da kısalt. Ölü kurallar gürültü ekliyor ve ekibe dosyayı görmezden gelmeyi öğretiyor.

Kurallar ve komutlar tek seferlik bir kurulum değil. Küçük bir döngü: tekrar eden bir hatayı fark et → kural ekle ya da düzelt → davranış düzeliyor mu bak → tekrarla. Kalıcı olanlar, gerçekten hissettiğin bir acıyı geçirenler.
