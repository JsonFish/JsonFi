"use client";

import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center py-4 bg-background/80 backdrop-blur-md border-b border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 transition-all duration-300">
      <Link
        href="/"
        className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
      >
        JOURNAL
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <NavLinks />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
