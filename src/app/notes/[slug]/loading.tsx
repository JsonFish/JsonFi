import { ArticleDetailLoading } from "@/components/article-detail-loading";
import { NoteBackLink } from "@/components/note-back-link";

export default function Loading() {
  return (
    <ArticleDetailLoading>
      <NoteBackLink />
    </ArticleDetailLoading>
  );
}
