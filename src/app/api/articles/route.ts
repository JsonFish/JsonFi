import { NextResponse } from "next/server";
import {
  getBlogArticlesPage,
  toArticleListItem,
  type ArticleListPage,
} from "@/lib/blog-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const pageParam = searchParams.get("page");

  if (
    (type !== "post" && type !== "note") ||
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
    const data = await getBlogArticlesPage(type, page);
    const payload: ArticleListPage = {
      items: data.articleList.map(toArticleListItem),
      total: data.total,
    };
    return NextResponse.json(payload, {
      // 列表公开且可缓存：让共享缓存（CDN/反代）兜住重复的分页请求，
      // 浏览器仍每次回源，保证翻页内容足够新。
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=60, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    // 吞掉异常会让线上故障完全不可见；对外仍只回通用信息，不泄露上游细节。
    console.error("[api/articles] failed to load articles", {
      type,
      page,
      error,
    });
    return NextResponse.json(
      { error: "Failed to load articles" },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
