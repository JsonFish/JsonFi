import Tiptap from "@/components/tiptap";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS = {
  "minimalism-in-web-design": {
    title: "The Art of Minimalism in Web Design",
    date: "Dec 18, 2025",
    content: `
      <h2>Why Less is More</h2>
      <p>Minimalism is not about a lack of something. It's about the perfect amount of something. In web design, this means removing distractions and focusing on what truly matters: the content and the user experience.</p>
      <blockquote>"Simplicity is the ultimate sophistication." — Leonardo da Vinci</blockquote>
      <p>By using a black and white palette, we strip away the noise and let the typography and layout speak for themselves.</p>
      <h3>Key Principles</h3>
      <ul>
        <li>Negative space (Whitespace)</li>
        <li>Strong typography</li>
        <li>Clear hierarchy</li>
        <li>Limited color palette</li>
      </ul>
    `,
  },
  "nextjs-16-tailwind-4": {
    title: "Building with Next.js 16 and Tailwind 4",
    date: "Dec 15, 2025",
    content: `
      <h2>The Future of Web Development</h2>
      <p>Next.js 16 brings even more performance improvements and a refined developer experience. Paired with Tailwind 4's new engine, building beautiful websites has never been faster.</p>
      <h3>What's New in Tailwind 4?</h3>
      <p>Tailwind 4 is a complete rewrite, focusing on speed and a more CSS-native approach. It's no longer just a utility-first framework; it's a powerful tool for modern styling.</p>
      <pre><code>@theme {
  --color-primary: #000;
  --color-secondary: #fff;
}</code></pre>
    `,
  },
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = POSTS[slug as keyof typeof POSTS];

  if (!post) {
    notFound();
  }

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 inline-block transition-colors"
        >
          ← Back to posts
        </Link>
        <div className="space-y-4">
          <time className="text-sm text-zinc-400">{post.date}</time>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
        </div>
      </header>

      <Tiptap content={post.content} editable={false} />
    </article>
  );
}
