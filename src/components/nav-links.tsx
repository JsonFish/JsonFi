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

// velocity: 0 —— framer 的 animate() 默认会拿 motion value 当前的瞬时速度当弹簧初速度，
// 我们的位移都是离散跳变，必须显式从静止开始，否则会被弹飞。
const SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  velocity: 0,
} as const;

export function NavLinks() {
  const pathname = usePathname();
  const { t, locale } = useLanguage();

  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const hasPlaced = useRef(false);
  const lastHref = useRef<string | null>(null);
  const position = useRef({ x: 0, width: 0 });

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

    const hrefChanged = lastHref.current !== activeHref;
    lastHref.current = activeHref;

    // 目标没变就是一次空测量：ResizeObserver 注册时的首次回调、
    // document.fonts.ready 都会重复触发，必须直接返回。
    if (
      hasPlaced.current &&
      position.current.x === nextX &&
      position.current.width === nextWidth
    ) {
      return;
    }

    position.current = { x: nextX, width: nextWidth };

    // 只有「点击导航真正换页」才做平滑滑动；首帧就位以及字体加载、
    // 样式生效、尺寸变化导致的纠正性测量一律瞬间落位，避免刷新时乱动。
    if (!hasPlaced.current || !hrefChanged) {
      // 这里必须用 jump() 而不是 set()：jump() 会清掉速度追踪状态，
      // set() 会把这一帧的跳变记成速度，被后续 animate() 当成初速度用。
      x.jump(nextX);
      width.jump(nextWidth);
      opacity.jump(1);
      hasPlaced.current = true;
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
