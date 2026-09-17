import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import type { Article } from "#/features/content/seed-data"
import { PortfolioLayout } from "#/features/layout/portfolio-layout"
import { Badge } from "@richtillman/ui"
import { GlassPanel } from "@richtillman/ui"

type ArticleDetailPageProps = {
  article: Article
}

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  return (
    <PortfolioLayout activeItem="insights">
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24">
        <Link
          to="/insights"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>

        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4">
            <Badge variant="gold">{article.category}</Badge>
            <span className="font-mono text-[10px] text-white/30">{article.publishedAt}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="font-mono text-[10px] text-white/30">{article.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            {article.title}
          </h1>
        </header>

        <article className="prose prose-invert max-w-none">
          {article.content.map((paragraph, index) => (
            <p key={index} className="mb-6 text-lg leading-relaxed text-white/70">
              {paragraph}
            </p>
          ))}
        </article>

        <GlassPanel className="mt-16 rounded-2xl border-l-4 border-l-gold p-8">
          <h3 className="mb-2 text-xl font-bold">Key Takeaway</h3>
          <p className="text-sm leading-relaxed text-white/60">{article.excerpt}</p>
        </GlassPanel>
      </main>
    </PortfolioLayout>
  )
}
