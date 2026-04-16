import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Award, Users, MapPin, Zap } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { getWhatsAppLink } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'À propos – DIONORD SARL AU Tanger',
  description: 'Découvrez DIONORD SARL AU, entreprise spécialisée en construction métallique, menuiserie aluminium et sécurité incendie à Tanger, Maroc.',
}

const values = [
  {
    icon: Award,
    title: 'Confiance',
    description: 'Transparence totale dans nos devis et nos engagements. Pas de surprises, pas d\'extras cachés.',
  },
  {
    icon: Users,
    title: 'Savoir-Faire',
    description: 'Expertise technique éprouvée sur le terrain, atelier de fabrication propre, équipe qualifiée.',
  },
  {
    icon: Zap,
    title: 'Réactivité',
    description: 'Réponse sous 48h à chaque demande de devis. Intervention rapide dans toute la région Nord.',
  },
  {
    icon: CheckCircle2,
    title: 'Qualité',
    description: 'Matériaux de premier choix, finitions irréprochables, conformité aux normes marocaines et internationales.',
  },
]

const zones = [
  'Tanger Free Zone (400+ entreprises)',
  'Tanger Automotive City (50+ entreprises)',
  'Zone Franche Logistique MedHub',
  'Gueznaya et Al Majd',
  'Tétouan Park',
  'Zones industrielles de Mghogha',
  'Région Tanger-Tétouan-Al Hoceima',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 metal-bg text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-brand-blue-mid text-sm font-semibold uppercase tracking-widest">Notre histoire</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              À propos de <span className="text-brand-red">DIONORD</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Une entreprise marocaine fondée à Tanger, spécialisée dans les métiers de la construction métallique, de la menuiserie aluminium et inox, de l&apos;installation de systèmes de sécurité incendie et des travaux d&apos;aménagement.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <SectionTitle
                label="Notre mission"
                title="Confiance & Savoir Faire depuis Tanger"
              />
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  DIONORD SARL AU est une entreprise marocaine fondée à Tanger, spécialisée dans les métiers de la construction métallique, de la menuiserie aluminium et inox, de l&apos;installation de systèmes de sécurité incendie et des travaux d&apos;aménagement.
                </p>
                <p>
                  Notre mission est simple : apporter à nos clients – industriels, promoteurs ou particuliers – un service technique de qualité, exécuté avec rigueur et dans le respect des délais. Nous intervenons dans toute la région Tanger-Tétouan-Al Hoceima, au cœur du deuxième pôle industriel du Maroc.
                </p>
                <p>
                  Notre équipe combine savoir-faire artisanal et compétences techniques pour répondre à des projets de toutes tailles : de la paroi de douche pour un particulier à la charpente métallique d&apos;un hangar industriel de plusieurs milliers de mètres carrés.
                </p>
                <p>
                  Chez DIONORD, chaque projet est traité avec la même exigence. Nous nous engageons sur la qualité, la transparence des devis, la réactivité et le respect des normes en vigueur.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
                  <Image src="/images/realisations/charpente-construction.jpg" alt="Charpente DIONORD" fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-4 pt-8">
                  <div className="aspect-square relative rounded-2xl overflow-hidden">
                    <Image src="/images/realisations/garde-corps-inox.jpg" alt="Menuiserie DIONORD" fill className="object-cover" />
                  </div>
                  <div className="aspect-square relative rounded-2xl overflow-hidden">
                    <Image src="/images/realisations/cloisons-vitrees.jpg" alt="Cloisons DIONORD" fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-4 -left-4 bg-brand-red text-white rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm text-white/80">Ans d&apos;expérience</div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div>
            <SectionTitle
              label="Nos valeurs"
              title="Ce en quoi nous croyons"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, i) => {
                const Icon = val.icon
                return (
                  <div key={i} className="bg-brand-gray-light rounded-xl p-6 text-center">
                    <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-7 h-7 text-brand-red" />
                    </div>
                    <h3 className="font-bold text-brand-blue text-xl mb-3">{val.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{val.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="section-padding metal-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                label="Zone d'intervention"
                title="Au cœur du 2ème pôle industriel du Maroc"
                light
              />
              <p className="text-white/70 leading-relaxed mb-8">
                La région Tanger-Tétouan-Al Hoceima compte plus de 2 100 établissements industriels et 143 000 emplois. Le tissu industriel autour de Tanger Med a généré 188 milliards de dirhams de chiffre d&apos;affaires industriel en 2025. DIONORD est positionné au cœur de cette dynamique.
              </p>
              <ul className="space-y-3">
                {zones.map((zone, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
                    {zone}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-8 text-center mb-8">
                {[
                  { v: '2 100+', l: 'Établissements industriels' },
                  { v: '143K', l: 'Emplois industriels' },
                  { v: '4 700ha', l: 'Zones industrielles' },
                  { v: '84', l: 'Nouveaux projets en 2025' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-brand-red">{s.v}</div>
                    <div className="text-white/60 text-sm mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/10 text-center">
                <div className="text-white/50 text-xs mb-4">Source : données marché 2025, région TTA</div>
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Travailler avec DIONORD
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="section-title mb-4">Prêt à démarrer votre projet ?</h2>
          <p className="text-gray-500 mb-8">
            Contactez-nous dès aujourd&apos;hui pour un devis gratuit. Nous répondons sous 48h et nous déplaçons sur site pour évaluer vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Demander un devis gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BA5A] transition-colors cursor-pointer">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
