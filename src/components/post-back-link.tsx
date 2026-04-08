"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function PostBackLink() {
  const { t } = useLanguage();

  return (
    <Link
      href="/posts"
      className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 inline-block transition-colors"
    >
      {t("post.backToPosts")}
    </Link>
  );
}
