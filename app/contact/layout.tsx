import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Contact & Devis Gratuit 48h – DIONORD Tanger' },
  description:
    'Contactez DIONORD à Tanger pour un devis gratuit sous 48h : construction métallique, clôture et portail, menuiserie aluminium & inox, sécurité incendie, aménagement. Téléphone, WhatsApp ou formulaire.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
