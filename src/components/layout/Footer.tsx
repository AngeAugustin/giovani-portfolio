import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { footerNavGroups } from '@/constants/navigation'
import { localizedPath, type RouteKey } from '@/router/paths'
import type { Locale } from '@/types'

const socialLinks: Array<{ href: string; label: string; icon: ReactNode }> = [
  {
    href: 'https://www.linkedin.com/in/giovani-houenou-4148972a2/',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/share/1DTgXYq2Bo/?mibextid=wwXIfr',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/22952258441',
    label: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
]

const domainLabelKeys: Partial<Record<RouteKey, string>> = {
  domainCivil: 'domains.civil',
  domainMedia: 'domains.media',
  domainCoach: 'domains.coach',
}

export function Footer() {
  const { t } = useTranslation('common')
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/80 bg-surface/90 backdrop-blur-sm">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-5">
          <div className="flex items-center gap-2.5">
            <span className="cue-light h-8" aria-hidden />
            <p className="font-display text-xl font-semibold text-primary-deep sm:text-2xl">
              {t('brand')}
            </p>
          </div>
          <p className="mt-4 max-w-sm text-ink-muted">{t('tagline')}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
            <MapPin size={16} className="text-accent" aria-hidden />
            {t('footer.location')}
          </p>
        </div>

        {footerNavGroups.map((group) => (
          <div
            key={group.titleKey}
            className={group.titleKey === 'footer.domainsTitle' ? 'lg:col-span-3' : 'lg:col-span-2'}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-warm">
              {t(group.titleKey)}
            </p>
            <ul className="mt-4 space-y-2.5">
              {group.keys.map((key) => (
                <li key={key}>
                  <Link
                    to={localizedPath(key, locale)}
                    className="text-sm text-ink-soft transition hover:text-primary"
                  >
                    {domainLabelKeys[key] ? t(domainLabelKeys[key]!) : t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-warm">
            {t('footer.connectTitle')}
          </p>
          <ul className="mt-4 space-y-2.5">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-ink-soft transition hover:text-primary"
                >
                  {social.icon}
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t('brand')}. {t('footer.rights')}
          </p>
            <a
              href="https://www.augustinfachehoun.pro/fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary underline decoration-primary/35 underline-offset-4 transition hover:text-primary-deep hover:decoration-primary-deep"
            >
              {t('footer.credit')}
              <ArrowUpRight size={14} className="shrink-0" aria-hidden />
            </a>
        </Container>
      </div>
    </footer>
  )
}
