"use client";

import { useTheme } from "./theme-provider";
import { useLanguage } from "./language-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        // Keyboard clicks have no pointer position; start at the button center.
        void toggleTheme({
          x: event.detail === 0 ? bounds.left + bounds.width / 2 : event.clientX,
          y: event.detail === 0 ? bounds.top + bounds.height / 2 : event.clientY,
        });
      }}
      className="rounded-full w-9 h-9 flex items-center justify-center transition-colors"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-zinc-900" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-100" />
      )}
      <span className="sr-only">{t("theme.toggle")}</span>
    </Button>
  );
}
