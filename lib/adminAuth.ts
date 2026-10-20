import crypto from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'admin_session'
const SESSION_SECONDS = 60 * 60 * 24 // 24h

// La clé de signature dépend du mot de passe : changer ADMIN_PASSWORD déconnecte toutes les sessions
function secret() {
  const base = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  return base ? `dionord-admin:${base}` : null
}

function sign(value: string, key: string) {
  return crypto.createHmac('sha256', key).update(value).digest('base64url')
}

function safeEqual(a: string, b: string) {
  const ha = crypto.createHash('sha256').update(a).digest()
  const hb = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export function isPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD)
}

export function checkPassword(password: unknown) {
  const expected = process.env.ADMIN_PASSWORD
  return Boolean(expected) && typeof password === 'string' && safeEqual(password, expected as string)
}

export function createSessionToken() {
  const key = secret()
  if (!key) throw new Error('ADMIN_PASSWORD non configuré')
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS)
  return { token: `${exp}.${sign(exp, key)}`, maxAge: SESSION_SECONDS }
}

export function isAuthenticated() {
  const key = secret()
  const token = cookies().get(ADMIN_COOKIE)?.value
  if (!key || !token) return false
  const [exp, signature] = token.split('.')
  if (!exp || !signature || Number(exp) < Date.now() / 1000) return false
  return safeEqual(signature, sign(exp, key))
}
