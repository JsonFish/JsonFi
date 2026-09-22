import { ArticleDetailLoading } from "@/components/article-detail-loading";
import { BackLink } from "@/components/back-link";

export default function Loading() {
  return (
    <ArticleDetailLoading>
      <BackLink href="/notes" />
    </ArticleDetailLoading>
  );
}
