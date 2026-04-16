'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, ExternalLink } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import contentData from '@/data/content.json'

const categoryLabels: Record<string, string> = {
  'construction-metallique': 'Construction Métallique',
  'menuiserie-aluminium-inox': 'Menuiserie Alu & Inox',
  'systeme-incendie': 'Sécurité Incendie',
  'cloture-metallique': 'Clôture Métallique',
  'installation-machines-industrielles': 'Installation Machines',
  'travaux-amenagement': 'Aménagement',
}

export default function RealisationsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const featured = contentData.realisations.filter((r) => r.featured).slice(0, 6)

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <SectionTitle
          label="Réalisations"
          title="Nos projets parlent pour nous"
          subtitle="Chaque photo est une preuve réelle de notre savoir-faire. Découvrez nos réalisations en construction métallique, menuiserie aluminium et aménagement."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((project, i) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] transition-all duration-700 cursor-pointer ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {categoryLabels[project.category] || project.category}
                </span>
              </div>

              {/* Content on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{project.description}</p>
              </div>

              {/* External icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/realisations" className="btn-outline">
            Voir toutes nos réalisations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
