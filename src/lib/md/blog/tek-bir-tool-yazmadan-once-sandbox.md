# Tek bir tool yazmadan önce sandbox'ı kur

Tool kullanan ilk Claude agent'ını shiplediğinde bunu bariz yolla yapacaksın: schema'yı tasarla, gerçek tool fonksiyonunu yaz, API'yi vur, `tool_use` block'unu parse et, fonksiyonu çalıştır, sonucu geri besle, loop. Çalışıyor. Bir de temel bir sıralama bug'ı var:

Doğru tool'lar olduğunu bilmeden tool'ları yazmışsın.

Bir database query fonksiyonu, iki API çağrısı ve dosya sistemini vuran bir şey ayağa kaldırdığında, belki bir gün gitmiş olur. Agent'ı çalıştırıyorsun. Var olmayan bir tool çağırıyor. Senin şemana uymayan bir argüman şekli halüsine ediyor. İkisi de işe yarayacakken yanlış tool'u seçiyor. *Şimdi* şemayı yeniden tasarlayacaksın, ve yazdığın dört gerçek tool implementation'ı çöpe gidiyor ya da yeniden yazılıyor.

İşi daha da kötü yapan şey: failure mode'u bir "agent kalitesi" problemi gibi görünüyor, ama aslında bir "erken implementation" problemi. Model ne istediğini biliyordu; etrafına yanlış scaffolding'i sen kurmuşsun.

**TL;DR**

- Tool implementation'ları agent geliştirmenin en yavaş kısmı; tool *tasarımı* yanlış yapmanın en hızlı yolu.
- İkisini ayır: tool schema'larını yaz, agent loop'u mock'lanmış response'larla çalıştır, modelin tool'ları nasıl seçtiğini ve kullandığını gör — sonra gerçek implementation'ları yalnızca hayatta kalan tool'lar için yaz.
- Doğru zihinsel model: "her tool'un rolünü el ile sen oynuyorsun" — agent için yavaş, senin için hızlı, kötü tasarımlar için acımasız.
- Beş-tool'lu bir agent için bu, aksi takdirde bir günlük olan bir işin on beş dakikalık egzersizi, ve tasarım hatalarını codebase'ine dokunmadan önce yakalıyor.
- Tüm iş, backend olmayan bir tarayıcı tool'una sığıyor.

## "Erken implementation" gerçekte neye benziyor

Üzerinde çalıştığım gerçek bir örnek. Bir code review agent'ı yapıyordum. İlk içgüdüm dört tool'du:

```ts
const tools = [
  { name: "read_file", description: "read a file from the repo", ... },
  { name: "search_code", description: "grep across the repo", ... },
  { name: "get_diff", description: "show the diff for this PR", ... },
  { name: "post_comment", description: "leave a review comment", ... },
];
```

Dördünü de implement ettim. Gerçek dosya sistemi erişimi. Gerçek git invocation. Gerçek GitHub API call. Toplam belki dört saat. Sonra gerçek bir PR üzerinde agent'ı çalıştırdım.

