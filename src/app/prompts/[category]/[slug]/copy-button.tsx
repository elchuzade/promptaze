"use client";

import { track } from "@/lib/analytics";
import { useState } from "react";

type CopyButtonProps = {
  text: string;
  slug: string;
  category: string;
};

export default function CopyButton({ text, slug, category }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    track("prompt_copy", { prompt: slug, category });
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-accent text-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70"
    >
      {copied ? (
        <>
          <span className="inline-block size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          Kopyalandı
        </>
      ) : (
        <>
          <svg
            className="size-4"
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
          Promptu kopyala
        </>
      )}
    </button>
  );
}
