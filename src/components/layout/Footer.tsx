import { Container } from '@/components/layout/Container'
import { TextLink } from '@/components/ui/TextLink'
import { getFrontmatter } from '@/lib/content'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Footer() {
  const { email } = getFrontmatter<{ email: string }>([])

  return (
    <footer className="sticky top-[100vh]">
      <Container
        className={cn(
          'flex flex-col items-center justify-center gap-4 border-t py-6 font-mono text-xs text-muted-foreground',
          'sm:flex-row sm:justify-between',
        )}
        variant="fluid"
      >
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>
          <TextLink href={`mailto:${email}`}>{email}</TextLink>
        </p>
      </Container>
    </footer>
  )
}
