import { cn } from '@/lib/utils'

interface EmptyStateProps {
  message: string
  className?: string
}

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={cn('border border-dashed border-border px-8 py-20 text-center', className)}>
      <p className="text-ink-muted">{message}</p>
    </div>
  )
}
