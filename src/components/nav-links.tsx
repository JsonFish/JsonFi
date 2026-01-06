"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/editor", label: "Editor" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {LINKS.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 py-1",
              isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500"
            )}
          >
            {link.label}
            {isActive && (
              <motion.div
                layoutId="active-nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-zinc-100"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
