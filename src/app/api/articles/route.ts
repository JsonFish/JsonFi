import { NextResponse } from "next/server";
import {
  getBlogArticlesPage,
  toArticleListItem,
  type ArticleListPage,
} from "@/lib/blog-api";
import { defaultLocale } from "@/lib/i18n";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const pageParam = searchParams.get("page");
  // Language is explicit in the URL so shared caches cannot mix translations.
  const locale = searchParams.get("lang") ?? defaultLocale;

  if (
    (type !== "post" && type !== "note") ||
    (locale !== "zh" && locale !== "en") ||
    !pageParam ||
    !/^[1-9]\d*$/.test(pageParam) ||
    !Number.isSafeInteger(Number(pageParam))
  ) {
    return NextResponse.json(
      { error: "Invalid pagination request" },
      { status: 400 },
    );
  }

  const page = Number(pageParam);

  try {
    const data = await getBlogArticlesPage(type, page, undefined, locale);
    const payload: ArticleListPage = {
      items: data.articleList.map((article) => toArticleListItem(article, locale)),
      total: data.total,
    };
    return NextResponse.json(payload, {
      // Avoid mixing cached offset pages from different list snapshots.
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    // 吞掉异常会让线上故障完全不可见；对外仍只回通用信息，不泄露上游细节。
    console.error("[api/articles] failed to load articles", {
      type,
      page,
      locale,
      error,
    });
    return NextResponse.json(
      { error: "Failed to load articles" },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
