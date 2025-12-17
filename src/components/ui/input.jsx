import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-11 w-full rounded-xl border border-white/10 bg-[#121216] px-4 text-sm text-white placeholder:text-white/40 shadow-inner shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181820]',
      className
    )}
    {...props}
  />
))

Input.displayName = 'Input'

