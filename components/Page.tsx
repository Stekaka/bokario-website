'use client'

import { useEffect } from 'react'
import { useSectionProvider } from './SectionProvider'

interface PageProps {
  children: React.ReactNode
  title?: string
}

export function Page({ children, title }: PageProps) {
  const { getRegisteredSections } = useSectionProvider()

  useEffect(() => {
    // Set page title if provided
    if (title) {
      document.title = title
    }

    // Log registered sections in development
    if (process.env.NODE_ENV === 'development') {
      const sections = getRegisteredSections()
      console.log('Page sections:', sections)
    }
  }, [title, getRegisteredSections])

  return (
    <div className="min-h-screen bg-mist-50">
      {children}
    </div>
  )
}
