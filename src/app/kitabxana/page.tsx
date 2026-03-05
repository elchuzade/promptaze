import type { Metadata } from "next";
import Link from "next/link";
import { getAllPrompts } from "@/lib/prompts";
import { fetchCategories } from "@/lib/categories";
import { LibraryWithSearch } from "../components/library-with-search";

export const metadata: Metadata = {
  title: "Prompt Kitabxanası",
  description:
    "Kateqoriyaya görə filtr edin, axtarın və Azərbaycan dilində hazır AI promptlarını kopyalayın.",
};

export default async function KitabxanaPage() {
  const categories = await fetchCategories();
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
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← Ana səhifə
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Prompt Kitabxanası
      </h1>
      <p className="text-muted-foreground mb-8">
        Kateqoriyaya görə filtr edin, axtarın və promptları kopyalayın.
      </p>
      <LibraryWithSearch categories={categories} prompts={promptItems} />
    </main>
  );
}
