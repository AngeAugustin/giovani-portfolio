import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

/** CTA full-bleed - pas une carte inset. */
export function HomeCtaBand() {
  const { t } = useTranslation(['home', 'common'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-primary-deep py-[var(--spacing-section)] text-white md:py-[var(--spacing-section-lg)]">
      <div
        className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/5 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <motion.div
          className="flex max-w-3xl flex-col gap-6 sm:gap-8"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="flex gap-4">
            <span className="cue-light mt-2 hidden h-14 shrink-0 sm:block" aria-hidden />
            <div>
              <h2 className="font-display text-[clamp(1.65rem,4vw,2.75rem)] text-white text-balance">
                {t('home:ctaBand.title')}
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/70 sm:text-lg">
                {t('home:ctaBand.subtitle')}
              </p>
            </div>
          </div>
          <div className="sm:pl-7">
            <Button asChild size="lg" variant="accent">
              <Link to={localizedPath('contact', locale)}>{t('home:ctaBand.button')}</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export const CtaBand = HomeCtaBand
