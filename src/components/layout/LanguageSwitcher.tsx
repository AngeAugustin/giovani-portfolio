import { useTranslation } from 'react-i18next'
import { Link, useLocation, useParams } from 'react-router-dom'
import { switchLocalePath } from '@/router/paths'
import { useAppStore } from '@/hooks/useAppStore'
import type { Locale } from '@/types'
import { cn } from '@/lib/utils'

function FlagFrance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <rect width="8" height="16" fill="#002395" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#ED2939" />
    </svg>
  )
}

function FlagUSA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <rect width="24" height="16" fill="#B22234" />
      <rect y="1.23" width="24" height="1.23" fill="#fff" />
      <rect y="3.69" width="24" height="1.23" fill="#fff" />
      <rect y="6.15" width="24" height="1.23" fill="#fff" />
      <rect y="8.62" width="24" height="1.23" fill="#fff" />
      <rect y="11.08" width="24" height="1.23" fill="#fff" />
      <rect y="13.54" width="24" height="1.23" fill="#fff" />
      <rect width="10" height="8.6" fill="#3C3B6E" />
    </svg>
  )
}

const localeFlags = {
  fr: { label: 'Français', Flag: FlagFrance },
  en: { label: 'English', Flag: FlagUSA },
} as const

export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation('common')
  const location = useLocation()
  const { lang } = useParams()
  const setLocale = useAppStore((s) => s.setLocale)
  const current = (
    lang === 'en' || lang === 'fr'
      ? lang
      : i18n.language.startsWith('en')
        ? 'en'
        : 'fr'
  ) as Locale

  const switchTo = (next: Locale) => {
    if (next === current) return
    setLocale(next)
    void i18n.changeLanguage(next)
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-border p-1',
        className,
      )}
      role="group"
      aria-label={t('a11y.langSwitch')}
    >
      {(['fr', 'en'] as const).map((localeOption) => {
        const { label, Flag } = localeFlags[localeOption]
        const active = current === localeOption

        return (
          <Link
            key={localeOption}
            to={switchLocalePath(location.pathname, localeOption)}
            onClick={() => switchTo(localeOption)}
            title={label}
            aria-label={label}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'inline-flex items-center justify-center rounded-[var(--radius-sm)] p-1.5 transition',
              active
                ? 'bg-primary/10 ring-1 ring-primary/30'
                : 'opacity-70 hover:bg-primary-soft hover:opacity-100',
            )}
          >
            <Flag className="h-3.5 w-5 overflow-hidden rounded-[2px] shadow-sm" />
          </Link>
        )
      })}
    </div>
  )
}
