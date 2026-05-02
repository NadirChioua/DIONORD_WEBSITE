'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { LogOut, Upload, Trash2, Plus, Save, Eye, GripVertical, ImageIcon, Users, ChevronUp, ChevronDown } from 'lucide-react'

interface SliderImage {
  id: string
  src: string
  alt: string
  title: string
  subtitle: string
}

interface Realisation {
  id: string
  title: string
  description: string
  category: string
  images: string[]
  featured: boolean
}

interface ClientEntry {
  id: string
  name: string
  shortName: string
  logo: string
  type: string
  description: string
  website?: string
  location: string
}

interface ContentData {
  sliderImages: SliderImage[]
  realisations: Realisation[]
  clients: ClientEntry[]
  stats: Record<string, string>
}

const categories = [
  { id: 'construction-metallique', label: 'Construction Métallique' },
  { id: 'menuiserie-aluminium-inox', label: 'Menuiserie Alu & Inox' },
  { id: 'systeme-incendie', label: 'Sécurité Incendie' },
  { id: 'cloture-metallique', label: 'Clôture Métallique' },
  { id: 'installation-machines-industrielles', label: 'Installation Machines' },
  { id: 'travaux-amenagement', label: 'Aménagement' },
]

const emptyClient: Omit<ClientEntry, 'id'> = {
  name: '', shortName: '', logo: '', type: '', description: '', website: '', location: '',
}

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [content, setContent] = useState<ContentData | null>(null)
  const [activeTab, setActiveTab] = useState<'slider' | 'realisations' | 'clients'>('slider')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [uploading, setUploading] = useState(false)
  const [newReal, setNewReal] = useState({ title: '', description: '', category: 'construction-metallique', images: [] as string[], featured: false })
  const [newClient, setNewClient] = useState<Omit<ClientEntry, 'id'>>(emptyClient)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => { if (r.ok) { setIsAuth(true); return r.json() } })
      .then((data) => { if (data) setContent(data) })
      .catch(() => {})
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setIsAuth(true)
      const data = await fetch('/api/admin/content').then((r) => r.json())
      setContent(data)
    } else {
      setAuthError('Mot de passe incorrect')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    setIsAuth(false)
    setContent(null)
  }

  const handleSave = async () => {
    if (!content) return
    setSaving(true)
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })
    setSaving(false)
    setSaveMsg(res.ok ? 'Sauvegardé avec succès !' : 'Erreur de sauvegarde')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (path: string) => void, folder = 'uploads') => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    setUploading(false)
    if (res.ok) {
      const { path } = await res.json()
      onSuccess(path)
    }
    e.target.value = ''
  }

  // Slider helpers
  const removeSliderImage = (id: string) => {
    if (!content) return
    setContent({ ...content, sliderImages: content.sliderImages.filter((s) => s.id !== id) })
  }
  const addSliderImage = (src: string) => {
    if (!content) return
    setContent({ ...content, sliderImages: [...content.sliderImages, { id: Date.now().toString(), src, alt: 'Nouvelle image DIONORD', title: 'Nouveau titre', subtitle: 'Sous-titre' }] })
  }
  const updateSlider = (id: string, field: keyof SliderImage, value: string) => {
    if (!content) return
    setContent({ ...content, sliderImages: content.sliderImages.map((s) => s.id === id ? { ...s, [field]: value } : s) })
  }

  // Realisation helpers
  const removeRealisation = (id: string) => {
    if (!content) return
    setContent({ ...content, realisations: content.realisations.filter((r) => r.id !== id) })
  }
  const addRealisation = () => {
    if (!content || !newReal.title) return
    setContent({ ...content, realisations: [...content.realisations, { id: Date.now().toString(), ...newReal }] })
    setNewReal({ title: '', description: '', category: 'construction-metallique', images: [], featured: false })
  }

  // Client helpers
  const addClient = () => {
    if (!content || !newClient.name) return
    setContent({ ...content, clients: [...(content.clients ?? []), { id: Date.now().toString(), ...newClient }] })
    setNewClient(emptyClient)
  }
  const removeClient = (id: string) => {
    if (!content) return
    setContent({ ...content, clients: content.clients.filter((c) => c.id !== id) })
  }
  const moveClient = (id: string, direction: 'up' | 'down') => {
    if (!content) return
    const list = [...content.clients]
    const idx = list.findIndex((c) => c.id === id)
    if (direction === 'up' && idx > 0) [list[idx - 1], list[idx]] = [list[idx], list[idx - 1]]
    if (direction === 'down' && idx < list.length - 1) [list[idx], list[idx + 1]] = [list[idx + 1], list[idx]]
    setContent({ ...content, clients: list })
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-8">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image src="/images/logo.png" alt="DIONORD" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-brand-blue">Admin DIONORD</h1>
            <p className="text-gray-500 text-sm mt-1">Panneau d&apos;administration</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-blue mb-2">Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red" />
            </div>
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button type="submit" className="btn-primary w-full justify-center">Se connecter</button>
          </form>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image src="/images/logo.png" alt="DIONORD" fill className="object-contain" />
          </div>
          <span className="font-bold">DIONORD – Administration</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <Eye className="w-4 h-4" />Voir le site
          </a>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Tab bar + save */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3">
            {(['slider', 'realisations', 'clients'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === tab ? 'bg-brand-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}>
                {tab === 'slider' ? 'Slider Hero' : tab === 'realisations' ? 'Réalisations' : 'Clients'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {saveMsg && <span className={`text-sm font-medium ${saveMsg.includes('succès') ? 'text-green-600' : 'text-red-500'}`}>{saveMsg}</span>}
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 bg-brand-red text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-brand-red-dark transition-colors disabled:opacity-60 cursor-pointer">
              <Save className="w-4 h-4" />
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>

        {/* ── Slider Tab ─────────────────────────────────────────────────── */}
        {activeTab === 'slider' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-blue">Images du slider hero</h2>
              <label className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-brand-blue/90 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                {uploading ? 'Upload...' : 'Ajouter une image'}
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleUpload(e, addSliderImage)} disabled={uploading} />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {content.sliderImages.map((slide) => (
                <div key={slide.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex gap-5 items-start">
                  <GripVertical className="w-5 h-5 text-gray-300 mt-1 cursor-grab flex-shrink-0" />
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image src={slide.src} alt={slide.alt} fill className="object-cover" sizes="128px" />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Titre</label>
                      <input type="text" value={slide.title}
                        onChange={(e) => updateSlider(slide.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Sous-titre</label>
                      <input type="text" value={slide.subtitle}
                        onChange={(e) => updateSlider(slide.id, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Texte alternatif (SEO)</label>
                      <input type="text" value={slide.alt}
                        onChange={(e) => updateSlider(slide.id, 'alt', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                    </div>
                  </div>
                  <button onClick={() => removeSliderImage(slide.id)}
                    className="w-9 h-9 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center text-red-500 transition-colors cursor-pointer flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Réalisations Tab ───────────────────────────────────────────── */}
        {activeTab === 'realisations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-brand-blue mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-red" />Ajouter une réalisation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Titre *</label>
                  <input type="text" value={newReal.title}
                    onChange={(e) => setNewReal({ ...newReal, title: e.target.value })}
                    placeholder="Titre du projet"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Catégorie</label>
                  <select value={newReal.category}
                    onChange={(e) => setNewReal({ ...newReal, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red bg-white cursor-pointer">
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                  <textarea rows={2} value={newReal.description}
                    onChange={(e) => setNewReal({ ...newReal, description: e.target.value })}
                    placeholder="Description du projet"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red resize-none" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={newReal.featured}
                      onChange={(e) => setNewReal({ ...newReal, featured: e.target.checked })}
                      className="w-4 h-4 accent-brand-red" />
                    <span className="text-sm font-medium text-gray-600">Mettre en avant</span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  {newReal.images.length > 0 && (
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image src={newReal.images[0]} alt="preview" fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-blue border border-brand-blue rounded-lg px-3 py-2 hover:bg-brand-blue/5 transition-colors cursor-pointer">
                    <ImageIcon className="w-4 h-4" />
                    {uploading ? 'Upload...' : 'Image'}
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => handleUpload(e, (path) => setNewReal({ ...newReal, images: [path] }))} />
                  </label>
                </div>
              </div>
              <button onClick={addRealisation} className="mt-4 btn-primary text-sm">
                <Plus className="w-4 h-4" />Ajouter la réalisation
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.realisations.map((real) => (
                <div key={real.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  {real.images[0] && (
                    <div className="relative h-40 bg-gray-100">
                      <Image src={real.images[0]} alt={real.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      {real.featured && (
                        <div className="absolute top-2 left-2 bg-brand-red text-white text-xs px-2 py-0.5 rounded-full font-semibold">En avant</div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-brand-blue">{real.title}</h4>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{real.description}</p>
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full mt-2">
                          {categories.find((c) => c.id === real.category)?.label || real.category}
                        </span>
                      </div>
                      <button onClick={() => removeRealisation(real.id)}
                        className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center text-red-500 flex-shrink-0 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Clients Tab ────────────────────────────────────────────────── */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            {/* Add form */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-brand-blue mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-red" />Ajouter un client
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Nom complet *</label>
                  <input type="text" value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="ex: Groupe Amana"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Nom court</label>
                  <input type="text" value={newClient.shortName}
                    onChange={(e) => setNewClient({ ...newClient, shortName: e.target.value })}
                    placeholder="ex: Amana"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Type / Secteur</label>
                  <input type="text" value={newClient.type}
                    onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
                    placeholder="ex: Promoteur immobilier"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Localisation</label>
                  <input type="text" value={newClient.location}
                    onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
                    placeholder="ex: Tanger"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Site web (optionnel)</label>
                  <input type="url" value={newClient.website}
                    onChange={(e) => setNewClient({ ...newClient, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Logo</label>
                  <div className="flex items-center gap-3">
                    {newClient.logo && (
                      <div className="relative w-16 h-10 rounded overflow-hidden bg-gray-100 border border-gray-200">
                        <Image src={newClient.logo} alt="logo preview" fill className="object-contain p-1" sizes="64px" unoptimized />
                      </div>
                    )}
                    <label className="flex items-center gap-2 text-sm font-medium text-brand-blue border border-brand-blue rounded-lg px-3 py-2 hover:bg-brand-blue/5 transition-colors cursor-pointer">
                      <ImageIcon className="w-4 h-4" />
                      {uploading ? 'Upload...' : 'Logo'}
                      <input type="file" accept="image/*,.svg" className="hidden"
                        onChange={(e) => handleUpload(e, (path) => setNewClient({ ...newClient, logo: path }), 'clients')} />
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Description courte</label>
                  <textarea rows={2} value={newClient.description}
                    onChange={(e) => setNewClient({ ...newClient, description: e.target.value })}
                    placeholder="Courte description du client"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red resize-none" />
                </div>
              </div>
              <button onClick={addClient} className="mt-4 btn-primary text-sm">
                <Plus className="w-4 h-4" />Ajouter le client
              </button>
            </div>

            {/* Client list */}
            <div className="space-y-3">
              <h3 className="font-bold text-brand-blue flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-red" />
                Clients ({(content.clients ?? []).length})
              </h3>
              {(content.clients ?? []).length === 0 ? (
                <div className="text-center py-10 text-gray-400 bg-white rounded-xl border border-gray-100">
                  Aucun client configuré. Les clients affichés sur le site viennent de <code className="text-xs bg-gray-100 px-1 rounded">data/clients.ts</code>.
                </div>
              ) : (
                (content.clients ?? []).map((client, idx) => (
                  <div key={client.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveClient(client.id, 'up')} disabled={idx === 0}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 cursor-pointer">
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      </button>
                      <button onClick={() => moveClient(client.id, 'down')} disabled={idx === (content.clients ?? []).length - 1}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 cursor-pointer">
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                      {client.logo ? (
                        <Image src={client.logo} alt={client.name} fill className="object-contain p-1" sizes="80px" unoptimized={client.logo.endsWith('.svg')} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-brand-blue text-sm truncate">{client.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{client.type} · {client.location}</p>
                      {client.website && (
                        <a href={client.website} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-brand-blue-mid hover:underline truncate block">{client.website}</a>
                      )}
                    </div>
                    <button onClick={() => removeClient(client.id)}
                      className="w-9 h-9 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center text-red-500 transition-colors cursor-pointer flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
