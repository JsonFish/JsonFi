"use client";

import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-50 mx-auto mt-3 flex w-fit max-w-full items-center justify-center rounded-full bg-transparent px-3 py-1.5">
      <div className="flex items-center gap-2 sm:gap-4">
        <NavLinks />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
