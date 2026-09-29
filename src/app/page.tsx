import { HomeContent } from "@/components/home-content";
import {
  getBlogArticles,
  HOME_LATEST_COUNT,
  toArticleListItem,
} from "@/lib/blog-api";

export default async function HomePage() {
  const posts = await getBlogArticles("post", HOME_LATEST_COUNT);
  return <HomeContent posts={posts.map(toArticleListItem)} />;
}
