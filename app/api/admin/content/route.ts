import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

function isAuthenticated() {
  const cookieStore = cookies()
  return cookieStore.get('admin_auth')?.value === 'true'
}

const contentPath = path.join(process.cwd(), 'data', 'content.json')

function readContent() {
  const raw = fs.readFileSync(contentPath, 'utf-8')
  return JSON.parse(raw)
}

function writeContent(data: unknown) {
  fs.writeFileSync(contentPath, JSON.stringify(data, null, 2))
}

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  return NextResponse.json(readContent())
}

export async function PUT(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await request.json()
    writeContent(body)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur écriture fichier' }, { status: 500 })
  }
}
