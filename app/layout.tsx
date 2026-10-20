import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import HideOnAdmin from '@/components/layout/HideOnAdmin'
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
import { JsonLd, businessJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'DIONORD',
    'construction métallique Tanger',
    'charpente métallique Tanger',
    'hangar métallique Tanger',
    'clôture métallique Tanger',
    'portail coulissant Tanger',
    'menuiserie aluminium Tanger',
    'garde-corps inox Tanger',
    'sécurité incendie Tanger',
    'installation machines industrielles Tanger',
    'travaux aménagement Tanger',
  ],
  authors: [{ name: 'DIONORD SARL AU' }],
  creator: 'DIONORD SARL AU',
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/images/hero/hero-01-charpente.jpg', width: 1200, height: 800, alt: 'Charpente métallique réalisée par DIONORD à Tanger' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} – ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr-MA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={businessJsonLd()} />
      </head>
      <body>
        <HideOnAdmin>
          <Navbar />
        </HideOnAdmin>
        <main>{children}</main>
        <HideOnAdmin>
          <Footer />
          <WhatsAppButton />
        </HideOnAdmin>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
