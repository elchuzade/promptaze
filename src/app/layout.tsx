import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { HeaderNav } from "./components/header-nav";
import { PlausibleInit } from "./plausible-init";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptaze.com";

export const metadata: Metadata = {
  title: {
    default: "Promptaze — Azərbaycan dilində AI prompt kitabxanası",
    template: "%s | Promptaze",
  },
  description:
    "Hazır AI promptlarını kopyalayın, öyrənin və öz ehtiyaclarınıza uyğunlaşdırın. Azərbaycan dilində ilk AI prompt kitabxanası. Biznes, marketinq və proqramlaşdırma üçün pulsuz promptlar.",
  keywords: [
    "AI prompts",
    "Azərbaycan",
    "prompt kitabxanası",
    "ChatGPT",
    "Gemini",
    "biznes",
    "marketinq",
    "proqramlaşdırma",
  ],
  authors: [{ name: "Promptaze" }],
  creator: "Promptaze",
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: siteUrl,
    siteName: "Promptaze",
    title: "Promptaze — Azərbaycan dilində AI prompt kitabxanası",
    description:
      "Hazır AI promptlarını kopyalayın, öyrənin və öz ehtiyaclarınıza uyğunlaşdırın. Azərbaycan dilində ilk AI prompt kitabxanası.",
    images: [
      {
        url: `${siteUrl}/promptaze-post.png`,
        width: 1200,
        height: 630,
        alt: "Promptaze — Azərbaycan dilində AI prompt kitabxanası",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptaze — Azərbaycan dilində AI prompt kitabxanası",
    description:
      "Hazır AI promptlarını kopyalayın, öyrənin və öz ehtiyaclarınıza uyğunlaşdırın. Azərbaycan dilində ilk AI prompt kitabxanası.",
    images: [`${siteUrl}/promptaze-post.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(siteUrl),
};

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=typeof localStorage!=='undefined'&&localStorage.getItem('promptaze-theme');var r=document.documentElement;if(t==='dark'){r.classList.add('dark');r.classList.remove('light');}else if(t==='light'){r.classList.add('light');r.classList.remove('dark');}else{r.classList.remove('light','dark');}})();`,
          }}
        />
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
        <header className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-accent transition-colors"
            >
              <span className="text-2xl" aria-hidden>
                ⚡
              </span>
              Promptaze
            </Link>
            <HeaderNav />
          </div>
        </header>
        <div className="flex-1 w-full mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
          {children}
        </div>
        <footer className="border-t border-border/60 py-6 mt-auto">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-muted-foreground">
            <span>Azərbaycan dilində AI prompt kitabxanası</span>
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
          </div>
        </footer>
      </body>
    </html>
  );
}
