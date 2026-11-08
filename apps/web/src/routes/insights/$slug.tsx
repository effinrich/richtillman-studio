import { createFileRoute, notFound } from "@tanstack/react-router"

import { getArticleBySlug } from "#/features/content/queries/articles"
import { ArticleDetailPage } from "#/features/insights/article-detail-page"

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => getArticleBySlug({ data: params.slug }),
  component: ArticleDetailRoute
})

function ArticleDetailRoute() {
  const article = Route.useLoaderData()
  if (!article) throw notFound()
  return <ArticleDetailPage article={article} />
}
