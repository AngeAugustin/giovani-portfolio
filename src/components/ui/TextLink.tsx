import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TextLinkProps {
  to: string
  children: ReactNode
  className?: string
  tone?: 'primary' | 'onDark' | 'muted'
}

export function TextLink({ to, children, className, tone = 'primary' }: TextLinkProps) {
  const tones = {
    primary: 'text-primary hover:text-primary-deep',
    onDark: 'text-white/85 hover:text-white',
    muted: 'text-ink-muted hover:text-primary',
  }

  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors',
        tones[tone],
        className,
      )}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  )
}
