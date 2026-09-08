import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: 'left' | 'right'
  className?: string
}

/** Drawer mobile accessible — pattern Rotary `MobileDrawer`. */
export function MobileDrawer({
  open,
  onClose,
  title,
  children,
  side = 'right',
  className,
}: MobileDrawerProps) {
  const { t } = useTranslation('common')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] lg:hidden" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-primary-deep/40 backdrop-blur-sm"
        aria-label={t('nav.closeMenu')}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? t('nav.openMenu')}
        className={cn(
          'absolute top-0 flex h-full w-[min(100vw-3rem,320px)] flex-col bg-surface shadow-[var(--shadow-lift)]',
          side === 'left' ? 'left-0 animate-slide-in-left' : 'right-0 animate-slide-in-right',
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          {title ? (
            <p className="font-display text-lg font-semibold text-primary-deep">{title}</p>
          ) : (
            <span className="sr-only">{t('nav.openMenu')}</span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.closeMenu')}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-ink transition hover:bg-primary-soft"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  )
}
