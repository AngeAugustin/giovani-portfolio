import type { Variants } from 'framer-motion'

export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

export const revealMask: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 0.75, ease: easeOutExpo },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
}

export const viewportOnce = { once: true, margin: '-80px' as const }

export const scaleOnHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.28, ease: easeOutExpo } },
  whileTap: { scale: 0.985 },
}

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.32, ease: easeOutExpo },
}
