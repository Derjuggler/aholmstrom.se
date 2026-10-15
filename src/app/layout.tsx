import '@/app/global.css'

import { Caveat, Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/header/Header'
import { getFrontmatter } from '@/lib/content'
import { site } from '@/lib/site'
import type { Metadata } from 'next'

const home = getFrontmatter<{ description: string }>([])

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: `%s · ${site.name}`,
    default: `${site.name} · ${site.titleSuffix}`,
  },
  description: home.description,
  openGraph: {
    siteName: site.name,
    title: site.name,
    description: home.description,
    locale: 'sv_SE',
  },
}

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable}`}
      lang="sv"
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background font-base text-base text-muted-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-8 pb-12 sm:pt-12 sm:pb-18">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
