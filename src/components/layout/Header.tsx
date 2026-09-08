import { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileDrawer } from './MobileDrawer'
import { mainNavKeys } from '@/constants/navigation'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'
import { cn } from '@/lib/utils'

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  const { t } = useTranslation('common')
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale

  return (
    <>
      {mainNavKeys.map((key) => (
        <NavLink
          key={key}
          to={localizedPath(key, locale)}
          end={key === 'home'}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'relative px-2.5 py-2 text-sm font-medium tracking-wide transition-colors',
              isActive ? 'text-primary-deep' : 'text-ink-soft hover:text-primary',
              isActive &&
                'after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent',
              className,
            )
          }
        >
          {t(`nav.${key}`)}
        </NavLink>
      ))}
    </>
  )
}

export function Header() {
  const { t } = useTranslation('common')
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/70 bg-surface/90 shadow-[0_8px_30px_-20px_rgb(11_61_145/0.25)] backdrop-blur-md'
            : 'border-b border-transparent bg-surface/70 backdrop-blur-sm',
        )}
      >
        <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 lg:h-[4.25rem]">
          <Link
            to={localizedPath('home', locale)}
            className="group flex min-w-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="cue-light h-7 shrink-0 opacity-90" aria-hidden />
            <span className="truncate font-display text-base font-semibold tracking-tight text-primary-deep sm:text-lg">
              {t('brand')}
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            <NavLinks />
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link to={localizedPath('contact', locale)}>{t('cta.contact')}</Link>
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border text-ink lg:hidden"
              aria-label={t('nav.openMenu')}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} title={t('brand')} side="right">
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
          <NavLinks
            onNavigate={() => setOpen(false)}
            className="block w-full rounded-[var(--radius-md)] px-3 py-3.5 text-left text-base after:hidden"
          />
        </nav>
        <div className="mt-auto border-t border-border p-4">
          <div className="mb-3">
            <LanguageSwitcher />
          </div>
          <Button asChild className="w-full">
            <Link to={localizedPath('contact', locale)} onClick={() => setOpen(false)}>
              {t('cta.contact')}
            </Link>
          </Button>
        </div>
      </MobileDrawer>
    </>
  )
}
