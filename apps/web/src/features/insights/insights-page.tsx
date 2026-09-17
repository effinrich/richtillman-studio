import { InsightsScreen } from "@richtillman/ui"
import type { Article } from "#/features/content/seed-data"
import { ButtonLink } from "#/features/ui/button-link"

type InsightsPageProps = {
  articles: Array<Article>
}

export function InsightsPage({ articles }: InsightsPageProps) {
  const featured = articles.find((a) => a.featured)

  return (
    <InsightsScreen
      articles={articles.map((article) => ({
        ...article,
        href: `/insights/${article.slug}`,
      }))}
      featuredCta={
        featured ? (
          <ButtonLink to="/insights/$slug" params={{ slug: featured.slug }} variant="primary">
            Read article
          </ButtonLink>
        ) : null
      }
    />
  )
}
