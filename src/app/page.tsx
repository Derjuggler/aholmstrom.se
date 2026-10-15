import { Container } from '@/components/layout/Container'
import {
  HomeContact,
  HomeHero,
  HomeProjects,
  HomePublications,
  HomeServices,
  type HomeContent,
} from '@/components/home/Home'
import { getFrontmatter, getPublications } from '@/lib/content'
import { site } from '@/lib/site'

export default function HomePage() {
  const content = getFrontmatter<HomeContent>([])
  const publications = getPublications()

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
      email: content.email,
      description: content.description,
      affiliation: { '@type': 'CollegeOrUniversity', name: 'Luleå tekniska universitet' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Container className="space-y-12">
        <HomeHero content={content} />
        <HomeServices content={content.services} />
        <HomeProjects content={content.projects} />
        <HomePublications content={content.publications} publications={publications} />
        <HomeContact content={content.contact} email={content.email} />
      </Container>
    </>
  )
}
