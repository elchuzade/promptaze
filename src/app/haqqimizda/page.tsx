import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "Promptaze — Azərbaycan dilində ilk açıq AI prompt kitabxanası. Məqsəd, icma və əlaqə.",
};

export default function HaqqimizdaPage() {
  return (
    <main>
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← Ana səhifə
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
        Haqqımızda
      </h1>

      <div className="prose-prompt max-w-none space-y-6">
        <p className="text-muted-foreground text-lg">
          <strong className="text-foreground">Promptaze</strong> — Azərbaycan dilində ilk açıq AI prompt kitabxanasıdır. Məqsədimiz hazır, işlənmiş promptları bir yerdə toplamaq və hər kəsin AI-dan daha effektiv istifadə etməsinə kömək etməkdir.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Nə təklif edirik?
          </h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Biznes, marketinq, proqramlaşdırma və digər sahələr üçün promptlar</li>
            <li>Bir kliklə kopyalama</li>
            <li>Kateqoriya və axtarış ilə asan naviqasiya</li>
            <li>Tamamilə pulsuz və açıq mənbə</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            İcma layihəsi
          </h2>
          <p className="text-muted-foreground">
            Promptaze icma tərəfindən doldurulur. Yeni prompt əlavə etmək, mövcud promptları təkmilləşdirmək və ya təkliflər göndərmək üçün{" "}
            <a
              href="https://github.com/elchuzade/promptaze"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub-da iştirak edin
            </a>
            . Hər töhfə kitabxananı daha faydalı edir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Əlaqə
          </h2>
          <p className="text-muted-foreground">
            Təklif, sual və ya əməkdaşlıq üçün{" "}
            <a
              href="https://github.com/elchuzade/promptaze"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>{" "}
            vasitəsilə yaza bilərsiniz.
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/kitabxana"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
        >
          Prompt Kitabxanası
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/oyren"
          className="inline-flex items-center rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/50 transition"
        >
          Necə istifadə edim?
        </Link>
      </div>
    </main>
  );
}
