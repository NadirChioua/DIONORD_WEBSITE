import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { CONTACT } from '@/lib/constants'
import { isStoreConfigured } from '@/lib/store'
import { saveLead, updateLead, type Lead } from '@/lib/leads'
import { recordEvent } from '@/lib/stats'

// Nodemailer a besoin du runtime Node.js (pas Edge)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_LENGTH = { name: 120, email: 200, phone: 40, company: 160, service: 160, message: 5000 }

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  // Champ piège anti-spam : invisible pour les humains, rempli par les robots
  if (clean(body.website, 200)) {
    return NextResponse.json({ success: true })
  }

  const name = clean(body.name, MAX_LENGTH.name)
  const email = clean(body.email, MAX_LENGTH.email)
  const phone = clean(body.phone, MAX_LENGTH.phone)
  const company = clean(body.company, MAX_LENGTH.company)
  const service = clean(body.service, MAX_LENGTH.service)
  const message = clean(body.message, MAX_LENGTH.message)

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 })
  }

  // 1. Enregistrement dans la base de données (visible dans /admin → Demandes)
  let lead: Lead | null = null
  if (isStoreConfigured()) {
    try {
      lead = await saveLead({ name, phone, email, company, service, message })
      await recordEvent('generate_lead')
    } catch (error) {
      console.error('Contact form: enregistrement impossible', error)
    }
  }

  // 2. Envoi de l'email
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('Contact form: SMTP non configuré (SMTP_HOST / SMTP_USER / SMTP_PASS manquants)', { name, phone, email, service })
    // La demande reste disponible dans l'admin si elle a été enregistrée
    return lead
      ? NextResponse.json({ success: true })
      : NextResponse.json({ error: 'Service email indisponible' }, { status: 503 })
  }

  const date = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })
  const rows: [string, string][] = [
    ['Nom', name],
    ['Téléphone', phone],
    ['Email', email],
    ['Entreprise', company],
    ['Service', service],
    ['Date', date],
  ]

  const subject = `[DIONORD] Nouvelle demande – ${service || 'Non spécifié'} – ${name}`.replace(/[\r\n]+/g, ' ')
  const text = [
    'Nouvelle demande de contact – site dionord.com',
    '',
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`),
    '',
    'Message :',
    message,
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1B3A5C; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0;">Nouvelle demande de contact DIONORD</h2>
      </div>
      <div style="background: #f5f5f5; padding: 24px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${rows
            .filter(([, v]) => v)
            .map(([k, v]) => {
              const safe = escapeHtml(v)
              const value =
                k === 'Téléphone'
                  ? `<a href="tel:${safe.replace(/\s/g, '')}" style="color: #C0392B;">${safe}</a>`
                  : k === 'Email'
                    ? `<a href="mailto:${safe}">${safe}</a>`
                    : safe
              return `<tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #1B3A5C;">${k} :</td><td style="padding: 8px 0;">${value}</td></tr>`
            })
            .join('')}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: white; border-left: 4px solid #C0392B; border-radius: 4px;">
          <p style="font-weight: bold; color: #1B3A5C; margin: 0 0 8px;">Message :</p>
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      </div>
    </div>
  `

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: `"DIONORD Site Web" <${SMTP_USER}>`,
      to: CONTACT_EMAIL || CONTACT.email,
      replyTo: email || undefined,
      subject,
      text,
      html,
    })

    if (lead) await updateLead(lead.id, { emailSent: true }).catch(() => {})
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form: échec de l\'envoi email', error, { name, phone, email, service })
    return lead
      ? NextResponse.json({ success: true })
      : NextResponse.json({ error: 'Échec de l\'envoi' }, { status: 502 })
  }
}
