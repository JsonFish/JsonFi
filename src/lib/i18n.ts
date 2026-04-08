export type Locale = "en" | "zh";

export const defaultLocale: Locale = "en";

export const LOCALE_STORAGE_KEY = "locale";

const en = {
  "nav.home": "Home",
  "nav.posts": "Posts",
  "nav.editor": "Editor",
  "footer.copyright": "© {year} Journal",
  "footer.twitter": "Twitter",
  "footer.github": "GitHub",
  "theme.toggle": "Toggle theme",
  "lang.switch": "Language",
  "home.welcome": "Hi 👋, Welcome To My Blog. ✨",
  "home.titlePrefix": "I'm",
  "home.role": "A Front-End Development Engineer.",
  "home.interestedIntro": "I'm Interested In",
  "home.and": "And",
  "home.moreAboutMe": "More about me",
  "home.latestWriting": "Latest Writing",
  "home.viewAllPosts": "View all posts →",
  "posts.title": "All Posts",
  "posts.subtitle":
    "A complete collection of my writing on design, technology, and more.",
  "posts.readMore": "Read more",
  "editor.title": "Post Editor",
  "editor.subtitle":
    "Create and edit your content using the Tiptap editor.",
  "editor.save": "Save Post",
  "editor.htmlPreview": "HTML Preview",
  "editor.saveAlert": "Check console for saved HTML content!",
  "post.backToPosts": "← Back to posts",
} as const;

export type MessageKey = keyof typeof en;

const zh: Record<MessageKey, string> = {
  "nav.home": "首页",
  "nav.posts": "文章",
  "nav.editor": "编辑器",
  "footer.copyright": "© {year} Journal",
  "footer.twitter": "Twitter",
  "footer.github": "GitHub",
  "theme.toggle": "切换主题",
  "lang.switch": "语言",
  "home.welcome": "你好 👋，欢迎来到我的博客。✨",
  "home.titlePrefix": "我是",
  "home.role": "一名前端开发工程师。",
  "home.interestedIntro": "我关注",
  "home.and": "以及",
  "home.moreAboutMe": "更多关于我",
  "home.latestWriting": "最新文章",
  "home.viewAllPosts": "查看全部文章 →",
  "posts.title": "全部文章",
  "posts.subtitle": "关于设计、技术等的完整文章列表。",
  "posts.readMore": "阅读全文",
  "editor.title": "文章编辑器",
  "editor.subtitle": "使用 Tiptap 编辑器创建与编辑内容。",
  "editor.save": "保存文章",
  "editor.htmlPreview": "HTML 预览",
  "editor.saveAlert": "保存内容已输出到控制台，请打开开发者工具查看。",
  "post.backToPosts": "← 返回文章列表",
};

export function translate(locale: Locale, key: MessageKey): string {
  return locale === "zh" ? zh[key] : en[key];
}

export function translateWith(
  locale: Locale,
  key: MessageKey,
  vars: Record<string, string | number>
): string {
  let s = translate(locale, key);
  for (const [k, v] of Object.entries(vars)) {
    s = s.replaceAll(`{${k}}`, String(v));
  }
  return s;
}
