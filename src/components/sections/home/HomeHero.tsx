import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Container } from '@/components/ui/Container'
import { easeOutExpo, fadeUp, staggerContainer } from '@/lib/animations'
import { localizedPath } from '@/router/paths'
import type { Locale } from '@/types'

/**
 * Hero centré - tagline en H1 monumental, marque réservée au header.
 */
export function HomeHero() {
  const { t } = useTranslation(['home', 'common'])
  const { lang } = useParams()
  const locale = (lang === 'en' ? 'en' : 'fr') as Locale
  const reduce = useReducedMotion()
  const titleLines = t('home:hero.tagline').split(' · ')

  return (
    <section className="relative flex min-h-[min(88vh,52rem)] flex-col justify-center overflow-hidden pb-14 pt-24 sm:pb-16 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% -5%, rgb(232 240 254 / 0.55), transparent 58%),
            radial-gradient(ellipse 45% 40% at 85% 70%, rgb(255 122 48 / 0.05), transparent 50%),
            radial-gradient(ellipse 40% 35% at 10% 80%, rgb(22 86 201 / 0.04), transparent 45%)
          `,
        }}
      />

      <Container className="relative text-center">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center"
          initial={reduce ? false : 'hidden'}
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>{t('home:hero.eyebrow')}</Eyebrow>
          </motion.div>

          <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-primary-deep sm:mt-6">
            {titleLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, ease: easeOutExpo, delay: 0.08 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg"
          >
            {t('home:hero.subtitle')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg" variant="accent">
              <Link to={localizedPath('contact', locale)}>{t('common:cta.contact')}</Link>
            </Button>
            <Link
              to={localizedPath('portfolio', locale)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-deep transition hover:text-primary"
            >
              {t('common:cta.discover')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.a
          href="#univers"
          className="mt-12 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-muted transition hover:text-primary sm:mt-14"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {t('home:hero.scroll')}
          <ArrowDown size={14} className="animate-bounce" />
        </motion.a>
      </Container>
    </section>
  )
}
