import React, { useState, useEffect } from 'react';

interface MobileNavigationProps {
  sections: Array<{
    id: string;
    label: string;
    ref: React.RefObject<HTMLDivElement>;
  }>;
  className?: string;
}

export function MobileNavigation({ sections, className = '' }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section.ref.current) {
          const element = section.ref.current;
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsOpen(false);
    }
  };

  return (
    <div className={`lg:hidden ${className}`}>
      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-gradient-to-r from-blue to-teal text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Öppna navigation"
      >
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Navigation Panel */}
          <div className="absolute bottom-24 left-6 w-64 bg-surface/95 backdrop-blur-md rounded-card border border-line shadow-2xl">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-ink mb-3 px-2">Navigation</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.ref)}
                    className={`w-full text-left px-3 py-2 rounded-card text-sm transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue/20 to-teal/20 text-ink border border-blue/30'
                        : 'text-ink-dim hover:text-ink hover:bg-white/5'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface FloatingNavigationProps {
  sections: Array<{
    id: string;
    label: string;
    ref: React.RefObject<HTMLDivElement>;
  }>;
  className?: string;
}

export function FloatingNavigation({ sections, className = '' }: FloatingNavigationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 lg:hidden ${className}`}>
      <div className="bg-surface/90 backdrop-blur-md rounded-full border border-line shadow-lg px-4 py-2">
        <div className="flex space-x-1">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                if (section.ref.current) {
                  section.ref.current.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="w-2 h-2 rounded-full bg-ink-dim hover:bg-ink transition-colors duration-200"
              aria-label={`Gå till ${section.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
