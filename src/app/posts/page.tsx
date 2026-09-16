import { PostsListContent } from "@/components/posts-list-content";
import { getBlogArticles, toArticleListItem } from "@/lib/blog-api";

export default async function PostsPage() {
  const posts = await getBlogArticles("post");
  return <PostsListContent posts={posts.map(toArticleListItem)} />;
}
