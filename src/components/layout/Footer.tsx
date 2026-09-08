import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { footerNavGroups } from '@/constants/navigation'
import { localizedPath, type RouteKey } from '@/router/paths'
import type { Locale } from '@/types'

const socialLinks = [
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'YouTube' },
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
          <p className="mt-3 text-sm text-ink-muted">{t('footer.location')}</p>
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
                  className="text-sm text-ink-soft transition hover:text-primary"
                >
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
          <p>{t('footer.legal')}</p>
        </Container>
      </div>
    </footer>
  )
}
