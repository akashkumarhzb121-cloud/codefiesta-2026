import { motion } from 'motion/react'
import { Reveal } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Reveal scale={true}>
        <motion.span 
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.span 
            className="size-1.5 rounded-full bg-foreground" 
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {eyebrow}
        </motion.span>
      </Reveal>
      <Reveal delay={0.05} scale={true}>
        <motion.h2 
          className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1} scale={true}>
          <motion.p
            className={cn(
              'max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground',
              align === 'center' && 'mx-auto',
            )}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>
        </Reveal>
      )}
    </div>
  )
}
