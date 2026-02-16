"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/"
        className={`hover:text-accent transition-colors ${
          pathname === "/" ? "text-accent" : ""
        }`}
      >
        Ana Səhifə
      </Link>
      <Link
        href="/kitabxana"
        className={`hover:text-accent transition-colors border-b-2 border-transparent ${
          pathname === "/kitabxana" ? "text-accent border-accent" : ""
        }`}
      >
        Prompt Kitabxanası
      </Link>
      <Link
        href="/oyren"
        className={`hover:text-accent transition-colors ${
          pathname === "/oyren" ? "text-accent" : ""
        }`}
      >
        Öyrən
      </Link>
      <Link
        href="/haqqimizda"
        className={`hover:text-accent transition-colors ${
          pathname === "/haqqimizda" ? "text-accent" : ""
        }`}
      >
        Haqqımızda
      </Link>
    </>
  );
}
