'use client'

import { useEffect, useState } from 'react'
import { Download, Trash2, CheckCircle2, Circle, RefreshCw, Phone, Mail, MessageCircle, AlertTriangle } from 'lucide-react'

interface Lead {
  id: string
  createdAt: string
  name: string
  phone: string
  email: string
  company: string
  service: string
  message: string
  status: 'new' | 'done'
  emailSent: boolean
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

// Numéro marocain local (06…/07…) → format international pour WhatsApp
const whatsappNumber = (phone: string) => {
  const digits = phone.replace(/[^\d]/g, '')
  return /^0[5-7]\d{8}$/.test(digits) ? `212${digits.slice(1)}` : digits
}

export default function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[] | null>(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'new' | 'done'>('all')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/leads')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erreur de chargement')
      setLeads(json.leads)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const setStatus = async (lead: Lead, status: Lead['status']) => {
    setLeads((list) => list?.map((l) => (l.id === lead.id ? { ...l, status } : l)) ?? null)
    const res = await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lead.id, status }),
    })
    if (!res.ok) load()
  }

  const remove = async (lead: Lead) => {
    if (!confirm(`Supprimer définitivement la demande de ${lead.name} ?`)) return
    const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(lead.id)}`, { method: 'DELETE' })
    if (res.ok) setLeads((list) => list?.filter((l) => l.id !== lead.id) ?? null)
  }

  const shown = (leads ?? []).filter((l) => filter === 'all' || l.status === filter)
  const newCount = (leads ?? []).filter((l) => l.status === 'new').length

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {([
            ['all', `Toutes (${leads?.length ?? 0})`],
            ['new', `Nouvelles (${newCount})`],
            ['done', 'Traitées'],
          ] as const).map(([id, label]) => (
            <button key={id} onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                filter === id ? 'bg-brand-blue text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={load} disabled={loading} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-blue cursor-pointer disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
          {!!leads?.length && (
            <a href="/api/admin/leads?format=csv" className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100">
              <Download className="w-4 h-4" />
              Exporter (Excel)
            </a>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {leads && shown.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
          Aucune demande pour le moment.
        </div>
      )}

      <div className="space-y-3">
        {shown.map((lead) => (
          <article key={lead.id}
            className={`bg-white rounded-xl border p-5 ${lead.status === 'new' ? 'border-brand-red/30 shadow-sm' : 'border-gray-200 opacity-80'}`}>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-brand-blue">{lead.name}</h3>
                  {lead.status === 'new' && <span className="text-xs font-semibold bg-brand-red text-white px-2 py-0.5 rounded-full">Nouvelle</span>}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {formatDate(lead.createdAt)}
                  {lead.company && ` · ${lead.company}`}
                  {!lead.emailSent && ' · email non envoyé'}
                </div>
              </div>
              {lead.service && (
                <span className="text-xs font-medium bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full">{lead.service}</span>
              )}
            </div>

            <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-3 mb-4">{lead.message}</p>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 text-sm">
                <a href={`tel:${lead.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">
                  <Phone className="w-4 h-4" />{lead.phone}
                </a>
                <a href={`https://wa.me/${whatsappNumber(lead.phone)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C4A]">
                  <MessageCircle className="w-4 h-4" />WhatsApp
                </a>
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">
                    <Mail className="w-4 h-4" />{lead.email}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setStatus(lead, lead.status === 'new' ? 'done' : 'new')}
                  className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  {lead.status === 'new' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Circle className="w-4 h-4" />}
                  {lead.status === 'new' ? 'Marquer traitée' : 'Remettre en nouvelle'}
                </button>
                <button onClick={() => remove(lead)} aria-label="Supprimer"
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
