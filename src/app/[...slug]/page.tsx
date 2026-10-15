import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { PageTitle } from '@/components/layout/PageTitle'
import { StickerPortrait } from '@/components/StickerPortrait'
import { DependencyDemo } from '@/components/figures/DependencyDemo'
import { MethodSteps } from '@/components/figures/MethodSteps'
import { getAllSlugs, getPage } from '@/lib/content'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string[] }>
}

export const dynamicParams = false

// Markdown can place a figure with <div data-figure="name"></div>
const figures: Record<string, () => React.ReactNode> = {
  'dependency-demo': () => <DependencyDemo />,
  'method-steps': () => <MethodSteps />,
}
const figurePattern = /<div data-figure="([\w-]+)"><\/div>/

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage((await params).slug)
  if (!page) return {}
  const url = `/${page.slug.join('/')}/`
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      locale: page.lang === 'en' ? 'en_GB' : 'sv_SE',
    },
  }
}

export default async function ContentPage({ params }: Props) {
  const page = await getPage((await params).slug)
  if (!page) notFound()

  return (
    <Container>
      <article lang={page.lang}>
        {!page.hasTitle && <PageTitle className="mb-6">{page.title}</PageTitle>}
        {page.portrait && <StickerPortrait {...page.portrait} />}
        {page.html
          .split(figurePattern)
          .map((part, i) =>
            i % 2 === 1 ? (
              <div key={i}>{figures[part]?.()}</div>
            ) : (
              part.trim() && (
                <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: part }} />
              )
            ),
          )}
      </article>
    </Container>
  )
}
