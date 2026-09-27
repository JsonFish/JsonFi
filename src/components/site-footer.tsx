"use client";

import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 py-5 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-500 flex flex-wrap gap-4 justify-between items-center">
      <div>© 2026 Json. {t("footer.rightsReserved")}</div>
      <LanguageToggle />
    </footer>
  );
}
