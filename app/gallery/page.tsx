import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { galleryPhotos } from '@/lib/gallery'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'A scrapbook of life at Mukono Junior School — classrooms, the library, sports, arts, assemblies, and community service.',
}

// Gentle, varied tilts so the grid feels like a pinned scrapbook.
const tilts = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-1', '-rotate-2']
const tapes = ['bg-gold/70', 'bg-terracotta/60', 'bg-leaf/40']

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our school life"
        description="A little scrapbook of everyday joy at Mukono Junior School — learning, playing, and growing together."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {galleryPhotos.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 3) * 90}>
              <figure
                className={cn(
                  'group relative mx-auto max-w-sm rotate-0 rounded-sm bg-card p-3 pb-14 shadow-[0_14px_30px_-16px_rgba(43,38,33,0.55)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]',
                  tilts[i % tilts.length],
                )}
              >
                {/* Tape */}
                <span
                  className={cn(
                    'absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-[2px] opacity-80',
                    tapes[i % tapes.length],
                  )}
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={photo.src || '/placeholder.svg'}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-4 px-4 text-center font-display text-base font-600 text-charcoal">
                  {photo.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
