'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { getWhatsAppLink, CONTACT } from '@/lib/constants'

const slides = [
  {
    src: '/images/realisations/charpente-construction.jpg',
    alt: 'Charpente métallique industrielle – DIONORD Tanger',
    title: 'Construction Métallique',
    sub: 'Structures industrielles sur mesure',
  },
  {
    src: '/images/realisations/charpente-interieur.jpg',
    alt: 'Hangar métallique vue intérieure – DIONORD',
    title: 'Hangars Industriels',
    sub: 'Grande portée, haute qualité',
  },
  {
    src: '/images/realisations/fabrication-atelier.jpg',
    alt: 'Fabrication métallique en atelier – DIONORD',
    title: 'Atelier de Fabrication',
    sub: 'Savoir-faire artisanal et technique',
  },
  {
    src: '/images/realisations/garde-corps-inox.jpg',
    alt: 'Garde-corps inox – DIONORD',
    title: 'Menuiserie Inox & Aluminium',
    sub: 'Finitions premium sur mesure',
  },
  {
    src: '/images/realisations/cloisons-vitrees.jpg',
    alt: 'Cloisons vitrées de bureau – DIONORD',
    title: 'Aménagement Professionnel',
    sub: 'Espaces de travail élégants',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'bg-white w-8' : 'bg-white/40 w-4 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom w-full">
        <div className="max-w-3xl">
          {/* Logo + Badge */}
          <div
            className={`flex items-center gap-4 mb-8 transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl">
              <Image src="/images/logo.png" alt="DIONORD SARL AU" fill className="object-contain" priority />
            </div>
            <div>
              <div className="text-white/60 text-sm font-medium tracking-widest uppercase mb-1">
                {slides[current].title}
              </div>
              <div className="text-white/40 text-xs">{slides[current].sub}</div>
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 transition-all duration-1000 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            DIONORD
            <br />
            <span className="text-brand-red">SARL AU</span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-white/80 font-light mb-3 transition-all duration-1000 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Confiance & Savoir Faire
          </p>

          <p
            className={`text-base md:text-lg text-white/60 mb-10 transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Construction métallique • Menuiserie aluminium & inox
            <br />
            Sécurité incendie • Aménagement
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BA5A] transition-all duration-200 text-base cursor-pointer shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Phone */}
          <div
            className={`mt-6 transition-all duration-1000 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a href={`tel:${CONTACT.phone}`} className="text-white/50 hover:text-white text-sm transition-colors">
              Tél : {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-white/20" />
        <ChevronDown className="w-4 h-4 text-white/40 animate-bounce" />
      </div>
    </section>
  )
}
