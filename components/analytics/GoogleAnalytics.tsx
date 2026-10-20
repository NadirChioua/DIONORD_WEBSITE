'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { GA_ID, trackEvent } from '@/lib/analytics'

// Suit les clics sur WhatsApp, téléphone et email partout sur le site
function useContactClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      const params = { link_url: href, page_path: window.location.pathname }
      if (href.startsWith('https://wa.me/')) trackEvent('whatsapp_click', params)
      else if (href.startsWith('tel:')) trackEvent('phone_click', params)
      else if (href.startsWith('mailto:')) trackEvent('email_click', params)
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
}

export default function GoogleAnalytics() {
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
