import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Desktop-only custom cursor - subtle blue disc + accent ring for premium feel */
export function CustomCursor() {
  const reduce = useReducedMotion()
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const wide = window.matchMedia('(min-width: 1024px)').matches
    const shouldEnable = fine && wide && !reduce
    setEnabled(shouldEnable)
    if (!shouldEnable) return

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      setHovering(Boolean(target?.closest('a, button, [data-cursor-hover]')))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.body.classList.add('cursor-none')

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.body.classList.remove('cursor-none')
    }
  }, [reduce])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden h-2 w-2 rounded-full bg-primary mix-blend-multiply md:block"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.4 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[299] hidden rounded-full border border-accent/70 md:block"
        animate={{
          x: pos.x - (hovering ? 22 : 16),
          y: pos.y - (hovering ? 22 : 16),
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      />
    </>
  )
}
