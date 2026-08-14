'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { FOCUS_AREAS, SERVICES_TRACK, type FocusArea } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Stagger, StaggerItem, Floating } from '@/components/motion-primitives'

function FocusCard({ area, wide = false }: { area: FocusArea; wide?: boolean }) {
  const Icon = area.icon
  return (
    <StaggerItem className={wide ? 'sm:col-span-2 lg:col-span-2' : ''}>
      <motion.article
        whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 card-hover"
      >
        {/* Enhanced background blob with animation */}
        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-foreground/[0.03] transition-all duration-500 group-hover:scale-150 group-hover:bg-foreground/[0.08]"
          aria-hidden="true"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Shimmer effect on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 shimmer" aria-hidden="true" />
        
        <div className="relative flex items-start justify-between">
          <motion.span 
            className="flex size-12 items-center justify-center rounded-xl bg-foreground text-background transition-all duration-300"
            whileHover={{ scale: 1.15, rotate: 6 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Icon className="size-6" />
            </motion.div>
          </motion.span>
          <motion.span 
            className="font-mono text-xs text-muted-foreground"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
          >
            {area.index}
          </motion.span>
        </div>
        <div className="relative mt-8">
          <h3 className="font-display text-xl font-semibold tracking-tight">{area.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {area.tags.map((t, i) => (
              <motion.span
                key={t}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground transition-all duration-300 group-hover:border-foreground/50 group-hover:bg-foreground/5"
                initial={{ opacity: 0.7 }}
                whileHover={{ scale: 1.05, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
        <motion.div
          className="absolute right-6 bottom-6 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100"
          animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.div>
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
            <motion.div 
              className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-border bg-muted/40 p-6 card-hover"
              whileHover={{ y: -4 }}
            >
              <Floating duration={6} distance={8}>
                <div>
                  <p className="font-display text-3xl font-bold tracking-tight">9 Tracks</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Spanning deep-tech to services. One idea. Endless directions.
                  </p>
                </div>
              </Floating>
              <motion.a
                href="#problems"
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                See problem statements
                <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <ArrowUpRight className="size-4" />
                </motion.div>
              </motion.a>
            </motion.div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}
