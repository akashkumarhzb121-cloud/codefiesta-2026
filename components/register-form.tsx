'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, Plus, Trash2, CheckCircle2, Users, User, Rocket, AlertCircle, Loader2 } from 'lucide-react'
import { FOCUS_AREAS, SERVICES_TRACK, PROBLEM_STATEMENTS, EVENT } from '@/lib/data'
import { cn } from '@/lib/utils'

type Member = { name: string; email: string; college: string }

const TRACKS = [...FOCUS_AREAS, SERVICES_TRACK]
const STEPS = ['Team', 'Members', 'Track', 'Review'] as const

const inputClass =
  'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground'
const labelClass = 'mb-1.5 block font-mono text-xs uppercase tracking-wide text-muted-foreground'

export function RegisterForm() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [lead, setLead] = useState({ name: '', email: '', phone: '', college: '' })
  const [members, setMembers] = useState<Member[]>([{ name: '', email: '', college: '' }])
  const [track, setTrack] = useState<string>('')
  const [problem, setProblem] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addMember = () => members.length < 3 && setMembers([...members, { name: '', email: '', college: '' }])
  const removeMember = (i: number) => setMembers(members.filter((_, idx) => idx !== i))
  const updateMember = (i: number, key: keyof Member, val: string) =>
    setMembers(members.map((m, idx) => (idx === i ? { ...m, [key]: val } : m)))

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prev = () => {
    setError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center sm:p-12"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-foreground text-background">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">You&apos;re in!</h2>
        <p className="mt-3 text-muted-foreground">
          Thanks for registering <span className="font-medium text-foreground">{teamName || 'your team'}</span> for{' '}
          {EVENT.name}. A confirmation email is on its way with next steps.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Enhanced Stepper with animations */}
      <motion.div className="mb-10 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <motion.div 
            key={label} 
            className="flex flex-1 items-center last:flex-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <motion.span
                className={cn(
                  'flex size-8 items-center justify-center rounded-full border text-sm font-medium transition-colors',
                  i < step && 'border-foreground bg-foreground text-background',
                  i === step && 'border-foreground text-foreground',
                  i > step && 'border-border text-muted-foreground',
                )}
                animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {i < step ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <Check className="size-4" />
                  </motion.div>
                ) : (
                  i + 1
                )}
              </motion.span>
              <motion.span 
                className={cn('hidden text-sm sm:block', i === step ? 'text-foreground' : 'text-muted-foreground')}
                animate={{ opacity: i === step ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
              >
                {label}
              </motion.span>
            </div>
            {i < STEPS.length - 1 && (
              <motion.span 
                className={cn('mx-3 h-px flex-1 transition-colors', i < step ? 'bg-foreground' : 'bg-border')}
                animate={{ backgroundColor: i < step ? 'var(--foreground)' : 'var(--border)' }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (step !== STEPS.length - 1) {
            if (step === 2 && !track) {
              setError('Please select a focus track before continuing.')
              return
            }
            setError(null)
            next()
            return
          }
          setError(null)
          setSubmitting(true)
          try {
            const res = await fetch('/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ teamName, lead, members, track, problem }),
            })
            const json = await res.json().catch(() => null)
            if (!res.ok || !json?.ok) {
              const msg = json?.errors?.[0] ?? 'Something went wrong. Please try again.'
              setError(msg)
              return
            }
            setDone(true)
          } catch {
            setError('Network error — please check your connection and try again.')
          } finally {
            setSubmitting(false)
          }
        }}
        className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-hover"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <div className="grid gap-5">
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    <Users className="size-4" />
                  </motion.div>
                  <span className="font-mono text-xs uppercase tracking-wide">Team & Lead details</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className={labelClass} htmlFor="teamName">Team name</label>
                  <motion.input 
                    id="teamName" 
                    required 
                    value={teamName} 
                    onChange={(e) => setTeamName(e.target.value)} 
                    className={inputClass} 
                    placeholder="e.g. Byte Builders"
                    whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.05)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </motion.div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    { id: 'leadName', label: 'Lead name', placeholder: 'Full name', value: lead.name, onChange: (v: string) => setLead({ ...lead, name: v }) },
                    { id: 'leadEmail', label: 'Lead email', placeholder: 'you@college.edu', value: lead.email, onChange: (v: string) => setLead({ ...lead, email: v }), type: 'email' },
                    { id: 'leadPhone', label: 'Phone', placeholder: '+91 ...', value: lead.phone, onChange: (v: string) => setLead({ ...lead, phone: v }) },
                    { id: 'leadCollege', label: 'College', placeholder: 'Your institution', value: lead.college, onChange: (v: string) => setLead({ ...lead, college: v }) },
                  ].map((field, i) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <label className={labelClass} htmlFor={field.id}>{field.label}</label>
                      <motion.input 
                        id={field.id} 
                        type={field.type || 'text'}
                        required 
                        value={field.value} 
                        onChange={(e) => field.onChange(e.target.value)} 
                        className={inputClass} 
                        placeholder={field.placeholder}
                        whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.05)' }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5">
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                      <User className="size-4" />
                    </motion.div>
                    <span className="font-mono text-xs uppercase tracking-wide">Team members (2–4 total)</span>
                  </div>
                  <motion.button 
                    type="button" 
                    onClick={addMember} 
                    disabled={members.length >= 3} 
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="size-3.5" /> Add
                  </motion.button>
                </motion.div>
                {members.map((m, i) => (
                  <motion.div 
                    key={i} 
                    className="rounded-2xl border border-border bg-card p-4 card-hover"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">Member {i + 2}</span>
                      {members.length > 1 && (
                        <motion.button 
                          type="button" 
                          onClick={() => removeMember(i)} 
                          aria-label="Remove member" 
                          className="text-muted-foreground hover:text-foreground"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="size-4" />
                        </motion.button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { placeholder: 'Name', value: m.name, onChange: (v: string) => updateMember(i, 'name', v) },
                        { placeholder: 'Email', value: m.email, onChange: (v: string) => updateMember(i, 'email', v), type: 'email' },
                        { placeholder: 'College', value: m.college, onChange: (v: string) => updateMember(i, 'college', v) },
                      ].map((field, j) => (
                        <motion.input 
                          key={j}
                          type={field.type || 'text'}
                          required 
                          value={field.value} 
                          onChange={(e) => field.onChange(e.target.value)} 
                          className={inputClass} 
                          placeholder={field.placeholder}
                          whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.05)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Rocket className="size-4" />
                    </motion.div>
                    <span className="font-mono text-xs uppercase tracking-wide">Choose a focus track</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {TRACKS.map((t, i) => (
                      <motion.button
                        key={t.id}
                        type="button"
                        onClick={() => setTrack(t.id)}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors',
                          track === t.id ? 'border-foreground bg-foreground text-background' : 'border-border bg-card hover:border-foreground/40',
                        )}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div animate={track === t.id ? { rotate: [0, 10, -10, 0] } : {}} transition={{ duration: 4, repeat: Infinity }}>
                          <t.icon className="size-4 shrink-0" />
                        </motion.div>
                        <span className="truncate font-medium">{t.title}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className={labelClass} htmlFor="problem">Preferred problem statement</label>
                  <motion.select 
                    id="problem" 
                    value={problem} 
                    onChange={(e) => setProblem(e.target.value)} 
                    className={cn(inputClass, 'appearance-none')}
                    whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.05)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <option value="">Select a problem (optional)</option>
                    {PROBLEM_STATEMENTS.map((p) => (
                      <option key={p.id} value={p.code}>{p.code} — {p.title}</option>
                    ))}
                  </motion.select>
                </motion.div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Check className="size-4" />
                  </motion.div>
                  <span className="font-mono text-xs uppercase tracking-wide">Review & submit</span>
                </motion.div>
                <motion.dl 
                  className="grid gap-3 rounded-2xl border border-border bg-card p-5 text-sm card-hover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Row label="Team" value={teamName || '—'} />
                  <Row label="Lead" value={lead.name ? `${lead.name} · ${lead.email}` : '—'} />
                  <Row label="Members" value={`${members.length + 1} total`} />
                  <Row label="Track" value={TRACKS.find((t) => t.id === track)?.title ?? 'Not selected'} />
                  <Row label="Problem" value={problem || 'To be decided'} />
                </motion.dl>
                <motion.p 
                  className="text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  By submitting you agree to the {EVENT.name} code of conduct. Registration now.
                </motion.p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <motion.div 
            className="mt-6 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <motion.div 
          className="mt-8 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
            whileHover={{ scale: 1.05, backgroundColor: 'var(--muted)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="size-4" /> Back
          </motion.button>
          <motion.button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:shadow-lg disabled:pointer-events-none disabled:opacity-60"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitting ? (
              <>
                Submitting
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Loader2 className="size-4" />
                </motion.div>
              </>
            ) : (
              <>
                {step === STEPS.length - 1 ? 'Submit registration' : 'Continue'}
                <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <ArrowRight className="size-4" />
                </motion.div>
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="truncate text-right font-medium">{value}</dd>
    </div>
  )
}
