import { PostsListContent } from "@/components/posts-list-content";
import { formatArticleDate, getBlogArticles } from "@/lib/blog-api";

export default async function PostsPage() {
  const posts = await getBlogArticles("post");
  return <PostsListContent posts={posts.map((post) => ({
    title: post.title,
    date: formatArticleDate(post.createTime),
    description: post.description,
    slug: post.slug,
  }))} />;
}
