"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ThemeToggle } from "./theme-toggle";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const navItems = [
  { href: "/", label: "Ana Səhifə" },
  { href: "/kitabxana", label: "Prompt Kitabxanası" },
  { href: "/oyren", label: "Öyrən" },
  { href: "/haqqimizda", label: "Haqqımızda" },
] as const;

export function HeaderNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, mounted]);

  const linkClass = (href: string) =>
    `block py-3 px-4 rounded-lg hover:bg-chip-inactive hover:text-accent transition-colors ${
      pathname === href ? "text-accent font-medium" : ""
    }`;

  const mobileMenuEl =
    mobileOpen && mounted ? (
      <div
        className="fixed inset-0 z-[100] md:hidden"
        style={{ isolation: "isolate" }}
      >
        {/* Backdrop - covers entire viewport, blocks interaction with content */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden
        />
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 cursor-default"
          aria-label="Menunu bağla"
          tabIndex={-1}
        />
        {/* Panel - above backdrop */}
        <div
          className="absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-card border-l border-border shadow-2xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Naviqasiya menyusu"
        >
          <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
            <span className="font-semibold text-foreground">Menyu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-foreground hover:bg-chip-inactive focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Menunu bağla"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col p-3 text-foreground overflow-auto">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={linkClass(href)}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://promptaze.featurebase.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-chip-inactive hover:text-accent transition-colors"
            >
              Rəy bildir
            </a>
            <a
              href="https://github.com/elchuzade/promptaze"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 py-3 px-4 rounded-lg hover:bg-chip-inactive hover:text-accent transition-colors"
            >
              <GitHubIcon className="size-5" />
              Contribute
            </a>
          </nav>
        </div>
      </div>
    ) : null;

  return (
    <>
      {/* Desktop nav - hidden on mobile */}
      <nav className="hidden md:flex items-center gap-6 text-sm text-foreground">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`hover:text-accent transition-colors ${
              pathname === "/kitabxana" && href === "/kitabxana"
                ? "text-accent border-b-2 border-accent pb-0.5"
                : pathname === href
                  ? "text-accent"
                  : ""
            }`}
          >
            {label}
          </Link>
        ))}
        <a
          href="https://promptaze.featurebase.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-accent transition-colors"
        >
          Rəy bildir
        </a>
        <a
          href="https://github.com/elchuzade/promptaze"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-accent transition-colors"
        >
          <GitHubIcon className="size-5" />
          <span>Contribute</span>
        </a>
        <ThemeToggle />
      </nav>

      {/* Mobile: theme toggle + burger */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-foreground hover:bg-chip-inactive focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Menunu aç"
          aria-expanded={mobileOpen}
        >
          <MenuIcon className="size-6" />
        </button>
      </div>

      {/* Mobile menu: render in portal so z-index stacks above everything */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(mobileMenuEl, document.body)}
    </>
  );
}
