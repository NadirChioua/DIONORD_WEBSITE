import { isStoreConfigured, redis } from '@/lib/store'

export async function GET(_request: Request, { params }: { params: { file: string } }) {
  if (!isStoreConfigured() || !/^[a-z0-9-_]+\.(jpg|png|webp|svg)$/i.test(params.file)) {
    return new Response('Not found', { status: 404 })
  }

  const [type, data] = await redis<(string | null)[]>(['HMGET', `media:${params.file}`, 'type', 'data'])
  if (!type || !data) return new Response('Not found', { status: 404 })

  return new Response(Buffer.from(data, 'base64'), {
    headers: {
      'Content-Type': type,
      // Le nom de fichier est unique : l'image ne change jamais
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      // Empêche tout script contenu dans un SVG de s'exécuter
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
    },
  })
}
