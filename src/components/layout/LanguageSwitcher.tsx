import { useTranslation } from 'react-i18next'
import { Link, useLocation, useParams } from 'react-router-dom'
import { switchLocalePath } from '@/router/paths'
import { useAppStore } from '@/hooks/useAppStore'
import type { Locale } from '@/types'
import { cn } from '@/lib/utils'

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
      {(['fr', 'en'] as const).map((localeOption) => (
        <Link
          key={localeOption}
          to={switchLocalePath(location.pathname, localeOption)}
          onClick={() => switchTo(localeOption)}
          className={cn(
            'rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors',
            current === localeOption
              ? 'bg-primary text-white'
              : 'text-ink-muted hover:text-primary',
          )}
          aria-current={current === localeOption ? 'true' : undefined}
        >
          {localeOption}
        </Link>
      ))}
    </div>
  )
}
