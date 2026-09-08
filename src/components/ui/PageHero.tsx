import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import { Container } from './Container'
import { MediaFrame } from './MediaFrame'
import { fadeIn, fadeUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  /** Image de fond (tones dark) ou portrait inline (tone light). */
  imageUrl?: string
  /**
   * Portrait à droite (MediaFrame) — hors flux, hauteur calée sur le hero
   * (texte) pour ne pas l’agrandir. Le fond reste visible autour.
   */
  sideImageUrl?: string
  sideImageAlt?: string
  children?: ReactNode
  className?: string
  compact?: boolean
  tone?: 'light' | 'primary' | 'stage'
}

export function PageHero({
  eyebrow,
  title,
  description,
  imageUrl,
  sideImageUrl,
  sideImageAlt = '',
  children,
  className,
  compact = false,
  tone = 'light',
}: PageHeroProps) {
  const reduce = useReducedMotion()
  const dark = tone === 'primary' || tone === 'stage'
  const showSidePortrait = Boolean(dark && sideImageUrl)

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        tone === 'light' && 'bg-transparent',
        tone === 'primary' && 'bg-primary-deep text-white',
        tone === 'stage' && 'bg-stage text-white',
        className,
      )}
    >
      {dark && imageUrl && (
        <div className="absolute inset-0" aria-hidden>
          <img src={imageUrl} alt="" className="h-full w-full object-cover opacity-35" />
          <div
            className={cn(
              'absolute inset-0',
              tone === 'stage'
                ? 'bg-gradient-to-r from-stage via-stage/85 to-stage/55'
                : 'bg-gradient-to-br from-primary-deep/95 via-primary-deep/80 to-primary/55',
            )}
          />
        </div>
      )}

      {dark && (
        <div
          className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
          aria-hidden
        />
      )}

      {!dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 65% 45% at 15% 0%, rgb(232 240 254 / 0.95), transparent 60%)',
          }}
        />
      )}

      {/* Cadre portrait — absolute dans le hero, n’influence pas la hauteur */}
      {showSidePortrait && (
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 z-[1] hidden md:block',
            compact ? 'py-12 pr-6 md:py-14 md:pr-8' : 'py-14 pr-6 md:py-20 md:pr-10 lg:py-24',
          )}
        >
          <MediaFrame
            src={sideImageUrl!}
            alt={sideImageAlt}
            aspect="h-full aspect-auto"
            priority
            className="h-full w-[min(34vw,17.5rem)] max-w-[17.5rem] shadow-[0_0_0_1px_rgb(255_255_255/0.12)]"
            imgClassName="object-[center_20%]"
          />
        </div>
      )}

      <Container
        className={cn(
          'relative z-[2]',
          compact ? 'py-12 md:py-14' : 'py-14 md:py-20 lg:py-24',
          imageUrl && !dark && 'lg:grid lg:grid-cols-12 lg:items-end lg:gap-12',
          showSidePortrait && 'md:pr-[min(38vw,20rem)]',
        )}
      >
        <motion.div
          className={cn(imageUrl && !dark && 'lg:col-span-7', 'max-w-3xl')}
          initial={reduce ? false : 'hidden'}
          animate="visible"
          variants={staggerContainer}
        >
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Eyebrow tone={dark ? 'onDark' : 'accent'}>{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.div variants={fadeUp} className="mt-4 flex gap-4 sm:mt-5">
            <span
              className={cn('cue-light mt-2 hidden h-14 shrink-0 sm:block', dark && 'opacity-90')}
              aria-hidden
            />
            <h1
              className={cn(
                'font-display leading-[1.05]',
                dark ? 'text-white' : 'text-primary-deep',
                compact
                  ? 'text-[clamp(1.85rem,4.5vw,3rem)]'
                  : 'text-[clamp(2rem,5.5vw,3.75rem)]',
              )}
            >
              {title}
            </h1>
          </motion.div>
          {description && (
            <motion.p
              variants={fadeIn}
              className={cn(
                'mt-4 max-w-xl leading-relaxed sm:pl-7',
                dark ? 'text-white/80' : 'text-ink-muted',
                compact ? 'text-base md:text-lg' : 'text-base sm:text-lg md:text-xl',
              )}
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div className={cn('mt-8', !dark && 'sm:pl-7')} variants={fadeUp}>
              {children}
            </motion.div>
          )}
        </motion.div>

        {imageUrl && !dark && (
          <motion.div
            className="relative mt-10 lg:col-span-5 lg:mt-0"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="eager" />
            </div>
            <span className="cue-light absolute -left-3 top-8 h-20 sm:-left-4" aria-hidden />
          </motion.div>
        )}
      </Container>
    </section>
  )
}
