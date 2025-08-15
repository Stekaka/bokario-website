import { ReactNode } from 'react'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  centered?: boolean
}

export function SectionHeading({ 
  title, 
  subtitle, 
  children, 
  className = '', 
  centered = false 
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {title && <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-950 mb-4">{title}</h2>}
      {subtitle && <p className="text-lg md:text-xl text-ink-700 mb-8 max-w-[65ch] mx-auto">{subtitle}</p>}
    </div>
  )
}
