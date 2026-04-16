'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import contentData from '@/data/content.json'
import { getWhatsAppLink } from '@/lib/constants'

const categories = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'construction-metallique', label: 'Construction Métallique' },
  { id: 'menuiserie-aluminium-inox', label: 'Menuiserie Alu & Inox' },
  { id: 'systeme-incendie', label: 'Sécurité Incendie' },
  { id: 'cloture-metallique', label: 'Clôture Métallique' },
  { id: 'installation-machines-industrielles', label: 'Installation Machines' },
  { id: 'travaux-amenagement', label: 'Aménagement' },
]

const categoryLabels: Record<string, string> = {
  'construction-metallique': 'Construction Métallique',
  'menuiserie-aluminium-inox': 'Menuiserie Alu & Inox',
  'systeme-incendie': 'Sécurité Incendie',
  'cloture-metallique': 'Clôture Métallique',
  'installation-machines-industrielles': 'Installation Machines',
  'travaux-amenagement': 'Aménagement',
}

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const filtered = activeCategory === 'all'
    ? contentData.realisations
    : contentData.realisations.filter((r) => r.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 metal-bg text-white">
        <div className="container-custom">
          <SectionTitle
            label="Portfolio"
            title="Nos Réalisations"
            subtitle="Chaque projet est une preuve de notre savoir-faire. Découvrez nos réalisations en construction métallique, menuiserie aluminium, sécurité incendie et aménagement."
            centered
            light
          />
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>Aucun projet dans cette catégorie pour le moment.</p>
              <p className="text-sm mt-2">De nouvelles réalisations seront ajoutées bientôt.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300"
                  onClick={() => setLightboxSrc(project.images[0])}
                >
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-3 left-3">
                    <span className="bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {categoryLabels[project.category] || project.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-16 p-10 bg-brand-gray-light rounded-2xl">
            <h3 className="text-2xl font-bold text-brand-blue mb-3">Votre projet n&apos;est pas encore ici ?</h3>
            <p className="text-gray-500 mb-6 max-w-xl mx-auto">
              Chaque projet est unique. Contactez-nous pour discuter de vos besoins et obtenir un devis gratuit sous 48h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Demander un devis gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BA5A] transition-colors cursor-pointer">
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <Image
              src={lightboxSrc}
              alt="Réalisation DIONORD"
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-xl"
            />
          </div>
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl cursor-pointer"
            onClick={() => setLightboxSrc(null)}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}
