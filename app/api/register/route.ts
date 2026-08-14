import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { validateRegistration, type RegistrationPayload } from '@/lib/validate-registration'

export const runtime = 'nodejs'

// NOTE on persistence: this writes submissions to a local JSON file, which is
// perfect for local development and for platforms with a persistent filesystem.
// On serverless hosts (e.g. Vercel) the filesystem is read-only / ephemeral, so
// entries won't survive a redeploy or cold start. For production, swap the
// `saveRegistration` call below for a real datastore (Postgres, Supabase,
// Google Sheets, Airtable, etc.) — the validation and response shape can stay
// exactly the same.
const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'registrations.json')

type StoredRegistration = RegistrationPayload & { id: string; submittedAt: string }

function buildRecord(data: RegistrationPayload): StoredRegistration {
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    ...data,
  }
}

async function saveRegistration(record: StoredRegistration) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  let existing: StoredRegistration[] = []
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    existing = JSON.parse(raw)
  } catch {
    existing = []
  }
  existing.push(record)
  await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), 'utf-8')
}

// Optional: send an email notification if RESEND_API_KEY is configured.
// Sign up at https://resend.com, add RESEND_API_KEY + REGISTER_NOTIFY_EMAIL
// to your environment, and notifications will start flowing automatically.
async function notifyByEmail(record: StoredRegistration) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.REGISTER_NOTIFY_EMAIL
  if (!apiKey || !to) return

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Codefiesta 2026 <onboarding@resend.dev>',
        to,
        subject: `New registration: ${record.teamName}`,
        text: `Team: ${record.teamName}
Lead: ${record.lead.name} <${record.lead.email}> (${record.lead.phone})
College: ${record.lead.college}
Members: ${record.members.map((m) => `${m.name} <${m.email}>`).join(', ')}
Track: ${record.track}
Problem: ${record.problem || 'Not selected'}
Submitted: ${record.submittedAt}`,
      }),
    })
  } catch (err) {
    // Don't fail the registration if the email notification fails.
    console.error('Failed to send registration email notification:', err)
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, errors: ['Invalid JSON body.'] }, { status: 400 })
  }

  const result = validateRegistration(body)
  if (!result.valid) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 })
  }

  const record = buildRecord(result.data)

  try {
    await saveRegistration(record)
  } catch (err) {
    console.error('Failed to save registration:', err)
    return NextResponse.json(
      { ok: false, errors: ['Something went wrong while saving your registration. Please try again.'] },
      { status: 500 },
    )
  }

  // Fire-and-forget; do not block the response on email delivery.
  void notifyByEmail(record)

  return NextResponse.json({ ok: true, id: record.id })
}
