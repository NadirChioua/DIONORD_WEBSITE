import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { isAuthenticated } from '@/lib/adminAuth'
import { getContent, saveContent, CONTENT_TAG, type SiteContent } from '@/lib/content'
import { isStoreConfigured } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  return NextResponse.json(await getContent({ fresh: true }))
}

export async function PUT(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  if (!isStoreConfigured()) {
    return NextResponse.json({ error: 'Base de données non configurée : impossible de sauvegarder' }, { status: 503 })
  }

  try {
    const body = (await request.json()) as SiteContent
    if (!Array.isArray(body.sliderImages) || !Array.isArray(body.realisations) || !Array.isArray(body.clients)) {
      return NextResponse.json({ error: 'Contenu invalide' }, { status: 400 })
    }
    await saveContent({
      sliderImages: body.sliderImages,
      realisations: body.realisations,
      clients: body.clients,
      stats: body.stats ?? {},
    })
    // Le site affiche immédiatement le nouveau contenu
    revalidateTag(CONTENT_TAG)
    revalidatePath('/')
    revalidatePath('/realisations')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sauvegarde du contenu impossible', error)
    return NextResponse.json({ error: 'Erreur de sauvegarde' }, { status: 500 })
  }
}
