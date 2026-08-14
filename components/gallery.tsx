'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Share2, Play } from 'lucide-react'
import { ORGANIZERS, COORDINATORS, SPONSORS, HIGHLIGHTS, type Person } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, Stagger, StaggerItem } from '@/components/motion-primitives'

function SponsorMarquee() {
  return (
    <div className="group relative mt-12 overflow-hidden rounded-2xl border border-border bg-card py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-card to-transparent" />
      <div className="flex w-max marquee-track-reverse" style={{ ['--marquee-duration' as string]: '30s' }}>
        {[...SPONSORS, ...SPONSORS].map((s, i) => (
          <div
            key={`${s}-${i}`}
            className="mx-3 flex items-center rounded-xl border border-border bg-background px-8 py-4"
          >
            <span className="font-display text-xl font-semibold tracking-tight text-muted-foreground">
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PersonCard({ person }: { person: Person }) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className="group relative overflow-hidden rounded-2xl border border-border bg-card"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={person.image || '/placeholder.svg'}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 font-mono text-[11px] uppercase tracking-wide">
            {person.role}
          </span>
          <button
            type="button"
            aria-label={`${person.name} on LinkedIn`}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/90 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Share2 className="size-4" />
          </button>
        </div>
        <div className="p-5">
          <h4 className="font-display text-lg font-semibold tracking-tight">{person.name}</h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
        </div>
      </motion.div>
    </StaggerItem>
  )
}

function HighlightReel() {
  return (
    <div className="group relative mt-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] snap-x snap-mandatory">
        {HIGHLIGHTS.map((h) => (
          <motion.article
            key={h.title}
            whileHover={{ scale: 0.99 }}
            className="group/card relative aspect-video w-[85vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-border sm:w-[70vw] lg:w-[520px]"
          >
            <Image
              src={h.image || '/placeholder.svg'}
              alt={h.title}
              fill
              sizes="(max-width: 1024px) 85vw, 520px"
              className="object-cover grayscale transition-all duration-700 group-hover/card:scale-105 group-hover/card:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-background/90 transition-transform duration-300 group-hover/card:scale-110">
                <Play className="size-6 translate-x-0.5 fill-foreground" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5 text-background">
              <p className="font-display text-lg font-semibold tracking-tight">{h.title}</p>
              <span className="font-mono text-sm text-background/80">{h.year}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-20 border-t border-border bg-card/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="The people & the moments"
          description="Backed by great partners, powered by dedicated mentors and volunteers, and remembered through the moments we build together."
        />

        <Reveal delay={0.05}>
          <p className="mt-14 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Our Partners
          </p>
        </Reveal>
        <SponsorMarquee />

        <div className="mt-20">
          <Reveal>
            <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Meet the organizers</h3>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ORGANIZERS.map((p) => (
              <PersonCard key={p.name} person={p} />
            ))}
          </Stagger>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Student coordinators
            </h3>
          </Reveal>
          <Stagger className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {COORDINATORS.map((p) => (
              <PersonCard key={p.name} person={p} />
            ))}
          </Stagger>
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Previous highlights
              </h3>
              <span className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground sm:block">
                Scroll →
              </span>
            </div>
          </Reveal>
          <HighlightReel />
        </div>
      </div>
    </section>
  )
}
