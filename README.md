# Promptaze

**Azərbaycan dilində AI prompt kitabxanası** — hazır promptlarla daha yaxşı nəticələr əldə edin.

Promptaze is an open collection of ready-to-use AI prompts in Azerbaijani. Copy, adapt, and share prompts for business, marketing, development, and more. Every new prompt helps the whole community work smarter with AI.

---

## ✨ Why contribute?

- **One prompt can help hundreds of people** — your idea might be exactly what someone needs.
- **It’s quick** — add a single Markdown file, no code required.
- **You’ll be credited** — every contributor makes this library better for everyone.

Whether you share one prompt or ten, you’re making AI more useful for Azerbaijani speakers.

---

## 🚀 Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Your new prompts will show up as soon as you add the files.

---

## 📝 Add a new prompt (3 steps)

### 1. Choose a category

Current categories live in `src/content/categories.json`. Use one of the existing slugs:

| Slug       | Title                      |
| ---------- | -------------------------- |
| `biznes`   | Biznes və Startaplar       |
| `marketinq`| Marketinq və Sosial Media  |
| `dev`      | Proqramlaşdırma və Veb     |

If you want a **new category**, add it to `categories.json` and create a folder with the same slug under `src/content/prompts/`.

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

---

## 📄 Example

See a real prompt: [`src/content/prompts/biznes/biznes-plani.md`](src/content/prompts/biznes/biznes-plani.md).

---

## 🤝 How to submit

1. **Fork** the repo.
2. **Add or edit** prompt files under `src/content/prompts/` (and `categories.json` if you add a category).
3. **Open a Pull Request** with a short description of what you added.

No need to change any code — only Markdown. We’ll review and merge as soon as we can.

---

## 🛠 Tech

- [Next.js](https://nextjs.org) · [React](https://react.dev) · [Tailwind CSS](https://tailwindcss.com)
- Content: Markdown with frontmatter, parsed at build time.

---

Thank you for contributing. Every prompt makes Promptaze more useful for everyone.
