import { ReactNode } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'info'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-999 text-caption font-medium'
  
  const variantClasses = {
    default: 'bg-mist-100 text-ink-700',
    success: 'bg-success/10 text-success',
    warning: 'bg-gold/10 text-gold',
    info: 'bg-primary-600/10 text-primary-600'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <span className={classes}>
      {children}
    </span>
  )
}
