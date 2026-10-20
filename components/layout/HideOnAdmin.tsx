'use client'

import { usePathname } from 'next/navigation'

// Masque l'en-tête, le pied de page et le bouton WhatsApp du site public dans /admin
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <>{children}</>
}
