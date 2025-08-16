import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { tokens } from '@/lib/tokens';

interface BaseProps {
  variant?: 'primary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  children: ReactNode;
}

interface AnchorProps extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {
  children: ReactNode;
  href: string;
}

type Props = ButtonProps | AnchorProps;

export function Button(props: Props) {
  const { children, variant = 'primary', size = 'md', className = '', ...rest } = props;
  
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-220 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 focus:ring-offset-bg-page';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-card',
    md: 'px-6 py-3 text-body rounded-card',
    lg: 'px-8 py-4 text-lead rounded-card',
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue to-teal text-ink font-semibold shadow-s1 hover:shadow-s2 relative overflow-hidden group',
    ghost: 'bg-transparent text-ink border border-line hover:bg-white/5 hover:border-white/20',
    link: 'bg-transparent text-blue hover:text-teal underline-offset-4 hover:underline',
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  // Primary button with glossy effect
  if (variant === 'primary' && !('href' in rest)) {
    return (
      <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {/* Glossy highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-220" />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
  
  // Primary link button
  if (variant === 'primary' && 'href' in rest) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {/* Glossy highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-220" />
        <span className="relative z-10">{children}</span>
      </a>
    );
  }
  
  // Link button
  if ('href' in rest) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  
  // Regular button
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
