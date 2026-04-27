import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const subject = `[DIONORD] Nouvelle demande – ${service || 'Non spécifié'} – ${name}`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1B3A5C; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">Nouvelle demande de contact DIONORD</h2>
        </div>
        <div style="background: #f5f5f5; padding: 24px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #1B3A5C;">Nom :</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #1B3A5C;">Téléphone :</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #C0392B;">${phone}</a></td></tr>
            ${email ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1B3A5C;">Email :</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>` : ''}
            ${company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1B3A5C;">Entreprise :</td><td style="padding: 8px 0;">${company}</td></tr>` : ''}
            ${service ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1B3A5C;">Service :</td><td style="padding: 8px 0;">${service}</td></tr>` : ''}
          </table>
          <div style="margin-top: 16px; padding: 16px; background: white; border-left: 4px solid #C0392B; border-radius: 4px;">
            <p style="font-weight: bold; color: #1B3A5C; margin: 0 0 8px;">Message :</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      </div>
    `

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `"DIONORD Site Web" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'contact@dionord.ma',
        replyTo: email || undefined,
        subject,
        html,
      })
    } else {
      // SMTP not configured — log for server visibility
      console.log('=== Nouvelle demande DIONORD (SMTP non configuré) ===')
      console.log(`Nom: ${name} | Tél: ${phone} | Email: ${email || '-'} | Société: ${company || '-'}`)
      console.log(`Service: ${service || '-'}`)
      console.log(`Message: ${message}`)
      console.log('====================================================')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
