import Tiptap from "@/components/tiptap";
import { NoteBackLink } from "@/components/note-back-link";
import { formatArticleDate, getBlogArticle } from "@/lib/blog-api";
import { notFound } from "next/navigation";

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getBlogArticle("note", slug);

  if (!note) notFound();

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <NoteBackLink />
        <div className="space-y-4">
          <time className="text-sm text-zinc-400">
            {formatArticleDate(note.createTime)}
          </time>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {note.title}
          </h1>
        </div>
      </header>
      <Tiptap content={note.content} editable={false} />
    </article>
  );
}
