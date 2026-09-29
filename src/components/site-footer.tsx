"use client";

import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 py-5 text-sm text-zinc-500 dark:border-zinc-800 md:flex-row">
      <div>© 2026 Json. {t("footer.rightsReserved")}</div>
      {/* 备案号是法定标识，中英文一致，因此不进 i18n */}
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        豫ICP备2024057248号
      </a>
      <LanguageToggle />
    </footer>
  );
}
