import { Container } from '@/components/layout/Container'
import { PageTitle } from '@/components/layout/PageTitle'
import { TextLink } from '@/components/ui/TextLink'

export default function NotFound() {
  return (
    <Container>
      <PageTitle className="mb-3">404 · Sidan finns inte</PageTitle>
      <p>
        Sidan du letar efter finns inte här. <TextLink href="/">Till startsidan</TextLink>
      </p>
    </Container>
  )
}
