"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import type { MessageKey } from "@/lib/i18n";

const LINKS: { href: string; messageKey: MessageKey }[] = [
  { href: "/", messageKey: "nav.home" },
  { href: "/posts", messageKey: "nav.posts" },
  { href: "/notes", messageKey: "nav.notes" },
];

const SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;

export function NavLinks() {
  const pathname = usePathname();
  const { t, locale } = useLanguage();

  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const hasMeasured = useRef(false);

  const x = useMotionValue(0);
  const width = useMotionValue(0);
  const opacity = useMotionValue(0);

  const activeHref =
    LINKS.find(
      (link) =>
        pathname === link.href ||
        (link.href !== "/" && pathname.startsWith(link.href)),
    )?.href ?? null;

  // 在 nav 自身的坐标系里测量（offsetLeft/offsetWidth），不使用
  // getBoundingClientRect，因此页面滚动、header 的位移都不会污染这条指示条。
  const measure = useCallback(() => {
    const target = activeHref ? linkRefs.current.get(activeHref) : undefined;
    if (!target) return;

    const nextX = target.offsetLeft;
    const nextWidth = target.offsetWidth;

    if (!hasMeasured.current) {
      // 首次直接落位，避免进场时从 x=0 滑过来
      hasMeasured.current = true;
      x.set(nextX);
      width.set(nextWidth);
      opacity.set(1);
      return;
    }

    animate(x, nextX, SPRING);
    animate(width, nextWidth, SPRING);
  }, [activeHref, x, width, opacity]);

  // 布局阶段测量，首帧就位
  useLayoutEffect(() => {
    measure();
  }, [measure, locale]);

  // 容器或当前链接尺寸变化（断点切换 gap、字体替换）后重新测量
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const target = activeHref ? linkRefs.current.get(activeHref) : undefined;
    const observer = new ResizeObserver(() => measure());
    if (navRef.current) observer.observe(navRef.current);
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [measure, activeHref]);

  useEffect(() => {
    void document.fonts?.ready.then(() => measure());
  }, [measure]);

  return (
    <nav ref={navRef} className="relative flex items-center gap-3 sm:gap-6">
      {LINKS.map((link) => {
        const isActive = link.href === activeHref;

        return (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linkRefs.current.set(link.href, el);
              else linkRefs.current.delete(link.href);
            }}
            className={cn(
              "relative text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 py-1",
              isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500",
            )}
          >
            {t(link.messageKey)}
          </Link>
        );
      })}
      <motion.span
        aria-hidden
        style={{ x, width, opacity }}
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-zinc-900 dark:bg-zinc-100"
      />
    </nav>
  );
}
