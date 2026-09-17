import { ArticleDetailScreen } from "@richtillman/ui"
import type { Article } from "#/features/content/seed-data"

type ArticleDetailPageProps = {
  article: Article
}

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  return <ArticleDetailScreen article={{ ...article, href: `/insights/${article.slug}` }} />
}
