import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Building2, Mic2, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CtaBand } from '@/components/sections/home'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

const domains = [
  {
    key: 'civil' as const,
    route: 'domainCivil' as const,
    index: '01',
    Icon: Building2,
  },
  {
    key: 'media' as const,
    route: 'domainMedia' as const,
    index: '02',
    Icon: Mic2,
  },
  {
    key: 'coach' as const,
    route: 'domainCoach' as const,
    index: '03',
    Icon: Users,
  },
]

/**
 * Page Domaines — structure alignée sur Services Augustin :
 * hero (retour + badge + watermark + CTAs) → grille de cartes → CTA.
 */
export function DomainsPage() {
  const { t } = useTranslation(['domains', 'common'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale

  return (
    <>
      <Seo title={t('domains:meta.title')} description={t('domains:meta.description')} />

      <div className="bg-home-mosaic">
        <section className="relative overflow-hidden pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">
          <Container className="relative">
            <Link
              to={localizedPath('home', locale)}
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden />
              {t('domains:backHome')}
            </Link>

            <div className="relative mt-10 max-w-3xl md:mt-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 top-0 -z-0 select-none font-display text-[clamp(4.5rem,16vw,9rem)] font-semibold leading-none tracking-[-0.05em] text-primary-deep/[0.06] sm:-left-4"
              >
                {t('domains:watermark')}
              </span>

              <Badge tone="muted" className="relative rounded-full px-3.5 normal-case tracking-[0.08em]">
                {t('domains:eyebrow')}
              </Badge>

              <h1 className="relative mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-primary-deep text-balance">
                {t('domains:title')}
              </h1>

              <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg md:text-xl">
                {t('domains:subtitle')}
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
          </Container>
        </section>

        <Section>
          <ScrollReveal>
            <p className="mb-8 max-w-2xl text-base text-ink-muted sm:mb-10 sm:text-lg">
              {t('domains:gridIntro')}
            </p>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map(({ key, route, index, Icon }, i) => (
              <ScrollReveal key={key} delay={i * 0.06}>
                <DomainCard
                  href={localizedPath(route, locale)}
                  index={index}
                  Icon={Icon}
                  title={t(`domains:${key}.title`)}
                  description={t(`domains:${key}.intro`)}
                  cta={t('domains:explore')}
                />
              </ScrollReveal>
            ))}
          </div>
        </Section>

        <CtaBand />
      </div>
    </>
  )
}

function DomainCard({
  href,
  index,
  Icon,
  title,
  description,
  cta,
}: {
  href: string
  index: string
  Icon: LucideIcon
  title: string
  description: string
  cta: string
}) {
  return (
    <Link
      to={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-lift)] sm:p-7"
      data-cursor-hover
    >
      <Icon
        aria-hidden
        strokeWidth={1.15}
        className="pointer-events-none absolute -bottom-4 -right-4 size-28 text-primary/[0.07] transition duration-500 group-hover:text-primary/[0.12] sm:size-32"
      />

      <div className="relative flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
        <Icon size={20} strokeWidth={1.75} aria-hidden />
      </div>

      <span className="relative mt-5 font-display text-xs text-accent">{index}</span>
      <h2 className="relative mt-1.5 font-display text-xl text-ink sm:text-2xl">{title}</h2>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-muted sm:text-base">
        {description}
      </p>
      <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
        {cta}
        <ArrowRight size={16} aria-hidden />
      </span>
    </Link>
  )
}
