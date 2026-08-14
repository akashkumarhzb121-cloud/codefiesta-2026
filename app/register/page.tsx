import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { EVENT } from '@/lib/data'
import { RegisterForm } from '@/components/register-form'

export const metadata: Metadata = {
  title: 'Register',
  description: `Register your team for ${EVENT.name}, a national coding & innovation hackathon by ${EVENT.host}.`,
}

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Home
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {EVENT.dates}
          </span>
        </div>

        <div className="mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Registration
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Join {EVENT.name}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            Lock in your team for 24 hours of building. It only takes a minute — and it&apos;s free.
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  )
}
