# "Best Practice" Dediklerimizin Yarısı Ezber

"Best practice böyle yapılır." Kaç kere duydun? Ben çok duydum. Sonra baktım: Aynı "best practice" bir projede hayat kurtarıyor, başka projede sadece gürültü. Demek ki best practice değil, bağlama göre iyi gelen bir tercih.

## Örnek: DRY

"Don't Repeat Yourself" — herkes bilir. Bir yerde iki kere yazma, fonksiyona çek, modüle taşı. Mantıklı. Ama bazen "tekrarlayan" iki parça kod aslında farklı sebeplerle değişiyor. Birini değiştirirken diğerini bozmamak için "ortak fonksiyon"a tuhaf parametreler ekliyorsun. Sonunda DRY değil, karmaşık bir düğüm oluyor. Bazen tekrar, okunabilirlik için daha iyi. Bunu söylemek neredeyse ayıp sayılıyor. Ama gerçek bu.

## Örnek: Yorum yazma / yaz

Bir tarafta "kod kendini anlatsın, yorum yazma" diyenler var. Diğer tarafta "karmaşık mantığı mutlaka yorumla" diyenler. Hangisi best practice? İkisi de. Bağlama bağlı. Bir utility fonksiyonda `// iki sayıyı toplar` yazmak gereksiz. Ama domain'e özel, "neden bu edge case'i böyle ele aldık" açıklaması bazen tek satırlık yorumla kurtarıyor. Kural değil, durum.

## Örnek: Test coverage

%80 coverage hedefi. Güzel hedef. Ama bazen en kritik akış tek bir fonksiyonda ve o fonksiyon zaten integration test'te dolaylı olarak kapsanıyor. Unit test yazmak için fonksiyonu parçalara bölüyorsun — sadece test edilebilir olsun diye. Sonuç: Daha fazla dosya, daha az okunabilir kod, ama coverage yeşil. Best practice mi? Sayılır. Faydalı mı? Her zaman değil.

## Ne yapalım o zaman?

Best practice'leri tamamen atalım demiyorum. Ama "çünkü best practice" tek başına gerekçe olmasın. "Bu projede, bu takımda, bu kısıtla neden mantıklı?" sorusunu sor. Bazen cevap "çünkü herkes böyle yapıyor" olacak — o da bir cevap, ama bilinçli olsun. Bazen cevap "burada bu kural işe yaramıyor, farklı yapıyoruz" olacak. Onu da söyleyebilmek lazım.

Kurallar düşünmeyi kolaylaştırsın, düşünmenin yerine geçmesin.
