import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Building2, FileText, Mic2, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Seo } from '@/components/ui/Seo'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CtaBand } from '@/components/sections/home'
import { localizedPath } from '@/router/paths'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

const ABOUT_PORTRAIT =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop'

const expertiseIcons: Record<string, LucideIcon> = {
  '01': Building2,
  '02': Mic2,
  '03': Users,
}

interface BandHeaderProps {
  watermark: string
  eyebrow: string
  title: string
  subtitle: string
}

/** En-tête de bande façon Augustin — badge + watermark + titre centré. */
function BandHeader({ watermark, eyebrow, title, subtitle }: BandHeaderProps) {
  return (
    <ScrollReveal className="relative mb-10 text-center md:mb-12">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 w-[min(100%,48rem)] -translate-x-1/2 -translate-y-1/2 select-none text-center font-display text-[clamp(4rem,14vw,9rem)] font-semibold leading-none tracking-[-0.04em] text-primary-deep/[0.06]"
      >
        {watermark}
      </span>
      <Badge tone="muted" className="relative rounded-full px-3.5 normal-case tracking-[0.08em]">
        {eyebrow}
      </Badge>
      <h2 className="relative mt-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] text-ink text-balance">
        {title}
      </h2>
      <p className="relative mx-auto mt-3 max-w-2xl text-base text-ink-muted sm:text-lg">
        {subtitle}
      </p>
    </ScrollReveal>
  )
}

interface TimelineEntryProps {
  period: string
  role: string
  org: string
  location?: string
  note?: string
  text: string
  isLast?: boolean
}

/**
 * Timeline Augustin : rail vertical + point, méta à gauche, description à droite.
 */
function TimelineEntry({
  period,
  role,
  org,
  location,
  note,
  text,
}: TimelineEntryProps) {
  return (
    <article className="relative grid gap-3 pl-9 sm:pl-11 md:grid-cols-12 md:gap-8 lg:gap-12">
      {/* Point sur le rail */}
      <span
        className="absolute left-[5px] top-2.5 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-white bg-primary shadow-[0_0_0_3px_rgb(232_240_254)]"
        aria-hidden
      />

      <div className="md:col-span-5">
        <p className="text-sm font-semibold text-primary">{period}</p>
        <h3 className="mt-2 font-display text-xl leading-snug text-ink sm:text-2xl">{role}</h3>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <p className="text-sm text-ink-muted sm:text-base">{org}</p>
          {location && (
            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[0.7rem] font-medium text-ink-soft ring-1 ring-border">
              {location}
            </span>
          )}
        </div>
        {note && <p className="mt-2 text-sm font-semibold text-primary">{note}</p>}
      </div>

      <div className="md:col-span-7 md:pt-8">
        <p className="text-sm leading-relaxed text-ink-muted sm:text-base">{text}</p>
      </div>
    </article>
  )
}

function TimelineList({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Rail vertical — timeline */}
      <div
        className="absolute bottom-4 left-[5px] top-4 w-0.5 -translate-x-1/2 rounded-full bg-primary/30"
        aria-hidden
      />
      <div className="space-y-10 md:space-y-14">{children}</div>
    </div>
  )
}

