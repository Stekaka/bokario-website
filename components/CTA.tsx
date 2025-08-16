import { ReactNode } from 'react';
import { Button } from './Button';

interface CTAProps {
  title: string;
  subtitle?: string;
  ctas?: ReactNode;
  className?: string;
}

export function CTA({ title, subtitle, ctas, className = '' }: CTAProps) {
  return (
    <section className={`section bg-gradient-to-r from-blue via-purple-600 to-teal ${className}`}>
      <div className="container-bk text-center">
        <h2 className="font-display text-h2 text-ink mb-6">
          {title}
        </h2>
        
        {subtitle && (
          <p className="lede mx-auto mb-8 text-ink/90">
            {subtitle}
          </p>
        )}
        
        {ctas && (
          <div className="flex flex-wrap gap-4 justify-center">
            {ctas}
          </div>
        )}
      </div>
    </section>
  );
}
