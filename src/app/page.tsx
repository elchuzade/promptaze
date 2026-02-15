import fs from "fs";
import path from "path";
import Link from "next/link";
import { CONTENT_DIR } from "@/lib/paths";
import { getAllPrompts } from "@/lib/prompts";
import { PromptLibrary } from "./components/prompt-library";

export default async function Home() {
  const categories = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, "categories.json"), "utf8"),
  ) as { slug: string; title: string }[];

  const allPrompts = await getAllPrompts();
  const promptItems = allPrompts.map((p) => ({
    slug: p.slug,
    category: p.category,
    meta: { title: p.meta?.title },
    description: p.description ?? "",
    promptText: p.promptText,
  }));

  return (
    <main>
      {/* Hero - centered */}
      <section className="text-center mb-16 sm:mb-20 pt-4">
        <div className="inline-flex items-center rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-foreground mb-6">
          Azərbaycan dilində AI resursu
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-5 max-w-2xl mx-auto">
          AI ilə daha yaxşı nəticələr əldə edin
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Hazır promptları kopyalayın, öyrənin və öz ehtiyaclarınıza uyğunlaşdırın.
          Azərbaycan dilində ilk AI prompt kitabxanası.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#kitabxana"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            Promptlara bax
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/#kitabxana"
            className="inline-flex items-center rounded-lg border-2 border-border bg-card px-6 py-3 text-base font-medium text-foreground transition hover:border-accent/50 hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            Öyrənməyə başla
          </Link>
        </div>
      </section>

      {/* Prompt library with category filters and cards */}
      <section id="kitabxana" className="scroll-mt-8">
        <PromptLibrary categories={categories} prompts={promptItems} />
      </section>
    </main>
  );
}
