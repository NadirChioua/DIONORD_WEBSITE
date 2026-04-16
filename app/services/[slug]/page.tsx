import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight, Building2, Layers, Settings, Shield, Flame, Paintbrush } from 'lucide-react'
import { services, getServiceBySlug, getRelatedServices } from '@/data/services'
import { getWhatsAppLink, CONTACT } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  Building2, Layers, Settings, Shield, Flame, Paintbrush,
}

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
  }
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const related = getRelatedServices(service.slug, 3)
  const Icon = iconMap[service.icon] || Building2

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 container-custom pb-10 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{service.shortTitle}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-brand-blue-mid text-sm font-semibold mb-1">{service.segment}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                {service.description}
              </p>

              {service.longDescription.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-5">
                  {para}
                </p>
              ))}

              {/* Images */}
              {service.images.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
                  {service.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <Image src={img} alt={`${service.title} – réalisation ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  ))}
                </div>
              )}

              {/* Prestations */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-brand-blue mb-6">Nos prestations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.prestations.map((p, i) => (
                    <div key={i} className="flex items-start gap-3 bg-brand-gray-light p-4 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm font-medium">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why DIONORD */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-brand-blue mb-6">Pourquoi choisir DIONORD ?</h2>
                <ul className="space-y-4">
                  {service.whyDionord.map((w, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-brand-red rounded-full" />
                      </div>
                      <span className="text-gray-600">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For whom */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-brand-blue mb-6">Pour qui ?</h2>
                <div className="flex flex-wrap gap-3">
                  {service.targets.map((t, i) => (
                    <span key={i} className="bg-brand-blue/10 text-brand-blue text-sm font-medium px-4 py-2 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* CTA Card */}
                <div className="bg-brand-blue rounded-2xl p-7 text-white">
                  <h3 className="font-bold text-xl mb-2">Devis gratuit sous 48h</h3>
                  <p className="text-white/70 text-sm mb-6">Partagez votre projet et recevez une estimation détaillée.</p>

                  <a
                    href={getWhatsAppLink(`un devis pour ${service.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] rounded-xl font-semibold text-white hover:bg-[#20BA5A] transition-colors mb-3 cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Devis via WhatsApp
                  </a>

                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-colors text-sm"
                  >
                    Formulaire de contact
                  </Link>

                  <div className="mt-5 pt-5 border-t border-white/10">
                    <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors">
                      <span>{CONTACT.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Ticket info */}
                <div className="bg-brand-gray-light rounded-xl p-5">
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Ticket moyen estimé</div>
                  <div className="text-brand-blue font-bold text-lg">{service.ticketRange}</div>
                  <div className="text-gray-400 text-xs mt-1">Selon l&apos;envergure du projet</div>
                </div>

                {/* Other services */}
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-card">
                  <h4 className="font-bold text-brand-blue mb-4 text-sm uppercase tracking-wide">Services complémentaires</h4>
                  <ul className="space-y-2">
                    {related.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="flex items-center gap-2 text-gray-600 hover:text-brand-red text-sm transition-colors group">
                          <ArrowRight className="w-3 h-3 text-brand-red group-hover:translate-x-0.5 transition-transform" />
                          {s.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
