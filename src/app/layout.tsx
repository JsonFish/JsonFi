import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
    <html lang="en" suppressHydrationWarning>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var loc = localStorage.getItem('locale');
                  document.documentElement.lang = loc === 'zh' ? 'zh-CN' : 'en';
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
          <LanguageProvider>
            <div className="max-w-3xl mx-auto px-6">
              <SiteHeader />
              <main className="py-10">{children}</main>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
