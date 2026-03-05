"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE, getStoredToken, getTokenPayload } from "@/lib/admin-auth";
import type { Category } from "@/lib/categories";

export default function NewPromptPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySlug, setCategorySlug] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [models, setModels] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const payload = getTokenPayload();
    if (payload && payload.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) return;
        const data = (await res.json()) as Category[];
        setCategories(data);
        if (data.length > 0) {
          setCategorySlug(data[0].slug);
        }
      } catch {
        // ignore for now
      }
    }
    loadCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = getStoredToken();
    if (!token) {
      setError("Bu əməliyyat üçün əvvəlcə admin kimi giriş etməlisiniz.");
      return;
    }

    if (!categorySlug) {
      setError("Zəhmət olmasa kateqoriya seçin.");
      return;
    }

    setLoading(true);
    try {
      const modelsArray = models
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch(`${API_BASE}/prompts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          slug,
          category_slug: categorySlug,
          difficulty: difficulty || undefined,
          models: modelsArray.length ? modelsArray : undefined,
          tags: tagsArray.length ? tagsArray : undefined,
          body,
        }),
      });

      if (!res.ok) {
        const bodyJson = await res.json().catch(() => ({}));
        const message =
          (bodyJson?.error as string | undefined) ??
          "Prompt əlavə edilə bilmədi.";
        throw new Error(message);
      }

      setSuccess("Prompt uğurla əlavə edildi.");
      setTitle("");
      setSlug("");
      setDifficulty("");
      setModels("");
      setTags("");
      setBody("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Xəta baş verdi. Yenidən yoxlayın.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (isAdmin === null) {
    return (
      <main className="max-w-2xl mx-auto">
        <p className="text-muted-foreground">Yüklənir...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          ← Ana səhifə
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          İcazə yoxdur
        </h1>
        <p className="text-muted-foreground">
          Bu səhifə yalnız admin istifadəçilər üçün əlçatandır. Zəhmət olmasa
          əvvəlcə admin kimi giriş edin.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← Ana səhifə
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Yeni Prompt
      </h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Buradan yalnız admin istifadəçilər yeni prompt əlavə edə bilərlər.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-card-border bg-card p-6 shadow-sm"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-foreground"
          >
            Kateqoriya
          </label>
          <select
            id="category"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-foreground"
            >
              Başlıq
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="məs: Startap üçün biznes planı"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-foreground"
            >
              Slug
            </label>
            <input
              id="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="məs: business-plan"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-foreground"
            >
              Çətinlik (optional)
            </label>
            <input
              id="difficulty"
              type="text"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="məs: beginner"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="models"
              className="block text-sm font-medium text-foreground"
            >
              Modellər (optional)
            </label>
            <input
              id="models"
              type="text"
              value={models}
              onChange={(e) => setModels(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="məs: gpt, gemini"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-foreground"
            >
              Teqlər (optional)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="vergüllə ayırın"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-foreground"
          >
            Prompt mətnı
          </label>
          <textarea
            id="body"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full min-h-[180px] rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Modelə göndəriləcək əsas prompt mətnini yazın..."
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-emerald-500 bg-emerald-500/10 border border-emerald-500/40 rounded-md px-3 py-2">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background w-full"
        >
          {loading ? "Yaradılır..." : "Prompt əlavə et"}
        </button>
      </form>
    </main>
  );
}

