'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  as?: 'div' | 'section' | 'li' | 'span'
  duration?: number
  scale?: boolean
}

export function Reveal({ children, className, delay = 0, y = 24, x = 0, duration = 0.7, scale = false }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x, ...(scale && { scale: 0.95 }) }}
      whileInView={{ opacity: 1, y: 0, x: 0, ...(scale && { scale: 1 }) }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
}

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
  y?: number
  x?: number
  scale?: boolean
  rotate?: boolean
}

export function StaggerItem({ children, className, y = 24, x = 0, scale = false, rotate = false }: StaggerItemProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce 
          ? { opacity: 0 } 
          : { 
              opacity: 0, 
              y, 
              x, 
              ...(scale && { scale: 0.9 }),
              ...(rotate && { rotate: -10 })
            },
        show: { 
          opacity: 1, 
          y: 0, 
          x: 0, 
          ...(scale && { scale: 1 }),
          ...(rotate && { rotate: 0 }),
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
        },
      }}
    >
      {children}
    </motion.div>
  )
}

type FloatingProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
}

export function Floating({ children, className, delay = 0, duration = 6, distance = 12 }: FloatingProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduce ? {} : { y: [-distance / 2, distance / 2, -distance / 2] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

type PulseProps = {
  children: ReactNode
  className?: string
  scale?: boolean
  opacity?: boolean
}

export function Pulse({ children, className, scale = true, opacity = true }: PulseProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduce ? {} : {
        ...(scale && { scale: [1, 1.08, 1] }),
        ...(opacity && { opacity: [1, 0.8, 1] })
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

type GlitchProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Glitch({ children, className, intensity = 2 }: GlitchProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduce ? {} : {
        x: [-intensity, intensity, -intensity, 0],
        opacity: [1, 0.8, 1, 1],
      }}
      transition={{ duration: 0.3, times: [0, 0.2, 0.6, 1] }}
    >
      {children}
    </motion.div>
  )
}

type RotateProps = {
  children: ReactNode
  className?: string
  duration?: number
  direction?: 'clockwise' | 'counterclockwise'
}

export function Rotate({ children, className, duration = 8, direction = 'clockwise' }: RotateProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduce ? {} : { rotate: direction === 'clockwise' ? 360 : -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.div>
  )
}
