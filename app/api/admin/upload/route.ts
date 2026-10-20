import { NextResponse } from 'next/server'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { isAuthenticated } from '@/lib/adminAuth'
import { isStoreConfigured, redis } from '@/lib/store'

const TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
}
// Limite de Vercel pour le corps d'une requête : 4,5 Mo
const MAX_BYTES = 4 * 1024 * 1024

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Aucun fichier reçu' }, { status: 400 })
    }

    const ext = TYPES[file.type]
    if (!ext) {
      return NextResponse.json({ error: 'Type de fichier non autorisé (JPG, PNG, WebP, SVG uniquement)' }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 4 Mo)' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const baseName = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase().slice(0, 40)
    const filename = `${baseName || 'image'}-${crypto.randomBytes(6).toString('hex')}${ext}`

    if (isStoreConfigured()) {
      await redis(['HSET', `media:${filename}`, 'type', file.type, 'data', buffer.toString('base64'), 'created', new Date().toISOString()])
      return NextResponse.json({ success: true, path: `/api/media/${filename}` })
    }

    // Développement local sans base de données : enregistrement dans public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    fs.mkdirSync(uploadDir, { recursive: true })
    fs.writeFileSync(path.join(uploadDir, filename), buffer)
    return NextResponse.json({ success: true, path: `/uploads/${filename}` })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Erreur upload' }, { status: 500 })
  }
}
