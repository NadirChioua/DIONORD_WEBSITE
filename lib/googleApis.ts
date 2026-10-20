import crypto from 'crypto'

// Accès aux API Google (Analytics, Search Console) via un compte de service, sans dépendance externe
const tokenCache = new Map<string, { token: string; exp: number }>()

export function googleCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  return email && key ? { email, key } : null
}

export async function googleAccessToken(scope: string) {
  const creds = googleCredentials()
  if (!creds) throw new Error('Compte de service Google non configuré')

  const cached = tokenCache.get(scope)
  if (cached && cached.exp > Date.now() + 60_000) return cached.token

  const now = Math.floor(Date.now() / 1000)
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: creds.email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(creds.key, 'base64url')

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
    cache: 'no-store',
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`Authentification Google refusée : ${data.error_description || data.error}`)

  tokenCache.set(scope, { token: data.access_token, exp: Date.now() + data.expires_in * 1000 })
  return data.access_token as string
}

export async function googlePost<T>(url: string, scope: string, body: object): Promise<T> {
  const token = await googleAccessToken(scope)
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || `Erreur API Google (${res.status})`)
  return data as T
}
