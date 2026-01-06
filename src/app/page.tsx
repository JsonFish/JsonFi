import Link from "next/link";
import Image from "next/image";
import { Github, Globe, Mail, Send, Twitter } from "lucide-react";

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
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section - 匹配图片布局 */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-zinc-600 dark:text-zinc-400 font-medium">
              Hi 👋, Welcome To My Blog. ✨
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              I&apos;m{" "}
              <span className="text-cyan-500 dark:text-cyan-400">JOURNAL.</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium">
              A Front-End Development Engineer.
            </p>
          </div>

          <p className="text-zinc-500 dark:text-zinc-400">
            I&apos;m Interested In{" "}
            <span className="text-[#75c2d9] font-semibold">React</span>,{" "}
            <span className="text-[#000000] dark:text-[#ffffff] font-semibold">
              NextJs
            </span>{" "}
            And <span className="text-[#e0234e] font-semibold">NestJs</span>.
          </p>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">
              More about me
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:scale-110 transition-transform"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <div className="absolute inset-0 bg-linear-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-full animate-pulse" />
          <Image
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Json"
            alt="Json"
            fill
            priority
            className="rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-2xl relative z-10"
          />
        </div>
      </section>

      {/* Posts Section */}
      <section className="space-y-12">
        <div className="flex items-end justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <h2 className="text-2xl font-bold tracking-tight">Latest Writing</h2>
          <Link href="/posts" className="text-sm text-zinc-500 hover:underline">
            View all posts →
          </Link>
        </div>
        <div className="grid gap-12">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col items-start"
            >
              <time className="text-sm text-zinc-400 mb-2">{post.date}</time>
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
