import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Clock3, Mail, MapPin, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

/**
 * Page Contact - hero watermark + canaux + formulaire, alignée Domaines / Réalisations.
 */
export function ContactPage() {
  const { t } = useTranslation(['contact', 'common'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const email = t('contact:info.email')

  const channels: Array<{
    icon: LucideIcon
    label: string
    value: string
    href?: string
  }> = [
    {
      icon: Mail,
      label: t('contact:info.emailLabel'),
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Phone,
      label: t('contact:info.phoneLabel'),
      value: t('contact:info.phone'),
      href: 'https://wa.me/22952258441',
    },
    {
      icon: MapPin,
      label: t('contact:info.locationLabel'),
      value: t('contact:info.location'),
    },
  ]

  return (
    <>
      <Seo title={t('contact:meta.title')} description={t('contact:meta.description')} />

      <div className="bg-home-mosaic">
        {/* Hero */}
        <section className="relative overflow-hidden pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14">
          <Container className="relative">
            <Link
              to={localizedPath('home', locale)}
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden />
              {t('contact:backHome')}
            </Link>

            <div className="relative mt-10 max-w-3xl md:mt-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 top-0 -z-0 select-none font-display text-[clamp(4.5rem,16vw,9rem)] font-semibold leading-none tracking-[-0.05em] text-primary-deep/[0.06] sm:-left-4"
              >
                {t('contact:watermark')}
              </span>

              <Badge tone="muted" className="relative rounded-full px-3.5 normal-case tracking-[0.08em]">
                {t('contact:eyebrow')}
              </Badge>

              <h1 className="relative mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-primary-deep text-balance">
                {t('contact:title')}
              </h1>

              <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg md:text-xl">
                {t('contact:subtitle')}
              </p>

              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" variant="primary">
                  <a href="#contact-form">
                    {t('contact:ctaForm')}
                    <ArrowRight size={16} aria-hidden />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href={`mailto:${email}`}>
                    {t('contact:ctaEmail')}
                    <Mail size={16} aria-hidden />
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Coordonnées */}
        <Section className="!pt-0">
          <ScrollReveal>
            <div className="mb-8 max-w-2xl sm:mb-10">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">
                {t('contact:channelsTitle')}
              </p>
              <p className="mt-3 text-base text-ink-muted sm:text-lg">
                {t('contact:channelsIntro')}
              </p>
            </div>

            <div className="grid gap-4 border-y border-border py-2 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border sm:py-0">
              {channels.map((item) => {
                const Icon = item.icon
                const body = (
                  <>
                    <span className="flex size-10 items-center justify-center bg-primary-soft text-primary">
                      <Icon size={18} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        {item.label}
                      </span>
                      <span className="mt-1.5 block break-all font-display text-lg text-ink sm:text-xl">
                        {item.value}
                      </span>
                    </span>
                  </>
                )

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="flex items-start gap-4 py-5 transition hover:text-primary sm:px-6 sm:first:pl-0 sm:last:pr-0"
                  >
                    {body}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                  >
                    {body}
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border border-border bg-surface px-5 py-4 sm:px-6">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-primary-deep">
                <Clock3 size={16} className="text-accent" aria-hidden />
                {t('contact:responseNote')}
              </p>
              <p className="text-sm text-ink-muted">{t('contact:info.availability')}</p>
            </div>
          </ScrollReveal>
        </Section>

        {/* Formulaire */}
        <Section id="contact-form" className="scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
            <ScrollReveal className="lg:col-span-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">
                {t('contact:eyebrow')}
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] text-ink text-balance">
                {t('contact:formTitle')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                {t('contact:formSubtitle')}
              </p>
              <span className="cue-light mt-8 hidden h-16 sm:block" aria-hidden />
            </ScrollReveal>

            <ScrollReveal className="border border-border bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:col-span-8 lg:p-10">
              <ContactForm />
            </ScrollReveal>
          </div>
        </Section>
      </div>
    </>
  )
}
