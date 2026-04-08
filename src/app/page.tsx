import { HomeContent } from "@/components/home-content";

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
  return <HomeContent posts={POSTS} />;
}
