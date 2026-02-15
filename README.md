# Promptaze

**Azərbaycan dilində AI prompt kitabxanası** - hazır promptlarla daha yaxşı nəticələr əldə edin.

Promptaze is an open collection of ready-to-use AI prompts in Azerbaijani. Copy, adapt, and share prompts for business, marketing, development, and more. Every new prompt helps the whole community work smarter with AI.

**Azərbaycanca:** Promptaze Azərbaycan dilində hazır AI promptlarının açıq kolleksiyasıdır. Biznes, marketinq, proqramlaşdırma və digər sahələr üçün promptları kopyalayın, uyğunlaşdırın və paylaşın. Hər yeni prompt bütün icmanın AI ilə daha effektiv işləməsinə kömək edir.

---

## ✨ Why contribute?

- **One prompt can help hundreds of people** - your idea might be exactly what someone needs.
- **It’s quick** - add a single Markdown file, no code required.
- **You’ll be credited** - every contributor makes this library better for everyone.

Whether you share one prompt or ten, you’re making AI more useful for Azerbaijani speakers.

**Azərbaycanca:** Niyə töhfə verək?

- **Bir prompt yüzlərlə insana kömək edə bilər** - sizin fikriniz kimsə üçün tam ehtiyac olan şey ola bilər.
- **Tezdir** - tək bir Markdown faylı əlavə edin, kod tələb olunmur.
- **Sizin adınız qeyd olunacaq** - hər töhfədar bu kitabxananı hamı üçün daha yaxşı edir.

Bir prompt paylaşsanız da, on paylaşsanız da, AI-i azərbaycan dilində danışanlar üçün daha faydalı edirsiniz.

---

## 🚀 Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Your new prompts will show up as soon as you add the files.

**Azərbaycanca:** Lokal işə salma

Əvvəl `npm install`, sonra `npm run dev` işlədin. Brauzerdə [http://localhost:3000](http://localhost:3000) açın. Yeni promptlar faylları əlavə etdiyiniz kimi səhifədə görünəcək.

---

## 📝 Add a new prompt (3 steps)

### 1. Choose a category

Current categories live in `src/content/categories.json`. Use one of the existing slugs:

| Slug        | Title                     |
| ----------- | ------------------------- |
| `biznes`    | Biznes və Startaplar      |
| `marketinq` | Marketinq və Sosial Media |
| `dev`       | Proqramlaşdırma və Veb    |

If you want a **new category**, add it to `categories.json` and create a folder with the same slug under `src/content/prompts/`.

**Azərbaycanca:** Kateqoriya seçin. Mövcud kateqoriyalar `src/content/categories.json` faylındadır. Yeni kateqoriya istəyirsinizsə, onu `categories.json`-a əlavə edin və `src/content/prompts/` altında eyni adlı qovluq yaradın.

### 2. Create a Markdown file

Add a new `.md` file in the right category folder:

```
src/content/prompts/
  biznes/
    your-prompt-slug.md    ← new file here
  marketinq/
  dev/
```

**Filename** = URL slug (e.g. `biznes-plani.md` → `/prompts/biznes/biznes-plani`).

**Azərbaycanca:** Uyğun kateqoriya qovluğunda yeni `.md` faylı yaradın. Fayl adı URL-da görünəcək (məs: `biznes-plani.md` → `/prompts/biznes/biznes-plani`).

### 3. Use this format

```markdown
---
title: "Your prompt title in Azerbaijani"
category: "biznes"
difficulty: "beginner"
models: ["gemini", "gpt"]
tags: ["tag1", "tag2"]
---

One short paragraph describing what this prompt does. It appears above the prompt on the site.

PROMPT:

The actual prompt text that users will copy. Write it in Azerbaijani (or the language you prefer).
Include instructions, placeholders, or structure.

[User fills in or replaces this part]
```

**Rules:**

- **Frontmatter** (between `---`) is required: `title`, `category`. The rest is optional.
- **Description** = everything above the line `PROMPT:` (first paragraph is shown on the library cards).
- **Copyable prompt** = everything below `PROMPT:` (this is what gets copied when someone clicks “Copy”).

**Azərbaycanca:** Bu formatı istifadə edin.

- **Frontmatter** (`---` arasında) mütləqdir: `title`, `category`. Qalanı istəyə bağlıdır.
- **Təsvir** = `PROMPT:` sətrindən əvvəlki mətin (ilk abzas kitabxana kartlarında göstərilir).
- **Kopyalanan prompt** = `PROMPT:`-dan sonrakı mətin (istifadəçi "Kopyala" düyməsini basanda bu hissə kopyalanır).

---

## 📄 Example

See a real prompt: [`src/content/prompts/biznes/biznes-plani.md`](src/content/prompts/biznes/biznes-plani.md).

**Azərbaycanca:** Nümunə prompt: [`src/content/prompts/biznes/biznes-plani.md`](src/content/prompts/biznes/biznes-plani.md).

---

## 🤝 How to submit

1. **Fork** the repo.
2. **Add or edit** prompt files under `src/content/prompts/` (and `categories.json` if you add a category).
3. **Open a Pull Request** with a short description of what you added.

No need to change any code - only Markdown. We’ll review and merge as soon as we can.

**Azərbaycanca:** Necə təqdim edək?

1. Repozitoriyanı **fork** edin.
2. `src/content/prompts/` altında prompt fayllarını **əlavə edin və ya redaktə edin** (yeni kateqoriya əlavə etdinizsə, `categories.json`-u da dəyişin).
3. Nə əlavə etdiyinizi qısa izah edən **Pull Request** açın.

Kod dəyişikliyi lazım deyil - yalnız Markdown. Mümkün qədər tez nəzərdən keçirib birləşdirəcəyik.

---

## 🛠 Tech

- [Next.js](https://nextjs.org) · [React](https://react.dev) · [Tailwind CSS](https://tailwindcss.com)
- Content: Markdown with frontmatter, parsed at build time.

**Azərbaycanca:** Texnologiyalar - Next.js, React, Tailwind CSS. Məzmun: frontmatter-li Markdown, build zamanı oxunur.

---

Thank you for contributing. Every prompt makes Promptaze more useful for everyone.

**Azərbaycanca:** Töhfələriniz üçün təşəkkürlər. Hər prompt Promptaze-i hamı üçün daha faydalı edir.
