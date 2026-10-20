import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import ClientsSection from '@/components/home/ClientsSection'
import TrustSection from '@/components/home/TrustSection'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title: { absolute: 'DIONORD Tanger – Construction Métallique, Clôture, Aluminium & Incendie' },
  description:
    'DIONORD SARL AU, entreprise à Tanger : construction métallique et hangars, clôtures et portails, menuiserie aluminium & inox, sécurité incendie, installation de machines. Devis gratuit sous 48h.',
  keywords: [
    'DIONORD',
    'entreprise construction métallique Tanger',
    'charpente métallique Tanger',
    'clôture métallique Tanger',
    'menuiserie aluminium Tanger',
    'sécurité incendie Tanger',
    'installation machines industrielles Tanger',
  ],
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <RealisationsSection />
      <ClientsSection />
      <TrustSection />
      <ContactSection />
    </>
  )
}
