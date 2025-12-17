import { NextRequest, NextResponse } from "next/server";

/**
 * 通用 API 代理路由
 * 解决 CORS 跨域问题
 * 
 * 使用方式：
 * GET /api/proxy?url=http://jsonblog.top/api/article&id=47
 * 或者
 * POST /api/proxy
 * Body: { url: "http://jsonblog.top/api/article", params: { id: 47 } }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const targetUrl = searchParams.get("url");

    if (!targetUrl) {
      return NextResponse.json(
        { error: "缺少 url 参数" },
        { status: 400 }
      );
    }

    // 构建目标 URL（保留其他查询参数）
    const url = new URL(targetUrl);
    searchParams.forEach((value, key) => {
      if (key !== "url") {
        url.searchParams.append(key, value);
      }
    });

    // 从服务端发起请求，不受浏览器 CORS 限制
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "Next.js Server",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

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
      { error: "代理请求失败", details: error instanceof Error ? error.message : "未知错误" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url: targetUrl, params, headers: customHeaders } = body;

    if (!targetUrl) {
      return NextResponse.json(
        { error: "缺少 url 参数" },
        { status: 400 }
      );
    }

    // 构建目标 URL
    const url = new URL(targetUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    // 从服务端发起请求
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "User-Agent": "Next.js Server",
        "Content-Type": "application/json",
        ...customHeaders,
      },
      body: body.data ? JSON.stringify(body.data) : undefined,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

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
      { error: "代理请求失败", details: error instanceof Error ? error.message : "未知错误" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

