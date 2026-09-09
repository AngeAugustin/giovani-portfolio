import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: ReactNode
  className?: string
  tone?: 'accent' | 'primary' | 'muted' | 'onDark'
}

/** Label éditorial tracking - remplace les pills Badge pour les titres de section. */
export function Eyebrow({ children, className, tone = 'accent' }: EyebrowProps) {
  const tones = {
    accent: 'text-accent-warm',
    primary: 'text-primary',
    muted: 'text-ink-muted',
    onDark: 'text-accent',
  }

  return (
    <p
      className={cn(
        'text-[0.7rem] font-semibold uppercase tracking-[0.18em] sm:text-xs',
        tones[tone],
        className,
      )}
    >
      {children}
    </p>
  )
}
