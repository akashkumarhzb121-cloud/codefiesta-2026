'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Share2, Play } from 'lucide-react'
import { ORGANIZERS, COORDINATORS, SPONSORS, HIGHLIGHTS, type Person } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, Stagger, StaggerItem, Floating } from '@/components/motion-primitives'

function SponsorMarquee() {
  return (
    <motion.div 
      className="group relative mt-12 overflow-hidden rounded-2xl border border-border bg-card py-6 card-hover"
      whileHover={{ boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-card to-transparent" />
      <div className="flex w-max marquee-track-reverse" style={{ ['--marquee-duration' as string]: '30s' }}>
        {[...SPONSORS, ...SPONSORS].map((s, i) => (
          <motion.div
            key={`${s}-${i}`}
            className="mx-3 flex items-center rounded-xl border border-border bg-background px-8 py-4 transition-all duration-300"
            whileHover={{ scale: 1.05, borderColor: 'var(--foreground)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <span className="font-display text-xl font-semibold tracking-tight text-muted-foreground">
              {s}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function PersonCard({ person }: { person: Person }) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)' }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className="group relative overflow-hidden rounded-2xl border border-border bg-card card-hover"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={person.image || '/placeholder.svg'}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
          {/* Enhanced overlay gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent"
            animate={{ opacity: [0.6, 0.7, 0.6] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.span 
            className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 font-mono text-[11px] uppercase tracking-wide"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            viewport={{ once: true }}
          >
            {person.role}
          </motion.span>
          <motion.button
            type="button"
            aria-label={`${person.name} on LinkedIn`}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/90 opacity-0 transition-opacity group-hover:opacity-100"
            whileHover={{ scale: 1.15, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Share2 className="size-4" />
            </motion.div>
          </motion.button>
        </div>
        <div className="p-5">
          <motion.h4 
            className="font-display text-lg font-semibold tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            {person.name}
          </motion.h4>
          <motion.p 
            className="mt-1 text-sm leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
          >
            {person.bio}
          </motion.p>
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
        {HIGHLIGHTS.map((h, i) => (
          <motion.article
            key={h.title}
            whileHover={{ scale: 0.98, transition: { type: 'spring', stiffness: 300 } }}
            className="group/card relative aspect-video w-[85vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-border sm:w-[70vw] lg:w-[520px] card-hover"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <Image
              src={h.image || '/placeholder.svg'}
              alt={h.title}
              fill
              sizes="(max-width: 1024px) 85vw, 520px"
              className="object-cover grayscale transition-all duration-700 group-hover/card:scale-110 group-hover/card:grayscale-0"
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent"
              animate={{ opacity: [0.5, 0.6, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.span 
                className="flex size-16 items-center justify-center rounded-full bg-background/90 transition-all duration-300 group-hover/card:scale-125 group-hover/card:shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="size-6 translate-x-0.5 fill-foreground" />
              </motion.span>
            </motion.div>
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5 text-background">
              <motion.p 
                className="font-display text-lg font-semibold tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {h.title}
              </motion.p>
              <motion.span 
                className="font-mono text-sm text-background/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                viewport={{ once: true }}
              >
                {h.year}
              </motion.span>
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
