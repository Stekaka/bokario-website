import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  hover?: boolean;
}

export function Card({ children, className = '', variant = 'default', hover = true }: CardProps) {
  const baseClasses = 'rounded-card border transition-all duration-220';
  
  const variantClasses = {
    default: 'bg-paper border-line-light shadow-s1',
    elevated: 'bg-paper border-line-light shadow-s2',
    glass: 'glass',
  };
  
  const hoverClasses = hover ? 'hover:shadow-s2 hover:scale-[1.02]' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
