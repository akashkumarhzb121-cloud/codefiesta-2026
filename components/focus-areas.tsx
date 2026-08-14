'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { FOCUS_AREAS, SERVICES_TRACK, type FocusArea } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Stagger, StaggerItem } from '@/components/motion-primitives'

function FocusCard({ area, wide = false }: { area: FocusArea; wide?: boolean }) {
  const Icon = area.icon
  return (
    <StaggerItem className={wide ? 'sm:col-span-2 lg:col-span-2' : ''}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-foreground/[0.03] transition-transform duration-500 group-hover:scale-150"
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between">
          <span className="flex size-12 items-center justify-center rounded-xl bg-foreground text-background transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="size-6" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">{area.index}</span>
        </div>
        <div className="relative mt-8">
          <h3 className="font-display text-xl font-semibold tracking-tight">{area.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {area.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight className="absolute right-6 bottom-6 size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
      </motion.article>
    </StaggerItem>
  )
}

export function FocusAreas() {
  return (
    <section id="focus" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Focus Areas"
          title="Nine frontiers to build on"
          description="Pick a track that fires you up. Each focus area frames a real-world problem space — from deep-tech hardware to the digital economy."
        />
        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOCUS_AREAS.map((area) => (
            <FocusCard key={area.id} area={area} />
          ))}
          <FocusCard area={SERVICES_TRACK} wide />
          <StaggerItem className="sm:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-border bg-muted/40 p-6">
              <div>
                <p className="font-display text-3xl font-bold tracking-tight">9 Tracks</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Spanning deep-tech to services. One idea. Endless directions.
                </p>
              </div>
              <a
                href="#problems"
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                See problem statements
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}
