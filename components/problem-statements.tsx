'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowUpRight, Check, Layers } from 'lucide-react'
import { PROBLEM_STATEMENTS, type ProblemStatement } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Stagger, StaggerItem } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

const DIFFICULTY_STYLE: Record<ProblemStatement['difficulty'], string> = {
  Beginner: 'border-border text-muted-foreground',
  Intermediate: 'border-foreground/40 text-foreground',
  Advanced: 'bg-foreground text-background border-foreground',
}

function DetailModal({ ps, onClose }: { ps: ProblemStatement; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={ps.title}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-border bg-background p-6 sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-foreground px-3 py-1 font-mono text-xs text-background">
              {ps.code}
            </span>
            <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
              {ps.track}
            </span>
            <span className={cn('rounded-full border px-3 py-1 font-mono text-xs', DIFFICULTY_STYLE[ps.difficulty])}>
              {ps.difficulty}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {ps.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{ps.description}</p>

        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Expected Deliverables
          </p>
          <ul className="mt-3 grid gap-2">
            {ps.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2 text-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="size-3" />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="/register"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          Pick this problem
          <ArrowUpRight className="size-4" />
        </a>
      </motion.div>
    </motion.div>
  )
}

export function ProblemStatements() {
  const [selected, setSelected] = useState<ProblemStatement | null>(null)

  return (
    <section id="problems" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Problem Statements"
          title="25 problems. One weekend."
          description="Tap any problem to see the full brief and expected deliverables. Choose the one that matches your track and ambition."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.03}>
          {PROBLEM_STATEMENTS.map((ps) => (
            <StaggerItem key={ps.id}>
              <button
                type="button"
                onClick={() => setSelected(ps)}
                className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-1 hover:border-foreground"
              >
                <span className="font-mono text-sm text-muted-foreground">{ps.code}</span>
                <span className="h-8 w-px bg-border" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display font-semibold tracking-tight">
                    {ps.title}
                  </span>
                  <span className="block truncate text-sm text-muted-foreground">{ps.summary}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 p-5 text-sm text-muted-foreground">
          <Layers className="size-4" />
          Can’t find your fit? Choose <span className="font-medium text-foreground">PS-25 Wildcard</span> and bring your own idea.
        </div>
      </div>

      <AnimatePresence>
        {selected && <DetailModal ps={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
