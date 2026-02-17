"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "promptaze-theme";

function getStoredTheme(): "light" | "dark" | null {
  if (typeof window === "undefined") return null;
  const t = localStorage.getItem(STORAGE_KEY);
  if (t === "light" || t === "dark") return t;
  return null;
}

function getEffectiveTheme(): "light" | "dark" {
  const stored = getStoredTheme();
  if (stored) return stored;
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setTheme(getEffectiveTheme());
  }, [mounted]);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  const btnBg = "bg-[var(--theme-toggle-bg)]";
  const btnHover = "hover:bg-[var(--theme-toggle-bg-hover)]";

  if (!mounted) {
    return (
      <span
        className={`w-9 h-9 rounded-lg border border-border ${btnBg} inline-flex items-center justify-center`}
        aria-hidden
      >
        <span className="w-4 h-4" />
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`w-9 h-9 rounded-lg border border-border ${btnBg} ${btnHover} text-foreground inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background`}
      aria-label={theme === "dark" ? "Açıq rejimə keç" : "Qaranlıq rejimə keç"}
    >
      {theme === "dark" ? (
        <SunIcon className="w-4 h-4" />
      ) : (
        <MoonIcon className="w-4 h-4" />
      )}
    </button>
  );
}
