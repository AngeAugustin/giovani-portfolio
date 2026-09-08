import type { ReactNode } from 'react'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuoteBlockProps {
  quote: string
  author: string
  role: string
  className?: string
}

/** Carte témoignage — guillemets décoratifs + séparateur + auteur (réf. layout cartes). */
export function QuoteBlock({ quote, author, role, className }: QuoteBlockProps) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-7 shadow-[var(--shadow-soft)] sm:p-8',
        className,
      )}
    >
      <Quote
        className="mb-5 size-8 text-primary/40"
        strokeWidth={1.5}
        aria-hidden
      />
      <blockquote className="flex-1 text-base leading-relaxed text-ink-soft sm:text-[1.05rem]">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-semibold text-ink">{author}</p>
        <p className="mt-0.5 text-sm text-ink-muted">{role}</p>
      </figcaption>
    </figure>
  )
}

interface ValueLineProps {
  title: string
  text: string
  className?: string
}

export function ValueLine({ title, text, className }: ValueLineProps) {
  return (
    <div className={cn('grid gap-1 border-t border-border py-5 sm:grid-cols-12 sm:gap-6', className)}>
      <p className="font-display text-lg text-primary-deep sm:col-span-4">{title}</p>
      <p className="text-ink-muted sm:col-span-8">{text}</p>
    </div>
  )
}

interface CapabilityListProps {
  items: string[]
  className?: string
}

export function CapabilityList({ items, className }: CapabilityListProps) {
  return (
    <ol className={cn('grid gap-0', className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className="flex gap-4 border-t border-border py-4 sm:gap-6 sm:py-5"
        >
          <span className="w-8 shrink-0 font-display text-sm text-accent">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-base text-ink-soft sm:text-lg">{item}</span>
        </li>
      ))}
    </ol>
  )
}

interface ProofLineProps {
  items: Array<{ value: string; label: string }>
  className?: string
  children?: ReactNode
}

export function ProofLine({ items, className }: ProofLineProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-border py-5 text-sm sm:gap-x-10 sm:py-6',
        className,
      )}
    >
      {items.map((item) => (
        <p key={item.label} className="text-ink-muted">
          <span className="font-display text-xl text-primary-deep sm:text-2xl">{item.value}</span>
          <span className="ml-2">{item.label}</span>
        </p>
      ))}
    </div>
  )
}
