import Link from "next/link";
import { getCategoryTitle } from "@/lib/categories";
import { getPromptsByCategory } from "@/lib/prompts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryTitle = getCategoryTitle(category);
  const prompts = await getPromptsByCategory(category);

  if (!prompts.length) {
    return (
      <main>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          ← Ana səhifə
        </Link>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {categoryTitle}
        </h2>
        <p className="text-muted-foreground">
          Bu kateqoriyada hələ prompt yoxdur.
        </p>
      </main>
    );
  }

  return (
    <main>
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← Ana səhifə
      </Link>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
        {categoryTitle}
      </h2>

      <ul className="grid gap-2">
        {prompts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/prompts/${p.category}/${p.slug}`}
              className="flex items-center gap-3 rounded-lg border border-transparent bg-transparent py-3 px-2 -mx-2 text-foreground transition hover:bg-card hover:border-card-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              <span className="font-medium">{p.meta.title}</span>
              <span className="text-muted-foreground text-sm">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
