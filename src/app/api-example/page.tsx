"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { get, post } from "@/lib/api";

/**
 * 使用封装的 API 工具函数示例
 */
export default function ApiExample() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 使用封装的 get 函数
  const handleGet = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await get("https://jsonplaceholder.typicode.com/posts/1");
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  // 使用封装的 post 函数
  const handlePost = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await post("https://jsonplaceholder.typicode.com/posts", {
        title: "foo",
        body: "bar",
        userId: 1,
      });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">使用封装的 API 工具函数</h2>
      
      <div className="flex gap-4">
        <Button onClick={handleGet} disabled={loading}>
          使用 get() 函数
        </Button>
        <Button onClick={handlePost} disabled={loading}>
          使用 post() 函数
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

