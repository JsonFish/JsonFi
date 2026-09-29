import { cookies } from "next/headers";
import { defaultLocale, LOCALE_STORAGE_KEY, type Locale } from "@/lib/i18n";

export async function getRequestLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_STORAGE_KEY)?.value;
  return value === "zh" || value === "en" ? value : defaultLocale;
}
