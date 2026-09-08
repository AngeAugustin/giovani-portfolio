import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/sections/contact/ContactForm'

export function ContactPage() {
  const { t } = useTranslation('contact')

  const info = [
    {
      icon: Mail,
      label: t('info.emailLabel'),
      value: t('info.email'),
      href: `mailto:${t('info.email')}`,
    },
    {
      icon: Phone,
      label: t('info.phoneLabel'),
      value: t('info.phone'),
      href: `tel:${t('info.phone')}`,
    },
    {
      icon: MapPin,
      label: t('info.locationLabel'),
      value: t('info.location'),
    },
  ]

  return (
    <>
      <Seo title={t('meta.title')} description={t('meta.description')} />
      <PageHero
        compact
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('subtitle')}
      />

      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="space-y-8 lg:col-span-4">
            <div className="space-y-5">
              {info.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 shrink-0 text-accent" size={18} />
                    <div className="min-w-0">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block break-all font-medium text-ink transition hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 font-medium text-ink">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="border-l-[3px] border-accent pl-4 text-sm leading-relaxed text-primary-deep">
              {t('info.availability')}
            </p>
          </aside>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  )
}
