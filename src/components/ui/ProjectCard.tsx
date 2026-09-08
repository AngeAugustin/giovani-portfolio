import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from './Badge'
import { MediaFrame } from './MediaFrame'
import { cn } from '@/lib/utils'
import type { DomainId } from '@/types'

interface ProjectCardProps {
  id: string
  domain: DomainId
  year: string
  image: string
  href: string
  layout?: 'default' | 'featured' | 'row' | 'case'
  className?: string
}

export function ProjectCard({
  id,
  domain,
  year,
  image,
  href,
  layout = 'default',
  className,
}: ProjectCardProps) {
  const { t } = useTranslation(['portfolio', 'common'])
  const title = t(`portfolio:items.${id}.title`)
  const summary = t(`portfolio:items.${id}.summary`)

  if (layout === 'case') {
    return (
      <Link
        to={href}
        className={cn(
          'group flex h-full flex-col overflow-hidden border border-border bg-surface transition duration-300',
          'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-lift)]',
          className,
        )}
        data-cursor-hover
      >
        <MediaFrame
          src={image}
          alt={title}
          aspect="aspect-[16/10]"
          imgClassName="transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="flex flex-1 flex-col border-t border-border p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-muted">{year}</span>
            <span className="text-ink-muted/40" aria-hidden>
              ·
            </span>
            <Badge tone="muted">{t(`common:domains.${domain}`)}</Badge>
          </div>
          <h2 className="mt-3 font-display text-xl leading-snug text-ink sm:text-2xl">{title}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted sm:text-base">{summary}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
            {t('portfolio:caseStudy')}
            <ArrowUpRight size={16} aria-hidden />
          </span>
        </div>
      </Link>
    )
  }

  if (layout === 'featured') {
    return (
      <Link
        to={href}
        className={cn(
          'group relative grid overflow-hidden bg-stage text-white lg:grid-cols-12',
          className,
        )}
        data-cursor-hover
      >
        <MediaFrame
          src={image}
          alt={title}
          aspect="aspect-[16/11] lg:aspect-auto lg:min-h-[28rem]"
          className="lg:col-span-7"
          overlay
          imgClassName="transition duration-700 group-hover:scale-105"
        />
        <div className="flex flex-col justify-end gap-4 p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="invert">{t(`common:domains.${domain}`)}</Badge>
            <span className="text-xs text-white/55">{year}</span>
          </div>
          <h3 className="font-display text-2xl text-white sm:text-3xl lg:text-4xl">{title}</h3>
          <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base">{summary}</p>
          <span className="text-sm font-semibold text-accent">{t('common:cta.viewProject')} →</span>
        </div>
      </Link>
    )
  }

  if (layout === 'row') {
    return (
      <Link
        to={href}
        className={cn(
          'group grid gap-4 border-b border-border py-5 transition hover:bg-primary-soft/40 sm:grid-cols-12 sm:items-center sm:gap-6 sm:py-6',
          className,
        )}
        data-cursor-hover
      >
        <MediaFrame
          src={image}
          alt={title}
          aspect="aspect-[16/10]"
          className="sm:col-span-3"
          imgClassName="transition duration-500 group-hover:scale-105"
        />
        <div className="sm:col-span-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="muted">{t(`common:domains.${domain}`)}</Badge>
            <span className="text-xs text-ink-muted">{year}</span>
          </div>
          <h3 className="mt-2 font-display text-xl text-ink sm:text-2xl">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{summary}</p>
        </div>
        <div className="hidden text-right text-sm font-semibold text-primary sm:col-span-3 sm:block">
          {t('common:cta.viewProject')} →
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={href}
      className={cn('group block', className)}
      data-cursor-hover
    >
      <MediaFrame
        src={image}
        alt={title}
        aspect="aspect-[4/3]"
        overlay
        imgClassName="transition duration-700 group-hover:scale-105"
      >
        <Badge tone="invert">{t(`common:domains.${domain}`)}</Badge>
        <h3 className="mt-2 font-display text-xl text-white sm:text-2xl">{title}</h3>
        <p className="mt-1 text-xs text-white/60">{year}</p>
      </MediaFrame>
    </Link>
  )
}
