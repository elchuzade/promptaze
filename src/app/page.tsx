import fs from "fs";
import path from "path";
import Link from "next/link";
import { CONTENT_DIR } from "@/lib/paths";

export default function Home() {
  const categories = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, "categories.json"), "utf8"),
  );

  return (
    <main>
      <section className="mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
          Promptaze
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Azərbaycan dilində AI prompt kitabxanası — hazır promptlarla daha
          sürətli nəticə əldə edin.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Kateqoriyalar
        </h2>
        <ul className="grid gap-3 sm:gap-4">
          {categories.map((c: { slug: string; title: string }) => (
            <li key={c.slug}>
              <Link
                href={`/prompts/${c.slug}`}
                className="block rounded-xl border border-card-border bg-card p-4 sm:p-5 text-foreground font-medium shadow-sm transition hover:border-accent/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent font-semibold text-lg">
                    {c.title.charAt(0)}
                  </span>
                  {c.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
