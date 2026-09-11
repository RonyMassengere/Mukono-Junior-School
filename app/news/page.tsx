import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { NewsCard } from '@/components/news-card'
import { getAllNews } from '@/lib/news'

export const metadata: Metadata = {
  title: 'News & Events',
  description:
    'Stay up to date with the latest news, achievements, and events from Mukono Junior School.',
}

export default function NewsPage() {
  const news = getAllNews()

  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title="What's happening at MJS"
        description="Achievements, announcements, and moments worth celebrating from our school community."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        {news.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No news yet — check back soon!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 3) * 90}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
