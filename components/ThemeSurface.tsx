import { ReactNode } from 'react';

interface ThemeSurfaceProps {
  children: ReactNode;
  className?: string;
}

export function ThemeSurface({ children, className = '' }: ThemeSurfaceProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Background layers */}
      <div className="absolute inset-0 bg-bg-hero" />
      
      {/* Radial gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gold/15 rounded-full blur-3xl" />
      </div>
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise opacity-20" />
      
      {/* Glow rings behind content */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[800px] h-[800px] rounded-full border border-blue/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-teal/8 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/6 blur-xl" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
