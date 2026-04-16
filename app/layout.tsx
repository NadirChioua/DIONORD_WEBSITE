import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL('https://dionord.ma'),
  title: {
    default: `${SITE_NAME} – ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['construction métallique Tanger', 'menuiserie aluminium Tanger', 'DIONORD', 'charpente métallique Maroc', 'sécurité incendie Tanger'],
  authors: [{ name: 'DIONORD SARL AU' }],
  creator: 'DIONORD SARL AU',
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://dionord.ma',
    siteName: SITE_NAME,
    title: `${SITE_NAME} – ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} – ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'DIONORD SARL AU',
              description: SITE_DESCRIPTION,
              url: 'https://dionord.ma',
              telephone: '+212-5XX-XX-XX-XX',
              email: 'contact@dionord.ma',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Zone Industrielle',
                addressLocality: 'Tanger',
                addressRegion: 'Tanger-Tétouan-Al Hoceima',
                addressCountry: 'MA',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 35.7595,
                longitude: -5.8340,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '08:00',
                  closes: '13:00',
                },
              ],
              sameAs: [],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Services DIONORD',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Métallique' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Menuiserie Aluminium & Inox' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Installation Systèmes Incendie' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Travaux Aménagement' } },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
