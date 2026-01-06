import Link from "next/link";

const POSTS = [
  {
    title: "The Art of Minimalism in Web Design",
    date: "Dec 18, 2025",
    description:
      "Exploring how less can be more in modern digital experiences.",
    slug: "minimalism-in-web-design",
  },
  {
    title: "Building with Next.js 16 and Tailwind 4",
    date: "Dec 15, 2025",
    description:
      "Deep dive into the latest features of the web's favorite framework and CSS engine.",
    slug: "nextjs-16-tailwind-4",
  },
  {
    title: "Why Typography Matters",
    date: "Dec 10, 2025",
    description:
      "How choice of typeface affects readability and brand perception.",
    slug: "typography-matters",
  },
  {
    title: "A Guide to Tiptap Extensions",
    date: "Dec 05, 2025",
    description:
      "Customizing your rich text editor for a seamless writing experience.",
    slug: "tiptap-extensions-guide",
  },
];

export default function PostsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">All Posts</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg">
          A complete collection of my writing on design, technology, and more.
        </p>
      </section>

      <div className="grid gap-12">
        {POSTS.map((post) => (
          <article key={post.slug} className="group flex flex-col items-start">
            <time className="text-sm text-zinc-400 mb-2">{post.date}</time>
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
              {post.description}
            </p>
            <Link
              href={`/posts/${post.slug}`}
              className="text-sm font-medium flex items-center gap-1 group/link"
            >
              Read more
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
