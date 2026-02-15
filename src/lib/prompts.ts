import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { CONTENT_DIR } from "./paths";

const ROOT = path.join(CONTENT_DIR, "prompts");
console.log("PROMPTS ROOT:", ROOT);

export async function getAllPrompts() {
  const categories = fs.readdirSync(ROOT);
  const prompts = [];
  for (const category of categories) {
    const dir = path.join(ROOT, category);
    if (!fs.statSync(dir).isDirectory()) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const slug = file.replace(".md", "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);

      const htmlContent = String(await remark().use(html).process(content));
      const promptText = raw.split("PROMPT:")[1]?.trim() ?? "";

      prompts.push({
        slug,
        category,
        meta: data,
        html: htmlContent,
        promptText,
      });
    }
  }

  return prompts;
}

export async function getPromptsByCategory(category: string) {
  return (await getAllPrompts()).filter((p) => p.category === category);
}

export async function getPrompt(category: string, slug: string) {
  return (await getAllPrompts()).find(
    (p) => p.category === category && p.slug === slug,
  );
}