export function AboutPage() {
  const { t } = useTranslation(['about', 'common'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale

  const stats = t('about:stats', { returnObjects: true }) as Array<{
    value: string
    label: string
  }>
  const experience = t('about:experience.items', { returnObjects: true }) as Array<{
    period: string
    role: string
    org: string
    location?: string
    text: string
  }>
  const education = t('about:education.items', { returnObjects: true }) as Array<{
    period: string
    role: string
    org: string
    location?: string
    note?: string
    text: string
  }>
  const expertise = t('about:expertise.groups', { returnObjects: true }) as Array<{
    index: string
    title: string
    skills: string[]
  }>
  const values = t('about:values.items', { returnObjects: true }) as Array<{
    title: string
    text: string
  }>

  return (
    <>
      <Seo title={t('about:meta.title')} description={t('about:meta.description')} />

      <div className="bg-home-mosaic">
        {/* Hero — texte à gauche, portrait à droite */}
        <section className="relative overflow-hidden pb-8 pt-10 sm:pb-10 sm:pt-12 lg:pb-12 lg:pt-14">
          <Container className="relative">
            <Link
              to={localizedPath('home', locale)}
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden />
              {t('about:backHome')}
            </Link>

            <div className="mt-10 grid items-center gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
              <div className="relative lg:col-span-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-2 top-0 -z-0 select-none font-display text-[clamp(4.5rem,16vw,9rem)] font-semibold leading-none tracking-[-0.05em] text-primary-deep/[0.06] sm:-left-4"
                >
                  {t('about:watermark')}
                </span>

                <Badge tone="primary" className="relative rounded-full px-3.5 normal-case tracking-[0.08em]">
                  {t('about:eyebrow')}
                </Badge>

                <h1 className="relative mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-primary-deep text-balance">
                  {t('about:title')}
                </h1>

                <p className="relative mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg md:text-xl">
                  {t('about:lead')}
                </p>

                <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild size="lg" variant="primary">
                    <Link to={localizedPath('contact', locale)}>
                      {t('common:cta.contact')}
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link to={localizedPath('portfolio', locale)}>
                      {t('common:cta.allProjects')}
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative lg:col-span-5">
                <MediaFrame
                  src={ABOUT_PORTRAIT}
                  alt={t('common:brand')}
                  aspect="aspect-[4/5]"
                  priority
                  className="w-full"
                />
                <span className="cue-light absolute -left-3 top-8 hidden h-20 sm:block sm:-left-4" aria-hidden />
              </div>
            </div>
          </Container>
        </section>

        {/* Récit + stats — rapproché du hero */}
        <section className="pb-[var(--spacing-section)] pt-4 md:pb-[var(--spacing-section-lg)] md:pt-6">
          <Container>
            <ScrollReveal className="grid gap-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              <p>{t('about:story.p1')}</p>
              <p>{t('about:story.p2')}</p>
              <p>{t('about:story.p3')}</p>
            </ScrollReveal>

            <ScrollReveal className="mt-12 grid grid-cols-2 gap-6 border-y border-border py-8 sm:mt-14 sm:grid-cols-4 sm:gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-primary-deep sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
                </div>
              ))}
            </ScrollReveal>
          </Container>
        </section>

        {/* Parcours professionnel */}
        <Section>
          <BandHeader
            watermark={t('about:experience.watermark')}
            eyebrow={t('about:experience.eyebrow')}
            title={t('about:experience.title')}
            subtitle={t('about:experience.subtitle')}
          />
          <TimelineList>
            {experience.map((item, i) => (
              <ScrollReveal key={item.role} delay={i * 0.05}>
                <TimelineEntry
                  period={item.period}
                  role={item.role}
                  org={item.org}
                  location={item.location}
                  text={item.text}
                />
              </ScrollReveal>
            ))}
          </TimelineList>
        </Section>

        {/* Parcours académique */}
        <Section>
          <BandHeader
            watermark={t('about:education.watermark')}
            eyebrow={t('about:education.eyebrow')}
            title={t('about:education.title')}
            subtitle={t('about:education.subtitle')}
          />
          <TimelineList>
            {education.map((item, i) => (
              <ScrollReveal key={item.role} delay={i * 0.05}>
                <TimelineEntry
                  period={item.period}
                  role={item.role}
                  org={item.org}
                  location={item.location}
                  note={item.note}
                  text={item.text}
                />
              </ScrollReveal>
            ))}
          </TimelineList>
        </Section>

        {/* Expertise */}
        <Section>
          <BandHeader
            watermark={t('about:expertise.watermark')}
            eyebrow={t('about:expertise.eyebrow')}
            title={t('about:expertise.title')}
            subtitle={t('about:expertise.subtitle')}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((group, i) => {
              const Icon = expertiseIcons[group.index] ?? Building2
              return (
                <ScrollReveal key={group.title} delay={i * 0.06}>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-7">
                    <Icon
                      aria-hidden
                      strokeWidth={1.15}
                      className="pointer-events-none absolute -bottom-3 -right-3 size-28 text-primary/[0.08] sm:size-32"
                    />
                    <div className="relative">
                      <span className="font-display text-xs text-accent">{group.index}</span>
                      <h3 className="mt-2 font-display text-xl text-ink">{group.title}</h3>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full bg-primary-soft/80 px-3 py-1.5 text-xs font-medium text-primary-deep"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </Section>

        {/* Valeurs */}
        <Section>
          <BandHeader
            watermark={t('about:values.watermark')}
            eyebrow={t('about:values.eyebrow')}
            title={t('about:values.title')}
            subtitle={t('about:values.subtitle')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.05}>
                <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-7">
                  <div className="flex gap-3">
                    <span className="cue-light mt-1 h-10 shrink-0" aria-hidden />
                    <div>
                      <h3 className="font-display text-xl text-primary-deep">{v.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                        {v.text}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* CV */}
        <Section>
          <BandHeader
            watermark={t('about:cv.watermark')}
            eyebrow={t('about:cv.eyebrow')}
            title={t('about:cv.title')}
            subtitle={t('about:cv.subtitle')}
          />
          <ScrollReveal>
            <div
              className={cn(
                'mx-auto flex max-w-xl flex-col items-center rounded-[var(--radius-lg)] border border-border bg-surface px-6 py-10 text-center sm:px-10 sm:py-12',
              )}
            >
              <span className="flex size-14 items-center justify-center rounded-[var(--radius-md)] bg-primary-soft text-primary shadow-[var(--shadow-soft)]">
                <FileText size={26} aria-hidden />
              </span>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted sm:text-base">
                {t('about:cv.cardText')}
              </p>
              <Button asChild size="lg" variant="accent" className="mt-7">
                <a href="/cv-giovani-houenou.pdf" download>
                  {t('about:cv.button')}
                  <ArrowRight size={16} aria-hidden />
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </Section>

        <CtaBand />
      </div>
    </>
  )
}
