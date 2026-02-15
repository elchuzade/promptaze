"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavLinks() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isLibraryActive = pathname === "/" && hash === "#kitabxana";

  return (
    <>
      <Link
        href="/"
        className={`hover:text-accent transition-colors ${
          pathname === "/" && !hash ? "text-accent" : ""
        }`}
      >
        Ana Səhifə
      </Link>
      <Link
        href="/#kitabxana"
        className={`hover:text-accent transition-colors border-b-2 border-transparent ${
          isLibraryActive
            ? "text-accent border-accent"
            : ""
        }`}
      >
        Prompt Kitabxanası
      </Link>
      <Link href="/#öyrən" className="hover:text-accent transition-colors">
        Öyrən
      </Link>
      <Link href="/#haqqımızda" className="hover:text-accent transition-colors">
        Haqqımızda
      </Link>
    </>
  );
}
