import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Log the contact request (server-side)
    console.log('=== Nouvelle demande de contact DIONORD ===')
    console.log(`Nom: ${name}`)
    console.log(`Téléphone: ${phone}`)
    console.log(`Email: ${email || 'Non fourni'}`)
    console.log(`Entreprise: ${company || 'Particulier'}`)
    console.log(`Service: ${service || 'Non spécifié'}`)
    console.log(`Message: ${message}`)
    console.log('===========================================')

    // TODO: Add email sending via nodemailer when SMTP credentials are configured
    // const transporter = nodemailer.createTransporter({ ... })
    // await transporter.sendMail({ ... })

    return NextResponse.json({ success: true, message: 'Message reçu. Nous vous répondrons sous 48h.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
