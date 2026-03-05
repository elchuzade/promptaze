"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE, getStoredToken, getTokenPayload } from "@/lib/admin-auth";

export default function NewCategoryPage() {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = getStoredToken();
    if (!token) {
      setError("Bu əməliyyat üçün əvvəlcə admin kimi giriş etməlisiniz.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slug, title }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message =
          (body?.error as string | undefined) ??
          "Kateqoriya əlavə edilə bilmədi.";
        throw new Error(message);
      }

      setSuccess("Kateqoriya uğurla əlavə edildi.");
      setSlug("");
      setTitle("");
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
        Yeni Kateqoriya
      </h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Yalnız adminlər üçün. Promptlarınızı qruplaşdırmaq üçün yeni kateqoriya
        əlavə edin.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-card-border bg-card p-6 shadow-sm"
      >
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
            placeholder="məs: business"
          />
        </div>

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
            placeholder="məs: Biznes və Startaplar"
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
          {loading ? "Yaradılır..." : "Kateqoriya əlavə et"}
        </button>
      </form>
    </main>
  );
}

