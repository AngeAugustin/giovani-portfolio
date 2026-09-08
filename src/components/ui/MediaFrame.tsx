import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MediaFrameProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  aspect?: string
  overlay?: boolean
  children?: ReactNode
  priority?: boolean
  drift?: boolean
}

/** Cadre média éditorial — plein cadre, pas de carte flottante. */
export function MediaFrame({
  src,
  alt,
  className,
  imgClassName,
  aspect = 'aspect-[4/5]',
  overlay = false,
  children,
  priority = false,
  drift = false,
}: MediaFrameProps) {
  return (
    <div className={cn('relative overflow-hidden bg-primary-soft', aspect, className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          'h-full w-full object-cover',
          drift && 'animate-media-drift will-change-transform',
          imgClassName,
        )}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-stage/80 via-stage/15 to-transparent"
          aria-hidden
        />
      )}
      {children && <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">{children}</div>}
    </div>
  )
}
