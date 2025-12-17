import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'

const baseVariants = {
  default: 'bg-[#8B5CF6] hover:bg-[#A78BFA] text-white border border-white/10',
  outline: 'border border-white/15 bg-transparent hover:bg-white/5 text-white',
  ghost: 'bg-transparent hover:bg-white/5 text-white border border-transparent',
  destructive: 'bg-red-500 hover:bg-red-600 text-white border border-white/10'
}

const sizeVariants = {
  default: 'h-11 px-6 text-sm',
  sm: 'h-9 px-4 text-sm',
  lg: 'h-12 px-8 text-base',
  icon: 'h-10 w-10 p-0'
}

export const Button = forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121216]',
        baseVariants[variant],
        sizeVariants[size],
        className
      )}
      {...props}
    />
  )
})

Button.displayName = 'Button'

