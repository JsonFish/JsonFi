import { InfiniteArticleList } from "@/components/infinite-article-list";
import { getRequestLocale } from "@/lib/server-locale";
import { getBlogArticlesPage, toArticleListItem } from "@/lib/blog-api";

export default async function NotesPage() {
  const locale = await getRequestLocale();
  const page = await getBlogArticlesPage("note", 1, undefined, locale);
  return (
    <InfiniteArticleList
      key={`note-${locale}`}
      locale={locale}
      type="note"
      initialItems={page.articleList.map((note) => toArticleListItem(note, locale))}
      initialTotal={page.total}
    />
  );
}
