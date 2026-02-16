import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Necə istifadə edim?",
  description:
    "Promptaze-də promptları necə tapmaq, kopyalamaq və öz ehtiyacınıza uyğunlaşdırmaq olar — addım-addım təlimat.",
};

export default function OyrenPage() {
  return (
    <main>
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← Ana səhifə
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
        Necə istifadə edim?
      </h1>

      <div className="prose-prompt max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            1. Prompt tapın
          </h2>
          <p className="text-muted-foreground">
            <Link href="/kitabxana" className="text-accent hover:underline">
              Prompt Kitabxanası
            </Link>{" "}
            səhifəsində kateqoriyaya görə filtrləyin və ya üst hissədəki axtarışdan istifadə edin. Biznes, marketinq, proqramlaşdırma və digər sahələr üçün hazır promptlar var.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            2. Promptu kopyalayın
          </h2>
          <p className="text-muted-foreground">
            Hər prompt kartında və ya prompt səhifəsində &quot;Promptu kopyala&quot; / &quot;Kopyala&quot; düyməsinə basın. Bütün mətn buferə kopyalanır. Sonra ChatGPT, Gemini, Claude və ya istədiyiniz AI alətinin çatına yapışdırın.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            3. Öz ehtiyacınıza uyğunlaşdırın
          </h2>
          <p className="text-muted-foreground">
            Promptlar şablon kimi nəzərdə tutulub. Mətn içindəki [məsələn: startap ideyası], [mətn] və s. yerləri öz məlumatlarınızla əvəz edin. Nəticəni yoxlayın və lazım gələrsə təkrarlayın.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            4. Töhfə verin
          </h2>
          <p className="text-muted-foreground">
            Öz hazırladığınız və ya işlədiyiniz promptları icma ilə paylaşmaq istəyirsinizsə,{" "}
            <a
              href="https://github.com/elchuzade/promptaze"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub-da töhfə verin
            </a>
            . Bir Markdown faylı əlavə etmək kifayətdir.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Link
          href="/kitabxana"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
        >
          Promptlara bax
          <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
