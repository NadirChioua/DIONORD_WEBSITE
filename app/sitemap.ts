import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const lastModified = new Date()

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: s.priority === 'high' ? 0.9 : 0.8,
  }))

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    ...serviceRoutes,
    { url: `${baseUrl}/realisations`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/a-propos`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
