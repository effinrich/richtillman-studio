import { ArticleDetailScreen } from "@richtillman/ui/screens/article-detail-screen.tsx"

import type { Article } from "#/features/content/seed-data"

type ArticleDetailPageProps = {
  article: Article
}

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  return <ArticleDetailScreen article={{ ...article, href: `/insights/${article.slug}` }} />
}
