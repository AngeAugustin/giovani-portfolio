import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/hooks/useAppStore'

export function PageLoader() {
  const { t } = useTranslation('common')
  const setLoaderDone = useAppStore((s) => s.setLoaderDone)
  const reduce = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderDone(true), reduce ? 200 : 1600)
    return () => window.clearTimeout(timer)
  }, [setLoaderDone, reduce])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-stage"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-start gap-4 text-white">
        <motion.span
          className="cue-light mt-2 h-12"
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
        <div>
          <motion.p
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('loader.label')}
          </motion.p>
          <motion.p
            className="mt-3 text-xs uppercase tracking-[0.2em] text-white/55"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {t('tagline')}
          </motion.p>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 bg-surface"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{
          delay: reduce ? 0 : 1.15,
          duration: reduce ? 0.2 : 0.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        onAnimationComplete={() => setLoaderDone(true)}
      />
    </motion.div>
  )
}
