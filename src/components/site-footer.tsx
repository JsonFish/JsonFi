"use client";

import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 py-5 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-500 flex flex-wrap gap-4 justify-between items-center">
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
