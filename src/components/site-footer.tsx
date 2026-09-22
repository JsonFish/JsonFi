"use client";

import { LanguageToggle } from "@/components/language-toggle";

export function SiteFooter() {
  return (
    <footer className="mt-20 py-5 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-500 flex flex-wrap gap-4 justify-between items-center">
      <div className="flex gap-4"></div>
      <LanguageToggle />
    </footer>
  );
}
