'use client'

import { useState } from 'react'
import { useRegisterSection } from '../useRegisterSection'
import { Container } from '../Container'
import { SectionHeading } from '../SectionHeading'
import { Card } from '../Card'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title?: string
  subtitle?: string
  items?: FAQItem[]
}

const defaultFAQItems: FAQItem[] = [
  {
    question: 'Hur snart ser jag resultat?',
    answer: 'De flesta kunder ser mätbara förbättringar inom 30 dagar. Vi garanterar resultat eller jobbar gratis.'
  },
  {
    question: 'Vad kostar era tjänster?',
    answer: 'Vi erbjuder transparenta priser med inga dolda kostnader. Kontakta oss för en personlig offert baserad på dina behov.'
  },
  {
    question: 'Kan ni hjälpa med befintlig webbplats?',
    answer: 'Absolut! Vi kan optimera din befintliga webbplats för bättre synlighet och konverteringar.'
  },
  {
    question: 'Hur mäter ni framgång?',
    answer: 'Vi använder verktyg som Google Analytics och Search Console för att spåra trafik, konverteringar och ranking.'
  }
]

export function FAQ({ 
  title = 'Vanliga frågor', 
  subtitle = 'Svar på de vanligaste frågorna om våra tjänster',
  items = defaultFAQItems 
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  // Runtime guard - only one FAQ per page
  const isRegistered = useRegisterSection('FAQ', 'FAQ')
  
  if (!isRegistered) return null

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section">
      <Container>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          className="text-center mb-16"
        />
        
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-mist-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-ink-800">
                  {item.question}
                </h3>
                <div className={`ml-4 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <svg className="w-5 h-5 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-line">
                    <p className="text-ink-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
