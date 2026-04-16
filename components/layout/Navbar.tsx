'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { services } from '@/data/services'
import { getWhatsAppLink, CONTACT } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/images/logo.png"
                alt="DIONORD SARL AU"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg leading-tight">DIONORD</div>
              <div className="text-brand-blue-mid text-xs leading-tight">Confiance & Savoir Faire</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10">
              Accueil
            </Link>

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="flex items-center gap-1 text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 cursor-pointer">
                Services
                <ChevronDown className={cn('w-4 h-4 transition-transform', servicesOpen && 'rotate-180')} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className="w-2 h-2 rounded-full bg-brand-red mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <div>
                        <div className="text-sm font-semibold text-brand-blue group-hover:text-brand-red transition-colors">{service.shortTitle}</div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{service.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/realisations" className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10">
              Réalisations
            </Link>
            <Link href="/a-propos" className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10">
              À propos
            </Link>
            <Link href="/contact" className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10">
              Contact
            </Link>
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{CONTACT.phone}</span>
            </a>
            <Link href="/contact" className="btn-primary text-sm">
              Devis gratuit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-brand-dark border-t border-white/10">
          <div className="container-custom py-4 flex flex-col gap-1">
            <Link href="/" className="text-white/90 px-4 py-3 rounded-lg hover:bg-white/10 font-medium" onClick={() => setIsOpen(false)}>
              Accueil
            </Link>

            <div className="px-4 py-2">
              <div className="text-white/50 text-xs uppercase tracking-wider mb-2 font-semibold">Nos Services</div>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-2 text-white/80 py-2 hover:text-white transition-colors text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                  {s.shortTitle}
                </Link>
              ))}
            </div>

            <Link href="/realisations" className="text-white/90 px-4 py-3 rounded-lg hover:bg-white/10 font-medium" onClick={() => setIsOpen(false)}>
              Réalisations
            </Link>
            <Link href="/a-propos" className="text-white/90 px-4 py-3 rounded-lg hover:bg-white/10 font-medium" onClick={() => setIsOpen(false)}>
              À propos
            </Link>
            <Link href="/contact" className="text-white/90 px-4 py-3 rounded-lg hover:bg-white/10 font-medium" onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-3">
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 text-white/80 px-4 text-sm">
                <Phone className="w-4 h-4" />
                {CONTACT.phone}
              </a>
              <Link href="/contact" className="btn-primary mx-4 justify-center" onClick={() => setIsOpen(false)}>
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
