"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

/** 顶部这段距离内始终显示，避免刚离开顶部就收起 */
const ALWAYS_VISIBLE_UNTIL = 80;
/** 小于这个滚动幅度直接忽略，防止触控板惯性滚动时来回抖动 */
const MIN_DELTA = 8;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    if (Math.abs(delta) < MIN_DELTA) return;
    lastY.current = y;

    if (y <= ALWAYS_VISIBLE_UNTIL) {
      setHidden(false);
    } else {
      setHidden(delta > 0);
    }
  });

  return (
    <motion.header
      // 向下滚动：上移出自己的高度藏到屏幕外；向上滚动：滑回原位
      animate={{ y: hidden ? "-150%" : "0%" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 380, damping: 34 }
      }
      // 键盘 Tab 进导航时强制露出，避免焦点落在屏幕外
      onFocusCapture={() => setHidden(false)}
      className="sticky top-3 z-50 mx-auto mt-3 flex w-fit max-w-full items-center justify-center rounded-full bg-transparent px-4 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <NavLinks />
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
