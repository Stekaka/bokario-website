import React, { ReactNode, useState, useMemo, useCallback } from 'react';
import { Card } from './Card';
import { LoadingSpinner } from './LoadingSpinner';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  cta: {
    label: string;
    href: string;
  };
}

interface PricingProps {
  tiers: PricingTier[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Pricing = React.memo(function Pricing({ tiers, title, subtitle, className = '' }: PricingProps) {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [clickedTier, setClickedTier] = useState<string | null>(null);

  const handleTierClick = useCallback((tierName: string, href: string) => {
    setClickedTier(tierName);
    
    // Simulate loading state
    setTimeout(() => {
      if (href.startsWith('/#')) {
        // Smooth scroll to contact section
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // Navigate to page
        window.location.href = href;
      }
      setClickedTier(null);
    }, 500);
  }, []);

  const handleMouseEnter = useCallback((tierName: string) => {
    setHoveredTier(tierName);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredTier(null);
  }, []);

  // Memoize the rendered tiers for better performance
  const renderedTiers = useMemo(() => {
    return tiers.map((tier, index) => (
      <div 
        key={tier.name} 
        className="relative group"
        onMouseEnter={() => handleMouseEnter(tier.name)}
        onMouseLeave={handleMouseLeave}
      >
        <Card 
          variant="glass" 
          className={`p-8 h-full transition-all duration-500 ease-out cursor-pointer ${
            tier.recommended ? 'border-gradient' : ''
          } ${
            hoveredTier === tier.name 
              ? 'transform scale-[1.02] shadow-s2 border-white/30' 
              : 'hover:scale-[1.01] hover:shadow-s1'
          }`}
        >
          {/* Recommended badge */}
          {tier.recommended && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-gold to-yellow-400 text-body font-bold px-4 py-2 rounded-pill text-xs shadow-lg">
                Rekommenderad
              </div>
            </div>
          )}
          
          {/* Tier header */}
          <div className="text-center mb-8">
            <h3 className="text-h3 text-ink mb-2 transition-colors duration-300 group-hover:text-teal">
              {tier.name}
            </h3>
            
            <div className="mb-4">
              <span className="text-4xl font-bold text-ink transition-colors duration-300 group-hover:text-blue">
                {tier.price}
              </span>
              <span className="text-body text-ink-dim ml-2">
                {tier.period}
              </span>
            </div>
            
            <p className="text-body text-ink-dim">
              {tier.description}
            </p>
          </div>
          
          {/* Features */}
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start group/feature">
                <div className="w-5 h-5 rounded-full bg-teal/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/feature:bg-teal/30 group-hover/feature:scale-110">
                  <div className="w-2 h-2 rounded-full bg-teal transition-all duration-300 group-hover/feature:scale-125" />
                </div>
                <span className="text-sm text-ink-dim transition-colors duration-300 group-hover/feature:text-ink">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          
          {/* CTA */}
          <div className="mt-auto">
            <button
              onClick={() => handleTierClick(tier.name, tier.cta.href)}
              disabled={clickedTier === tier.name}
              className={`w-full text-center py-3 px-6 rounded-card font-semibold transition-all duration-300 transform ${
                clickedTier === tier.name
                  ? 'bg-gradient-to-r from-blue/80 to-teal/80 cursor-not-allowed scale-95'
                  : 'bg-gradient-to-r from-blue to-teal hover:from-blue/90 hover:to-teal/90 hover:shadow-s2 hover:scale-105 active:scale-95'
              } text-ink shadow-s1`}
            >
              {clickedTier === tier.name ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" color="white" />
                  <span>Laddar...</span>
                </div>
              ) : (
                tier.cta.label
              )}
            </button>
          </div>
        </Card>
      </div>
    ));
  }, [tiers, hoveredTier, clickedTier, handleTierClick, handleMouseEnter, handleMouseLeave]);

  return (
    <section className={`section bg-surface ${className}`}>
      <div className="container-bk">
        {(title || subtitle) && (
          <div className="text-center mb-16">
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
          {renderedTiers}
        </div>
      </div>
    </section>
  );
});
