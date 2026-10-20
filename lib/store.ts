// Base de données Upstash Redis (API REST, sans dépendance).
// Variables créées automatiquement par l'intégration Vercel « Upstash for Redis ».
type Command = (string | number)[]

function config() {
  const env = process.env
  let url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL
  let token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN
  // Préfixe personnalisé choisi dans Vercel (ex. STORAGE_REST_API_URL)
  if (!url || !token) {
    const prefix = Object.keys(env).find((k) => k.endsWith('_REST_API_URL') && env[k.replace(/_URL$/, '_TOKEN')])
    if (prefix) {
      url = env[prefix]
      token = env[prefix.replace(/_URL$/, '_TOKEN')]
    }
  }
  return url && token ? { url: url.replace(/\/$/, ''), token } : null
}

export function isStoreConfigured() {
  return config() !== null
}

async function call(path: string, body: unknown, init?: { next?: NextFetchRequestConfig }) {
  const cfg = config()
  if (!cfg) throw new Error('Base de données non configurée')
  const res = await fetch(`${cfg.url}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...(init?.next ? { next: init.next } : { cache: 'no-store' as const }),
  })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data) throw new Error(`Erreur base de données (${res.status}) ${data?.error ?? ''}`.trim())
  return data
}

export async function redis<T = unknown>(command: Command, init?: { next?: NextFetchRequestConfig }): Promise<T> {
  const data = await call('', command.map(String), init)
  if (data.error) throw new Error(data.error)
  return data.result as T
}

export async function pipeline<T = unknown[]>(commands: Command[]): Promise<T> {
  if (commands.length === 0) return [] as T
  const data: { result?: unknown; error?: string }[] = await call('/pipeline', commands.map((c) => c.map(String)))
  const failed = data.find((d) => d.error)
  if (failed) throw new Error(failed.error)
  return data.map((d) => d.result) as T
}

// Redis renvoie les réponses WITHSCORES / HGETALL sous forme de liste plate [clé, valeur, ...]
export function pairs(flat: unknown): [string, number][] {
  const list = Array.isArray(flat) ? flat : []
  const out: [string, number][] = []
  for (let i = 0; i + 1 < list.length; i += 2) out.push([String(list[i]), Number(list[i + 1])])
  return out
}
