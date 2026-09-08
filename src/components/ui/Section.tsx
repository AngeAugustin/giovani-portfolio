import type { ReactNode } from 'react'
import { Container } from './Container'
import { cn } from '@/lib/utils'

type SectionTone = 'default' | 'muted' | 'primary' | 'stage'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  tone?: SectionTone
  containerClassName?: string
  flush?: boolean
}

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-transparent',
  muted: 'bg-surface-muted',
  /* Bleu primaire plein — sections signature, fond propre */
  primary: 'relative overflow-hidden bg-primary-deep text-white',
  stage: 'bg-stage text-white',
}

export function Section({
  children,
  className,
  id,
  tone = 'default',
  containerClassName,
  flush = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]',
        toneClasses[tone],
        className,
      )}
    >
      {flush ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  )
}
