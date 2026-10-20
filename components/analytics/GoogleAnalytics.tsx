'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { GA_ID, trackEvent } from '@/lib/analytics'

// Envoi vers les statistiques internes du site (affichées dans /admin)
function sendToSite(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify(payload)
    if (!navigator.sendBeacon?.('/api/v', new Blob([body], { type: 'text/plain' }))) {
      fetch('/api/v', { method: 'POST', body, keepalive: true }).catch(() => {})
    }
  } catch {}
}

function isNewVisit() {
  try {
    if (sessionStorage.getItem('dionord_visit')) return false
    sessionStorage.setItem('dionord_visit', '1')
    return true
  } catch {
    return false
  }
}

function usePageviewTracking() {
  const pathname = usePathname()
  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return
    const newVisit = isNewVisit()
    sendToSite({ type: 'pageview', path: pathname, referrer: newVisit ? document.referrer : '', newVisit })
  }, [pathname])
}

// Suit les clics sur WhatsApp, téléphone et email partout sur le site
function useContactClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (window.location.pathname.startsWith('/admin')) return
      const link = (e.target as HTMLElement | null)?.closest?.('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      const params = { link_url: href, page_path: window.location.pathname }
      const name = href.startsWith('https://wa.me/')
        ? 'whatsapp_click'
        : href.startsWith('tel:')
          ? 'phone_click'
          : href.startsWith('mailto:')
            ? 'email_click'
            : null
      if (!name) return
      trackEvent(name, params)
      sendToSite({ type: 'event', name })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
}

export default function GoogleAnalytics() {
  usePageviewTracking()
  useContactClickTracking()

  if (!GA_ID) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
