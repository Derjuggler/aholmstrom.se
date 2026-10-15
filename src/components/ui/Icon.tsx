import { HugeiconsIcon } from '@hugeicons/react'
import { cn } from '@/lib/utils'
import type { IconSvgElement } from '@hugeicons/react'

export function Icon({
  icon,
  className,
  ...props
}: { icon: IconSvgElement } & Omit<React.ComponentProps<typeof HugeiconsIcon>, 'icon'>) {
  return (
    <HugeiconsIcon
      icon={icon}
      className={cn('size-4 shrink-0', className)}
      strokeWidth={1.75}
      aria-hidden={true}
      {...props}
    />
  )
}
