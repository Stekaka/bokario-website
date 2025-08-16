import React, { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function SmoothScroll({ children, className = '' }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let startY = 0;
    let startScrollTop = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      e.preventDefault();
      isScrolling = true;

      const delta = e.deltaY;
      const scrollStep = delta * 0.5; // Smooth scrolling factor

      container.scrollTop += scrollStep;

      setTimeout(() => {
        isScrolling = false;
      }, 50);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startScrollTop = container.scrollTop;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startY) return;

      const currentY = e.touches[0].clientY;
      const diff = startY - currentY;
      const scrollStep = diff * 0.5;

      container.scrollTop = startScrollTop + scrollStep;
    };

    const handleTouchEnd = () => {
      startY = 0;
      startScrollTop = 0;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`overflow-auto scroll-smooth ${className}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  );
}

interface ScrollToTopProps {
  className?: string;
  showAfter?: number; // Show button after scrolling this many pixels
}

export function ScrollToTop({ className = '', showAfter = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-blue to-teal text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 ${className}`}
      aria-label="Scrolla till toppen"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
}
