import { ReactNode } from 'react'
import { Card } from '../Card'

interface Feature {
  icon: ReactNode
  title: string
  description: string
}

interface FeatureListProps {
  features: Feature[]
  title?: string
  subtitle?: string
  className?: string
}

export function FeatureList({ features, title, subtitle, className = '' }: FeatureListProps) {
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
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-ink-950 mb-3">
                {feature.title}
              </h3>
              <p className="text-base text-ink-700">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
