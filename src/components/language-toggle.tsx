"use client";

import { useId } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Locale } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  const id = useId();

  return (
    <RadioGroup
      value={locale}
      onValueChange={(value) => {
        if (value === "en" || value === "zh") setLocale(value);
      }}
      orientation="horizontal"
      aria-label={t("lang.switch")}
      className="flex items-center gap-4"
    >
      {OPTIONS.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupItem
            value={option.value}
            id={`${id}-${option.value}`}
            className="peer"
          />
          <label
            htmlFor={`${id}-${option.value}`}
            className="cursor-pointer text-xs font-medium text-muted-foreground transition-colors peer-data-[state=checked]:text-foreground"
          >
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
