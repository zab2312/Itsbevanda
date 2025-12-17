import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Switch = forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="switch"
    aria-checked={checked}
    className={cn(
      'relative inline-flex h-6 w-11 items-center rounded-full border border-white/10 transition bg-[#2A2435]',
      checked ? 'bg-[#8B5CF6]' : 'bg-[#2A2435]',
      className
    )}
    onClick={() => onCheckedChange?.(!checked)}
    {...props}
  >
    <span
      className={cn(
        'inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition',
        checked ? 'translate-x-5' : 'translate-x-1'
      )}
    />
  </button>
))

Switch.displayName = 'Switch'

