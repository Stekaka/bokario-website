import React, { Suspense, lazy, ComponentType } from 'react';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyLoader({ children, fallback }: LazyLoaderProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-2 border-blue/30 border-t-blue rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}

interface LazyComponentProps<T extends React.JSX.IntrinsicAttributes> {
  component: ComponentType<T>;
  props: T;
  fallback?: React.ReactNode;
}

export function LazyComponent<T extends React.JSX.IntrinsicAttributes>({ component: Component, props, fallback }: LazyComponentProps<T>) {
  return (
    <LazyLoader fallback={fallback}>
      <Component {...props} />
    </LazyLoader>
  );
}

// Lazy load commonly used components
export const LazyPricing = lazy(() => import('./Pricing').then(module => ({ default: module.Pricing })));
export const LazyFAQ = lazy(() => import('./FAQ').then(module => ({ default: module.FAQ })));
export const LazyCTA = lazy(() => import('./CTA').then(module => ({ default: module.CTA })));

// Performance optimized image component
export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  ...props 
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  [key: string]: any;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...props}
    />
  );
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
}
