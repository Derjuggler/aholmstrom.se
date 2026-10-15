'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { buttonVariants } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

export function ThemeToggle({ label }: { label: string }) {
  const [isMounted, setIsMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== 't' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [resolvedTheme, setTheme])

  return (
    <div className="group/tooltip relative">
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          !isMounted && 'pointer-events-none invisible',
        )}
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        aria-hidden={isMounted ? undefined : true}
        tabIndex={isMounted ? undefined : -1}
      >
        <span className="sr-only">{label}</span>
        <Icon className="dark:hidden" icon={Moon02Icon} />
        <Icon className="hidden dark:block" icon={Sun03Icon} />
      </button>
      <span
        className={cn(
          'pointer-events-none absolute top-full right-0 z-10 mt-1.5 flex items-center gap-2 rounded bg-foreground px-2 py-1 text-xs whitespace-nowrap text-background opacity-0 transition-opacity',
          'group-hover/tooltip:opacity-100 group-has-focus-visible/tooltip:opacity-100',
        )}
        aria-hidden={true}
      >
        {label}
        <kbd className="inline-flex size-5 items-center justify-center rounded-sm bg-background/20 font-mono text-xs">
          T
        </kbd>
      </span>
    </div>
  )
}
