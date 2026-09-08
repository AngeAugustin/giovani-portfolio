import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Building2, Check, Mic2, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CtaBand } from '@/components/sections/home'
import { projects, services } from '@/domains/content'
import { localizedPath } from '@/router/paths'
import { cn } from '@/lib/utils'
import type { DomainId, Locale } from '@/types'

interface DomainDetailPageProps {
  domain: DomainId
}

const backgroundImages: Record<DomainId, string> = {
  civil:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80&auto=format&fit=crop',
  media:
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&q=80&auto=format&fit=crop',
  coach:
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=80&auto=format&fit=crop',
}

const portraitImages: Record<DomainId, string> = {
  civil:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop',
  media:
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&q=80&auto=format&fit=crop',
  coach:
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80&auto=format&fit=crop',
}

const domainIcons: Record<DomainId, LucideIcon> = {
  civil: Building2,
  media: Mic2,
  coach: Users,
}

const domainRoutes = {
  civil: 'domainCivil',
  media: 'domainMedia',
  coach: 'domainCoach',
} as const

const allDomains: DomainId[] = ['civil', 'media', 'coach']

/**
 * Page détail domaine — structure type Augustin (aperçu, services, livrables,
 * approche, outils, idéal pour, projets) avec PageHero Giovani conservé.
 */
export function DomainDetailPage({ domain }: DomainDetailPageProps) {
  const { t } = useTranslation(['domains', 'common', 'services', 'portfolio'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale

  const tone = domain === 'media' ? 'stage' : 'primary'
  const Icon = domainIcons[domain]
  const related = projects.filter((p) => p.domain === domain).slice(0, 3)
  const offerings = services.filter((s) => s.domain === domain)
  const others = allDomains.filter((d) => d !== domain)

  const stats = t(`domains:${domain}.stats`, { returnObjects: true }) as Array<{
    label: string
    value: string
    hint: string
  }>
  const deliverables = t(`domains:${domain}.deliverables`, { returnObjects: true }) as Array<{
    title: string
    text: string
  }>
  const approach = t(`domains:${domain}.approach`, { returnObjects: true }) as string[]
  const tools = t(`domains:${domain}.tools`, { returnObjects: true }) as string[]
  const idealFor = t(`domains:${domain}.idealFor`, { returnObjects: true }) as string[]

  return (
    <>
      <Seo
        title={`${t(`domains:${domain}.title`)} — Giovani HOUENOU`}
        description={t(`domains:${domain}.intro`)}
      />

      <PageHero
        tone={tone}
        eyebrow={t(`domains:${domain}.tagline`)}
        title={t(`domains:${domain}.title`)}
        description={t(`domains:${domain}.intro`)}
        imageUrl={backgroundImages[domain]}
        sideImageUrl={portraitImages[domain]}
        sideImageAlt={t(`domains:${domain}.title`)}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant={tone === 'stage' ? 'accent' : 'invert'}>
            <Link to={localizedPath('contact', locale)}>
              {t('common:cta.contact')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
            <Link to={localizedPath('domains', locale)}>{t('domains:detail.back')}</Link>
          </Button>
        </div>
      </PageHero>

      {/* Aperçu — stats + texte */}
      <Section>
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Icon size={22} strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {t('domains:detail.overview')}
                </p>
                <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                  {t(`domains:${domain}.title`)}
                </h2>
              </div>
            </div>
            <Badge tone="accent" className="gap-1.5 normal-case tracking-[0.06em]">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {t(`domains:${domain}.available`)}
            </Badge>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-border bg-surface-muted/40 px-5 py-5 sm:px-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-3xl text-primary-deep sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{stat.hint}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {t(`domains:${domain}.overview`)}
          </p>
        </ScrollReveal>
      </Section>

      {/* Services du domaine */}
      <Section tone="muted">
        <SectionHeader title={t('domains:detail.services')} />
        <ScrollReveal>
          <ul className="border-t border-border">
            {offerings.map((s) => (
              <li
                key={s.id}
                className="grid gap-2 border-b border-border py-5 sm:grid-cols-12 sm:gap-6 sm:py-6"
              >
                <h3 className="font-display text-xl text-primary-deep sm:col-span-4 sm:text-2xl">
                  {t(`services:items.${s.id}.title`)}
                </h3>
                <p className="text-ink-muted sm:col-span-8 sm:text-lg">
                  {t(`services:items.${s.id}.text`)}
                </p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Section>

      {/* Ce que je livre */}
      <Section>
        <SectionHeader title={t('domains:detail.deliverables')} />
        <ScrollReveal>
          <ul className="grid gap-0 border-t border-border">
            {deliverables.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 border-b border-border py-5 sm:gap-5 sm:py-6"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={14} strokeWidth={2.5} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg text-ink sm:text-xl">{item.title}</p>
                  <p className="mt-1 text-ink-muted sm:text-lg">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Section>

      {/* Mon approche */}
      <Section tone="muted">
        <SectionHeader title={t('domains:detail.approach')} />
        <ScrollReveal>
          <ol className="grid gap-0 border-t border-border">
            {approach.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 border-b border-border py-5 sm:gap-5 sm:py-6"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-sm text-primary">
                  {i + 1}
                </span>
                <p className="pt-1 text-base text-ink-soft sm:text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </Section>

      {/* Savoir-faire */}
      <Section>
        <SectionHeader title={t('domains:detail.tools')} />
        <ScrollReveal>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-surface-muted px-4 py-2 text-sm font-medium text-ink ring-1 ring-border sm:text-base"
              >
                {tool}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Idéal pour */}
      <Section tone="muted">
        <SectionHeader title={t('domains:detail.idealFor')} />
        <ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {idealFor.map((item) => (
              <p
                key={item}
                className="border border-border bg-surface px-5 py-5 text-base leading-relaxed text-ink-soft sm:px-6 sm:text-lg"
              >
                {item}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Projets liés */}
      <Section>
        <SectionHeader
          title={t('domains:detail.related')}
          action={{
            label: t('common:cta.allProjects'),
            to: localizedPath('portfolio', locale),
          }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProjectCard
              key={p.id}
              id={p.id}
              domain={p.domain}
              year={p.year}
              image={p.image}
              href={localizedPath('project', locale, p.id)}
            />
          ))}
        </div>
        <div className="mt-8 md:hidden">
          <Button asChild variant="secondary">
            <Link to={localizedPath('portfolio', locale)}>{t('common:cta.allProjects')}</Link>
          </Button>
        </div>
      </Section>

      {/* Autres univers */}
      <section className="border-t border-border py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]">
        <Container>
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {t('domains:detail.otherDomains')}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {others.map((d) => {
                const OtherIcon = domainIcons[d]
                return (
                  <li key={d}>
                    <Link
                      to={localizedPath(domainRoutes[d], locale)}
                      className={cn(
                        'group flex items-center justify-between gap-4 border border-border px-5 py-5 transition',
                        'hover:border-primary/40 hover:bg-primary-soft/40',
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <OtherIcon
                          size={20}
                          strokeWidth={1.6}
                          className="text-primary"
                          aria-hidden
                        />
                        <span className="font-display text-lg text-ink sm:text-xl">
                          {t(`domains:${d}.title`)}
                        </span>
                      </span>
                      <ArrowRight
                        size={18}
                        className="text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </ScrollReveal>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
