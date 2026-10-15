import { cn } from '@/lib/utils'

export function Card({ className, ...props }: React.ComponentProps<'article'>) {
  return (
    <article
      className={cn(
        'group/card relative flex flex-col gap-1.5 overflow-hidden p-3 text-sm text-card-foreground',
        'rounded border bg-card ring-3 ring-transparent transition-all',
        'hover:ring-ring/15 has-focus-visible:ring-ring/50 [&_a:focus-visible]:outline-none',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2 pr-8', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3 className={cn('font-heading text-sm font-medium text-foreground', className)} {...props} />
  )
}

export function CardIndicator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'absolute top-3.5 right-3 text-muted-foreground/60 opacity-0 transition-opacity',
        'group-hover/card:opacity-100 group-has-focus-visible/card:opacity-100',
        className,
      )}
      aria-hidden={true}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('text-sm leading-relaxed text-muted-foreground', className)} {...props} />
  )
}
