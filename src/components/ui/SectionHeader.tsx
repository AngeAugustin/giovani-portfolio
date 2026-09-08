import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import { ScrollReveal } from './ScrollReveal'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
  /** `onDark` pour fonds primary / stage */
  tone?: 'light' | 'onDark'
  action?: { label: string; to: string }
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
  tone = 'light',
  action,
}: SectionHeaderProps) {
  const isLeft = align === 'left'
  const onDark = tone === 'onDark'

  return (
    <ScrollReveal
      className={cn(
        'mb-10 max-w-2xl md:mb-14',
        !isLeft && 'mx-auto text-center',
        action && 'md:mx-0 md:flex md:max-w-none md:items-end md:justify-between md:gap-8 md:text-left',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <Eyebrow className="mb-3" tone={onDark ? 'onDark' : 'accent'}>
            {eyebrow}
          </Eyebrow>
        )}
        <div className="flex gap-4">
          {isLeft && <span className="cue-light mt-2 hidden h-12 shrink-0 sm:block" aria-hidden />}
          <h2
            className={cn(
              'font-display text-[clamp(1.65rem,4vw,2.85rem)] text-balance',
              onDark ? 'text-white' : 'text-ink',
            )}
          >
            {title}
          </h2>
        </div>
        {description && (
          <p
            className={cn(
              'mt-3 text-base sm:mt-4 sm:text-lg',
              onDark ? 'text-white/70' : 'text-ink-muted',
              isLeft && 'sm:pl-7',
            )}
          >
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          to={action.to}
          className={cn(
            'group mt-6 inline-flex shrink-0 items-center gap-2 text-sm font-semibold transition-colors md:mt-0',
            onDark
              ? 'text-white hover:text-accent'
              : 'text-primary hover:text-primary-deep',
          )}
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </ScrollReveal>
  )
}
