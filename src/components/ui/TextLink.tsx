import Link from 'next/link'
import { cn } from '@/lib/utils'

export function TextLink({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        'group/text-link inline-flex items-center gap-1 font-medium text-foreground',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'relative inline-block',
          'after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary after:transition-all',
          'group-hover/text-link:after:h-0.5',
        )}
      >
        {children}
      </span>
    </Link>
  )
}
