import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-2xl border border-white/5 bg-[#181820] shadow-[0_4px_24px_rgba(0,0,0,0.35)]', className)}
    {...props}
  />
))
Card.displayName = 'Card'

export const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 border-b border-white/5', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

export const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
))
CardContent.displayName = 'CardContent'

