import React, { useState, useRef, useEffect, useCallback } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
};

export function FAQ({ items, title, subtitle, className = '' }: Props) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [animating, setAnimating] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (index: number) => {
    if (animating.has(index)) return;
    
    setAnimating(prev => new Set(prev).add(index));
    
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });

    setTimeout(() => {
      setAnimating(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(index);
    }
  };

  const setItemRef = useCallback((el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el;
  }, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

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
        
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <div 
              key={index} 
              ref={el => setItemRef(el, index)}
              className="glass border border-white/25 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-bg-page"
                aria-expanded={openItems.has(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-body font-semibold text-ink">
                  {item.question}
                </span>
                
                <div className={`w-6 h-6 text-teal transition-all duration-300 flex items-center justify-center ${
                  openItems.has(index) ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
                }`}>
                  <svg 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                    />
                  </svg>
                </div>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`transition-all duration-300 ease-in-out ${
                  openItems.has(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
                style={{
                  maxHeight: openItems.has(index) ? '400px' : '0px'
                }}
              >
                <div className="px-6 pb-4 border-t border-white/10">
                  <p className="text-body text-ink-dim leading-relaxed pt-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
