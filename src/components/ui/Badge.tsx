import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  tone?: 'primary' | 'accent' | 'muted' | 'invert'
  className?: string
}

const tones = {
  primary: 'bg-primary-soft text-primary-deep',
  accent: 'text-accent-warm ring-1 ring-accent/30 bg-accent/8',
  muted: 'bg-surface-muted text-ink-muted ring-1 ring-border',
  invert: 'bg-white/12 text-white ring-1 ring-white/20',
}

export function Badge({ children, tone = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
