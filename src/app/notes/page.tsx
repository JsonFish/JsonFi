import { InfiniteArticleList } from "@/components/infinite-article-list";
import { getBlogArticlesPage, toArticleListItem } from "@/lib/blog-api";

export default async function NotesPage() {
  const page = await getBlogArticlesPage("note");
  return (
    <InfiniteArticleList
      type="note"
      initialItems={page.articleList.map(toArticleListItem)}
      initialTotal={page.total}
    />
  );
}
