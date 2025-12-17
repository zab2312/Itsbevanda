import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm font-medium text-white/80 tracking-wide uppercase', className)}
    {...props}
  />
))

Label.displayName = 'Label'

