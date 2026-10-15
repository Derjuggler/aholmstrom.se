import { cn } from '@/lib/utils'

export function SectionHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function SectionHeaderTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'font-heading text-xs font-medium tracking-wider text-foreground uppercase',
        className,
      )}
      {...props}
    />
  )
}

export function SectionHeaderText({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('mt-2', className)} {...props} />
}
