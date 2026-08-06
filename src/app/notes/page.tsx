import { NotesListContent } from "@/components/notes-list-content";
import { formatArticleDate, getBlogArticles } from "@/lib/blog-api";

export default async function NotesPage() {
  const notes = await getBlogArticles("note");
  return <NotesListContent notes={notes.map((note) => ({
    title: note.title,
    date: formatArticleDate(note.createTime),
    description: note.description,
    slug: note.slug,
  }))} />;
}