Olan şu: agent önce `get_diff`'i çağırdı (iyi), sonra diff'teki her identifier için `search_code` çağırdı (felaket — diff 200 satırdı, 50 unique identifier, rate limit'im tükendi). `read_file`'ı hiç çağırmadı çünkü diff zaten context'i içeriyordu. `post_comment`'ı sonunda bir kez, inline yorum yerine 4,000 kelimelik bir makale ile çağırdı.

Dört "gerçek" tool'umun üçü ya yanlış kullanıldı ya da hiç kullanılmadı. Agent tasarımı yanlıştı, implementation'lar değil. Loop'u mock response'larla önce çalıştırsaydım şunları görecektim:

1. 50 kez `search_code` çağırdığını gördüm → tool'u `search_code(query, limit=5)` olarak böldüm, açık budget'la.
2. `read_file`'ı hiç kullanmadığını gördüm → sildim, bir saat tasarruf ettim.
3. `post_comment`'ın `post_essay` gibi kullanıldığını gördüm → `post_inline_comment(line, body)` ve `post_summary(body)` olarak böldüm.

Bu müdahale tool'lar mock'landığında on beş dakika sürüyor. Gerçek olduklarında bir gün sürüyor.

## Rol-yapma pattern'i

Hile şaşırtıcı derecede basit: tool schema'larını yaz, Claude'a gerçek bir user mesajı gönder, model bir `tool_use` block ürettiğinde *sen* sonucu el ile yazıp geri besle. Loop uçtan uca çalışıyor, ama sen her tool'u oynuyorsun.

Kod tarafında, bu herkesin yazdığı aynı agent loop:

```ts
while (true) {
  const res = await callClaude({ messages, tools });
  if (res.stop_reason === "end_turn") break;
  
  const toolUses = res.content.filter(b => b.type === "tool_use");
  const toolResults = toolUses.map(t => ({
    type: "tool_result",
    tool_use_id: t.id,
    content: PROMPT_USER_FOR_RESULT(t.name, t.input),  // <-- bunu sen dolduruyorsun
  }));
  
  messages.push({ role: "assistant", content: res.content });
  messages.push({ role: "user", content: toolResults });
}
```

Bunun "gerçek" bir agent loop'tan tek farkı `PROMPT_USER_FOR_RESULT` çağrısı — bir fonksiyon çalıştırmak yerine, modelin neyi hangi argümanlarla çağırdığını sana gösteriyor, ve cevabı yazmanı bekliyor.

Ortaya çıkan şey şaşırtıcı bilgi yoğunluğunda:

- **Model beklediğim tool'u mu seçti?** Beklemediğin bir yol seçtiyse, şeman söylediğinden farklı bir şey sinyalliyor.
- **Input şekli JSON schema'ma uydu mu?** Model şemaya uyum sağlamak için zorlanıyorsa, şema ya çok katı ya çok gevşek.
- **Kaç tool zincirledi?** Bir soruyu cevaplamak için 12-adımlı tool zinciri, toolset'i yanlış böldüğüne işaret.
- **Tool kullanmadan önce takip soruları sordu mu?** İyi — model disambiguate etmeye çalışıyor demek. Sormuyorsa, prompt'un istemiyor demek.

Tüm bunları beş dakikalık bir konuşmada görüyorsun, henüz tek satır gerçek implementation yazmadan.

## Rol-yapma'yı ne zaman bırakırsın

Sandbox kalıcı bir state değil. Bir faz. Üç soruya cevap verene kadar çalıştırıyorsun:

1. **Bunlar doğru tool'lar mı?** — Bazıları siliniyor, bazıları bölünüyor, bazıları birleşiyor. Genellikle başlangıç toolset'inin %30-50'si gerçek bir prompt'la temasa hayatta kalmıyor.
2. **Şemalar yeterince sıkı mı?** — Modelin garip argüman değerleri seçtiğini görürsün; şemayı kısıtlarsın (string yerine enum, optional yerine required).
3. **Agent loop bitiyor mu?** — Bazı agent'lar belirsiz durdurma kriterleri varsa sonsuza dek tool çağırmaya devam ediyor. Mock-response loop'u bunu hemen yüzeye çıkarıyor çünkü *sen* response yazmakta sıkışıp kalan kişisin.

Bu üçü birkaç gerçek prompt üzerinde stabil olduğunda, gerçek implementation'ları yazıyorsun. Implementation işi şimdi de-risk edildi: hangi tool'ları gerçekten kuracağını biliyorsun, ve şemalar yerleşmiş.

Tasarruf ettiğin şey implementation süresi değil — rework. Bir tool'u sıfırdan yazmak hızlı. Şeması yanlış olduğu için bir tool'u yeniden yazmak, sonra yeni şema farklı framing istediği için prompt'u güncellemek, sonra her regression input'unu yeniden çalıştırmak — günleri yiyen bu.

## Bu tool-lab'de nasıl görünüyor

[**tool-lab**](https://tool-lab-bice.vercel.app), her seferinde bir proje kurmadan bunu yapmak için inşa ettiğim şey. Üç panel:

```
┌─ Tools (JSON editor) ─────────┬─ Conversation ────────────────────┐
│ [                             │  user: bu PR'ı incele             │
│   { "name": "read_file", ... },│  assistant: Diff'i alacağım.      │
│   { "name": "search_code"...},│    → tool_use: get_diff()         │
│   { "name": "get_diff", ... },│    ← tool_result: <SEN YAZ>       │
│   { "name": "post_comment"...}│  assistant: ...                   │
│ ]                             │                                    │
└───────────────────────────────┴───────────────────────────────────┘
```

Tool schema'larını sola yapıştırıyorsun. User mesajını yazıyorsun. Model response'unu sağa stream'liyor. Bir `tool_use` block geldiğinde, conversation result için bir text field ile duruyor. Tool'un dönecek olduğu her ne ise yazıyorsun — JSON, string, error, ne olursa. Continue'ya basıyorsun. Loop senin sahte sonucunla yeniden çalışıyor.

Yaklaşık 12KB ilgili mantık, [burada](https://ferhatatagun.com/blog/tarayicida-claude-streaming-sdk-siz) yazdığım paylaşılan SSE client'ın üstünde. BYOK, backend yok, tool schema'ların ve konuşmaların yalnızca `localStorage`'da yaşıyor. Kendi tool'unu yazmadan loop'u görebilmen için `?demo=1`'de seed'lenmiş bir demo konuşması var.

Fark ettiğim şey: herhangi bir yeni agent için tool-lab session'ı on-yirmi dakika sürüyor. Çıkan agent tasarımı, sezgiden yazdığımdan tutarlı şekilde %30-50 daha küçük. Daha az, daha odaklı tool'lara sahip daha küçük agent'lar, production'da bir şey ters gittiğinde reason etmek için de dramatik şekilde daha kolay — sandbox fazını yapmanın diğer payı bu.

## Bu hafta ne yapmanı tavsiye ediyorum

Üç eskalasyon hamlesi:

1. **Bugün (10 dakika):** Zaten üzerinde çalıştığın bir agent al. Tool schema'larını tool-lab'e yapıştır, gerçek bir user mesajı gönder, ne olacağını gör. Agent yanlış tool'ları seçiyor ya da doğruları sürpriz şekillerde kullanıyorsa, yeni bir şey öğrendin.

2. **Bu sprint (bir öğleden sonra):** Ekibinizdeki yeni agent'lar için "implementation'dan önce sandbox" varsayılan olsun. Önce tool schema'larını ayağa kaldır, beş temsili prompt rol-yap, sonra yalnızca hayatta kalan tool'lar için implementation yaz. Sayıyı takip et: kaç başlangıç tool'u hayatta kaldı.

3. **Bu çeyrek (bir alışkanlık):** Production'da bir agent'la bir şey ters gittiğinde — yanlış tool seçildi, garip argüman şekli, sonsuz loop — implementation'ı debug etmeden önce trace'i sandbox'a düşür. Bug genellikle tasarımda, kodda değil.

Tool implementation'ları agent geliştirmenin zor kısmı değil. *Tool tasarımı*. Güvenilir agent'lar shipleyen ekipleri "çoğunlukla çalışan" agent'lar shipleyen ekiplerden ayıran şey, tool fonksiyonlarının kalitesi değil; fonksiyonu yazmadan önce öldürdükleri kötü tool tasarımlarının sayısı.

Bunun için bir framework'e ihtiyacın yok. Bir satıcıya ihtiyacın yok. On beş dakikaya ve her tool'un rolünü el ile oynama isteğine ihtiyacın var, ta ki hangilerinin gerçek olmayı hak ettiğini bilene kadar.

---

Bu [**tool-lab**](https://tool-lab-bice.vercel.app)'a shipledim — tool tanımla, response mock'la, agent loop'u izle. BYOK, backend yok, tarayıcıda çalışıyor. Kaynak: [github.com/ferhatatagun/tool-lab](https://github.com/ferhatatagun/tool-lab).

Aynı SSE client ayrıca üç kardeş tool'a güç veriyor — [claudoscope](https://claudoscope-labs.vercel.app), [agent-replay](https://agentreplay.vercel.app), [prompt-lab](https://prompt-lab-promptly.vercel.app). Hepsi açık kaynak, hepsi BYOK: [ferhatatagun.com/tools](https://ferhatatagun.com/tools).
