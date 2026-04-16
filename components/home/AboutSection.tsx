'use client'

import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import SectionTitle from '@/components/ui/SectionTitle'

const stats = [
  { value: '6', label: 'Domaines', description: "d'expertise" },
  { value: '150+', label: 'Projets', description: 'réalisés' },
  { value: '10+', label: 'Ans', description: "d'expérience" },
  { value: '48h', label: 'Délai', description: 'de réponse' },
]

const advantages = [
  'Polyvalence unique : 6 métiers sous une seule enseigne',
  'Proximité avec les zones industrielles de Tanger Med',
  'Atelier de fabrication propre pour un contrôle qualité total',
  'Devis gratuit, détaillé et transparent sous 48h',
  'Équipe qualifiée et équipements professionnels',
  'Intervention dans toute la région Tanger-Tétouan-Al Hoceima',
]

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <SectionTitle
              label="À propos"
              title="Votre partenaire industriel et artisanal à Tanger"
              subtitle="Basée à Tanger, DIONORD SARL AU est une entreprise multi-spécialiste qui accompagne ses clients de la conception à la livraison."
            />

            <p className="text-gray-600 leading-relaxed mb-6">
              Forte de son expertise technique et de son engagement qualité, DIONORD accompagne les industriels, les promoteurs et les particuliers dans la réalisation de leurs projets. De la charpente métallique d&apos;un hangar industriel à la paroi de douche d&apos;un particulier, chaque projet est traité avec la même exigence.
            </p>

            <ul className="space-y-3 mb-8">
              {advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{adv}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/a-propos" className="btn-outline">
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-primary">
                Demander un devis
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-brand-gray-light rounded-2xl p-10">
              <div className="grid grid-cols-2 gap-10">
                {stats.map((stat, i) => (
                  <AnimatedCounter key={i} value={stat.value} label={stat.label} description={stat.description} />
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-brand-blue">Région Tanger-Tétouan-Al Hoceima</div>
                    <div className="text-gray-500 text-sm mt-0.5">2ème pôle industriel du Maroc • 143 000 emplois industriels</div>
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
