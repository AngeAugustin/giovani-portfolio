import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Container } from './Container'
import { ScrollReveal } from './ScrollReveal'
import { cn } from '@/lib/utils'

interface DetailLayoutProps {
  backTo: string
  backLabel: string
  title: string
  coverImage?: string | null
  badge?: ReactNode
  meta?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
  contentWidth?: 'article' | 'wide'
  heroLayout?: 'overlay' | 'split' | 'plain'
}

function BackLink({
  to,
  label,
  tone,
}: {
  to: string
  label: string
  tone: 'onDark' | 'onLight'
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors touch-manipulation',
        tone === 'onDark' ? 'text-white/75 hover:text-white' : 'text-ink-muted hover:text-primary',
      )}
    >
      <ArrowLeft
        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
        aria-hidden
      />
      {label}
    </Link>
  )
}

export function DetailLayout({
  backTo,
  backLabel,
  title,
  coverImage,
  badge,
  meta,
  actions,
  children,
  className,
  contentWidth = 'wide',
  heroLayout = 'plain',
}: DetailLayoutProps) {
  const contentMax = contentWidth === 'wide' ? undefined : 'max-w-3xl'
  const titleClass =
    'font-display text-[clamp(1.85rem,5vw,3.25rem)] font-semibold tracking-tight'

  return (
    <article className={className}>
      {heroLayout === 'split' ? (
        <section className="relative overflow-hidden bg-primary-deep text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-deep via-primary to-primary/75" />
          <div
            className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
            aria-hidden
          />
          <Container
            className={cn(
              'relative grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16',
              contentMax,
            )}
          >
            <div className="min-w-0">
              <BackLink to={backTo} label={backLabel} tone="onDark" />
              <div className="mt-5 flex gap-4">
                <span className="cue-light mt-2 hidden h-14 shrink-0 sm:block" aria-hidden />
                <h1 className={cn(titleClass, 'max-w-4xl text-white')}>{title}</h1>
              </div>
              {badge && <div className="mt-4 sm:pl-7">{badge}</div>}
              {meta && <div className="mt-5 sm:pl-7">{meta}</div>}
              {actions && <div className="mt-4 sm:pl-7">{actions}</div>}
            </div>
            {coverImage && (
              <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
                <img
                  src={coverImage}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            )}
          </Container>
        </section>
      ) : heroLayout === 'overlay' && coverImage ? (
        <div className="relative min-h-[min(52vh,28rem)] overflow-hidden bg-stage sm:min-h-[min(58vh,32rem)]">
          <img
            src={coverImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stage via-stage/55 to-stage/30" />
          <Container
            className={cn(
              'relative flex min-h-[min(52vh,28rem)] flex-col justify-end pb-8 pt-20 sm:min-h-[min(58vh,32rem)] sm:pb-10 sm:pt-24',
              contentMax,
            )}
          >
            <BackLink to={backTo} label={backLabel} tone="onDark" />
            <div className="mt-5 flex gap-4">
              <span className="cue-light mt-2 hidden h-14 shrink-0 sm:block" aria-hidden />
              <h1 className={cn(titleClass, 'max-w-3xl text-white')}>{title}</h1>
            </div>
            {badge && <div className="mt-4 sm:pl-7">{badge}</div>}
            {meta && <div className="mt-5 sm:pl-7">{meta}</div>}
            {actions && <div className="mt-4 sm:pl-7">{actions}</div>}
          </Container>
        </div>
      ) : (
        <Container className={cn('pt-12 sm:pt-14', contentMax)}>
          <BackLink to={backTo} label={backLabel} tone="onLight" />
          <div className="mt-5 flex gap-4">
            <span className="cue-light mt-2 hidden h-14 shrink-0 sm:block" aria-hidden />
            <h1 className={cn(titleClass, 'text-primary-deep')}>{title}</h1>
          </div>
          {badge && <div className="mt-4 sm:pl-7">{badge}</div>}
          {meta && <div className="mt-5 sm:pl-7">{meta}</div>}
          {actions && <div className="mt-4 sm:pl-7">{actions}</div>}
          {coverImage && (
            <div className="mt-8 aspect-[16/10] overflow-hidden sm:mt-10 md:aspect-[21/9]">
              <img
                src={coverImage}
                alt={title}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          )}
        </Container>
      )}

      <Container className={cn('py-10 sm:py-12 lg:py-16', contentMax)}>
        <ScrollReveal>{children}</ScrollReveal>
      </Container>
    </article>
  )
}
