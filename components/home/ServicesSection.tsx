'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Building2, Layers, Settings, Shield, Flame, Paintbrush } from 'lucide-react'
import { services } from '@/data/services'
import SectionTitle from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Layers,
  Settings,
  Shield,
  Flame,
  Paintbrush,
}

export default function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="section-padding bg-brand-gray-light" ref={ref}>
      <div className="container-custom">
        <SectionTitle
          label="Nos Services"
          title="6 domaines d'expertise à votre service"
          subtitle="De la construction industrielle à la rénovation résidentielle, DIONORD couvre l'ensemble de vos besoins avec la même rigueur et le même savoir-faire."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Building2
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={cn(
                  'group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-700 flex flex-col',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <Image
                    src={service.heroImage}
                    alt={`${service.title} – DIONORD Tanger`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  {/* Segment badge */}
                  <div className="absolute top-3 right-3">
                    <span className={cn(
                      'text-xs font-bold px-2.5 py-1 rounded-full',
                      service.segment === 'B2B' ? 'bg-brand-blue text-white' :
                      service.segment === 'B2C' ? 'bg-brand-red text-white' :
                      'bg-brand-blue-mid text-white'
                    )}>
                      {service.segment}
                    </span>
                  </div>
                  {/* Icon overlay */}
                  <div className="absolute bottom-3 left-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center" style={{ color: service.color }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-red transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {service.description}
                  </p>

                  <div className="text-xs text-gray-400 mb-4 font-medium">
                    Ticket moyen : {service.ticketRange}
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red group-hover:gap-3 transition-all duration-200">
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link href="/contact" className="btn-primary text-base px-10 py-4">
            Demander un devis gratuit pour votre projet
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
