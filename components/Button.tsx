import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'link'
type ButtonSize = 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  'data-cta'?: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

interface ButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  as?: 'button'
}

interface LinkButtonProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  as: 'a'
  href: string
}

type ButtonComponentProps = ButtonProps | LinkButtonProps

export function Button(props: ButtonComponentProps) {
  const { variant = 'primary', size = 'md', className = '', children, ...rest } = props
  const isLink = 'as' in props && props.as === 'a'

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-700 shadow-e1 hover:shadow-e2',
    ghost: 'text-ink-800 hover:bg-mist-100 active:bg-mist-200',
    link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline'
  }
  
  const sizeClasses = {
    md: 'h-11 px-6 text-base rounded-xl',
    lg: 'h-13 px-8 text-lg rounded-xl'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (isLink) {
    const { as, ...linkProps } = rest as LinkButtonProps
    return (
      <a className={classes} {...linkProps}>
        {children}
      </a>
    )
  }

  const { as, ...buttonProps } = rest as ButtonProps
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
