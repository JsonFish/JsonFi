"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";

let pendingArticlePath: string | null = null;
let resetOnNextArticleNavigationUntil = 0;

function normalizePath(path: string) {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
}

export function ArticleLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onNavigate={() => {
        pendingArticlePath = normalizePath(new URL(href, window.location.href).pathname);
        resetOnNextArticleNavigationUntil = Date.now() + 30_000;
      }}
    >
      {children}
    </Link>
  );
}

/** Reset on article-link navigation while allowing browser history restoration. */
export function ArticleScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const shouldReset =
      pathname !== null &&
      pendingArticlePath === normalizePath(pathname) &&
      Date.now() <= resetOnNextArticleNavigationUntil;
    pendingArticlePath = null;
    resetOnNextArticleNavigationUntil = 0;

    // A heading link should keep its target, including on direct visits.
    if (!shouldReset || window.location.hash) return;

    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
