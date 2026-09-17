import type { Article } from "#/features/content/seed-data"
import { ArticleCard } from "#/features/insights/article-card"
import { PortfolioLayout } from "#/features/layout/portfolio-layout"
import { Badge, GlassPanel, SectionHeader } from "@richtillman/ui"
import { ButtonLink } from "#/features/ui/button-link"

type InsightsPageProps = {
  articles: Array<Article>
}

export function InsightsPage({ articles }: InsightsPageProps) {
  const featured = articles.find((a) => a.featured)
  const rest = articles.filter((a) => !a.featured)

  return (
    <PortfolioLayout activeItem="insights">
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24">
        <SectionHeader
          eyebrow="Insights & Articles"
          title={
            <>
              Sharing the <span className="neon-text">signal</span> in the noise.
            </>
          }
          description="Weekly thoughts on engineering leadership, design systems at scale, and the future of AI-native developer experience."
        />

        {featured ? (
          <section className="mb-24">
            <GlassPanel className="grid overflow-hidden rounded-3xl lg:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-12">
                <Badge variant="gold" className="mb-6 w-fit">
                  Featured
                </Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mb-8 text-white/50">{featured.excerpt}</p>
                <ButtonLink to="/insights/$slug" params={{ slug: featured.slug }} variant="primary">
                  Read article
                </ButtonLink>
              </div>
              <div className="flex min-h-[280px] items-center justify-center bg-linear-to-br from-gold/10 via-cyan/5 to-magenta/10">
                <span className="font-mono text-6xl font-bold text-white/10">MCP</span>
              </div>
            </GlassPanel>
          </section>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </main>
    </PortfolioLayout>
  )
}
