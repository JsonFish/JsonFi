"use client";

import { useState } from "react";
import Tiptap from "@/components/tiptap";
import { Button } from "@/components/ui/button";

export default function Demo() {
  const [content, setContent] = useState("<p>Write your blog post here...</p>");

  const handleSave = () => {
    console.log("Saving content:", content);
    alert("Check console for saved HTML content!");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Post Editor</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Create and edit your content using the Tiptap editor.
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 hover:opacity-90"
        >
          Save Post
        </Button>
      </header>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 bg-white dark:bg-zinc-950 shadow-sm">
        <Tiptap content={content} onChange={setContent} />
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
          HTML Preview
        </h2>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-auto max-h-40 border border-zinc-100 dark:border-zinc-800">
          <code className="text-xs text-zinc-500 break-all">{content}</code>
        </div>
      </section>
    </div>
  );
}
