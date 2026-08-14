export type RegistrationMember = {
  name: string
  email: string
  college: string
}

export type RegistrationPayload = {
  teamName: string
  lead: {
    name: string
    email: string
    phone: string
    college: string
  }
  members: RegistrationMember[]
  track: string
  problem: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Accepts +91 98765 43210, 9876543210, +1 415-555-0132, etc. (7-15 digits, optional +/spaces/dashes)
const PHONE_RE = /^\+?[\d\s-]{7,15}$/

export type ValidationResult = { valid: true; data: RegistrationPayload } | { valid: false; errors: string[] }

export function validateRegistration(input: unknown): ValidationResult {
  const errors: string[] = []

  if (typeof input !== 'object' || input === null) {
    return { valid: false, errors: ['Invalid submission.'] }
  }
  const body = input as Record<string, unknown>

  const teamName = typeof body.teamName === 'string' ? body.teamName.trim() : ''
  if (!teamName) errors.push('Team name is required.')

  const leadRaw = (typeof body.lead === 'object' && body.lead !== null ? body.lead : {}) as Record<string, unknown>
  const lead = {
    name: typeof leadRaw.name === 'string' ? leadRaw.name.trim() : '',
    email: typeof leadRaw.email === 'string' ? leadRaw.email.trim() : '',
    phone: typeof leadRaw.phone === 'string' ? leadRaw.phone.trim() : '',
    college: typeof leadRaw.college === 'string' ? leadRaw.college.trim() : '',
  }
  if (!lead.name) errors.push('Lead name is required.')
  if (!lead.email || !EMAIL_RE.test(lead.email)) errors.push('A valid lead email is required.')
  if (!lead.phone || !PHONE_RE.test(lead.phone)) errors.push('A valid lead phone number is required.')
  if (!lead.college) errors.push('Lead college is required.')

  const membersRaw = Array.isArray(body.members) ? body.members : []
  const members: RegistrationMember[] = membersRaw.map((m) => {
    const mm = (typeof m === 'object' && m !== null ? m : {}) as Record<string, unknown>
    return {
      name: typeof mm.name === 'string' ? mm.name.trim() : '',
      email: typeof mm.email === 'string' ? mm.email.trim() : '',
      college: typeof mm.college === 'string' ? mm.college.trim() : '',
    }
  })

  // Total team size = lead + members, must be 2-4
  const totalSize = members.length + 1
  if (totalSize < 2 || totalSize > 4) {
    errors.push('A team must have between 2 and 4 members (including the lead).')
  }
  members.forEach((m, i) => {
    if (!m.name) errors.push(`Member ${i + 2} name is required.`)
    if (!m.email || !EMAIL_RE.test(m.email)) errors.push(`Member ${i + 2} needs a valid email.`)
    if (!m.college) errors.push(`Member ${i + 2} college is required.`)
  })

  const track = typeof body.track === 'string' ? body.track.trim() : ''
  if (!track) errors.push('Please select a focus track.')

  const problem = typeof body.problem === 'string' ? body.problem.trim() : ''

  if (errors.length > 0) return { valid: false, errors }

  return {
    valid: true,
    data: { teamName, lead, members, track, problem },
  }
}
