import { NextResponse } from "next/server";

/**
 * Next.js Route Handler 示例
 * 
 * 在 app/api/ 目录下创建 route.ts 文件即可创建 API 路由
 * 支持 GET, POST, PUT, DELETE, PATCH 等方法
 */

// GET 请求处理
export async function GET() {
  return NextResponse.json({
    message: "这是一个 GET 请求的响应",
    timestamp: new Date().toISOString(),
    data: {
      example: "Hello from Next.js API Route!",
    },
  });
}

// POST 请求处理
export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "数据已接收",
      receivedData: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "无效的 JSON 数据" },
      { status: 400 }
    );
  }
}

