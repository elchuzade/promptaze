"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { CategoryIcon } from "./category-icon";
import { API_BASE, getStoredToken, getTokenPayload } from "@/lib/admin-auth";

type Category = { slug: string; title: string };

type PromptItem = {
  slug: string;
  category: string;
  meta: { title?: string };
  description: string;
  promptText: string;
};

type LibraryWithSearchProps = {
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

export function LibraryWithSearch({
  categories,
  prompts,
}: LibraryWithSearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
   const [deletePromptSlug, setDeletePromptSlug] = useState<string | null>(null);
   const [deleteCategorySlug, setDeleteCategorySlug] = useState<string | null>(null);
   const [deleteLoading, setDeleteLoading] = useState(false);
   const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const payload = getTokenPayload();
    if (payload && payload.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const filtered = useMemo(() => {
    let list = categoryFilter === null
      ? prompts
      : prompts.filter((p) => p.category === categoryFilter);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          (p.meta.title ?? "").toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q) ||
          (p.slug ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [prompts, categoryFilter, search]);

  async function handleCopy(p: PromptItem) {
    await navigator.clipboard.writeText(p.promptText);
    track("prompt_copy", { prompt: p.slug, category: p.category });
    setCopiedSlug(p.slug);
    setTimeout(() => setCopiedSlug(null), 1200);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar - filters */}
        <aside className="lg:w-56 shrink-0">
        <h2 className="text-sm font-medium text-foreground mb-3">
          Kateqoriya
        </h2>
          <nav className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setCategoryFilter(null)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
              categoryFilter === null
                ? "bg-accent text-white"
                : "text-foreground hover:bg-chip-inactive"
            }`}
          >
            Hamısı
          </button>
          {categories.map((c) => (
            <div key={c.slug} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCategoryFilter(c.slug)}
                className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                  categoryFilter === c.slug
                    ? "bg-accent text-white"
                    : "text-foreground hover:bg-chip-inactive"
                }`}
              >
                <CategoryIcon slug={c.slug} className="size-4 shrink-0" />
                {c.title}
              </button>
              {isAdmin && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/admin/categories/edit/${c.slug}`)
                    }
                    className="inline-flex items-center rounded-lg px-2 py-1 text-[11px] font-medium text-accent border border-accent/40 bg-accent/5 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
                    title="Kateqoriyanı redaktə et"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteError(null);
                      setDeleteCategorySlug(c.slug);
                    }}
                    className="inline-flex items-center rounded-lg px-2 py-1 text-[11px] font-medium text-red-500 border border-red-500/40 bg-red-500/5 hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Kateqoriyanı sil"
                  >
                    Del
                  </button>
                </>
              )}
            </div>
          ))}
          {isAdmin && (
            <button
              type="button"
              onClick={() => router.push("/admin/categories/new")}
              className="mt-3 inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-medium text-accent border border-accent/40 bg-accent/5 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Yeni kateqoriya əlavə et
            </button>
          )}
        </nav>
      </aside>

      {/* Main: search + grid */}
      <div className="flex-1 min-w-0">
        {/* Search */}
        <div className="relative mb-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden>
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Promptda axtar..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            aria-label="Promptda axtar"
          />
        </div>

        <div className="flex items-center justify-between mb-4 gap-2">
          <p className="text-sm text-muted-foreground">
            {filtered.length} nəticə
          </p>
          {isAdmin && (
            <button
              type="button"
              onClick={() => router.push("/admin/prompts/new")}
              className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-accent border border-accent/40 bg-accent/5 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Yeni prompt əlavə et
            </button>
          )}
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
                <div className="flex items-center gap-1">
                  {isAdmin && (
                    <Link
                      href={`/admin/prompts/edit/${p.slug}`}
                      className="relative z-10 inline-flex items-center rounded-lg px-2 py-1 text-[11px] font-medium text-accent border border-accent/40 bg-accent/5 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </Link>
                  )}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteError(null);
                        setDeletePromptSlug(p.slug);
                      }}
                      className="relative z-10 inline-flex items-center rounded-lg px-2 py-1 text-[11px] font-medium text-red-500 border border-red-500/40 bg-red-500/5 hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                      title="Promptu sil"
                    >
                      Del
                    </button>
                  )}
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

        {filtered.length === 0 && (
          <p className="text-muted-foreground py-8 text-center">
            Axtarışa uyğun prompt tapılmadı. Başqa açar söz və ya kateqoriya sınayın.
          </p>
        )}
      </div>
    </div>

    {(deletePromptSlug || deleteCategorySlug) && (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-sm rounded-xl bg-card border border-card-border p-5 shadow-lg">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            Silmə əməliyyatını təsdiqləyin
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            {deletePromptSlug
              ? `Bu promptu silmək istədiyinizə əminsiniz? Slug: ${deletePromptSlug}`
              : `Bu kateqoriyanı silmək istədiyinizə əminsiniz? Slug: ${deleteCategorySlug}`}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Silinmə geri qaytarıla bilməz. Yalnız admin istifadəçilər bu əməliyyatı edə bilər.
          </p>
          {deleteError && (
            <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2 mb-3">
              {deleteError}
            </p>
          )}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="px-3 py-1.5 text-xs rounded-lg border border-border text-foreground hover:bg-chip-inactive focus:outline-none focus:ring-2 focus:ring-accent"
              onClick={() => {
                setDeletePromptSlug(null);
                setDeleteCategorySlug(null);
                setDeleteError(null);
              }}
              disabled={deleteLoading}
            >
              Ləğv et
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
              disabled={deleteLoading}
              onClick={async () => {
                setDeleteError(null);
                const token = getStoredToken();
                if (!token) {
                  setDeleteError("Silmək üçün əvvəlcə admin kimi giriş etməlisiniz.");
                  return;
                }
                setDeleteLoading(true);
                try {
                  if (deletePromptSlug) {
                    const res = await fetch(
                      `${API_BASE}/prompts/${encodeURIComponent(
                        deletePromptSlug,
                      )}`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                    if (!res.ok && res.status !== 204) {
                      const body = await res.json().catch(() => ({}));
                      throw new Error(
                        (body?.error as string | undefined) ??
                          "Prompt silinə bilmədi.",
                      );
                    }
                  } else if (deleteCategorySlug) {
                    const res = await fetch(
                      `${API_BASE}/categories/${encodeURIComponent(
                        deleteCategorySlug,
                      )}`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                    if (!res.ok && res.status !== 204) {
                      const body = await res.json().catch(() => ({}));
                      throw new Error(
                        (body?.error as string | undefined) ??
                          "Kateqoriya silinə bilmədi.",
                      );
                    }
                  }

                  setDeletePromptSlug(null);
                  setDeleteCategorySlug(null);
                  setDeleteError(null);
                  // Admin can refresh to see updated siyahı
                } catch (err) {
                  const message =
                    err instanceof Error
                      ? err.message
                      : "Silinmə zamanı xəta baş verdi.";
                  setDeleteError(message);
                } finally {
                  setDeleteLoading(false);
                }
              }}
            >
              {deleteLoading ? "Silinir..." : "Bəli, sil"}
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
