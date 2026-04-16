'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { CONTACT, getWhatsAppLink } from '@/lib/constants'
import { services } from '@/data/services'
import SectionTitle from '@/components/ui/SectionTitle'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section className="section-padding bg-brand-gray-light">
      <div className="container-custom">
        <SectionTitle
          label="Contact"
          title="Parlons de votre projet"
          subtitle="Devis gratuit sous 48h. Remplissez le formulaire ou contactez-nous directement sur WhatsApp."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-card">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-xl font-bold text-brand-blue">Message envoyé !</h3>
                <p className="text-gray-500 text-center">Nous vous répondrons sous 48h. Vous pouvez aussi nous contacter directement sur WhatsApp.</p>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-2">
                  Ouvrir WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-brand-blue mb-2">Nom complet *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-brand-blue mb-2">Téléphone *</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+212 6XX XX XX XX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-blue mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-brand-blue mb-2">Service souhaité</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors bg-white cursor-pointer"
                  >
                    <option value="">Choisir un service...</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-brand-blue mb-2">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre projet, vos besoins, les dimensions approximatives..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">
                    Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  <Send className="w-4 h-4" />
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Réponse garantie sous 48h • Devis gratuit et sans engagement
                </p>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-brand-blue rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-5">Contactez-nous directement</h3>
              <div className="space-y-4">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-0.5">WhatsApp (canal principal)</div>
                    <div className="font-semibold">{CONTACT.whatsappDisplay}</div>
                  </div>
                </a>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Téléphone</div>
                    <div className="font-semibold">{CONTACT.phone}</div>
                  </div>
                </a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Email</div>
                    <div className="font-semibold">{CONTACT.email}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-brand-blue text-sm">Adresse</div>
                  <div className="text-gray-500 text-sm mt-0.5">{CONTACT.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-brand-blue text-sm">Horaires</div>
                  <div className="text-gray-500 text-sm mt-0.5">
                    <div>{CONTACT.hours.weekdays}</div>
                    <div>{CONTACT.hours.saturday}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
