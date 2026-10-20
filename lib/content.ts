import defaultContent from '@/data/content.json'
import { clients as defaultClients, type Client } from '@/data/clients'
import { isStoreConfigured, redis } from '@/lib/store'

export interface SliderImage {
  id: string
  src: string
  alt: string
  title: string
  subtitle: string
}

export interface Realisation {
  id: string
  title: string
  description: string
  category: string
  images: string[]
  featured: boolean
}

export interface SiteContent {
  sliderImages: SliderImage[]
  realisations: Realisation[]
  clients: Client[]
  stats: Record<string, string>
}

export const CONTENT_KEY = 'site:content'
export const CONTENT_TAG = 'site-content'

function withDefaults(content: Partial<SiteContent> | null): SiteContent {
  const base = defaultContent as unknown as SiteContent
  return {
    sliderImages: content?.sliderImages?.length ? content.sliderImages : base.sliderImages,
    realisations: content?.realisations ?? base.realisations,
    clients: content?.clients?.length ? content.clients : defaultClients,
    stats: { ...base.stats, ...content?.stats },
  }
}

// fresh: lecture directe (admin) ; sinon lecture mise en cache, invalidée à chaque sauvegarde
export async function getContent({ fresh = false } = {}): Promise<SiteContent> {
  if (!isStoreConfigured()) return withDefaults(null)
  try {
    const raw = await redis<string | null>(
      ['GET', CONTENT_KEY],
      fresh ? undefined : { next: { tags: [CONTENT_TAG], revalidate: 3600 } }
    )
    return withDefaults(raw ? JSON.parse(raw) : null)
  } catch (error) {
    console.error('Lecture du contenu impossible, contenu par défaut utilisé', error)
    return withDefaults(null)
  }
}

export async function saveContent(content: SiteContent) {
  await redis(['SET', CONTENT_KEY, JSON.stringify(content)])
}
