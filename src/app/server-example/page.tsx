/**
 * 服务端组件请求示例
 * 
 * 在服务端组件中，可以直接使用 fetch，Next.js 会自动缓存
 * 注意：这个文件不需要 "use client" 指令
 */

async function fetchData() {
  // Next.js 会自动缓存 fetch 请求
  // 可以通过 cache: 'no-store' 禁用缓存
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    // cache: 'no-store', // 禁用缓存
    // next: { revalidate: 60 }, // 每60秒重新验证
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ServerExample() {
  const data = await fetchData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">服务端组件请求示例</h1>
      <div className="p-4 bg-gray-100 rounded">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        这个数据是在服务端获取的，Next.js 会自动缓存 fetch 请求。
      </p>
    </div>
  );
}

