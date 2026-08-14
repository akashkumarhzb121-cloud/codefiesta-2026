'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Globe, Share2, MessageCircle, AtSign, Play, ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { EVENT, NAV_LINKS, WEBSITE_TEAM } from '@/lib/data'
import { Reveal, Stagger, StaggerItem } from '@/components/motion-primitives'

function Github({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  )
}

function Twitter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.24 2H21l-6.5 7.43L22 22h-6.13l-4.8-6.27L5.6 22H2.83l6.96-7.95L2 2h6.28l4.34 5.74L18.24 2Zm-1.07 18.17h1.5L7.1 3.75H5.49l11.68 16.42Z" />
    </svg>
  )
}

const SOCIALS = [
  { icon: AtSign, label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'Twitter / X', href: '#' },
  { icon: Share2, label: 'LinkedIn', href: '#' },
  { icon: Play, label: 'YouTube', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Big CTA */}
        <Reveal>
          <motion.div
            className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-border bg-foreground p-8 text-background sm:p-12 lg:flex-row lg:items-center"
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
          >
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                Ready to build the future?
              </h2>
              <p className="mt-3 max-w-md text-background/70">
                Registrations for {EVENT.name} are open. Grab your team and claim your spot.
              </p>
            </div>
            <Link
              href="/register"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground transition-transform hover:-translate-y-1"
            >
              Register Now
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </Reveal>

        {/* Link columns */}
        <Stagger className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">
                <span className="font-display text-sm font-bold">C</span>
              </span>
              <span className="font-display text-base font-bold tracking-tight">
                Codefiesta<span className="text-muted-foreground">'26</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {EVENT.tagline} A national coding & innovation hackathon hosted by {EVENT.host}.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" /> {EVENT.location}
              </span>
              <a href="mailto:hello@codefiesta.dev" className="inline-flex items-center gap-2 hover:text-foreground">
                <Mail className="size-4" /> codefiesta@gitjaipur.com
              </a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Sections</p>
            <ul className="mt-4 grid gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground link-underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Links</p>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <Link href="/register" className="text-sm text-muted-foreground transition-colors hover:text-foreground link-underline">
                  Register
                </Link>
              </li>
              <li>
                <a href={EVENT.collegeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground link-underline">
                  GIT Jaipur
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground link-underline">
                  Code of Conduct
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground link-underline">
                  Sponsorship
                </a>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Follow</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}                    
                    className="flex size-10 items-center justify-center rounded-full border border-border transition-all hover:bg-foreground hover:text-background hover:scale-110 hover:-rotate-12"
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </StaggerItem>
        </Stagger>

        {/* Website team */}
        <div className="mt-16 border-t border-border pt-10">
          <Reveal>
            <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Built with care by
            </p>
          </Reveal>
          <Stagger className="mt-8 flex flex-wrap items-start justify-center gap-8 sm:gap-14">
            {WEBSITE_TEAM.map((m) => (
              <StaggerItem key={m.name} className="flex w-32 flex-col items-center text-center">
                <div className="group relative size-24 overflow-hidden rounded-full border border-border">
                  <Image
                    src={m.image || '/placeholder.svg'}
                    alt={`Portrait of ${m.name}`}
                    fill
                    sizes="96px"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-4 font-display text-sm font-semibold tracking-tight">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
                <div className="mt-2 flex gap-2">
                  <a href={m.github} aria-label={`${m.name} GitHub`} className="text-muted-foreground hover:text-foreground">
                    <Github className="size-4" />
                  </a>
                  <a href={m.linkedin} aria-label={`${m.name} LinkedIn`} className="text-muted-foreground hover:text-foreground">
                    <Linkedin className="size-4" />
                  </a>
                  <a href={m.twitter} aria-label={`${m.name} Twitter`} className="text-muted-foreground hover:text-foreground">
                    <Twitter className="size-4" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 {EVENT.name}. All rights reserved.</p>
          <p className="font-mono text-xs">{EVENT.dates}</p>
        </div>
      </div>
    </footer>
  )
}