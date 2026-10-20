import crypto from 'crypto'
import { pairs, pipeline } from '@/lib/store'

// Statistiques du site enregistrées par le site lui-même (sans cookie, visiteurs anonymisés)
export const TRACKED_EVENTS = ['whatsapp_click', 'phone_click', 'email_click', 'generate_lead'] as const
export type TrackedEvent = (typeof TRACKED_EVENTS)[number]

const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|node-fetch|axios/i

export function isBot(userAgent: string) {
  return !userAgent || BOT_UA.test(userAgent)
}

export function dayKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Casablanca' }).format(date)
}

const key = (day: string, name: string) => `stats:${day}:${name}`

function device(userAgent: string) {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(userAgent)) return 'Tablette'
  if (/mobi|iphone|android/i.test(userAgent)) return 'Mobile'
  return 'Ordinateur'
}

function source(referrer: string, siteHost: string) {
  if (!referrer) return 'Accès direct'
  let host: string
  try {
    host = new URL(referrer).hostname.replace(/^www\./, '')
  } catch {
    return 'Accès direct'
  }
  if (!host || host === siteHost.replace(/^www\./, '')) return 'Accès direct'
  if (/(^|\.)google\./.test(host)) return 'Google'
  if (/(^|\.)bing\.com$/.test(host)) return 'Bing'
  if (/(^|\.)(facebook\.com|fb\.com|fb\.me)$/.test(host)) return 'Facebook'
  if (/(^|\.)instagram\.com$/.test(host)) return 'Instagram'
  if (/(^|\.)(linkedin\.com|lnkd\.in)$/.test(host)) return 'LinkedIn'
  if (/(^|\.)(whatsapp\.com|wa\.me)$/.test(host)) return 'WhatsApp'
  if (/(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com)$/.test(host)) return 'Assistants IA'
  return host
}

export async function recordPageview(input: {
  path: string
  referrer: string
  userAgent: string
  ip: string
  country: string
  city: string
  siteHost: string
  newVisit: boolean
}) {
  const day = dayKey()
  const visitor = crypto
    .createHash('sha256')
    .update(`${day}|${input.ip}|${input.userAgent}|${process.env.ADMIN_PASSWORD ?? 'dionord'}`)
    .digest('hex')
    .slice(0, 20)

  const commands: (string | number)[][] = [
    ['INCR', key(day, 'views')],
    ['PFADD', key(day, 'visitors'), visitor],
    ['ZINCRBY', key(day, 'pages'), 1, input.path],
    ['HINCRBY', key(day, 'devices'), device(input.userAgent), 1],
  ]
  if (input.newVisit) {
    commands.push(
      ['INCR', key(day, 'visits')],
      ['ZINCRBY', key(day, 'sources'), 1, source(input.referrer, input.siteHost)],
      ['ZINCRBY', key(day, 'countries'), 1, input.country || 'Inconnu'],
      ['ZINCRBY', key(day, 'cities'), 1, input.city || 'Inconnue'],
    )
  }
  await pipeline(commands)
}

export async function recordEvent(name: TrackedEvent) {
  await pipeline([['HINCRBY', key(dayKey(), 'events'), name, 1]])
}

export async function getStats(days: number) {
  const dates = Array.from({ length: days }, (_, i) => dayKey(new Date(Date.now() - (days - 1 - i) * 86_400_000)))
  const perDay = ['views', 'visits'] as const
  const ranked = ['pages', 'sources', 'countries', 'cities'] as const

  const commands: (string | number)[][] = []
  for (const d of dates) {
    for (const m of perDay) commands.push(['GET', key(d, m)])
    commands.push(['PFCOUNT', key(d, 'visitors')])
    commands.push(['HGETALL', key(d, 'events')])
    commands.push(['HGETALL', key(d, 'devices')])
    for (const r of ranked) commands.push(['ZRANGE', key(d, r), 0, -1, 'WITHSCORES'])
  }
  commands.push(['PFCOUNT', ...dates.map((d) => key(d, 'visitors'))])

  const results = await pipeline<unknown[]>(commands)
  const per = perDay.length + 3 + ranked.length
  const sum = (target: Map<string, number>, entries: [string, number][]) => {
    for (const [k, v] of entries) target.set(k, (target.get(k) ?? 0) + v)
  }
  const top = (m: Map<string, number>, limit = 10) =>
    Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([label, value]) => ({ label, value }))

  const events = new Map<string, number>()
  const devices = new Map<string, number>()
  const rankedTotals = Object.fromEntries(ranked.map((r) => [r, new Map<string, number>()])) as Record<(typeof ranked)[number], Map<string, number>>

  const daily = dates.map((date, i) => {
    const r = results.slice(i * per, (i + 1) * per)
    const dayEvents = pairs(r[3])
    sum(events, dayEvents)
    sum(devices, pairs(r[4]))
    ranked.forEach((name, j) => sum(rankedTotals[name], pairs(r[5 + j])))
    return {
      date,
      views: Number(r[0] ?? 0),
      visits: Number(r[1] ?? 0),
      visitors: Number(r[2] ?? 0),
      leads: dayEvents.find(([k]) => k === 'generate_lead')?.[1] ?? 0,
    }
  })

  const eventTotal = (name: TrackedEvent) => events.get(name) ?? 0
  return {
    totals: {
      visitors: Number(results[results.length - 1] ?? 0),
      visits: daily.reduce((s, d) => s + d.visits, 0),
      views: daily.reduce((s, d) => s + d.views, 0),
      leads: eventTotal('generate_lead'),
      whatsapp: eventTotal('whatsapp_click'),
      phone: eventTotal('phone_click'),
      email: eventTotal('email_click'),
    },
    daily,
    pages: top(rankedTotals.pages),
    sources: top(rankedTotals.sources),
    countries: top(rankedTotals.countries),
    cities: top(rankedTotals.cities),
    devices: top(devices, 5),
  }
}
