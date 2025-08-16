import React, { useEffect, useRef, useState } from 'react';

// Parallax scrolling effect
export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = '' 
}: { 
  children: React.ReactNode; 
  speed?: number; 
  className?: string; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={ref}
      className={`relative ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
}

// Floating animation with hover effects
export function FloatingElement({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) {
  return (
    <div 
      className={`animate-float hover:animate-pulse ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animation: `float 6s ease-in-out infinite`
      }}
    >
      {children}
    </div>
  );
}

// Magnetic hover effect
export function MagneticElement({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * 0.1, y: y * 0.1 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Text reveal animation
export function TextReveal({ 
  children, 
  className = '',
  direction = 'up' 
}: { 
  children: React.ReactNode; 
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      default: return 'translateY(30px)';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getTransform()
      }}
    >
      {children}
    </div>
  );
}

// Gradient text with animation
export function GradientText({ 
  children, 
  className = '',
  colors = ['from-blue', 'via-teal', 'to-purple'] 
}: { 
  children: React.ReactNode; 
  className?: string;
  colors?: string[];
}) {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [colors.length]);

  const currentColors = [
    colors[colorIndex],
    colors[(colorIndex + 1) % colors.length],
    colors[(colorIndex + 2) % colors.length]
  ];

  return (
    <span 
      className={`bg-gradient-to-r ${currentColors.join(' ')} bg-clip-text text-transparent transition-all duration-1000 ${className}`}
    >
      {children}
    </span>
  );
}

// 3D card with perspective
export function Card3D({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={`perspective-1000 transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Loading skeleton with shimmer effect
export function LoadingSkeleton({ 
  className = '',
  lines = 3 
}: { 
  className?: string;
  lines?: number;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-surface/20 rounded h-4 mb-3 ${
            i === 0 ? 'w-3/4' : i === 1 ? 'w-full' : 'w-2/3'
          }`}
        />
      ))}
      <div className="relative overflow-hidden bg-surface/20 rounded h-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}

// Staggered animation container
export function StaggeredContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: { 
  children: React.ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          style={{
            animationDelay: `${index * staggerDelay}s`
          }}
          className="animate-fade-in-up"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
