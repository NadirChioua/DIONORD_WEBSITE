export interface Client {
  id: string
  name: string
  shortName: string
  logo: string
  type: string
  description: string
  website?: string
  location: string
}

export const clients: Client[] = [
  {
    id: 'groupe-aafir',
    name: 'Groupe Aafir',
    shortName: 'Aafir',
    logo: '/images/clients/groupe-aafir.png',
    type: 'Promoteur immobilier & BTP',
    description: 'Plus de 40 ans d\'expérience dans la construction haut standing au Nord du Maroc',
    website: 'https://aafirgroupe.com',
    location: 'Tétouan',
  },
  {
    id: 'groupe-amana',
    name: 'Groupe Amana',
    shortName: 'Amana',
    logo: '/images/clients/groupe-amana.png',
    type: 'Promoteur immobilier',
    description: 'Acteur majeur de la promotion immobilière à Tanger, +28 projets réalisés depuis 1998',
    website: 'https://amanah.ma',
    location: 'Tanger',
  },
  {
    id: 'codersa',
    name: 'Ste Codersa',
    shortName: 'Codersa',
    logo: '/images/clients/codersa.svg',
    type: 'Construction & BTP',
    description: 'Entreprise de construction et travaux publics, région Nord du Maroc',
    location: 'Nord du Maroc',
  },
  {
    id: 'evotan',
    name: 'Ste Evotan',
    shortName: 'Evotan',
    logo: '/images/clients/evotan.svg',
    type: 'Industrie navale & aéronautique',
    description: 'Fabrication industrielle de précision en Zone Franche de Tanger',
    website: 'https://www.evotan.com',
    location: 'Tanger Free Zone',
  },
  {
    id: 'europac',
    name: 'Groupe Europac',
    shortName: 'Europac',
    logo: '/images/clients/europac.svg',
    type: 'Emballage industriel international',
    description: 'Multinationale de l\'emballage, usine de carton ondulé à Tanger Automotive City',
    website: 'https://www.europacgroup.com',
    location: 'Tanger Automotive City',
  },
  {
    id: 'aafer-immobilier',
    name: 'Groupe AAFER Immobilier',
    shortName: 'AAFER',
    logo: '/images/clients/aafer-immobilier.png',
    type: 'Immobilier de luxe',
    description: 'Référence de l\'immobilier de luxe au Nord du Maroc',
    website: 'https://aaferimmobilier.com',
    location: 'Tanger, Tétouan, Martil',
  },
]
