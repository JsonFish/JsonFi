"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

type BackLinkProps = {
  href: string;
};

export function BackLink({ href }: BackLinkProps) {
  const { t } = useLanguage();
  return (
    <Link
      href={href}
      className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 inline-block transition-colors"
    >
      {t("info.back")}
    </Link>
  );
}
