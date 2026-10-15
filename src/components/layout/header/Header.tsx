'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cancel01Icon, Menu01Icon } from '@hugeicons/core-free-icons'
import { Container } from '@/components/layout/Container'
import { buttonVariants } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { navigation } from '@/lib/site'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const pathname = usePathname()
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
  const links = navigation[isEnglish ? 'en' : 'sv']
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => setIsOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, '')

  return (
    <header>
      <Container className="flex h-18 items-center gap-3 sm:gap-8" variant="fluid">
        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            '-ml-3 gap-2 px-3 hover:bg-transparent',
          )}
          href={isEnglish ? '/en/' : '/'}
          aria-label={isEnglish ? 'Home' : 'Startsida'}
        >
          <span className="size-3 rounded-full bg-primary" aria-hidden={true} />
          <span className="text-base leading-none font-bold tracking-wider text-foreground">
            AH
          </span>
        </Link>

        <nav className="hidden md:block" aria-label={isEnglish ? 'Main menu' : 'Huvudmeny'}>
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-8 px-2.5 text-muted-foreground hover:text-foreground',
                    isActive(link.href) &&
                      'text-foreground underline decoration-primary decoration-2 underline-offset-8',
                  )}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-2 ml-auto flex items-center gap-1">
          <Link
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'h-8 px-2.5 text-muted-foreground hover:text-foreground',
            )}
            href={isEnglish ? '/' : '/en/'}
            lang={isEnglish ? 'sv' : 'en'}
          >
            {isEnglish ? 'SV' : 'EN'}
            <span className="sr-only">{isEnglish ? ' – Svenska' : ' – English'}</span>
          </Link>
          <ThemeToggle label={isEnglish ? 'Toggle theme' : 'Byt tema'} />
          <button
            type="button"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'md:hidden')}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{isEnglish ? 'Menu' : 'Meny'}</span>
            <Icon icon={isOpen ? Cancel01Icon : Menu01Icon} />
          </button>
        </div>
      </Container>

      <Container variant="fluid" className={cn('md:hidden', !isOpen && 'hidden')}>
        <nav id="mobile-menu" aria-label={isEnglish ? 'Main menu' : 'Huvudmeny'}>
          <ul className="grid border-y py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={cn(
                    'flex h-11 items-center font-mono text-sm font-medium text-muted-foreground hover:text-foreground',
                    isActive(link.href) && 'text-foreground',
                  )}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {isActive(link.href) && (
                    <span className="mr-2 size-1.5 rounded-full bg-primary" aria-hidden={true} />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
