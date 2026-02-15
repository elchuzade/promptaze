import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { NavLinks } from "./components/nav-links";
import { PlausibleInit } from "./plausible-init";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <PlausibleInit />
        <header className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-accent transition-colors"
            >
              <span className="text-2xl" aria-hidden>
                ⚡
              </span>
              PromptAZE
            </Link>
            <nav className="flex items-center gap-6 text-sm text-foreground">
              <NavLinks />
            </nav>
          </div>
        </header>
        <div className="flex-1 w-full mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
          {children}
        </div>
        <footer className="border-t border-border/60 py-6 mt-auto">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center text-sm text-muted-foreground">
            Azərbaycan dilində AI prompt kitabxanası
          </div>
        </footer>
      </body>
    </html>
  );
}
