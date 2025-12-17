/**
 * API 工具函数
 * 
 * 封装常用的请求方法，便于在项目中复用
 */

// 基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// 请求选项类型
interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * 通用请求函数
 */
export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // 处理查询参数
  let url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  // 设置默认 headers
  const headers = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * GET 请求
 */
export async function get<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  return request<T>(endpoint, {
    method: "GET",
    params,
  });
}

/**
 * POST 请求
 */
export async function post<T>(
  endpoint: string,
  data?: any
): Promise<T> {
  return request<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT 请求
 */
export async function put<T>(
  endpoint: string,
  data?: any
): Promise<T> {
  return request<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 请求
 */
export async function del<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, {
    method: "DELETE",
  });
}

