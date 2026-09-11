import type React from 'react'
import { WaveDivider } from '@/components/accents'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-leaf-deep pb-16 pt-28 text-cream sm:pt-32">
      <div className="mx-auto max-w-6xl px-5">
        {eyebrow && (
          <span className="inline-block font-display text-sm font-700 uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-800 leading-[1.05] sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-cream/85">
            {description}
          </p>
        )}
      </div>
      <WaveDivider className="absolute inset-x-0 bottom-0 block h-12 w-full" fill="var(--cream)" />
    </section>
  )
}
