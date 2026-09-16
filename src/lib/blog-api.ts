export type BlogType = "post" | "note";

export type BlogArticle = {
  id: number;
  title: string;
  slug: string;
  type: BlogType;
  description: string;
  content: string;
  views: number;
  createTime: string;
  updateTime: string;
  tags: { id: number; tagName: string }[];
};

type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type BlogList = {
  articleList: BlogArticle[];
  total: number;
  page: number;
  pageSize: number;
};

class BlogApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const apiBaseUrl = (
  process.env.NEST_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001"
).replace(/\/$/, "");

async function fetchBlog<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  const body = (await response
    .json()
    .catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !body || body.code !== 200) {
    throw new BlogApiError(
      body?.message ?? `请求博客服务失败（${response.status}）`,
      response.status,
    );
  }
  return body.data;
}

export async function getBlogArticles(
  type: BlogType,
  pageSize = 20,
): Promise<BlogArticle[]> {
  const data = await fetchBlog<BlogList>(`/blog/${type}s?pageSize=${pageSize}`);
  return data.articleList;
}

export async function getBlogArticle(
  type: BlogType,
  slug: string,
): Promise<BlogArticle | null> {
  try {
    return await fetchBlog<BlogArticle>(
      `/blog/${type}s/${encodeURIComponent(slug)}`,
    );
  } catch (error) {
    if (error instanceof BlogApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

/** 列表与首页卡片共用的展示模型：压平接口字段并预格式化日期 */
export type ArticleListItem = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export function toArticleListItem(article: BlogArticle): ArticleListItem {
  return {
    title: article.title,
    date: formatArticleDate(article.createTime),
    description: article.description,
    slug: article.slug,
  };
}
