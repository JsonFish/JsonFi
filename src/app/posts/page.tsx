import { InfiniteArticleList } from "@/components/infinite-article-list";
import { getBlogArticlesPage, toArticleListItem } from "@/lib/blog-api";

export default async function PostsPage() {
  const page = await getBlogArticlesPage("post");
  return (
    <InfiniteArticleList
      type="post"
      initialItems={page.articleList.map(toArticleListItem)}
      initialTotal={page.total}
    />
  );
}
