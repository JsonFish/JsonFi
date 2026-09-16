import { HomeContent } from "@/components/home-content";
import { getBlogArticles, toArticleListItem } from "@/lib/blog-api";

export default async function HomePage() {
  const posts = await getBlogArticles("post", 3);
  return <HomeContent posts={posts.map(toArticleListItem)} />;
}
