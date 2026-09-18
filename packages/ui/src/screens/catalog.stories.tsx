import type { Meta, StoryObj } from "@storybook/react-vite"
import { ButtonAnchor } from "../button"
import {
  SAMPLE_ARTICLES,
  SAMPLE_CASE_STUDIES,
  SAMPLE_FAQ,
  SAMPLE_PROJECTS,
  SAMPLE_RESOURCES,
  SAMPLE_RESUME,
  SAMPLE_SERVICES,
  SAMPLE_SITE_MAP,
  SAMPLE_TESTIMONIALS,
} from "../fixtures"
import { ArticleDetailScreen } from "./article-detail-screen"
import { CaseStudiesScreen } from "./case-studies-screen"
import { CaseStudyDetailScreen } from "./case-study-detail-screen"
import { DesignSystemScreen } from "./design-system-screen"
import { FaqScreen } from "./faq-screen"
import { ForgekitMcpScreen } from "./forgekit-mcp-screen"
import { InsightsScreen } from "./insights-screen"
import { ResourcesScreen } from "./resources-screen"
import { ResumeScreen } from "./resume-screen"
import { ServicesScreen } from "./services-screen"
import { SiteMapScreen } from "./site-map-screen"
import { TestimonialsScreen } from "./testimonials-screen"

const meta: Meta = {
  title: "Screens/Catalog",
  parameters: { layout: "fullscreen" },
}

export default meta

export const Faq: StoryObj<typeof FaqScreen> = {
  render: () => <FaqScreen items={SAMPLE_FAQ} />,
}

export const Testimonials: StoryObj<typeof TestimonialsScreen> = {
  render: () => <TestimonialsScreen testimonials={SAMPLE_TESTIMONIALS} />,
}

export const Services: StoryObj<typeof ServicesScreen> = {
  render: () => <ServicesScreen services={SAMPLE_SERVICES} />,
}

export const Resources: StoryObj<typeof ResourcesScreen> = {
  render: () => <ResourcesScreen resources={SAMPLE_RESOURCES} />,
}

export const Insights: StoryObj<typeof InsightsScreen> = {
  render: () => (
    <InsightsScreen
      articles={SAMPLE_ARTICLES}
      featuredCta={
        <ButtonAnchor href={SAMPLE_ARTICLES[0]?.href ?? "/insights"} variant="primary">
          Read article
        </ButtonAnchor>
      }
    />
  ),
}

export const ArticleDetail: StoryObj<typeof ArticleDetailScreen> = {
  render: () => <ArticleDetailScreen article={SAMPLE_ARTICLES[0]!} />,
}

export const CaseStudies: StoryObj<typeof CaseStudiesScreen> = {
  render: () => (
    <CaseStudiesScreen
      caseStudies={SAMPLE_CASE_STUDIES}
      renderCta={(study) => (
        <ButtonAnchor href={study.href} variant="ghost">
          Read case study
        </ButtonAnchor>
      )}
    />
  ),
}

export const CaseStudyDetail: StoryObj<typeof CaseStudyDetailScreen> = {
  render: () => (
    <CaseStudyDetailScreen
      caseStudy={SAMPLE_CASE_STUDIES[0]!}
      sections={[{ label: "Overview", body: SAMPLE_CASE_STUDIES[0]!.summary }]}
      related={[]}
    />
  ),
}

export const Resume: StoryObj<typeof ResumeScreen> = {
  render: () => <ResumeScreen resume={SAMPLE_RESUME} />,
}

export const SiteMap: StoryObj<typeof SiteMapScreen> = {
  render: () => <SiteMapScreen sections={SAMPLE_SITE_MAP} />,
}

export const ForgekitMcp: StoryObj<typeof ForgekitMcpScreen> = {
  render: () => <ForgekitMcpScreen />,
}

export const DesignSystem: StoryObj<typeof DesignSystemScreen> = {
  render: () => (
    <DesignSystemScreen
      specimenProject={SAMPLE_PROJECTS[1]!}
      actions={
        <ButtonAnchor href="/work" variant="primary">
          See selected work
        </ButtonAnchor>
      }
    />
  ),
}
