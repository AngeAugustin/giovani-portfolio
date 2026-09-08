import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'invert'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  asChild?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-deep shadow-[var(--shadow-soft)]',
  secondary:
    'bg-transparent text-primary-deep border border-primary/25 hover:border-primary hover:bg-primary-soft',
  ghost: 'bg-transparent text-ink hover:bg-primary-soft/80',
  accent: 'bg-accent text-white hover:bg-accent-warm shadow-[var(--shadow-soft)]',
  invert: 'bg-white text-primary-deep hover:bg-primary-soft',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium font-sans tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', className, children, asChild = false, type = 'button', ...props },
    ref,
  ) => {
    const classes = cn(base, variants[variant], sizes[size], className)

    if (asChild && isValidElement(children)) {
      const child = Children.only(children) as ReactElement<{ className?: string }>
      return cloneElement(child, {
        className: cn(classes, child.props.className),
      })
    }

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
