import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLinks } from "@/components/nav-links";
import Link from "next/link";

// Geist（无衬线）和 Geist_Mono（等宽）
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], // 仅加载拉丁字符子集
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 配置页面标题和描述，SEO
 */
export const metadata: Metadata = {
  title: "Minimal Blog",
  description:
    "A high-quality minimalist blog built with Next.js, Tiptap, and shadcn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground selection:bg-zinc-200 dark:selection:bg-zinc-800`}
      >
        <ThemeProvider>
          <div className="max-w-3xl mx-auto px-6">
            <header className="sticky top-0 z-50 flex justify-between items-center py-4 bg-background/80 backdrop-blur-md border-b border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 transition-all duration-300">
              <Link
                href="/"
                className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
              >
                JOURNAL
              </Link>
              <div className="flex items-center gap-6">
                <NavLinks />
                <ThemeToggle />
              </div>
            </header>
            <main className="py-10">{children}</main>
            <footer className="mt-20 py-10 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-500 flex justify-between items-center">
              <p>© {new Date().getFullYear()} Journal</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  GitHub
                </a>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
