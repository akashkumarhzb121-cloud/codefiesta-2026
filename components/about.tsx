'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight, HelpCircle, Trophy, GraduationCap } from 'lucide-react'
import { EVENT } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, Stagger, StaggerItem } from '@/components/motion-primitives'

const BLOCKS = [
  {
    icon: HelpCircle,
    label: 'What is Codefiesta?',
    body: 'Codefiesta 2026 is a flagship 24-hour hackathon where student builders turn bold ideas into working prototypes. Across 9 focus tracks, teams collaborate with mentors, ship real solutions and pitch to an industry panel.',
    cta: { label: 'Read the FAQ', href: '#faq' },
  },
  {
    icon: Trophy,
    label: 'Why participate?',
    body: 'Win cash prizes, medals, certificates and exclusive goodies. Beyond the rewards, you gain mentorship, recruiter visibility and a network of India’s sharpest student engineers.',
    cta: { label: 'View prizes', href: '#prizes' },
  },
  {
    icon: GraduationCap,
    label: `About ${EVENT.host}`,
    body: `${EVENT.hostFull} is a leading engineering institute in Jaipur known for its innovation culture, modern labs and a thriving community of makers, coders and researchers.`,
    cta: { label: 'Visit college site', href: EVENT.collegeUrl, external: true },
  },
]

const IMAGES = [
  { src: '/about-campus.png', alt: 'GIT Jaipur campus at golden hour', span: 'lg:col-span-2' },
  { src: '/about-hacking.png', alt: 'Students collaborating during a hackathon', span: '' },
  { src: '/about-stage.png', alt: 'Teams presenting on the main stage', span: '' },
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-border bg-card/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="More than a competition"
          description="Codefiesta is where curiosity meets execution. Here’s what it is, why it’s worth your weekend, and who’s behind it."
        />

        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {BLOCKS.map((b) => {
            const Icon = b.icon
            return (
              <StaggerItem key={b.label}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-7">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-border">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{b.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                  <a
                    href={b.cta.href}
                    {...('external' in b.cta && b.cta.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                  >
                    {b.cta.label}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal className="mt-4" delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMAGES.map((img) => (
              <motion.div
                key={img.src}
                whileHover={{ scale: 0.99 }}
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border ${img.span}`}
              >
                <Image
                  src={img.src || '/placeholder.svg'}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
