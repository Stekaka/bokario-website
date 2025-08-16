"use client";

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  sizes,
  fill = false,
  style
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if WebP is supported
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 1, 1);
        const dataURL = canvas.toDataURL('image/webp');
        setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
      }
    };

    checkWebPSupport();
  }, []);

  // Generate optimized src with WebP support
  const getOptimizedSrc = () => {
    if (supportsWebP && src.includes('.')) {
      const baseName = src.substring(0, src.lastIndexOf('.'));
      const extension = src.substring(src.lastIndexOf('.'));
      if (extension !== '.svg') {
        return `${baseName}.webp`;
      }
    }
    return src;
  };

  // Generate responsive sizes if not provided
  const getResponsiveSizes = () => {
    if (sizes) return sizes;
    
    if (fill) {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
    
    if (width <= 640) {
      return '100vw';
    } else if (width <= 1024) {
      return '50vw';
    } else {
      return '33vw';
    }
  };

  // Generate srcSet for different densities
  const generateSrcSet = () => {
    const densities = [1, 2, 3];
    const baseSrc = getOptimizedSrc();
    
    return densities
      .map(density => {
        const w = Math.round(width * density);
        const h = Math.round(height * density);
        return `${baseSrc}?w=${w}&h=${h}&q=${quality} ${density}x`;
      })
      .join(', ');
  };

  if (error) {
    return (
      <div 
        className={`bg-surface/20 border border-white/10 rounded-lg flex items-center justify-center ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <div className="text-center text-ink-dim">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Bild kunde inte laddas</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue/10 to-teal/10 animate-pulse"
          style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
        />
      )}
      
      {/* Optimized Next.js Image */}
      <Image
        src={getOptimizedSrc()}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        sizes={getResponsiveSizes()}
        fill={fill}
        style={style}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading={priority ? 'eager' : 'lazy'}
        sizes={getResponsiveSizes()}
      />
      
      {/* WebP fallback indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
          {supportsWebP ? 'WebP' : 'JPEG/PNG'}
        </div>
      )}
    </div>
  );
}

// Background image optimizer
interface BackgroundImageProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundImage({ src, className = '', children }: BackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 1, 1);
        const dataURL = canvas.toDataURL('image/webp');
        setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
      }
    };

    checkWebPSupport();
  }, []);

  const getOptimizedSrc = () => {
    if (supportsWebP && src.includes('.')) {
      const baseName = src.substring(0, src.lastIndexOf('.'));
      const extension = src.substring(src.lastIndexOf('.'));
      if (extension !== '.svg') {
        return `${baseName}.webp`;
      }
    }
    return src;
  };

  return (
    <div 
      className={`relative ${className}`}
      style={{
        backgroundImage: `url(${getOptimizedSrc()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Preload image */}
      <img
        src={getOptimizedSrc()}
        alt=""
        className="hidden"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Content overlay */}
      <div className={`relative z-10 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
      
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-surface/20 animate-pulse" />
      )}
    </div>
  );
}

// Lazy loading image with intersection observer
interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  threshold?: number;
}

export function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  threshold = 0.1 
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        threshold,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue/10 to-teal/10 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
