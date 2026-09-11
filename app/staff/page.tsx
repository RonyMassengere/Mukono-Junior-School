import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { leadership, teachers, initials, type StaffMember } from '@/lib/staff'

export const metadata: Metadata = {
  title: 'Our Staff',
  description:
    'Meet the dedicated staff of Mukono Junior School — the teachers and leaders who help every child learn with heart and grow with pride.',
}

function Avatar({ member, size }: { member: StaffMember; size: 'lg' | 'md' }) {
  const dimension = size === 'lg' ? 'size-24' : 'size-16'
  if (member.image) {
    return (
      <div className={`relative ${dimension} overflow-hidden rounded-full`}>
        <Image src={member.image || '/placeholder.svg'} alt={member.name} fill className="object-cover" />
      </div>
    )
  }
  return (
    <div
      className={`grid ${dimension} place-items-center rounded-full bg-primary/10 font-display font-800 text-primary`}
    >
      <span className={size === 'lg' ? 'text-2xl' : 'text-lg'}>{initials(member.name)}</span>
    </div>
  )
}

export default function StaffPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Staff"
        title="The people behind our pupils"
        description="A warm, committed team who know every child by name. (Staff details shown here are placeholders — the school can update them at any time.)"
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Leadership"
          title={<span className="accent-underline">School leadership</span>}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {leadership.map((member, i) => (
            <Reveal key={member.role} delay={i * 90}>
              <article className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-7 text-center">
                <Avatar member={member} size="lg" />
                <h3 className="mt-5 font-display text-lg font-700 text-primary">
                  {member.name}
                </h3>
                <p className="text-sm font-700 text-accent">{member.role}</p>
                {member.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {leadership[0] && (
        <section className="bg-leaf-deep py-16 text-cream sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[auto_1fr] lg:px-8">
            <Reveal>
              <div className="mx-auto grid size-32 place-items-center rounded-full border-4 border-gold/70 bg-cream/10 p-1 sm:size-40">
                <Avatar member={leadership[0]} size="lg" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="max-w-3xl">
                <p className="font-display text-sm font-700 uppercase tracking-[0.18em] text-gold">
                  A welcome from our Head Teacher
                </p>
                <blockquote className="mt-4 font-display text-2xl font-600 leading-relaxed text-cream sm:text-3xl">
                  “At Mukono Junior School, we believe every child arrives with
                  a unique light to share. Our role is to give them the care,
                  discipline, and opportunity to let that light grow brightly.”
                </blockquote>
                <div className="mt-6">
                  <p className="font-display text-lg font-700 text-cream">
                    {leadership[0].name}
                  </p>
                  <p className="text-sm text-cream/70">{leadership[0].role}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Teaching Team"
            title="Our teachers & staff"
            description="Dedicated educators across every class and activity."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((member, i) => (
              <Reveal key={member.role} delay={(i % 3) * 90}>
                <article className="flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5">
                  <Avatar member={member} size="md" />
                  <div>
                    <h3 className="font-display text-base font-700 text-primary">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
