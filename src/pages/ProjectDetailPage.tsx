import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DetailLayout } from '@/components/ui/DetailLayout'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/domains/content'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

/**
 * Étude de cas projet - récit détaillé, approche, livrables, tags, projets liés.
 */
export function ProjectDetailPage() {
  const { t } = useTranslation(['portfolio', 'common'])
  const { lang, id } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return <Navigate to={localizedPath('portfolio', locale)} replace />
  }

  const base = `portfolio:items.${project.id}`
  const title = t(`${base}.title`)
  const approach = t(`${base}.approach`, { returnObjects: true }) as string[]
  const deliverables = t(`${base}.deliverables`, { returnObjects: true }) as string[]
  const tags = t(`${base}.tags`, { returnObjects: true }) as string[]
  const related = projects
    .filter((p) => p.domain === project.domain && p.id !== project.id)
    .slice(0, 2)

  const facts = [
    { label: t('portfolio:detail.year'), value: project.year },
    { label: t('portfolio:detail.domain'), value: t(`common:domains.${project.domain}`) },
    { label: t('portfolio:detail.client'), value: t(`${base}.client`) },
    { label: t('portfolio:detail.location'), value: t(`${base}.location`) },
  ]

  const narrative = [
    { key: 'context' as const, index: '01' },
    { key: 'role' as const, index: '02' },
    { key: 'result' as const, index: '03' },
  ]

  return (
    <>
      <Seo title={`${title} - Giovani HOUENOU`} description={t(`${base}.summary`)} />

      <DetailLayout
        backTo={localizedPath('portfolio', locale)}
        backLabel={t('portfolio:detail.backPortfolio')}
        title={title}
        coverImage={project.image}
        heroLayout="overlay"
        contentWidth="wide"
        badge={<Badge tone="invert">{t(`common:domains.${project.domain}`)}</Badge>}
        meta={
          <p className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {t(`${base}.summary`)}
          </p>
        }
      >
        {/* Faits clés */}
        <dl className="grid gap-6 border-b border-border pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {fact.label}
              </dt>
              <dd className="mt-2 font-display text-lg text-ink sm:text-xl">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Aperçu */}
        <section className="mt-12 sm:mt-14">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">
            {t('portfolio:detail.overview')}
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {t(`${base}.overview`)}
          </p>
        </section>

        {/* Contexte / Rôle / Résultat */}
        <section className="mt-14 space-y-0 border-t border-border sm:mt-16">
          {narrative.map(({ key, index }) => (
            <article
              key={key}
              className="grid gap-3 border-b border-border py-8 sm:grid-cols-12 sm:gap-8 sm:py-10"
            >
              <div className="sm:col-span-4">
                <span className="font-display text-sm text-accent">{index}</span>
                <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                  {t(`portfolio:detail.${key}`)}
                </h2>
              </div>
              <p className="text-base leading-relaxed text-ink-soft sm:col-span-8 sm:text-lg sm:pt-6">
                {t(`${base}.${key}`)}
              </p>
            </article>
          ))}
        </section>

        {/* Approche */}
        <section className="mt-14 sm:mt-16">
          <SectionHeader title={t('portfolio:detail.approach')} className="mb-8 md:mb-10" />
          <ol className="border-t border-border">
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
        </section>

        {/* Livrables */}
        <section className="mt-14 sm:mt-16">
          <SectionHeader title={t('portfolio:detail.deliverables')} className="mb-8 md:mb-10" />
          <ul className="grid gap-0 border-t border-border sm:grid-cols-2 sm:gap-x-10">
            {deliverables.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-border py-5 sm:py-6"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={14} strokeWidth={2.5} aria-hidden />
                </span>
                <span className="text-base text-ink-soft sm:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tags */}
        <section className="mt-14 sm:mt-16">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {t('portfolio:detail.tags')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-muted px-4 py-2 text-sm font-medium text-ink ring-1 ring-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Projets liés */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-14 sm:mt-20 sm:pt-16">
            <SectionHeader
              title={t('portfolio:detail.related')}
              action={{
                label: t('portfolio:detail.backPortfolio'),
                to: localizedPath('portfolio', locale),
              }}
            />
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
              {related.map((p) => (
                <ProjectCard
                  key={p.id}
                  id={p.id}
                  domain={p.domain}
                  year={p.year}
                  image={p.image}
                  href={localizedPath('project', locale, p.id)}
                  layout="case"
                />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-16 border border-border bg-primary-soft/40 p-6 sm:mt-20 sm:p-8 md:flex md:items-end md:justify-between md:gap-10 md:p-10">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {t('portfolio:detail.ctaTitle')}
            </h2>
            <p className="mt-3 text-ink-muted sm:text-lg">{t('portfolio:detail.ctaText')}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
            <Button asChild size="lg" variant="primary">
              <Link to={localizedPath('contact', locale)}>
                {t('common:cta.contact')}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to={localizedPath('portfolio', locale)}>
                {t('portfolio:detail.backPortfolio')}
              </Link>
            </Button>
          </div>
        </section>
      </DetailLayout>
    </>
  )
}
