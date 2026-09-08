import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  href?: string
  interactive?: boolean
}

export function Card({ children, className, href, interactive }: CardProps) {
  const classes = cn(
    'group relative block overflow-hidden rounded-[var(--radius-lg)] border border-border/80 bg-surface transition-all duration-400',
    interactive && 'hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-lift)]',
    className,
  )

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  return <div className={classes}>{children}</div>
}
