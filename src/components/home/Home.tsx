import Link from 'next/link'
import {
  ArrowRight02Icon,
  Calendar03Icon,
  LinkSquare02Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons'
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderTitle,
} from '@/components/layout/SectionHeader'
import { PageTitle } from '@/components/layout/PageTitle'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardIndicator, CardTitle } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { TextLink } from '@/components/ui/TextLink'
import type { Publication } from '@/lib/content'

interface LinkItem {
  label: string
  href: string
}

export interface HomeContent {
  description: string
  email: string
  hero: {
    greeting: string
    name: string
    intro: string[]
    primary: LinkItem
    secondary: { label: string }
    portraitAlt: string
  }
  services: {
    title: string
    text?: string
    items: { title: string; description: string; href: string }[]
  }
  projects: {
    title: string
    items: { name: string; description: string; badge?: string; href: string }[]
  }
  publications: { title: string; count: number; more: string }
  contact: { title: string; text: string; form: string; formLink: string }
}

// The portrait pops out of the circle: below the circle's centre the image is clipped to the
// circle, above it the head is free. Geometry in a 200 × 230 box, circle r=100 at (100, 130).
const portraitMask = {
  maskImage:
    'radial-gradient(ellipse 50% 43.478% at 50% 56.522%, #000 99%, transparent 100%), linear-gradient(#000, #000)',
  maskSize: '100% 100%, 100% 56.522%',
  maskRepeat: 'no-repeat',
  maskPosition: 'center, top',
} satisfies React.CSSProperties

function HeroPortrait({ alt }: { alt: string }) {
  return (
    <div className="relative aspect-[200/230] w-40 shrink-0 sm:w-48">
      <svg
        className="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 200 230"
        aria-hidden={true}
      >
        <circle cx="100" cy="130" r="100" className="fill-primary" />
        <path d="M184 82 L232 90 L197 114 Z" className="fill-primary" />
        <g fill="none" strokeLinecap="round" strokeWidth="3">
          <path d="M -3.3 178.2 A 114 114 0 0 1 6.6 64.6" className="stroke-primary" />
          <path d="M 19.4 49.4 A 114 114 0 0 1 34.6 36.6" className="stroke-primary" />
          <path d="M 207.1 169 A 114 114 0 0 1 157 228.7" className="stroke-foreground/15" />
        </g>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          ...portraitMask,
          WebkitMaskImage: portraitMask.maskImage,
          WebkitMaskSize: portraitMask.maskSize,
          WebkitMaskRepeat: portraitMask.maskRepeat,
          WebkitMaskPosition: portraitMask.maskPosition,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute bottom-0 left-1/2 w-[120%] max-w-none -translate-x-1/2"
          src="/portrait.webp"
          alt={alt}
          width={490}
          height={470}
        />
      </div>
    </div>
  )
}

export function HomeHero({ content }: { content: HomeContent }) {
  const { hero, email } = content
  return (
    <section className="grid items-center gap-8 sm:grid-cols-[1fr_auto] sm:gap-8">
      <div>
        <PageTitle className="mb-4">
          {hero.greeting}{' '}
          <span className="border-b-[0.09375rem] border-primary whitespace-nowrap">
            {hero.name}
          </span>
        </PageTitle>

        <div className="mb-6 space-y-3 leading-relaxed text-foreground">
          {hero.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link className={buttonVariants()} href={hero.primary.href}>
            <Icon icon={Calendar03Icon} />
            {hero.primary.label}
          </Link>
          <a className={buttonVariants({ variant: 'secondary' })} href={`mailto:${email}`}>
            <Icon icon={Mail01Icon} />
            {hero.secondary.label}
          </a>
        </div>
      </div>

      <div className="order-first ml-2 sm:order-none sm:ml-0">
        <HeroPortrait alt={hero.portraitAlt} />
      </div>
    </section>
  )
}

export function HomeServices({ content }: { content: HomeContent['services'] }) {
  return (
    <section className="@container/services">
      <SectionHeader>
        <SectionHeaderTitle>{content.title}</SectionHeaderTitle>
        {content.text && <SectionHeaderText>{content.text}</SectionHeaderText>}
      </SectionHeader>

      <div className="grid gap-4 @xl/services:grid-cols-3">
        {content.items.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>
                <Link className="after:absolute after:inset-0" href={item.href}>
                  {item.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
            </CardContent>
            <CardIndicator>
              <Icon icon={ArrowRight02Icon} />
            </CardIndicator>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function HomeProjects({ content }: { content: HomeContent['projects'] }) {
  return (
    <section className="@container/projects">
      <SectionHeader>
        <SectionHeaderTitle>{content.title}</SectionHeaderTitle>
      </SectionHeader>

      <div className="grid gap-4 @xl/projects:grid-cols-2">
        {content.items.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>
                  <Link className="after:absolute after:inset-0" href={project.href}>
                    {project.name}
                  </Link>
                </CardTitle>
                {project.badge && <Badge>{project.badge}</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
            </CardContent>
            <CardIndicator>
              <Icon icon={ArrowRight02Icon} />
            </CardIndicator>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function HomePublications({
  content,
  publications,
}: {
  content: HomeContent['publications']
  publications: Publication[]
}) {
  if (publications.length === 0) return null

  return (
    <section>
      <SectionHeader>
        <SectionHeaderTitle>{content.title}</SectionHeaderTitle>
      </SectionHeader>

      <div className="space-y-4">
        {publications.slice(0, content.count).map((publication) => (
          <Card key={publication.title}>
            <CardHeader>
              <span className="font-mono text-xs text-muted-foreground">{publication.year}</span>
              <CardTitle>
                {publication.url ? (
                  <a className="after:absolute after:inset-0" href={publication.url}>
                    {publication.title}
                  </a>
                ) : (
                  publication.title
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="line-clamp-2">
              <p>{publication.details}</p>
            </CardContent>
            {publication.url && (
              <CardIndicator>
                <Icon icon={LinkSquare02Icon} />
              </CardIndicator>
            )}
          </Card>
        ))}
      </div>

      <p className="mt-4 text-sm">
        <TextLink href="/forskning/publikationer/">{content.more}</TextLink>
      </p>
    </section>
  )
}

export function HomeContact({
  content,
  email,
}: {
  content: HomeContent['contact']
  email: string
}) {
  return (
    <section>
      <SectionHeader>
        <SectionHeaderTitle>{content.title}</SectionHeaderTitle>
      </SectionHeader>

      <div className="space-y-2">
        <p>
          {content.text} <TextLink href={`mailto:${email}`}>{email}</TextLink>
        </p>
        <p>
          {content.form} <TextLink href="/kontakt/">{content.formLink}</TextLink>
        </p>
      </div>
    </section>
  )
}
