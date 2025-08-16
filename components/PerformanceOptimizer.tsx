"use client";

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  fcp?: number;
}

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  className?: string;
}

export function PerformanceOptimizer({ children, className = '' }: PerformanceOptimizerProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isOptimized, setIsOptimized] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Core Web Vitals monitoring
    const measurePerformance = () => {
      if ('PerformanceObserver' in window) {
        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics(prev => ({ ...prev, cls: clsValue }));
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0];
          if (firstEntry) {
            setMetrics(prev => ({ ...prev, fcp: firstEntry.startTime }));
          }
        });
        fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
          fcpObserver.disconnect();
        };
      }
    };

    // TTFB measurement
    const measureTTFB = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measureTTFB();
    } else {
      window.addEventListener('load', measureTTFB);
    }

    const cleanup = measurePerformance();

    return () => {
      cleanup?.();
      window.removeEventListener('load', measureTTFB);
    };
  }, []);

  useEffect(() => {
    // Intersection Observer for lazy loading
    if (elementRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsOptimized(true);
              // Optimize images in viewport
              const images = entry.target.querySelectorAll('img');
              images.forEach((img) => {
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                }
              });
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Performance score calculation
  const getPerformanceScore = () => {
    let score = 100;
    
    if (metrics.lcp && metrics.lcp > 2500) score -= 20;
    if (metrics.fid && metrics.fid > 100) score -= 20;
    if (metrics.cls && metrics.cls > 0.1) score -= 20;
    if (metrics.ttfb && metrics.ttfb > 600) score -= 20;
    if (metrics.fcp && metrics.fcp > 1800) score -= 20;
    
    return Math.max(0, score);
  };

  const score = getPerformanceScore();
  const scoreColor = score >= 90 ? 'text-green-500' : score >= 70 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div ref={elementRef} className={className}>
      {/* Performance indicator (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 z-50 bg-surface/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${scoreColor}`} />
            <span className="font-medium">Performance Score: {score}/100</span>
          </div>
          <div className="space-y-1 text-ink-dim">
            {metrics.lcp && <div>LCP: {metrics.lcp.toFixed(0)}ms</div>}
            {metrics.fid && <div>FID: {metrics.fid.toFixed(0)}ms</div>}
            {metrics.cls && <div>CLS: {metrics.cls.toFixed(3)}</div>}
            {metrics.ttfb && <div>TTFB: {metrics.ttfb.toFixed(0)}ms</div>}
            {metrics.fcp && <div>FCP: {metrics.fcp.toFixed(0)}ms</div>}
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
}

// Lazy loading wrapper for images
interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue/10 to-teal/10 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={isInView ? src : ''}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

// Code splitting wrapper
interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyComponent({ 
  children, 
  fallback = <div className="animate-pulse bg-surface/20 rounded-lg h-32" />, 
  className = '' 
}: LazyComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      {isLoaded ? children : fallback}
    </div>
  );
}
