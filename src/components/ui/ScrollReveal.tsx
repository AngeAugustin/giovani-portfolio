import type { ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
}

/** Reveal au scroll - même API que Rotary `ScrollReveal`. */
export function ScrollReveal({ children, className, delay = 0, ...props }: ScrollRevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
