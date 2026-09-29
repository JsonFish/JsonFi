"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  type Locale,
  LOCALE_STORAGE_KEY,
  translate,
  type MessageKey,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
};

const LanguageContext = React.createContext<LanguageContextValue | undefined>(
  undefined
);

function applyDocumentLang(locale: Locale) {
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
}

function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_STORAGE_KEY}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // The cookie still allows server-rendered content to follow this choice.
  }
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale);

  React.useEffect(() => {
    // Migrate the old localStorage-only preference once. Cookies are the source
    // of truth afterwards so the server and browser agree on the first render.
    const cookie = document.cookie.split("; ").find((item) =>
      item.startsWith(`${LOCALE_STORAGE_KEY}=`),
    )?.split("=")[1];
    let next = cookie === "zh" || cookie === "en" ? cookie : initialLocale;
    if (cookie !== "zh" && cookie !== "en") {
      try {
        const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (saved === "zh" || saved === "en") next = saved;
      } catch {
        // Use the server locale when storage is unavailable.
      }
    }
    setLocaleState(next);
    persistLocale(next);
    applyDocumentLang(next);
    if (next !== initialLocale) router.refresh();
  }, [initialLocale, router]);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
    applyDocumentLang(next);
    router.refresh();
  }, [router]);

  const t = React.useCallback(
    (key: MessageKey) => translate(locale, key),
    [locale]
  );

  const value = React.useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
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
