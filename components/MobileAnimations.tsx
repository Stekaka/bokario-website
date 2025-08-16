"use client";

import { useState, useEffect, useRef } from 'react';

interface MobileAnimationsProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounceIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export function MobileAnimations({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = ''
}: MobileAnimationsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, delay, threshold]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    switch (animation) {
      case 'fadeIn':
        return `${baseClasses} ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;
      case 'slideUp':
        return `${baseClasses} ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
      case 'slideLeft':
        return `${baseClasses} ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`;
      case 'slideRight':
        return `${baseClasses} ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`;
      case 'scaleIn':
        return `${baseClasses} ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      case 'bounceIn':
        return `${baseClasses} ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`;
      default:
        return baseClasses;
    }
  };

  const getAnimationStyle = () => ({
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  });

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
      style={getAnimationStyle()}
    >
      {children}
    </div>
  );
}

// Staggered mobile animations for lists
interface StaggeredMobileProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounceIn';
  className?: string;
}

export function StaggeredMobile({
  children,
  staggerDelay = 100,
  animation = 'fadeIn',
  className = ''
}: StaggeredMobileProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <MobileAnimations
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          className="mb-4"
        >
          {child}
        </MobileAnimations>
      ))}
    </div>
  );
}

// Performance-optimized mobile animations
interface PerformanceMobileProps {
  children: React.ReactNode;
  className?: string;
}

export function PerformanceMobile({ children, className = '' }: PerformanceMobileProps) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Unobserve after animation starts for performance
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-1000 ease-out will-change-transform ${className}`}
      style={{
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
        opacity: isInView ? 1 : 0.8,
      }}
    >
      {children}
    </div>
  );
}

// Touch-optimized animations
interface TouchOptimizedProps {
  children: React.ReactNode;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  className?: string;
}

export function TouchOptimized({ 
  children, 
  onTouchStart, 
  onTouchEnd, 
  className = '' 
}: TouchOptimizedProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = () => {
    setIsPressed(true);
    onTouchStart?.();
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    onTouchEnd?.();
  };

  return (
    <div
      className={`transform transition-all duration-150 ease-out touch-manipulation ${className}`}
      style={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        filter: isPressed ? 'brightness(0.95)' : 'brightness(1)',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}
