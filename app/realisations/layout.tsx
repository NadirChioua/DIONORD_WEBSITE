import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réalisations – Portfolio DIONORD Tanger',
  description:
    'Découvrez nos réalisations en construction métallique, menuiserie aluminium & inox, sécurité incendie et aménagement à Tanger. Photos réelles de nos projets industriels et résidentiels.',
  keywords: [
    'réalisations construction métallique Tanger',
    'portfolio menuiserie aluminium Maroc',
    'charpente métallique réalisations',
    'garde-corps inox Tanger',
    'hangar métallique réalisé',
  ],
  openGraph: {
    title: 'Réalisations DIONORD – Construction Métallique & Menuiserie Aluminium Tanger',
    description: 'Portfolio complet de nos projets industriels et résidentiels à Tanger et région Nord Maroc.',
    images: [{ url: '/images/realisations/charpente-construction.jpg' }],
  },
}

export default function RealisationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
