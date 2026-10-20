import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import ClientsSection from '@/components/home/ClientsSection'
import TrustSection from '@/components/home/TrustSection'
import ContactSection from '@/components/home/ContactSection'
import { getContent } from '@/lib/content'

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

// Régénérée à chaque sauvegarde dans l'admin (et au plus tard toutes les heures)
export const revalidate = 3600

export default async function HomePage() {
  const content = await getContent()

  return (
    <>
      <HeroSection slides={content.sliderImages} />
      <AboutSection />
      <ServicesSection />
      <RealisationsSection realisations={content.realisations} />
      <ClientsSection clients={content.clients} />
      <TrustSection />
      <ContactSection />
    </>
  )
}
