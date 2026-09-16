import { NotesListContent } from "@/components/notes-list-content";
import { getBlogArticles, toArticleListItem } from "@/lib/blog-api";

export default async function NotesPage() {
  const notes = await getBlogArticles("note");
  return <NotesListContent notes={notes.map(toArticleListItem)} />;
}
