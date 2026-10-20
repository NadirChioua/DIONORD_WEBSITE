'use client'

import { useEffect, useState } from 'react'
import { Users, MousePointerClick, Eye, FileText, MessageCircle, Phone, Search, TrendingUp, RefreshCw, AlertTriangle } from 'lucide-react'

type Item = { label: string; value: number }
type GscItem = { label: string; clicks: number; impressions: number; ctr: number; position: number }

interface SiteData {
  totals: { visitors: number; visits: number; views: number; leads: number; whatsapp: number; phone: number; email: number }
  daily: { date: string; views: number; visits: number; visitors: number; leads: number }[]
  pages: Item[]
  sources: Item[]
  countries: Item[]
  cities: Item[]
  devices: Item[]
}

interface GscData {
  totals: { clicks: number; impressions: number; ctr: number; position: number }
  daily: { date: string; clicks: number; impressions: number }[]
  queries: GscItem[]
  pages: GscItem[]
}

type Result<T> = { data?: T; error?: string } | null
interface AnalyticsResponse {
  days: number
  setup: { database: boolean; email: boolean; googleAnalytics: boolean }
  site: Result<SiteData>
  gsc: Result<GscData>
}

const PERIODS = [7, 28, 90, 365] as const


const COUNTRY_LABELS: Record<string, string> = {
  MA: 'Maroc', FR: 'France', ES: 'Espagne', BE: 'Belgique', NL: 'Pays-Bas', DE: 'Allemagne', IT: 'Italie',
  PT: 'Portugal', GB: 'Royaume-Uni', US: 'États-Unis', CA: 'Canada', DZ: 'Algérie', TN: 'Tunisie', TR: 'Turquie',
}

const nf = new Intl.NumberFormat('fr-FR')
const fmt = (n: number) => nf.format(Math.round(n))
const pct = (n: number) => `${(n * 100).toFixed(1).replace('.', ',')} %`
const shortDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })

function StatTile({ icon: Icon, label, value, hint }: { icon: React.ElementType; label: string; value: string; hint?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <div className="text-2xl font-bold text-brand-blue">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  )
}

