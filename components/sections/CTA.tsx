'use client'

import { useRegisterSection } from '../useRegisterSection'
import { Container } from '../Container'
import { SectionHeading } from '../SectionHeading'
import { Button } from '../Button'

interface CTAProps {
  title: string
  subtitle: string
  cta: {
    label: string
    href: string
  }
  secondaryCTA?: {
    label: string
    href: string
  }
  className?: string
}

export function CTA({ title, subtitle, cta, secondaryCTA, className = '' }: CTAProps) {
  // Runtime guard - only one CTA per page
  const isRegistered = useRegisterSection('CTA', 'CTA')
  
  if (!isRegistered) return null

  return (
    <section className="py-16 lg:py-24 bg-mist-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          className="mb-8"
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            as="a" 
            href={cta.href} 
            size="lg"
            data-cta="cta-primary"
          >
            {cta.label}
          </Button>
          {secondaryCTA && (
            <Button 
              variant="ghost" 
              as="a" 
              href={secondaryCTA.href} 
              size="lg"
              data-cta="cta-secondary"
            >
              {secondaryCTA.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
