import { cn } from '@/lib/utils'

const base =
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded border border-transparent font-mono text-sm font-medium whitespace-nowrap transition-all select-none [&_svg]:size-4'

const variants = {
  default: 'bg-primary text-primary-foreground hover:brightness-95',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70',
  ghost: 'hover:bg-muted',
}

const sizes = {
  default: 'h-9 px-3',
  icon: 'size-8',
}

export function buttonVariants({
  variant = 'default',
  size = 'default',
}: { variant?: keyof typeof variants; size?: keyof typeof sizes } = {}) {
  return cn(base, variants[variant], sizes[size])
}
