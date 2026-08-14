'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, ArrowUpRight } from 'lucide-react'
import { FAQS } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion-primitives'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative scroll-mt-20 border-t border-border bg-card/40 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            description="Everything you need to know before you register. Still curious? Reach out and we’ll help."
          />
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                href="/register"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-base font-medium text-background transition-all duration-300 hover:shadow-lg"
              >
                Register your team
                <motion.div animate={{ x: [0, 2, 0], y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.div>
              </Link>
            </motion.div>
          </Reveal>
        </div>

        <div className="grid gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <Reveal key={faq.q} delay={i * 0.03}>
                <motion.div 
                  className="overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 card-hover"
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    whileHover={{ backgroundColor: 'var(--muted)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border"
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <motion.p 
                          className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 }}
                        >
                          {faq.a}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
