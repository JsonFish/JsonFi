import { HomeContent } from "@/components/home-content";
import { formatArticleDate, getBlogArticles } from "@/lib/blog-api";

export default async function HomePage() {
  const posts = await getBlogArticles("post", 3);
  return <HomeContent posts={posts.map((post) => ({
    title: post.title,
    date: formatArticleDate(post.createTime),
    description: post.description,
    slug: post.slug,
  }))} />;
}
