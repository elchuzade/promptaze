"use client";

import { useState } from "react";
import Link from "next/link";
import { loginAdmin, clearStoredToken, getStoredToken } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const result = await loginAdmin(email, password);
      setSuccess(
        `Giriş uğurludur. İstifadəçi: ${result.user.email} (${result.user.role}). Token localStorage-də saxlanıldı.`,
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Giriş zamanı xəta baş verdi.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearStoredToken();
    setSuccess("Çıxış edildi. Token təmizləndi.");
  }

  const hasToken = typeof window !== "undefined" && !!getStoredToken();

  return (
    <main className="max-w-md mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← Ana səhifə
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Admin Giriş
      </h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Bu səhifə yalnız adminlər üçün nəzərdə tutulmuşdur. Zəhmət olmasa
        idarəetmə panelinə daxil olmaq üçün admin hesabınızın email və şifrəsini
        daxil edin.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-card-border bg-card p-6 shadow-sm"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="admin@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground"
          >
            Şifrə
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="••••••••"
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
          {loading ? "Giriş edilir..." : "Giriş et"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Token vəziyyəti:{" "}
          <span className="font-mono">
            {hasToken ? "mövcuddur" : "tapılmadı"}
          </span>
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="underline underline-offset-2 hover:text-accent"
        >
          Tokeni sil
        </button>
      </div>
    </main>
  );
}

