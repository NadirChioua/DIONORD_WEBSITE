import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/adminAuth'
import { googleCredentials, googlePost } from '@/lib/googleApis'

export const dynamic = 'force-dynamic'

const GA_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
const GSC_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'
const TRACKED_EVENTS = ['generate_lead', 'whatsapp_click', 'phone_click', 'email_click']

type GaRow = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }
type GaReport = { rows?: GaRow[] }
type GscRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }
type GscReport = { rows?: GscRow[] }

const isoDate = (d: Date) => d.toISOString().slice(0, 10)

async function fetchGa(propertyId: string, days: number) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`
  const dateRanges = [{ startDate: `${days - 1}daysAgo`, endDate: 'today' }]
  const report = (body: object) => googlePost<GaReport>(url, GA_SCOPE, { dateRanges, ...body })
  const top = (dimension: string, metric: string, limit = 10) =>
    report({
      dimensions: [{ name: dimension }],
      metrics: [{ name: metric }],
      orderBys: [{ metric: { metricName: metric }, desc: true }],
      limit,
    }).then((r) => (r.rows ?? []).map((row) => ({ label: row.dimensionValues![0].value, value: Number(row.metricValues![0].value) })))

  const [daily, events, eventsDaily, pages, channels, cities, devices] = await Promise.all([
    report({
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
      limit: 400,
    }),
    report({
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: { filter: { fieldName: 'eventName', inListFilter: { values: TRACKED_EVENTS } } },
    }),
    report({
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'generate_lead' } } },
      limit: 400,
    }),
    top('pagePath', 'screenPageViews'),
    top('sessionDefaultChannelGroup', 'sessions'),
    top('city', 'activeUsers'),
    top('deviceCategory', 'activeUsers', 5),
  ])

  const leadsByDate = new Map((eventsDaily.rows ?? []).map((r) => [r.dimensionValues![0].value, Number(r.metricValues![0].value)]))
  const dailyRows = (daily.rows ?? []).map((r) => {
    const d = r.dimensionValues![0].value
    const [users, sessions, views] = r.metricValues!.map((m) => Number(m.value))
    return { date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`, users, sessions, views, leads: leadsByDate.get(d) ?? 0 }
  })
  const eventTotals = Object.fromEntries(TRACKED_EVENTS.map((e) => [e, 0]))
  for (const r of events.rows ?? []) eventTotals[r.dimensionValues![0].value] = Number(r.metricValues![0].value)

  return {
    totals: {
      users: dailyRows.reduce((s, r) => s + r.users, 0),
      sessions: dailyRows.reduce((s, r) => s + r.sessions, 0),
      views: dailyRows.reduce((s, r) => s + r.views, 0),
      leads: eventTotals.generate_lead,
      whatsapp: eventTotals.whatsapp_click,
      phone: eventTotals.phone_click,
      email: eventTotals.email_click,
    },
    daily: dailyRows,
    pages,
    channels,
    cities,
    devices,
  }
}

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
  const days = [7, 28, 90].includes(requested) ? requested : 28
  const propertyId = process.env.GA4_PROPERTY_ID
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:dionord.com'

  if (!googleCredentials()) {
    return NextResponse.json({ configured: false, days })
  }

  const [ga, gsc] = await Promise.all([
    propertyId ? settle(() => fetchGa(propertyId, days)) : Promise.resolve({ error: 'GA4_PROPERTY_ID non configuré' }),
    settle(() => fetchGsc(siteUrl, days)),
  ])

  return NextResponse.json({ configured: true, days, ga, gsc })
}
