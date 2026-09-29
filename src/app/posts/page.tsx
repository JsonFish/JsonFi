import { InfiniteArticleList } from "@/components/infinite-article-list";
import { getRequestLocale } from "@/lib/server-locale";
import { getBlogArticlesPage, toArticleListItem } from "@/lib/blog-api";

export default async function PostsPage() {
  const locale = await getRequestLocale();
  const page = await getBlogArticlesPage("post", 1, undefined, locale);
  return (
    <InfiniteArticleList
      key={`post-${locale}`}
      locale={locale}
      type="post"
      initialItems={page.articleList.map((post) => toArticleListItem(post, locale))}
      initialTotal={page.total}
    />
  );
}
