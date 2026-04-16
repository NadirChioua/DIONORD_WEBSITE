export const SITE_NAME = 'DIONORD SARL AU'
export const SITE_TAGLINE = 'Confiance & Savoir Faire'
export const SITE_DESCRIPTION =
  'DIONORD SARL AU – Construction métallique, menuiserie aluminium & inox, systèmes de sécurité incendie et travaux d\'aménagement à Tanger, Maroc.'

export const CONTACT = {
  address: 'Zone Industrielle, Tanger, Maroc',
  phone: '+212 669 820 191',
  whatsapp: '33749389103',
  whatsappDisplay: '+33 7 49 38 91 03',
  email: 'contact@dionord.ma',
  hours: {
    weekdays: 'Lundi – Vendredi : 8h00 – 18h00',
    saturday: 'Samedi : 8h00 – 13h00',
  },
}

export const SOCIALS = {
  linkedin: '#',
  facebook: '#',
  instagram: '#',
}

export const COLORS = {
  red: '#C0392B',
  redDark: '#A93226',
  blue: '#1B3A5C',
  blueMid: '#2E75B6',
  dark: '#1A1A2E',
}

export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Bonjour DIONORD, je souhaite obtenir un devis pour '
)

export function getWhatsAppLink(message?: string) {
  const msg = message ? encodeURIComponent(message) : WHATSAPP_MESSAGE
  return `https://wa.me/${CONTACT.whatsapp}?text=${msg}`
}
