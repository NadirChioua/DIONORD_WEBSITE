import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/adminAuth'
import { isStoreConfigured } from '@/lib/store'
import { deleteLead, listLeads, updateLead } from '@/lib/leads'

export const dynamic = 'force-dynamic'

function guard() {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isStoreConfigured()) return NextResponse.json({ error: 'Base de données non configurée' }, { status: 503 })
  return null
}

const csvCell = (v: string) => {
  // Empêche l'exécution de formules à l'ouverture dans Excel
  const safe = /^[=+\-@]/.test(v) ? `'${v}` : v
  return `"${safe.replace(/"/g, '""')}"`
}

export async function GET(request: Request) {
  const denied = guard()
  if (denied) return denied

  const leads = await listLeads()
  if (new URL(request.url).searchParams.get('format') !== 'csv') {
    return NextResponse.json({ leads })
  }

  const header = ['Date', 'Nom', 'Téléphone', 'Email', 'Entreprise', 'Service', 'Message', 'Statut']
  const rows = leads.map((l) => [
    new Date(l.createdAt).toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' }),
    l.name, l.phone, l.email, l.company, l.service, l.message,
    l.status === 'done' ? 'Traitée' : 'Nouvelle',
  ])
  // Séparateur « ; » et BOM UTF-8 : s'ouvre correctement dans Excel en français
  const csv = '﻿' + [header, ...rows].map((r) => r.map(csvCell).join(';')).join('\r\n')
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="demandes-dionord-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}

export async function PATCH(request: Request) {
  const denied = guard()
  if (denied) return denied

  const { id, status } = await request.json().catch(() => ({}))
  if (typeof id !== 'string' || (status !== 'new' && status !== 'done')) {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }
  const lead = await updateLead(id, { status })
  return lead ? NextResponse.json({ lead }) : NextResponse.json({ error: 'Demande introuvable' }, { status: 404 })
}

export async function DELETE(request: Request) {
  const denied = guard()
  if (denied) return denied

  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  await deleteLead(id)
  return NextResponse.json({ success: true })
}
