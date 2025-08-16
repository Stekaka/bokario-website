import { ReactNode } from 'react';
import { Card } from './Card';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeatureListProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FeatureList({ features, title, subtitle, className = '' }: FeatureListProps) {
  return (
    <section className={`section bg-surface ${className}`}>
      <div className="container-bk">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="font-display text-h2 text-ink mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="lede mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="glass" className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-6 text-teal">
                {feature.icon}
              </div>
              
              <h3 className="text-h3 text-ink mb-3">
                {feature.title}
              </h3>
              
              <p className="text-body text-ink-dim leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
