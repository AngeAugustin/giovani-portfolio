import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import { MediaFrame } from './MediaFrame'
import { cn } from '@/lib/utils'

interface DomainRowProps {
  title: string
  tagline: string
  description: string
  href: string
  image: string
  index: string
  ctaLabel: string
  reverse?: boolean
  className?: string
}

/** Rangée éditoriale asymétrique pour un univers - pas une carte icône. */
export function DomainRow({
  title,
  tagline,
  description,
  href,
  image,
  index,
  ctaLabel,
  reverse = false,
  className,
}: DomainRowProps) {
  return (
    <Link
      to={href}
      className={cn(
        'group grid items-center gap-6 border-t border-border py-10 sm:gap-8 sm:py-14 lg:grid-cols-12 lg:gap-10',
        className,
      )}
      data-cursor-hover
    >
      <div
        className={cn(
          'lg:col-span-5',
          reverse ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        <MediaFrame
          src={image}
          alt=""
          aspect="aspect-[5/4]"
          imgClassName="transition duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div
        className={cn(
          'flex gap-4 lg:col-span-7 lg:gap-6',
          reverse ? 'lg:order-1' : 'lg:order-2',
        )}
      >
        <span className="cue-light mt-1 hidden h-16 shrink-0 sm:block" aria-hidden />
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-sm text-ink-muted">{index}</span>
            <Eyebrow>{tagline}</Eyebrow>
          </div>
          <h3 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] text-primary-deep">
            {title}
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}
