import { ReactNode } from 'react'

interface LogoRowProps {
  title?: string
  children: ReactNode
  className?: string
}

export function LogoRow({ title, children, className = '' }: LogoRowProps) {
  return (
    <div className="text-center py-16 lg:py-24">
      <p className="text-base text-ink-600 mb-8">{title}</p>
      <div className="flex items-center justify-center gap-8 md:gap-12 opacity-60">
        {children}
      </div>
    </div>
  )
}
