import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { NewsCard } from '@/components/news-card'
import { getAllNews } from '@/lib/news'

export function NewsSnippet() {
  const latest = getAllNews().slice(0, 3)
  if (latest.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Latest Happenings"
          title={<span className="accent-underline">News &amp; Events</span>}
        />
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 font-700 text-accent transition-colors hover:text-primary"
        >
          View all news
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {latest.map((item, i) => (
          <Reveal key={item.slug} delay={i * 90}>
            <NewsCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
