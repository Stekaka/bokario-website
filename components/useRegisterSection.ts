'use client'

import { useEffect, useState, useRef } from 'react'
import { useSectionProvider } from './SectionProvider'

type SectionType = 'Pricing' | 'FAQ' | 'Process' | 'CTA'

export function useRegisterSection(type: SectionType, componentName: string) {
  const { registerSection, isSectionRegistered } = useSectionProvider()
  const [isRegistered, setIsRegistered] = useState(false)
  const hasRegisteredRef = useRef(false)

  useEffect(() => {
    // Prevent duplicate registration within the same component instance
    if (hasRegisteredRef.current) {
      return
    }

    // Check if already registered by another component
    if (isSectionRegistered(type)) {
      // In development, log warning for duplicates but don't throw
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Duplicate ${type} section detected! Only one ${type} section allowed per page. ` +
          `Component: ${componentName}`
        )
      }
      
      // Set as registered so this component still renders
      setIsRegistered(true)
      return
    }

    // Register the section
    registerSection(type, componentName)
    setIsRegistered(true)
    hasRegisteredRef.current = true
  }, [type, componentName, registerSection, isSectionRegistered])

  return isRegistered
}
