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
      {/* Stepper */}
      <div className="mb-10 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex size-8 items-center justify-center rounded-full border text-sm font-medium transition-colors',
                  i < step && 'border-foreground bg-foreground text-background',
                  i === step && 'border-foreground text-foreground',
                  i > step && 'border-border text-muted-foreground',
                )}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={cn('hidden text-sm sm:block', i === step ? 'text-foreground' : 'text-muted-foreground')}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={cn('mx-3 h-px flex-1 transition-colors', i < step ? 'bg-foreground' : 'bg-border')} />
            )}
          </div>
        ))}
      </div>

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
        className="rounded-3xl border border-border bg-background p-6 sm:p-8"
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
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wide">Team & Lead details</span>
                </div>
                <div>
                  <label className={labelClass} htmlFor="teamName">Team name</label>
                  <input id="teamName" required value={teamName} onChange={(e) => setTeamName(e.target.value)} className={inputClass} placeholder="e.g. Byte Builders" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="leadName">Lead name</label>
                    <input id="leadName" required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} className={inputClass} placeholder="Full name" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="leadEmail">Lead email</label>
                    <input id="leadEmail" type="email" required value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} className={inputClass} placeholder="you@college.edu" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="leadPhone">Phone</label>
                    <input id="leadPhone" required value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} className={inputClass} placeholder="+91 ..." />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="leadCollege">College</label>
                    <input id="leadCollege" required value={lead.college} onChange={(e) => setLead({ ...lead, college: e.target.value })} className={inputClass} placeholder="Your institution" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="size-4" />
                    <span className="font-mono text-xs uppercase tracking-wide">Team members (2–4 total)</span>
                  </div>
                  <button type="button" onClick={addMember} disabled={members.length >= 3} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-40">
                    <Plus className="size-3.5" /> Add
                  </button>
                </div>
                {members.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">Member {i + 2}</span>
                      {members.length > 1 && (
                        <button type="button" onClick={() => removeMember(i)} aria-label="Remove member" className="text-muted-foreground hover:text-foreground">
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <input required value={m.name} onChange={(e) => updateMember(i, 'name', e.target.value)} className={inputClass} placeholder="Name" />
                      <input type="email" required value={m.email} onChange={(e) => updateMember(i, 'email', e.target.value)} className={inputClass} placeholder="Email" />
                      <input required value={m.college} onChange={(e) => updateMember(i, 'college', e.target.value)} className={inputClass} placeholder="College" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                    <Rocket className="size-4" />
                    <span className="font-mono text-xs uppercase tracking-wide">Choose a focus track</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {TRACKS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTrack(t.id)}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors',
                          track === t.id ? 'border-foreground bg-foreground text-background' : 'border-border bg-card hover:border-foreground/40',
                        )}
                      >
                        <t.icon className="size-4 shrink-0" />
                        <span className="truncate font-medium">{t.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="problem">Preferred problem statement</label>
                  <select id="problem" value={problem} onChange={(e) => setProblem(e.target.value)} className={cn(inputClass, 'appearance-none')}>
                    <option value="">Select a problem (optional)</option>
                    {PROBLEM_STATEMENTS.map((p) => (
                      <option key={p.id} value={p.code}>{p.code} — {p.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wide">Review & submit</span>
                </div>
                <dl className="grid gap-3 rounded-2xl border border-border bg-card p-5 text-sm">
                  <Row label="Team" value={teamName || '—'} />
                  <Row label="Lead" value={lead.name ? `${lead.name} · ${lead.email}` : '—'} />
                  <Row label="Members" value={`${members.length + 1} total`} />
                  <Row label="Track" value={TRACKS.find((t) => t.id === track)?.title ?? 'Not selected'} />
                  <Row label="Problem" value={problem || 'To be decided'} />
                </dl>
                <p className="text-xs text-muted-foreground">
                  By submitting you agree to the {EVENT.name} code of conduct. Registration now.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
          >
            {submitting ? (
              <>
                Submitting
                <Loader2 className="size-4 animate-spin" />
              </>
            ) : (
              <>
                {step === STEPS.length - 1 ? 'Submit registration' : 'Continue'}
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
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
