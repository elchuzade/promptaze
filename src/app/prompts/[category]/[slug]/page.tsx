import Link from "next/link";
import { getCategoryTitle } from "@/lib/categories";
import { getPrompt } from "@/lib/prompts";
import CopyButton from "./copy-button";

export default async function PromptPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const prompt = await getPrompt(category, slug);
  if (!prompt) {
    return (
      <main>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          ← Ana səhifə
        </Link>
        <p className="text-muted-foreground">Prompt tapılmadı.</p>
      </main>
    );
  }

  return (
    <main>
      <Link
        href={`/prompts/${category}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← {getCategoryTitle(category)}
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          {prompt.meta.title}
        </h1>
        <CopyButton
          text={prompt.promptText}
          slug={prompt.slug}
          category={prompt.category}
        />
      </div>

      <article
        className="prose-prompt rounded-xl border border-card-border bg-card p-6 sm:p-8"
        dangerouslySetInnerHTML={{ __html: prompt.html }}
      />
    </main>
  );
}
