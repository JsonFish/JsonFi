"use client";

import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 flex items-center justify-center transition-colors"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-zinc-900" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
