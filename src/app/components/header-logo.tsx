"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const THEME_CHANGE_EVENT = "promptaze-theme-change";

function getThemeFromDOM(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function HeaderLogo() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setTheme(getThemeFromDOM());

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: "light" | "dark" }>;
      if (customEvent.detail?.theme) setTheme(customEvent.detail.theme);
    };

    document.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => document.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, [mounted]);

  // Observe class changes on <html> in case theme is set elsewhere (e.g. initial script)
  useEffect(() => {
    if (!mounted) return;
    const observer = new MutationObserver(() => setTheme(getThemeFromDOM()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [mounted]);

  const logoSrc =
    theme === "dark"
      ? "/promptaze-logo-full-light.png"
      : "/promptaze-logo-full-dark.png";

  return (
    <Link
      href="/"
      className="flex items-center text-foreground hover:opacity-90 transition-opacity"
      aria-label="Promptaze — Ana səhifə"
    >
      {mounted ? (
        <img
          src={logoSrc}
          alt="Promptaze"
          className="h-8 w-auto"
          key={logoSrc}
        />
      ) : (
        <span className="h-8 w-20 bg-border/50 animate-pulse rounded" aria-hidden />
      )}
    </Link>
  );
}
