import { cn } from '@/lib/utils'

interface FilterOption {
  id: string
  label: string
  active: boolean
  onClick: () => void
}

interface FilterBarProps {
  filters: FilterOption[]
  label?: string
  className?: string
  /** underline = chips éditoriaux ; pills = filtres type Augustin Projets */
  variant?: 'underline' | 'pills'
}

/** Filtres domaine - underline (défaut) ou pills (page réalisations). */
export function FilterBar({
  filters,
  label,
  className,
  variant = 'underline',
}: FilterBarProps) {
  return (
    <div
      className={cn(
        'scroll-x-fade sm:flex-wrap sm:overflow-visible',
        variant === 'pills' && 'gap-2 sm:gap-2.5',
        className,
      )}
      role="group"
      aria-label={label}
    >
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={filter.onClick}
          className={cn(
            'relative text-sm font-medium transition touch-manipulation',
            variant === 'underline' && 'px-1 py-2 sm:px-2',
            variant === 'underline' &&
              (filter.active ? 'text-primary-deep' : 'text-ink-muted hover:text-primary'),
            variant === 'underline' &&
              filter.active &&
              'after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent sm:after:inset-x-2',
            variant === 'pills' && 'rounded-full px-4 py-2 ring-1',
            variant === 'pills' &&
              (filter.active
                ? 'bg-primary-deep text-white ring-primary-deep'
                : 'bg-surface-muted text-ink-soft ring-border hover:bg-primary-soft hover:text-primary-deep'),
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
