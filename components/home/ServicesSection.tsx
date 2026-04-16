'use client'

import Link from 'next/link'
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
              <div
                key={service.slug}
                className={cn(
                  'card-service group transition-all duration-700',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${service.color}15`, color: service.color }}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-full',
                    service.segment === 'B2B' ? 'bg-brand-blue/10 text-brand-blue' :
                    service.segment === 'B2C' ? 'bg-brand-red/10 text-brand-red' :
                    'bg-brand-blue-mid/10 text-brand-blue-mid'
                  )}>
                    {service.segment}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-brand-blue mb-3 group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                  {service.description}
                </p>

                {/* Ticket range */}
                <div className="text-xs text-gray-400 mb-5 font-medium">
                  Ticket moyen : {service.ticketRange}
                </div>

                {/* CTA */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:gap-3 transition-all duration-200 cursor-pointer"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
