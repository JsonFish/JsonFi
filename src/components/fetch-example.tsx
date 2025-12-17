"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Next.js 中发起请求的示例
 * 
 * 在 Next.js App Router 中，有以下几种方式发起请求：
 * 
 * 1. 客户端组件中使用 fetch（当前示例）
 * 2. 服务端组件中直接使用 fetch（Next.js 会自动缓存）
 * 3. Server Actions（用于表单提交）
 * 4. Route Handlers（创建 API 路由）
 */

export default function FetchExample() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 方法1: 使用 fetch API（GET 请求）
  const handleFetchGet = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  // 方法2: 使用 fetch API（POST 请求）
  const handleFetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  // 方法3: 调用 Next.js API 路由（如果存在）
  const handleApiRoute = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/example");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Next.js 请求示例</h2>
      
      <div className="flex gap-4">
        <Button onClick={handleFetchGet} disabled={loading}>
          GET 请求示例
        </Button>
        <Button onClick={handleFetchPost} disabled={loading}>
          POST 请求示例
        </Button>
        <Button onClick={handleApiRoute} disabled={loading}>
          调用 API 路由
        </Button>
      </div>

      {loading && <p className="text-blue-500">加载中...</p>}
      {error && <p className="text-red-500">错误: {error}</p>}
      {data && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

