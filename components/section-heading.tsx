import type React from 'react'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  tone?: 'default' | 'light'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  tone = 'default',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-block font-display text-sm font-700 uppercase tracking-[0.18em]',
            tone === 'light' ? 'text-gold' : 'text-accent',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'mt-2 text-balance font-display text-3xl font-800 leading-tight sm:text-4xl',
          tone === 'light' ? 'text-cream' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-pretty text-base leading-relaxed sm:text-lg',
            tone === 'light' ? 'text-cream/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
