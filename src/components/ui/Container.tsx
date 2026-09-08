import type { ReactNode } from 'react'
import { containerClass } from '@/constants/layout'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'main'
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn(containerClass, className)}>{children}</Tag>
}
