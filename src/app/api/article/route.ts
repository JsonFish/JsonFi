import { NextRequest, NextResponse } from "next/server";

/**
 * 文章 API 代理路由
 * 解决 CORS 跨域问题
 *
 * 使用方式：
 * GET /api/article?id=47
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "缺少 id 参数" }, { status: 400 });
    }

    // 从服务端发起请求，不受浏览器 CORS 限制
    const response = await fetch(`http://jsonblog.top/api/article?id=${id}`, {
      headers: {
        "User-Agent": "Next.js Server",
      },
      // 可以添加缓存策略
      next: { revalidate: 60 }, // 每60秒重新验证
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 返回数据，并设置 CORS 头（如果需要）
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("API 代理错误:", error);
    return NextResponse.json(
      {
        error: "获取文章失败",
        details: error instanceof Error ? error.message : "未知错误",
      },
      { status: 500 }
    );
  }
}

// 处理 OPTIONS 请求（CORS 预检）
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
