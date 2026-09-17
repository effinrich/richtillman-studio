import { Link } from "@tanstack/react-router"
import type { Article } from "#/features/content/seed-data"
import { Badge } from "@richtillman/ui"

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: article.slug }}
      className="group glass-panel block rounded-2xl p-6 transition-all hover:border-gold/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
    >
      <div className="mb-4 flex items-center gap-3">
        <Badge variant="gold">{article.category}</Badge>
        <span className="font-mono text-[10px] text-white/30">{article.publishedAt}</span>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span className="font-mono text-[10px] text-white/30">{article.readTime}</span>
      </div>
      <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-gold">
        {article.title}
      </h3>
      <p className="text-sm leading-relaxed text-white/50">{article.excerpt}</p>
    </Link>
  )
}
