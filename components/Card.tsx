import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  elevated?: boolean
  hover?: boolean
}

export function Card({ children, className = '', elevated = false, hover = true }: CardProps) {
  const baseClasses = 'bg-white rounded-12 border border-line'
  const shadowClasses = elevated ? 'shadow-e2' : 'shadow-e1'
  const hoverClasses = hover ? 'hover:shadow-e2' : ''
  const transitionClasses = 'transition-shadow duration-160'

  const classes = `${baseClasses} ${shadowClasses} ${hoverClasses} ${transitionClasses} ${className}`

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
