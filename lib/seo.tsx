import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT, SOCIALS } from '@/lib/constants'
import { services, SERVICE_AREAS, type Service } from '@/data/services'

export const BUSINESS_ID = `${SITE_URL}/#business`

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path === '/' ? '' : path}`
}

const areaServed = SERVICE_AREAS.map((name) => ({ '@type': 'City', name }))

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'GeneralContractor'],
        '@id': BUSINESS_ID,
        name: SITE_NAME,
        alternateName: 'DIONORD',
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: absoluteUrl('/images/logo.png'),
        image: absoluteUrl('/images/hero/hero-01-charpente.jpg'),
        telephone: CONTACT.phone.replace(/\s/g, ''),
        email: CONTACT.email,
        priceRange: '$$',
        currenciesAccepted: 'MAD',
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
          longitude: -5.834,
        },
        areaServed,
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
        sameAs: [SOCIALS.linkedin, SOCIALS.instagram, SOCIALS.facebook],
        knowsAbout: services.flatMap((s) => s.prestations),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services DIONORD',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, url: absoluteUrl(`/services/${s.slug}`) },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'fr-MA',
        publisher: { '@id': BUSINESS_ID },
      },
    ],
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function serviceJsonLd(service: Service) {
  const url = absoluteUrl(`/services/${service.slug}`)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        serviceType: service.shortTitle,
        description: service.description,
        url,
        image: absoluteUrl(service.heroImage),
        provider: { '@id': BUSINESS_ID },
        areaServed,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: service.title,
          itemListElement: service.prestations.map((p) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: p },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: service.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
