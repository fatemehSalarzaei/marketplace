import React, { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx'

type ButtonVariants = 'default' | 'outline' | 'ghost' | 'link'
type ButtonSizes = 'default' | 'sm' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  size?: ButtonSizes
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariants, string> = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  link: 'underline text-blue-600 hover:text-blue-800',
}

const sizeClasses: Record<ButtonSizes, string> = {
  default: 'py-2 px-4 text-sm',
  sm: 'py-1 px-3 text-xs',
  lg: 'py-3 px-6 text-base',
  icon: 'p-2',
}

const Button: FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
