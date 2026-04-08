"use client";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.switch")}
      className="inline-flex rounded-full border border-zinc-200 dark:border-zinc-700 p-0.5 bg-zinc-50/80 dark:bg-zinc-900/50"
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-full transition-colors",
              active
                ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            )}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
