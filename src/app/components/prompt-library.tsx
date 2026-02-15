"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { CategoryIcon } from "./category-icon";

type Category = { slug: string; title: string };

type PromptItem = {
  slug: string;
  category: string;
  meta: { title?: string };
  description: string;
  promptText: string;
};

type PromptLibraryProps = {
  categories: Category[];
  prompts: PromptItem[];
};

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function getCategoryTitle(categories: Category[], slug: string) {
  return categories.find((c) => c.slug === slug)?.title ?? slug;
}

export function PromptLibrary({
  categories,
  prompts,
}: PromptLibraryProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filtered =
    filter === null
      ? prompts
      : prompts.filter((p) => p.category === filter);

  async function handleCopy(p: PromptItem) {
    await navigator.clipboard.writeText(p.promptText);
    track("prompt_copy", { prompt: p.slug, category: p.category });
    setCopiedSlug(p.slug);
    setTimeout(() => setCopiedSlug(null), 1200);
  }

  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Prompt Kitabxanası
      </h2>
      <p className="text-muted-foreground mb-6">
        Kateqoriyaya görə filtr edin və promptları kopyalayın.
      </p>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setFilter(null)}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
            filter === null
              ? "bg-accent text-white"
              : "bg-chip-inactive text-foreground hover:bg-border"
          }`}
        >
          Hamısı
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setFilter(c.slug)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
              filter === c.slug
                ? "bg-accent text-white"
                : "bg-chip-inactive text-foreground hover:bg-border"
            }`}
          >
            <CategoryIcon slug={c.slug} />
            {c.title}
          </button>
        ))}
      </div>

      {/* Prompt cards grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((p) => (
          <article
            key={`${p.category}-${p.slug}`}
            className="relative rounded-xl border border-card-border bg-card p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CategoryIcon slug={p.category} />
                {getCategoryTitle(categories, p.category)}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(p);
                }}
                className="relative z-10 shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-chip-inactive hover:text-foreground transition focus:outline-none focus:ring-2 focus:ring-accent"
                title="Promptu kopyala"
                aria-label="Promptu kopyala"
              >
                {copiedSlug === p.slug ? (
                  <span className="text-xs font-medium text-accent">Kopyalandı</span>
                ) : (
                  <CopyIcon className="size-4" />
                )}
              </button>
            </div>
            <Link
              href={`/prompts/${p.category}/${p.slug}`}
              className="block group"
            >
              <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-accent transition">
                {p.meta.title ?? p.slug}
              </h3>
              {p.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {p.description}
                </p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
