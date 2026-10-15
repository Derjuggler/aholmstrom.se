import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex h-5 w-fit shrink-0 items-center rounded-full bg-primary/20 px-2 font-mono text-xs font-medium whitespace-nowrap text-foreground',
        className,
      )}
      {...props}
    />
  )
}
