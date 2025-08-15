import { ReactNode } from 'react'
import { Button } from '../Button'

interface HeroProps {
  tagline: string
  lead: string
  primaryCTA: {
    label: string
    href: string
  }
  secondaryCTA?: {
    label: string
    href: string
  }
  className?: string
}

export function Hero({ tagline, lead, primaryCTA, secondaryCTA, className = '' }: HeroProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-ink-950 mb-6 max-w-[65ch] mx-auto">
          {tagline}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-ink-700 mb-8 max-w-[70ch] mx-auto">
          {lead}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            as="a" 
            href="#demo" 
            size="lg"
            data-cta="hero-primary"
          >
            {primaryCTA.label}
          </Button>
          <Button 
            variant="ghost" 
            as="a" 
            href="#learn-more" 
            size="lg"
            data-cta="hero-secondary"
          >
            {secondaryCTA?.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
