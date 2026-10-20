import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, checkPassword, createSessionToken, isPasswordConfigured } from '@/lib/adminAuth'

export async function POST(request: Request) {
  try {
    if (!isPasswordConfigured()) {
      return NextResponse.json({ error: 'ADMIN_PASSWORD non configuré sur le serveur' }, { status: 503 })
    }

    const { password } = await request.json()
    if (!checkPassword(password)) {
      // Ralentit les tentatives de force brute
      await new Promise((r) => setTimeout(r, 800))
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
    }

    const { token, maxAge } = createSessionToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      sameSite: 'strict',
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(ADMIN_COOKIE)
  response.cookies.delete('admin_auth')
  return response
}
