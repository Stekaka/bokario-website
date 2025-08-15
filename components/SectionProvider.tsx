'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type SectionType = 'Pricing' | 'FAQ' | 'Process' | 'CTA'

interface SectionContextType {
  registerSection: (type: SectionType, componentName: string) => void
  isSectionRegistered: (type: SectionType) => boolean
  getRegisteredSections: () => Record<SectionType, string[]>
}

const SectionContext = createContext<SectionContextType | undefined>(undefined)

export function SectionProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Record<SectionType, string[]>>({
    Pricing: [],
    FAQ: [],
    Process: [],
    CTA: [],
  })

  const registerSection = (type: SectionType, componentName: string) => {
    setSections(prev => ({
      ...prev,
      [type]: [...prev[type], componentName]
    }))
  }

  const isSectionRegistered = (type: SectionType) => {
    return sections[type].length > 0
  }

  const getRegisteredSections = () => sections

  return (
    <SectionContext.Provider value={{
      registerSection,
      isSectionRegistered,
      getRegisteredSections,
    }}>
      {children}
    </SectionContext.Provider>
  )
}

export function useSectionProvider() {
  const context = useContext(SectionContext)
  if (context === undefined) {
    throw new Error('useSectionProvider must be used within a SectionProvider')
  }
  return context
}
