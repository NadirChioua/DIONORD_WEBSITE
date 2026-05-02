import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import ClientsSection from '@/components/home/ClientsSection'
import TrustSection from '@/components/home/TrustSection'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title: 'DIONORD SARL AU – Construction Métallique & Menuiserie Aluminium Tanger',
  description:
    'DIONORD SARL AU – Expert en construction métallique, menuiserie aluminium & inox, systèmes incendie et aménagement à Tanger, Maroc. Devis gratuit sous 48h.',
  keywords: ['construction métallique Tanger', 'menuiserie aluminium Tanger', 'DIONORD', 'charpente métallique Maroc'],
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
