import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

function isAuthenticated() {
  const cookieStore = cookies()
  return cookieStore.get('admin_auth')?.value === 'true'
}

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé (JPG, PNG, WebP uniquement)' }, { status: 400 })
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 10MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize filename
    const ext = path.extname(file.name).toLowerCase()
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase()
    const filename = `${baseName}-${Date.now()}${ext}`

    const uploadDir = path.join(process.cwd(), 'public', folder)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, filename)
    fs.writeFileSync(filePath, buffer)

    const publicPath = `/${folder}/${filename}`
    return NextResponse.json({ success: true, path: publicPath })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Erreur upload' }, { status: 500 })
  }
}
