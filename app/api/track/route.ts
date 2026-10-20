import { isStoreConfigured } from '@/lib/store'
import { isBot, recordEvent, recordPageview } from '@/lib/stats'

export const dynamic = 'force-dynamic'

const CLIENT_EVENTS = new Set(['whatsapp_click', 'phone_click', 'email_click'])
const done = () => new Response(null, { status: 204 })

export async function POST(request: Request) {
  if (!isStoreConfigured()) return done()

  const userAgent = request.headers.get('user-agent') ?? ''
  if (isBot(userAgent)) return done()

  let body: { type?: string; path?: string; referrer?: string; newVisit?: boolean; name?: string }
  try {
    body = JSON.parse(await request.text())
  } catch {
    return done()
  }

  try {
    if (body.type === 'pageview' && typeof body.path === 'string' && body.path.startsWith('/') && !body.path.startsWith('/admin')) {
      const city = request.headers.get('x-vercel-ip-city')
      await recordPageview({
        path: body.path.split('?')[0].slice(0, 200),
        referrer: typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : '',
        userAgent,
        ip: request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '',
        country: request.headers.get('x-vercel-ip-country') ?? '',
        city: city ? decodeURIComponent(city) : '',
        siteHost: request.headers.get('host') ?? '',
        newVisit: body.newVisit === true,
      })
    } else if (body.type === 'event' && typeof body.name === 'string' && CLIENT_EVENTS.has(body.name)) {
      await recordEvent(body.name as 'whatsapp_click' | 'phone_click' | 'email_click')
    }
  } catch (error) {
    console.error('Tracking error', error)
  }
  return done()
}
