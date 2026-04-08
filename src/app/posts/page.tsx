import { PostsListContent } from "@/components/posts-list-content";

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
  return <PostsListContent posts={POSTS} />;
}
