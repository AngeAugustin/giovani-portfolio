import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from './Badge'
import { MediaFrame } from './MediaFrame'
import { cn } from '@/lib/utils'
import type { DomainId } from '@/types'

interface BlogCardProps {
  id: string
  domain: DomainId
  date: string
  readMinutes: number
  image: string
  href: string
  className?: string
  locale: string
}

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function BlogCard({
  id,
  domain,
  date,
  readMinutes,
  image,
  href,
  className,
  locale,
}: BlogCardProps) {
  const { t } = useTranslation(['blog', 'common'])
  const title = t(`blog:items.${id}.title`)
  const excerpt = t(`blog:items.${id}.excerpt`)

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
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <time dateTime={date}>{formatDate(date, locale)}</time>
          <span aria-hidden>·</span>
          <span>{t('blog:readTime', { count: readMinutes })}</span>
          <span aria-hidden>·</span>
          <Badge tone="muted">{t(`common:domains.${domain}`)}</Badge>
        </div>
        <h2 className="mt-3 font-display text-xl leading-snug text-ink sm:text-2xl">{title}</h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted sm:text-base">{excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
          {t('blog:ctaRead')}
          <ArrowUpRight size={16} aria-hidden />
        </span>
      </div>
    </Link>
  )
}
