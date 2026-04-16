'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react'
import { CONTACT, getWhatsAppLink } from '@/lib/constants'
import { services } from '@/data/services'
import SectionTitle from '@/components/ui/SectionTitle'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
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
        setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 6000)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 metal-bg text-white">
        <div className="container-custom">
          <SectionTitle
            label="Contactez-nous"
            title="Parlons de votre projet"
            subtitle="Devis gratuit sous 48h. Notre équipe vous répond rapidement et se déplace sur site pour évaluer vos besoins."
            light
          />

          {/* Quick contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white/60 text-xs mb-0.5">Canal principal</div>
                <div className="text-white font-semibold">WhatsApp</div>
                <div className="text-white/60 text-sm">{CONTACT.whatsappDisplay}</div>
              </div>
            </a>
            <a href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-brand-blue-mid rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white/60 text-xs mb-0.5">Téléphone</div>
                <div className="text-white font-semibold">Appel direct</div>
                <div className="text-white/60 text-sm">{CONTACT.phone}</div>
              </div>
            </a>
            <a href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white/60 text-xs mb-0.5">Email</div>
                <div className="text-white font-semibold">Par email</div>
                <div className="text-white/60 text-sm">{CONTACT.email}</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-brand-blue mb-6">Formulaire de contact</h2>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h3 className="text-2xl font-bold text-brand-blue">Message envoyé !</h3>
                  <p className="text-gray-500 text-center max-w-sm">
                    Merci pour votre message. Nous vous répondrons dans les 48h. En attendant, vous pouvez nous joindre directement sur WhatsApp.
                  </p>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-2">
                    Continuer sur WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-brand-blue mb-2">Nom complet *</label>
                      <input id="name" type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Votre nom complet"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-brand-blue mb-2">Téléphone *</label>
                      <input id="phone" type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+212 6XX XX XX XX"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-brand-blue mb-2">Email</label>
                      <input id="email" type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-brand-blue mb-2">Entreprise</label>
                      <input id="company" type="text" value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Nom de votre société (optionnel)"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-brand-blue mb-2">Service souhaité</label>
                    <select id="service" value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors bg-white cursor-pointer">
                      <option value="">Sélectionner un service...</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Plusieurs services">Plusieurs services</option>
                      <option value="Autre">Autre / Non listé</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-brand-blue mb-2">Message / Description du projet *</label>
                    <textarea id="message" required rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Décrivez votre projet : type de travaux, dimensions approximatives, délais souhaités, contexte (neuf / rénovation), adresse du site..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors resize-none" />
                  </div>

                  {status === 'error' && (
                    <div className="text-red-500 text-sm bg-red-50 border border-red-100 px-4 py-3 rounded-lg">
                      Une erreur est survenue. Veuillez réessayer ou nous contacter directement sur WhatsApp.
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button type="submit" disabled={status === 'loading'}
                      className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                      {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                      <Send className="w-4 h-4" />
                    </button>
                    <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BA5A] transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>

                  <p className="text-xs text-gray-400 text-center">
                    Réponse garantie sous 48h • Devis gratuit, détaillé et sans engagement
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <div className="bg-brand-gray-light rounded-2xl p-6">
                <h3 className="font-bold text-brand-blue mb-5">Informations de contact</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-brand-red" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-blue text-sm">Adresse</div>
                      <div className="text-gray-500 text-sm mt-0.5">{CONTACT.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-brand-red" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-blue text-sm">Téléphone</div>
                      <a href={`tel:${CONTACT.phone}`} className="text-gray-500 text-sm hover:text-brand-red transition-colors">{CONTACT.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-brand-red" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-blue text-sm">Email</div>
                      <a href={`mailto:${CONTACT.email}`} className="text-gray-500 text-sm hover:text-brand-red transition-colors">{CONTACT.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-brand-red" />
                    </div>
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

              {/* Map */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-56">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52297.31853627631!2d-5.8839!3d35.7595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b875cf4788219%3A0xf2c4a5ec2e6e14c3!2sTanger%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DIONORD Tanger"
                />
              </div>

              {/* Response time guarantee */}
              <div className="bg-brand-red rounded-xl p-5 text-white text-center">
                <div className="text-3xl font-bold mb-1">48h</div>
                <div className="font-semibold">Délai de réponse garanti</div>
                <div className="text-white/70 text-sm mt-1">Devis gratuit et sans engagement</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
