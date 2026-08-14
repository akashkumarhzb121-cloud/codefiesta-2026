'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Trophy, Medal, Award, Check, Clock } from 'lucide-react'
import { PRIZES, SPECIAL_PRIZES, SCHEDULE, type Prize } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, Stagger, StaggerItem } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

const PLACE_ICON = [Trophy, Medal, Award]

function PodiumCard({ prize, index }: { prize: Prize; index: number }) {
  const Icon = PLACE_ICON[index] ?? Award
  return (
    <StaggerItem className={cn(index === 0 && 'lg:-mt-6')}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl border p-7',
          prize.highlight
            ? 'border-foreground bg-foreground text-background'
            : 'border-border bg-card',
        )}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'flex size-12 items-center justify-center rounded-xl',
              prize.highlight ? 'bg-background/15' : 'bg-foreground text-background',
            )}
          >
            <Icon className="size-6" />
          </span>
          <span
            className={cn(
              'font-mono text-sm',
              prize.highlight ? 'text-background/70' : 'text-muted-foreground',
            )}
          >
            {prize.place} Place
          </span>
        </div>
        <p className="mt-8 font-display text-5xl font-bold tracking-tighter">{prize.amount}</p>
        <p
          className={cn(
            'mt-1 text-sm font-medium',
            prize.highlight ? 'text-background/80' : 'text-muted-foreground',
          )}
        >
          {prize.label}
        </p>
        <ul className="mt-6 grid gap-2">
          {prize.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm">
              <Check className={cn('size-4', prize.highlight ? 'text-background' : 'text-foreground')} />
              {perk}
            </li>
          ))}
        </ul>
      </motion.div>
    </StaggerItem>
  )
}

function Schedule() {
  const [active, setActive] = useState(SCHEDULE[0].id)
  const day = SCHEDULE.find((d) => d.id === active) ?? SCHEDULE[0]

  return (
    <div className="mt-16">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Schedule of Events
            </span>
            <h3 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              24 hours, mapped out
            </h3>
          </div>
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {SCHEDULE.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActive(d.id)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5',
                  active === d.id ? 'text-background' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active === d.id && (
                  <motion.span
                    layoutId="day-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{d.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 rounded-2xl border border-border bg-card p-2 sm:p-4">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-mono text-sm text-muted-foreground">{day.date}</p>
          <p className="font-display text-sm font-semibold">{day.theme}</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.ol
            key={day.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-1"
          >
            {day.items.map((it, i) => (
              <motion.li
                key={it.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-start gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-muted/60"
              >
                <div className="flex w-16 shrink-0 items-center gap-1.5 pt-0.5 font-mono text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  {it.time}
                </div>
                <span className="mt-1.5 hidden size-2 shrink-0 rounded-full border border-foreground bg-background transition-colors group-hover:bg-foreground sm:block" />
                <div className="min-w-0">
                  <p className="font-display font-semibold tracking-tight">{it.title}</p>
                  <p className="text-sm text-muted-foreground">{it.detail}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Prizes() {
  return (
    <section id="prizes" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Prizes & Rewards"
          title="Worth building for"
          description="A prize pool over ₹1,00,000, plus medals, certificates, goodies and recruiter fast-tracks for standout teams."
        />

        <Stagger className="mt-14 grid gap-4 lg:grid-cols-3">
          {PRIZES.map((p, i) => (
            <PodiumCard key={p.place} prize={p} index={i} />
          ))}
        </Stagger>

        <Stagger className="mt-4 grid gap-4 sm:grid-cols-3">
          {SPECIAL_PRIZES.map((p) => (
            <StaggerItem key={p.label}>
              <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5">
                <div>
                  <p className="font-display text-sm font-semibold">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.perks.join(' · ')}</p>
                </div>
                <p className="font-display text-2xl font-bold tracking-tight">{p.amount}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Schedule />
      </div>
    </section>
  )
}
