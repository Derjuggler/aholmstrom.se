import { getAllSlugs } from '@/lib/content'
import { site } from '@/lib/site'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [[], ...getAllSlugs()].map((slug) => ({
    url: `${site.url}/${slug.length ? `${slug.join('/')}/` : ''}`,
  }))
}
