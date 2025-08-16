'use client'

import { useRegisterSection } from '../useRegisterSection'
import { Container } from '../Container'
import { SectionHeading } from '../SectionHeading'
import { Button } from '../Button'
import { Card } from '../Card'
import { Badge } from '../Badge'

interface PricingTier {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  featured?: boolean
  cta: {
    label: string
    href: string
  }
}

interface PricingProps {
  tiers: PricingTier[]
  title?: string
  subtitle?: string
  className?: string
}

export function Pricing({ tiers, title, subtitle, className = '' }: PricingProps) {
  // Runtime guard - only one Pricing per page
  const isRegistered = useRegisterSection('Pricing', 'Pricing')
  
  if (!isRegistered) return null

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-950 mb-4">{title}</h2>}
            {subtitle && <p className="text-lg md:text-xl text-ink-700 max-w-[65ch] mx-auto">{subtitle}</p>}
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card key={index} className={`p-8 text-center ${tier.featured ? 'ring-2 ring-primary-600' : ''}`}>
              {tier.featured && (
                <Badge variant="info" className="mb-4">
                  Rekommenderad
                </Badge>
              )}
              
              <h3 className="text-2xl font-bold text-ink-950 mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-ink-950">{tier.price}</span>
                <span className="text-base text-ink-600">/{tier.period}</span>
              </div>
              <p className="text-base text-ink-700 mb-6">{tier.description}</p>
              
              <ul className="space-y-3 mb-8 text-left">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-ink-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button href={tier.cta.href} size="lg" className="w-full">
                {tier.cta.label}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
