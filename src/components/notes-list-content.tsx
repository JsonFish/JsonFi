"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export type NoteListItem = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export function NotesListContent({ notes }: { notes: NoteListItem[] }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {t("notes.title")}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg">
          {t("notes.subtitle")}
        </p>
      </section>

      <div className="grid gap-12">
        {notes.map((note) => (
          <article key={note.slug} className="group flex flex-col items-start">
            <time className="text-sm text-zinc-400 mb-2">{note.date}</time>
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              <Link href={`/notes/${note.slug}`}>{note.title}</Link>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
              {note.description}
            </p>
            <Link
              href={`/notes/${note.slug}`}
              className="text-sm font-medium flex items-center gap-1 group/link"
            >
              {t("notes.readMore")}
              <span className="group-hover/link:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
