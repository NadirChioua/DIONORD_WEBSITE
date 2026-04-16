'use client'

import { useInView } from 'react-intersection-observer'
import { ShieldCheck, Zap, Award, Users, Clock, MapPin } from 'lucide-react'

const items = [
  {
    icon: Award,
    title: 'Expertise technique prouvée',
    description: 'Réalisations de référence dans la construction métallique et la menuiserie aluminium.',
  },
  {
    icon: MapPin,
    title: 'Acteur local de la région Nord',
    description: 'Basés à Tanger, intervention rapide dans toute la région Tanger-Tétouan-Al Hoceima.',
  },
  {
    icon: Zap,
    title: 'Devis gratuit sous 48h',
    description: 'Réponse rapide, devis détaillé et transparent, sans engagement.',
  },
  {
    icon: Users,
    title: 'Équipe qualifiée et équipée',
    description: 'Techniciens formés, matériel professionnel, grue disponible pour les grands chantiers.',
  },
  {
    icon: ShieldCheck,
    title: 'Conformité aux normes',
    description: 'Installations conformes aux normes EN-54 (incendie) et aux réglementations marocaines.',
  },
  {
    icon: Clock,
    title: 'Respect des délais',
    description: 'Planning de chantier communiqué en avance, livraison dans les délais convenus.',
  },
]

export default function TrustSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-padding metal-bg" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-brand-blue-mid text-sm font-semibold uppercase tracking-widest">Pourquoi nous choisir</span>
            <div className="w-8 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Ce qui fait la différence <span className="text-brand-red">DIONORD</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className={`bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 80}ms`, transitionDuration: '600ms' }}
              >
                <div className="w-12 h-12 bg-brand-red/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-red transition-colors duration-200">
                  <Icon className="w-6 h-6 text-brand-red group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
