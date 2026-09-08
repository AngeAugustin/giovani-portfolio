import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FilterBar } from '@/components/ui/FilterBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CtaBand } from '@/components/sections/home'
import { projects } from '@/domains/content'
import { localizedPath } from '@/router/paths'
import type { DomainId, Locale } from '@/types'

const filters: Array<'all' | DomainId> = ['all', 'civil', 'media', 'coach']

/**
 * Page Réalisations — structure alignée sur Projets Augustin :
 * hero (retour + watermark + CTAs) → promesse → filtres → grille études de cas → CTA.
 */
export function PortfolioPage() {
  const { t } = useTranslation(['portfolio', 'common'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const [filter, setFilter] = useState<'all' | DomainId>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.domain === filter)),
    [filter],
  )

  const promiseTags = t('portfolio:promise.tags', { returnObjects: true }) as string[]

  return (
    <>
      <Seo title={t('portfolio:meta.title')} description={t('portfolio:meta.description')} />

      <div className="bg-home-mosaic">
        <section className="relative overflow-hidden pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">
          <Container className="relative">
            <Link
              to={localizedPath('home', locale)}
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden />
              {t('portfolio:backHome')}
            </Link>

            <div className="relative mt-10 max-w-3xl md:mt-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 top-0 -z-0 select-none font-display text-[clamp(4.5rem,16vw,9rem)] font-semibold leading-none tracking-[-0.05em] text-primary-deep/[0.06] sm:-left-4"
              >
                {t('portfolio:watermark')}
              </span>

              <Badge tone="muted" className="relative rounded-full px-3.5 normal-case tracking-[0.08em]">
                {t('portfolio:eyebrow')}
              </Badge>

              <h1 className="relative mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-primary-deep text-balance">
                {t('portfolio:title')}
              </h1>

              <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg md:text-xl">
                {t('portfolio:subtitle')}
              </p>

              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" variant="primary">
                  <Link to={localizedPath('contact', locale)}>
                    {t('common:cta.contact')}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link to={localizedPath('domains', locale)}>
                    {t('portfolio:ctaDomains')}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Promesse */}
        <Section className="!pt-0">
          <ScrollReveal>
            <div className="border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8 md:p-10">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center bg-primary-deep text-white">
                  <Layers size={20} strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {t('portfolio:promise.label')}
                  </p>
                  <p className="mt-3 font-display text-[clamp(1.25rem,3vw,1.85rem)] leading-snug text-ink text-balance">
                    « {t('portfolio:promise.quote')} »
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {t('portfolio:promise.forWhom')}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {promiseTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-muted px-3.5 py-1.5 text-sm font-medium text-ink-soft ring-1 ring-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Section>

        {/* Filtres + grille */}
        <Section className="!pt-2 md:!pt-4">
          <ScrollReveal className="mb-8 sm:mb-10">
            <FilterBar
              variant="pills"
              label={t('portfolio:filterLabel')}
              filters={filters.map((f) => ({
                id: f,
                label: f === 'all' ? t('common:domains.all') : t(`common:domains.${f}`),
                active: filter === f,
                onClick: () => setFilter(f),
              }))}
            />
          </ScrollReveal>

          {filtered.length === 0 ? (
            <EmptyState message={t('portfolio:empty')} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id} delay={Math.min(i, 5) * 0.05}>
                  <ProjectCard
                    id={project.id}
                    domain={project.domain}
                    year={project.year}
                    image={project.image}
                    href={localizedPath('project', locale, project.id)}
                    layout="case"
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </Section>

        <CtaBand />
      </div>
    </>
  )
}
