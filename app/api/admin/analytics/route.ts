import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/adminAuth'
import { googleCredentials, googlePost } from '@/lib/googleApis'
import { isStoreConfigured } from '@/lib/store'
import { getStats } from '@/lib/stats'

export const dynamic = 'force-dynamic'

const GSC_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'

type GscRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }
type GscReport = { rows?: GscRow[] }

const isoDate = (d: Date) => d.toISOString().slice(0, 10)

async function fetchGsc(siteUrl: string, days: number) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`
  const end = new Date()
  const start = new Date(end.getTime() - (days - 1) * 86_400_000)
  const query = (dimensions: string[], rowLimit: number) =>
    googlePost<GscReport>(url, GSC_SCOPE, { startDate: isoDate(start), endDate: isoDate(end), dimensions, rowLimit })

  const [daily, queries, pages] = await Promise.all([query(['date'], 500), query(['query'], 20), query(['page'], 10)])
  const dailyRows = (daily.rows ?? []).map((r) => ({ date: r.keys![0], clicks: r.clicks, impressions: r.impressions }))
  const clicks = (daily.rows ?? []).reduce((s, r) => s + r.clicks, 0)
  const impressions = (daily.rows ?? []).reduce((s, r) => s + r.impressions, 0)
  const weightedPosition = (daily.rows ?? []).reduce((s, r) => s + r.position * r.impressions, 0)
  const toRow = (r: GscRow) => ({ label: r.keys![0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })

  return {
    totals: {
      clicks,
      impressions,
      ctr: impressions ? clicks / impressions : 0,
      position: impressions ? weightedPosition / impressions : 0,
    },
    daily: dailyRows,
    queries: (queries.rows ?? []).map(toRow),
    pages: (pages.rows ?? []).map(toRow),
  }
}

async function settle<T>(fn: () => Promise<T>) {
  try {
    return { data: await fn() }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Erreur inconnue' }
  }
}

export async function GET(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const requested = Number(new URL(request.url).searchParams.get('days'))
  const days = [7, 28, 90, 365].includes(requested) ? requested : 28

  const [site, gsc] = await Promise.all([
    isStoreConfigured() ? settle(() => getStats(days)) : Promise.resolve(null),
    // Search Console : uniquement si un compte de service Google est configuré (optionnel)
    googleCredentials() ? settle(() => fetchGsc(process.env.GSC_SITE_URL || 'sc-domain:dionord.com', days)) : Promise.resolve(null),
  ])

  return NextResponse.json({
    days,
    setup: {
      database: isStoreConfigured(),
      email: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
      googleAnalytics: Boolean(process.env.NEXT_PUBLIC_GA_ID),
    },
    site,
    gsc,
  })
}
