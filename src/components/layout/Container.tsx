import { cn } from '@/lib/utils'

const variants = {
  default: 'max-w-176',
  fluid: '',
}

export function Container({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & { variant?: keyof typeof variants }) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-8', variants[variant], className)} {...props} />
  )
}