// Courbe simple, une seule série, avec infobulle au survol
function LineChart({ title, points, unit }: { title: string; points: { date: string; value: number }[]; unit: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 640
  const H = 180
  const pad = { l: 36, r: 12, t: 12, b: 24 }
  const max = Math.max(1, ...points.map((p) => p.value))
  const x = (i: number) => pad.l + (points.length < 2 ? 0 : (i / (points.length - 1)) * (W - pad.l - pad.r))
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b)
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ')
  const ticks = [0, Math.round(max / 2), max]
  const labelEvery = Math.max(1, Math.ceil(points.length / 6))

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const i = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (points.length - 1))
    setHover(Math.min(points.length - 1, Math.max(0, i)))
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-bold text-brand-blue text-sm mb-3">{title}</h3>
      {points.length === 0 ? (
        <p className="text-gray-400 text-sm py-10 text-center">Pas encore de données sur cette période.</p>
      ) : (
        <div className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" onMouseMove={onMove} onMouseLeave={() => setHover(null)} role="img" aria-label={title}>
            {ticks.map((t) => (
              <g key={t}>
                <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#E5E7EB" strokeWidth={1} />
                <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" fontSize={10} fill="#9CA3AF">{fmt(t)}</text>
              </g>
            ))}
            {points.map((p, i) =>
              i % labelEvery === 0 ? (
                <text key={p.date} x={x(i)} y={H - 6} textAnchor="middle" fontSize={10} fill="#9CA3AF">{shortDate(p.date)}</text>
              ) : null
            )}
            <path d={path} fill="none" stroke="#1B3A5C" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {hover !== null && (
              <g>
                <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} stroke="#9CA3AF" strokeDasharray="3 3" />
                <circle cx={x(hover)} cy={y(points[hover].value)} r={5} fill="#1B3A5C" stroke="white" strokeWidth={2} />
              </g>
            )}
          </svg>
          {hover !== null && (
            <div
              className="absolute top-0 pointer-events-none bg-brand-dark text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
              style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > points.length / 2 ? '-105%' : '5%'})` }}
            >
              <div className="text-white/60">{shortDate(points[hover].date)}</div>
              <div className="font-semibold">{fmt(points[hover].value)} {unit}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function BarList({ title, items, unit, labels }: { title: string; items: Item[]; unit: string; labels?: Record<string, string> }) {
  const max = Math.max(1, ...items.map((i) => i.value))
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-bold text-brand-blue text-sm mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm">Pas encore de données.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.label} className="relative" title={`${fmt(item.value)} ${unit}`}>
              <div className="absolute inset-y-0 left-0 bg-brand-blue/10 rounded" style={{ width: `${(item.value / max) * 100}%` }} />
              <div className="relative flex items-center justify-between gap-3 px-2 py-1.5 text-sm">
                <span className="text-gray-700 truncate">{labels?.[item.label] ?? (item.label || '(non défini)')}</span>
                <span className="text-gray-900 font-semibold tabular-nums">{fmt(item.value)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function GscTable({ title, rows, firstColumn }: { title: string; rows: GscItem[]; firstColumn: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-x-auto">
      <h3 className="font-bold text-brand-blue text-sm mb-4">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-gray-400 text-sm">Pas encore de données.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
              <th className="py-2 pr-3 font-semibold">{firstColumn}</th>
              <th className="py-2 px-2 font-semibold text-right">Clics</th>
              <th className="py-2 px-2 font-semibold text-right">Impressions</th>
              <th className="py-2 px-2 font-semibold text-right">CTR</th>
              <th className="py-2 pl-2 font-semibold text-right">Position</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-gray-50 last:border-0">
                <td className="py-2 pr-3 text-gray-700 max-w-[280px] truncate" title={r.label}>
                  {r.label.replace(/^https?:\/\/(www\.)?dionord\.com/, '') || '/'}
                </td>
                <td className="py-2 px-2 text-right tabular-nums font-semibold">{fmt(r.clicks)}</td>
                <td className="py-2 px-2 text-right tabular-nums">{fmt(r.impressions)}</td>
                <td className="py-2 px-2 text-right tabular-nums">{pct(r.ctr)}</td>
                <td className="py-2 pl-2 text-right tabular-nums">{r.position.toFixed(1).replace('.', ',')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function ErrorBox({ source, message }: { source: string; message: string }) {
  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-sm">
      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-semibold">{source} : données indisponibles</div>
        <div className="mt-1 break-words">{message}</div>
      </div>
    </div>
  )
}

function SetupStatus({ setup }: { setup: AnalyticsResponse['setup'] }) {
  const items = [
    { ok: setup.database, label: 'Base de données', help: 'Vercel → Storage → Upstash for Redis → Connect Project' },
    { ok: setup.email, label: 'Envoi des emails', help: 'Variables SMTP_HOST, SMTP_USER, SMTP_PASS dans Vercel' },
    { ok: setup.googleAnalytics, label: 'Google Analytics', help: 'Variable NEXT_PUBLIC_GA_ID dans Vercel' },
  ]
  if (items.every((i) => i.ok)) return null
  return (
    <div className="bg-white rounded-xl border border-amber-200 p-5 text-sm">
      <h3 className="font-bold text-brand-blue mb-3">Configuration</h3>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.label} className="flex items-start gap-2">
            <span className={`font-bold ${i.ok ? 'text-green-600' : 'text-red-500'}`}>{i.ok ? '✓' : '✗'}</span>
            <span>
              <span className="font-semibold text-gray-800">{i.label}</span>
              {!i.ok && <span className="text-gray-500"> — {i.help}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AnalyticsDashboard() {
  const [days, setDays] = useState<(typeof PERIODS)[number]>(28)
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`/api/admin/analytics?days=${days}`)
      .then((r) => r.json())
      .then((json) => { if (!cancelled) setData(json) })
      .catch(() => { if (!cancelled) setData(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [days, reloadKey])

  const site = data?.site?.data
  const gsc = data?.gsc?.data

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setDays(p)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                days === p ? 'bg-brand-blue text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}>
              {p === 365 ? '1 an' : `${p} jours`}
            </button>
          ))}
        </div>
        <button onClick={() => setReloadKey((k) => k + 1)} disabled={loading}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-blue cursor-pointer disabled:opacity-50">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </button>
      </div>

      {loading && !data && <div className="text-gray-400 text-center py-16">Chargement des statistiques...</div>}
      {!loading && !data && <ErrorBox source="Statistiques" message="Impossible de charger les données. Réessayez." />}
      {data?.setup && <SetupStatus setup={data.setup} />}

      {data && (
        <>
          {data.site?.error && <ErrorBox source="Statistiques du site" message={data.site.error} />}

          {/* Demandes clients */}
          {site && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-brand-blue">Demandes clients</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatTile icon={FileText} label="Formulaires envoyés" value={fmt(site.totals.leads)} hint="Détail dans l'onglet Demandes" />
                <StatTile icon={MessageCircle} label="Clics WhatsApp" value={fmt(site.totals.whatsapp)} />
                <StatTile icon={Phone} label="Clics téléphone" value={fmt(site.totals.phone)} />
                <StatTile icon={MousePointerClick} label="Clics email" value={fmt(site.totals.email)} />
              </div>
            </section>
          )}

          {/* Visiteurs */}
          {site && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-brand-blue">Visiteurs du site</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatTile icon={Users} label="Visiteurs" value={fmt(site.totals.visitors)} hint="Personnes différentes" />
                <StatTile icon={TrendingUp} label="Visites" value={fmt(site.totals.visits)} />
                <StatTile icon={Eye} label="Pages vues" value={fmt(site.totals.views)} />
              </div>
              <LineChart title="Visiteurs par jour" unit="visiteurs" points={site.daily.map((d) => ({ date: d.date, value: d.visitors }))} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <BarList title="D'où viennent les visiteurs" items={site.sources} unit="visites" />
                <BarList title="Pages les plus vues" items={site.pages} unit="vues" />
                <BarList title="Villes" items={site.cities} unit="visites" />
                <BarList title="Pays" items={site.countries} unit="visites" labels={COUNTRY_LABELS} />
                <BarList title="Appareils" items={site.devices} unit="pages vues" />
              </div>
            </section>
          )}

          {/* Google */}
          {data.gsc && <section className="space-y-3">
            <h2 className="text-lg font-bold text-brand-blue">Présence sur Google</h2>
            {data.gsc?.error ? (
              <ErrorBox source="Search Console" message={data.gsc.error} />
            ) : gsc && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <StatTile icon={MousePointerClick} label="Clics depuis Google" value={fmt(gsc.totals.clicks)} />
                  <StatTile icon={Search} label="Impressions" value={fmt(gsc.totals.impressions)} hint="Affichages dans les résultats" />
                  <StatTile icon={TrendingUp} label="Taux de clic" value={pct(gsc.totals.ctr)} />
                  <StatTile icon={Eye} label="Position moyenne" value={gsc.totals.position.toFixed(1).replace('.', ',')} hint="1 = première place" />
                </div>
                <LineChart title="Affichages dans Google par jour" unit="impressions" points={gsc.daily.map((d) => ({ date: d.date, value: d.impressions }))} />
                <GscTable title="Recherches qui affichent le site" rows={gsc.queries} firstColumn="Recherche" />
                <GscTable title="Pages affichées dans Google" rows={gsc.pages} firstColumn="Page" />
                <p className="text-xs text-gray-400">Les données Google Search Console ont 2 à 3 jours de décalage.</p>
              </>
            )}
          </section>}
        </>
      )}
    </div>
  )
}
