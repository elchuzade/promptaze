"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE, getStoredToken, getTokenPayload } from "@/lib/admin-auth";

type CategoryFromApi = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
};

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const p = await params;
      setResolvedSlug(p.slug);
    })();
  }, [params]);

  useEffect(() => {
    const payload = getTokenPayload();
    if (payload && payload.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    async function loadCategory(slug: string) {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE}/categories/${encodeURIComponent(slug)}`,
        );
        if (!res.ok) {
          throw new Error("Kateqoriya tapılmadı və ya gətirilə bilmədi.");
        }
        const data = (await res.json()) as {
          category: CategoryFromApi;
        };
        setTitle(data.category.title);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Məlumat yüklənə bilmədi.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    if (resolvedSlug) {
      loadCategory(resolvedSlug);
    }
  }, [resolvedSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resolvedSlug) return;

    setError(null);
    setSuccess(null);

    const token = getStoredToken();
    if (!token) {
      setError("Bu əməliyyat üçün əvvəlcə admin kimi giriş etməlisiniz.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        `${API_BASE}/categories/${encodeURIComponent(resolvedSlug)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
          }),
        },
      );

      if (!res.ok) {
        const bodyJson = await res.json().catch(() => ({}));
        const message =
          (bodyJson?.error as string | undefined) ??
          "Kateqoriya yenilənə bilmədi.";
        throw new Error(message);
      }

      setSuccess("Kateqoriya uğurla yeniləndi.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Xəta baş verdi. Yenidən yoxlayın.";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  if (isAdmin === null || loading || !resolvedSlug) {
    return (
      <main className="max-w-md mx-auto">
        <p className="text-muted-foreground">Yüklənir...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="max-w-md mx-auto">
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
    <main className="max-w-md mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← Ana səhifə
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Kateqoriyanı redaktə et
      </h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Mövcud kateqoriyanın başlığını yeniləyə bilərsiniz.
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Slug:{" "}
        <span className="font-mono bg-muted px-1.5 py-0.5 rounded">
          {resolvedSlug}
        </span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-card-border bg-card p-6 shadow-sm"
      >
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
          disabled={saving}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background w-full"
        >
          {saving ? "Yenilənir..." : "Yenilə"}
        </button>
      </form>
    </main>
  );
}

