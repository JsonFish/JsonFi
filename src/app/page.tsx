import { HomeContent } from "@/components/home-content";
import { getRequestLocale } from "@/lib/server-locale";
import {
  getBlogArticles,
  HOME_LATEST_COUNT,
  toArticleListItem,
} from "@/lib/blog-api";

export default async function HomePage() {
  const locale = await getRequestLocale();
  const posts = await getBlogArticles("post", HOME_LATEST_COUNT, locale);
  return <HomeContent posts={posts.map((post) => toArticleListItem(post, locale))} />;
}
