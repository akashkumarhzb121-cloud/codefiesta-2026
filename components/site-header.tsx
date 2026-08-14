'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { NAV_LINKS, EVENT } from '@/lib/data'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'border-b border-border bg-background/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#top" className="group flex items-center gap-2">
              <motion.span 
                className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="font-display text-sm font-bold">C</span>
              </motion.span>
              <motion.span 
                className="font-display text-base font-bold tracking-tight"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Codefiesta
                <motion.span 
                  className="text-muted-foreground"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  '26
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>

          <motion.div 
            className="hidden items-center gap-1 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="absolute inset-x-0 bottom-1 h-0.5 bg-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId={`nav-underline-${link.href}`}
                />
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/register"
                className="group hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-300 hover:shadow-lg sm:inline-flex"
              >
                Register
                <motion.div
                  animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              whileHover={{ scale: 1.05, backgroundColor: 'var(--muted)' }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="size-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Menu className="size-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </nav>

        <motion.div
          className="h-px origin-left bg-foreground"
          style={{ scaleX: progress }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <div className="grid gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </a>
                ))}
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 py-3 text-base font-medium text-background"
                >
                  Register Now
                  <ArrowUpRight className="size-4" />
                </Link>
                <p className="px-3 pt-3 font-mono text-xs text-muted-foreground">
                  {EVENT.dates} · {EVENT.location}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
