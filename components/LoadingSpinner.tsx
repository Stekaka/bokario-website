import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'teal' | 'white';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'teal', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    blue: 'border-blue/30 border-t-blue',
    teal: 'border-teal/30 border-t-teal',
    white: 'border-white/30 border-t-white'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${colorClasses[color]} border-2 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Laddar..."
    />
  );
}

export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex space-x-1 ${className}`} role="status" aria-label="Laddar...">
      <div className="w-2 h-2 bg-teal rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-teal rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-teal rounded-full animate-bounce"></div>
    </div>
  );
}

export function LoadingBar({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full bg-surface/20 rounded-full h-1 overflow-hidden ${className}`}>
      <div className="h-full bg-gradient-to-r from-blue to-teal rounded-full animate-pulse"></div>
    </div>
  );
}
