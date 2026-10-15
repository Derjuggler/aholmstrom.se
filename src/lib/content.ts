import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { toString } from 'mdast-util-to-string'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import type { Heading, Root, RootContent } from 'mdast'

const contentDir = path.join(process.cwd(), 'content')

export interface Page {
  slug: string[]
  title: string
  description?: string
  lang: 'sv' | 'en'
  html: string
  hasTitle: boolean
}

function filePathFor(slug: string[]) {
  const base = path.join(contentDir, ...slug)
  if (fs.existsSync(`${base}.md`)) return `${base}.md`
  if (fs.existsSync(path.join(base, 'index.md'))) return path.join(base, 'index.md')
  return null
}

/** Every markdown page except the home page, as route segments. */
export function getAllSlugs(dir = contentDir, prefix: string[] = []): string[][] {
  const slugs: string[][] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    if (entry.isDirectory()) {
      slugs.push(...getAllSlugs(path.join(dir, entry.name), [...prefix, entry.name]))
    } else if (entry.name.endsWith('.md')) {
      const name = entry.name.replace(/\.md$/, '')
      if (name === 'index') {
        if (prefix.length > 0) slugs.push(prefix)
      } else {
        slugs.push([...prefix, name])
      }
    }
  }
  return slugs
}

/** Supports Quartz-style explicit heading ids: `## Rubrik {#id}` */
function remarkHeadingIds() {
  return (tree: Root) => {
    visit(tree, 'heading', (node: Heading) => {
      const last = node.children.at(-1)
      if (last?.type !== 'text') return
      const match = last.value.match(/\s*\{#([\w-]+)\}\s*$/)
      if (!match) return
      last.value = last.value.slice(0, match.index)
      node.data = { ...node.data, hProperties: { id: match[1] } }
    })
  }
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkHeadingIds)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeStringify)

export async function getPage(slug: string[]): Promise<Page | null> {
  const file = filePathFor(slug)
  if (!file) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  const html = String(await processor.process(content))
  return {
    slug,
    title: data.title ?? slug.at(-1),
    description: data.description,
    lang: data.lang === 'en' ? 'en' : 'sv',
    html,
    hasTitle: /^#\s/m.test(content),
  }
}

export function getFrontmatter<T>(slug: string[]): T {
  const file = filePathFor(slug.length ? slug : ['index'])
  if (!file) throw new Error(`Missing content for /${slug.join('/')}`)
  return matter(fs.readFileSync(file, 'utf8')).data as T
}

export interface Publication {
  year: string
  title: string
  url?: string
  details: string
}

/** Reads the publication list from content/forskning/publikationer.md */
export function getPublications(): Publication[] {
  const file = filePathFor(['forskning', 'publikationer'])
  if (!file) return []
  const tree = unified()
    .use(remarkParse)
    .parse(matter(fs.readFileSync(file, 'utf8')).content)

  const publications: Publication[] = []
  let year = ''
  tree.children.forEach((node: RootContent, i) => {
    if (node.type === 'heading' && node.depth === 2) year = toString(node)
    if (node.type !== 'heading' || node.depth !== 3) return

    const link = node.children.find((child) => child.type === 'link')
    const next = tree.children[i + 1]
    const details =
      next?.type === 'paragraph'
        ? next.children
            .filter((child) => child.type !== 'link')
            .map((child) => toString(child))
            .join('')
            .trim()
        : ''

    publications.push({ year, title: toString(node), url: link?.url, details })
  })
  return publications
}
