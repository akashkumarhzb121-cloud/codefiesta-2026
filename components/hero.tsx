'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDown, ArrowUpRight, MapPin, CalendarDays, Sparkles } from 'lucide-react'
import { EVENT, SPONSORS } from '@/lib/data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-16"
    >
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles className="size-3.5" />
            National Hackathon
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {EVENT.dates}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <MapPin className="size-3.5" />
            {EVENT.location}
          </span>
        </motion.div>

        <motion.h1
          style={{ y: yTitle }}
          className="font-display text-[15vw] font-bold leading-[0.86] tracking-tighter text-balance sm:text-[13vw] lg:text-[11rem]"
        >
          <motion.span variants={item} className="block">
            Code<span className="text-stroke">fiesta</span>
          </motion.span>
          <motion.span variants={item} className="block">
            2026
          </motion.span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-8 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            A 1-day national coding & innovation hackathon by{' '}
            <span className="font-medium text-foreground">{EVENT.host}</span>. 24 hours,
            9 focus tracks, 25+ problem statements and prizes worth ₹1L+.
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-base font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Register Now
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a
            href="#focus"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base font-medium transition-colors hover:bg-muted"
          >
            Explore Tracks
            <ArrowDown className="size-5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Sponsor marquee */}
      <div className="group relative border-y border-border bg-card/50 py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max marquee-track" style={{ ['--marquee-duration' as string]: '38s' }}>
          {[...SPONSORS, ...SPONSORS].map((s, i) => (
            <div key={`${s}-${i}`} className="flex items-center gap-3 px-8">
              <span className="size-1.5 rounded-full bg-muted-foreground/40" />
              <span className="font-display text-lg font-semibold tracking-tight text-muted-foreground">
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
