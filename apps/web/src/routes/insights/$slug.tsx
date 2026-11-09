import { createFileRoute, notFound } from "@tanstack/react-router"

import { getArticleBySlug } from "#/features/content/queries/articles"
import { ArticleDetailPage } from "#/features/insights/article-detail-page"

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params }) => {
    const article = await getArticleBySlug({ data: params.slug })
    if (!article) throw notFound()

    return article
  },
  component: ArticleDetailRoute
})

function ArticleDetailRoute() {
  const article = Route.useLoaderData()
  return <ArticleDetailPage article={article} />
}
