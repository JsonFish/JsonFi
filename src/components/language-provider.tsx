"use client";

import * as React from "react";
import {
  type Locale,
  defaultLocale,
  LOCALE_STORAGE_KEY,
  translate,
  translateWith,
  type MessageKey,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
  tWith: (key: MessageKey, vars: Record<string, string | number>) => string;
};

const LanguageContext = React.createContext<LanguageContextValue | undefined>(
  undefined
);

function applyDocumentLang(locale: Locale) {
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale);

  React.useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (saved === "zh" || saved === "en") {
      setLocaleState(saved);
    }
    applyDocumentLang(saved === "zh" || saved === "en" ? saved : defaultLocale);
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    applyDocumentLang(next);
  }, []);

  const t = React.useCallback(
    (key: MessageKey) => translate(locale, key),
    [locale]
  );

  const tWith = React.useCallback(
    (key: MessageKey, vars: Record<string, string | number>) =>
      translateWith(locale, key, vars),
    [locale]
  );

  const value = React.useMemo(
    () => ({ locale, setLocale, t, tWith }),
    [locale, setLocale, t, tWith]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
