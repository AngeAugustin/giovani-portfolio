import { useEffect } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageLoader } from './PageLoader'
import { CustomCursor } from './CustomCursor'
import { SkipLink } from './SkipLink'
import { useAppStore } from '@/hooks/useAppStore'
import { pageTransition } from '@/lib/animations'
import type { Locale } from '@/types'

/**
 * Shell public - même structure que Rotary `PublicLayout` :
 * SkipLink → Header → main flex-1 → Footer.
 */
export function RootLayout() {
  const { lang } = useParams()
  const location = useLocation()
  const { i18n } = useTranslation('common')
  const setLocale = useAppStore((s) => s.setLocale)
  const loaderDone = useAppStore((s) => s.loaderDone)
  const reduce = useReducedMotion()

  useEffect(() => {
    const locale = (lang === 'en' ? 'en' : 'fr') as Locale
    setLocale(locale)
    if (i18n.language !== locale) void i18n.changeLanguage(locale)
  }, [lang, i18n, setLocale])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      {!loaderDone && <PageLoader />}
      <CustomCursor />
      <div className="flex min-h-screen flex-col">
        <SkipLink />
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            id="main-content"
            className="flex-1"
            key={location.pathname}
            {...(reduce ? {} : pageTransition)}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}
