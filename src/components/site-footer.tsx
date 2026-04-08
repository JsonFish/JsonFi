"use client";

import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { t, tWith } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 py-10 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-500 flex justify-between items-center">
      <p>{tWith("footer.copyright", { year })}</p>
      <div className="flex gap-4">
        <a
          href="#"
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {t("footer.twitter")}
        </a>
        <a
          href="#"
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {t("footer.github")}
        </a>
      </div>
    </footer>
  );
}
