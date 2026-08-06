import Tiptap from "@/components/tiptap";
import { PostBackLink } from "@/components/post-back-link";
import { formatArticleDate, getBlogArticle } from "@/lib/blog-api";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogArticle("post", slug);

  if (!post) notFound();

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <PostBackLink />
        <div className="space-y-4">
          <time className="text-sm text-zinc-400">
            {formatArticleDate(post.createTime)}
          </time>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
        </div>
      </header>
      <Tiptap content={post.content} editable={false} />
    </article>
  );
}
