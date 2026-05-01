export interface Service {
  slug: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  longDescription: string[]
  prestations: string[]
  targets: string[]
  whyDionord: string[]
  images: string[]
  heroImage: string
  icon: string
  color: string
  priority: 'high' | 'medium' | 'low'
  segment: 'B2B' | 'B2C' | 'B2B+B2C'
  ticketRange: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

export const services: Service[] = [
  {
    slug: 'construction-metallique',
    title: 'Construction Métallique & Charpente',
    shortTitle: 'Construction Métallique',
    tagline: 'Structures industrielles sur mesure pour vos projets d\'envergure',
    description: 'Conception, fabrication et montage de structures métalliques pour bâtiments industriels, hangars, entrepôts et ouvrages d\'art.',
    longDescription: [
      'DIONORD SARL AU conçoit, fabrique et monte des structures métalliques pour tous types de projets industriels et commerciaux. Notre expertise couvre la totalité du cycle de réalisation : de l\'étude technique à la livraison sur site.',
      'Nous intervenons sur des projets de grande envergure nécessitant une maîtrise technique rigoureuse : charpentes métalliques pour hangars et entrepôts, ossatures de bâtiments industriels, plateformes et mezzanines, structures de stockage, et extensions de bâtiments existants.',
      'Notre atelier de fabrication est équipé pour la découpe, le soudage, le perçage et l\'assemblage de pièces métalliques de toutes dimensions. Chaque structure est fabriquée selon les plans techniques validés, puis montée sur site par nos équipes spécialisées avec les moyens de levage adaptés.',
      'Basés à Tanger, au cœur du deuxième pôle industriel du Maroc, nous intervenons dans toutes les zones franches (TFZ, TAC, Gueznaya, MedHub) ainsi que dans toute la région Tanger-Tétouan-Al Hoceima.',
    ],
    prestations: [
      'Charpente métallique industrielle et commerciale',
      'Hangars et entrepôts de stockage',
      'Ossatures et portiques métalliques',
      'Plateformes, mezzanines et passerelles',
      'Bardage et couverture métallique',
      'Extensions et surélévations de bâtiments',
      'Structures sur mesure pour projets spécifiques',
    ],
    targets: [
      'Industriels et opérateurs de zones franches',
      'Promoteurs immobiliers et entreprises BTP',
      'Maîtres d\'ouvrage publics et privés',
      'Opérateurs logistiques et entrepôts',
      'Agriculteurs et exploitations agricoles',
    ],
    whyDionord: [
      'Proximité avec les zones industrielles de Tanger Med',
      'Bureau d\'études intégré pour les études techniques',
      'Atelier de fabrication propre pour un contrôle qualité total',
      'Équipe terrain expérimentée, équipement grue disponible',
      'Délais respectés, devis transparent et détaillé',
    ],
    images: [
      '/images/realisations/charpente-construction.jpg',
      '/images/realisations/charpente-interieur.jpg',
      '/images/realisations/fabrication-atelier.jpg',
      '/images/realisations/hangar-acier.jpg',
    ],
    heroImage: '/images/services/construction-metallique.jpg',
    icon: 'Building2',
    color: '#1B3A5C',
    priority: 'high',
    segment: 'B2B',
    ticketRange: '200 000 – 5 000 000+ MAD',
    metaTitle: 'Construction Métallique Tanger | Charpente Industrielle – DIONORD',
    metaDescription: 'Expert en construction métallique et charpente industrielle à Tanger. Hangars, structures industrielles, ossatures métalliques sur mesure. Devis gratuit.',
    keywords: ['construction métallique Tanger', 'charpente métallique nord Maroc', 'hangar métallique Tanger', 'structure industrielle Tanger', 'charpente métallique Maroc'],
  },
  {
    slug: 'menuiserie-aluminium-inox',
    title: 'Menuiserie Aluminium & Inox',
    shortTitle: 'Menuiserie Alu & Inox',
    tagline: 'Façades vitrées, garde-corps et menuiseries sur mesure',
    description: 'Fabrication et pose de menuiseries aluminium et ouvrages en inox pour façades, agencement intérieur et finitions architecturales.',
    longDescription: [
      'DIONORD réalise l\'ensemble des travaux de menuiserie aluminium et d\'ouvrages en inox pour les secteurs résidentiel, tertiaire et industriel. Notre savoir-faire couvre aussi bien les grandes façades vitrées de bâtiments commerciaux que les installations sur mesure pour particuliers.',
      'En aluminium, nous fabriquons et posons des fenêtres, baies vitrées, portes coulissantes, murs rideaux, façades structurelles, cloisons vitrées de bureau, vérandas et pergolas. En inox, nous réalisons des garde-corps, rampes d\'escalier, mains courantes, habillages muraux et éléments décoratifs architecturaux.',
      'Chaque projet est étudié et fabriqué sur mesure pour garantir une intégration parfaite dans l\'architecture existante, avec une attention particulière portée aux finitions, à l\'étanchéité et à la performance thermique.',
    ],
    prestations: [
      'Façades vitrées et murs rideaux',
      'Fenêtres et baies vitrées en aluminium',
      'Portes et portes coulissantes aluminium',
      'Cloisons vitrées pour bureaux et espaces professionnels',
      'Garde-corps et rampes d\'escalier en inox',
      'Vérandas et pergolas aluminium',
      'Habillages et éléments architecturaux en inox',
      'Menuiseries sur mesure pour projets spéciaux',
    ],
    targets: [
      'Particuliers en construction ou rénovation',
      'Promoteurs immobiliers',
      'Architectes et bureaux d\'études',
      'Hôtels et établissements touristiques',
      'Bureaux et espaces commerciaux',
    ],
    whyDionord: [
      'Fabrication en atelier propre pour un contrôle qualité optimal',
      'Sur-mesure systématique : chaque commande est unique',
      'Profils aluminium de haute qualité, inox alimentaire disponible',
      'Installation soignée par des poseurs expérimentés',
      'Devis gratuit avec prise de mesures sur site',
    ],
    images: [
      '/images/realisations/garde-corps-inox.jpg',
      '/images/realisations/cloisons-vitrees.jpg',
      '/images/realisations/facade-aluminium.jpg',
      '/images/realisations/paroi-douche.jpg',
    ],
    heroImage: '/images/services/menuiserie-aluminium-inox.jpg',
    icon: 'Layers',
    color: '#2E75B6',
    priority: 'high',
    segment: 'B2B+B2C',
    ticketRange: '5 000 – 500 000 MAD',
    metaTitle: 'Menuiserie Aluminium & Inox Tanger | Façades, Garde-corps – DIONORD',
    metaDescription: 'Fabrication et pose de menuiserie aluminium et inox à Tanger. Façades vitrées, garde-corps, cloisons vitrées sur mesure. Devis gratuit sous 48h.',
    keywords: ['menuiserie aluminium Tanger', 'façade vitrée Tanger', 'garde-corps inox Tanger', 'mur rideau Tanger', 'cloison vitrée Tanger'],
  },
  {
    slug: 'installation-machines-industrielles',
    title: 'Installation de Machines Industrielles',
    shortTitle: 'Installation Machines',
    tagline: 'Montage et mise en service de vos équipements de production',
    description: 'Montage, positionnement et mise en service d\'équipements et de lignes de production industrielles.',
    longDescription: [
      'DIONORD assure le montage mécanique, le positionnement précis et la mise en service de machines et d\'équipements industriels. Nous intervenons dans les usines et unités de production pour l\'installation de lignes complètes ou d\'équipements individuels.',
      'Notre équipe maîtrise les opérations de levage, de calage, d\'alignement et de fixation des machines sur leurs fondations. Nous assurons également le raccordement mécanique et la coordination avec les équipes électriques et de contrôle pour une mise en service réussie.',
      'Nous intervenons dans les zones industrielles de Tanger Med, Tanger Free Zone, Tanger Automotive City et dans toute la région Nord du Maroc, au service des grands groupes industriels et des PMI.',
    ],
    prestations: [
      'Montage mécanique d\'équipements industriels',
      'Positionnement et calage de machines de production',
      'Installation de lignes de production complètes',
      'Transfert et déménagement industriel',
      'Raccordement mécanique et tuyauterie',
      'Coordination de mise en service',
    ],
    targets: [
      'Usines automobiles et équipementiers (TFZ, TAC)',
      'Industries agroalimentaires et chimiques',
      'Unités de production légère et textile',
      'Opérateurs logistiques avec équipements manutention',
      'Nouvelles usines en phase de démarrage',
    ],
    whyDionord: [
      'Intervention rapide dans toutes les zones industrielles de Tanger',
      'Équipe formée aux règles de sécurité industrielle',
      'Coordination sans stress avec vos équipes de production',
      'Disponibilité flexible : weekends et nuits si nécessaire',
      'Expertise complémentaire en construction métallique et chaudronnerie',
    ],
    images: [
      '/images/realisations/installation-machines.jpg',
      '/images/realisations/installation-machines/im-01.jpg',
      '/images/realisations/installation-machines/im-02.jpg',
      '/images/realisations/installation-machines/im-03.jpg',
    ],
    heroImage: '/images/services/installation-machines.jpg',
    icon: 'Settings',
    color: '#C0392B',
    priority: 'medium',
    segment: 'B2B',
    ticketRange: '50 000 – 2 000 000 MAD',
    metaTitle: 'Installation Machines Industrielles Tanger | Montage Équipements – DIONORD',
    metaDescription: 'Installation et mise en service de machines industrielles à Tanger. Montage mécanique, calage, raccordement. Intervention rapide dans les zones industrielles.',
    keywords: ['installation machines industrielles Tanger', 'montage équipements industriels Maroc', 'mise en service machines Tanger', 'installation usine Tanger'],
  },
  {
    slug: 'cloture-metallique',
    title: 'Clôture Métallique & Portails',
    shortTitle: 'Clôture Métallique',
    tagline: 'Protection et délimitation pour sites industriels et propriétés',
    description: 'Fabrication et installation de clôtures métalliques, portails et systèmes de fermeture pour sites industriels et résidentiels.',
    longDescription: [
      'DIONORD fabrique et installe des clôtures métalliques et des portails pour la protection, la délimitation et la sécurisation de tous types de sites : zones industrielles, usines, entrepôts, terrains, résidences et lotissements.',
      'Notre offre comprend les clôtures en panneaux rigides soudés, les grillages simple et double torsion, les portails coulissants et battants (manuels ou motorisés), ainsi que les barrières de sécurité et les garde-corps périphériques.',
      'Chaque installation est dimensionnée selon les contraintes du terrain et les exigences de sécurité du site. Nous assurons la fourniture, la fabrication sur mesure quand nécessaire, et la pose complète avec scellements et finitions.',
      'Toutes nos clôtures sont traitées contre la corrosion (galvanisation à chaud ou peinture époxy) pour une durabilité maximale dans le climat côtier de la région de Tanger.',
    ],
    prestations: [
      'Clôtures en panneaux rigides soudés',
      'Grillages simple et double torsion',
      'Portails coulissants (manuels et motorisés)',
      'Portails battants',
      'Barrières de sécurité industrielle',
      'Clôtures anti-intrusion pour sites sensibles',
      'Poteaux, accessoires et finitions',
    ],
    targets: [
      'Sites industriels et zones d\'activités',
      'Propriétaires de villas et terrains',
      'Lotissements et promoteurs',
      'Agriculteurs et exploitations rurales',
      'Collectivités et établissements publics',
    ],
    whyDionord: [
      'Traitement anti-corrosion garanti (galva ou époxy)',
      'Poteaux et accessoires fabriqués en atelier propre',
      'Pose soignée avec nivellement et aplomb parfait',
      'Motorisation fiable des portails avec service après-vente',
      'Devis gratuit incluant métrés et étude technique',
    ],
    images: [
      '/images/realisations/cloture-industrielle.jpg',
      '/images/realisations/portail-coulissant.jpg',
    ],
    heroImage: '/images/services/cloture-metallique.jpg',
    icon: 'Shield',
    color: '#1B3A5C',
    priority: 'medium',
    segment: 'B2B+B2C',
    ticketRange: '5 000 – 200 000 MAD',
    metaTitle: 'Clôture Métallique Tanger | Portails, Grillage Industriel – DIONORD',
    metaDescription: 'Installation de clôtures métalliques et portails à Tanger. Grillage, panneaux rigides, portails motorisés pour sites industriels et particuliers. Devis gratuit.',
    keywords: ['clôture métallique Tanger', 'portail coulissant Tanger', 'grillage industriel Maroc', 'clôture villa Tanger', 'portail motorisé Tanger'],
  },
  {
    slug: 'systeme-incendie',
    title: 'Systèmes de Sécurité Incendie',
    shortTitle: 'Sécurité Incendie',
    tagline: 'Protection incendie conforme aux normes EN-54 et réglementation marocaine',
    description: 'Étude, installation et maintenance de systèmes de détection et de protection incendie conformes aux normes en vigueur.',
    longDescription: [
      'DIONORD conçoit, installe et maintient des systèmes de sécurité incendie complets pour les bâtiments industriels, commerciaux et les établissements recevant du public. Notre offre couvre l\'ensemble de la chaîne SSI : de l\'étude réglementaire à la maintenance périodique.',
      'Nous installons des systèmes de détection incendie (détecteurs de fumée, de chaleur, multi-capteurs), des systèmes d\'extinction automatique (sprinklers, extinction par gaz, brouillard d\'eau), des RIA (Robinets d\'Incendie Armés), ainsi que les dispositifs d\'alarme, de signalisation et d\'évacuation.',
      'Toutes nos installations sont conformes aux normes EN-54 et à la réglementation marocaine. Nous proposons également des contrats de maintenance annuelle pour garantir le bon fonctionnement permanent de vos équipements de sécurité.',
      'Basés dans la région Nord du Maroc, nous sommes l\'un des rares acteurs locaux à proposer une offre complète en sécurité incendie. Notre réactivité d\'intervention dans les zones industrielles de Tanger Med est un atout majeur.',
    ],
    prestations: [
      'Détection incendie (détecteurs fumée, chaleur, multicapteurs)',
      'Extinction automatique (sprinklers, gaz, brouillard d\'eau)',
      'RIA (Robinets d\'Incendie Armés)',
      'Centrales de détection et de mise en sécurité',
      'Alarmes, signalisation et balisage d\'évacuation',
      'Plans d\'évacuation et affichage réglementaire',
      'Audit et mise en conformité SSI',
      'Contrats de maintenance annuelle',
    ],
    targets: [
      'Usines et ateliers industriels',
      'Entrepôts et plateformes logistiques',
      'Hôtels et établissements touristiques',
      'Cliniques et établissements de santé',
      'Bureaux et immeubles commerciaux',
      'Centres commerciaux et grandes surfaces',
    ],
    whyDionord: [
      'Conformité certifiée normes EN-54 et réglementation marocaine',
      'Seul acteur complet de sécurité incendie dans la région Nord',
      'Audit sécurité incendie gratuit pour évaluer vos besoins',
      'Maintenance annuelle avec contrat d\'entretien dédié',
      'Intervention d\'urgence rapide dans toute la région TTA',
    ],
    images: [
      '/images/realisations/sprinkler-incendie.jpg',
      '/images/realisations/securite-incendie/si-01.jpg',
      '/images/realisations/securite-incendie/si-02.jpg',
      '/images/realisations/securite-incendie/si-03.jpg',
    ],
    heroImage: '/images/services/systeme-incendie.jpg',
    icon: 'Flame',
    color: '#C0392B',
    priority: 'high',
    segment: 'B2B',
    ticketRange: '20 000 – 500 000 MAD',
    metaTitle: 'Système Incendie Tanger | Détection, Extinction EN-54 – DIONORD',
    metaDescription: 'Installation et maintenance de systèmes de sécurité incendie à Tanger. Détection, sprinklers, RIA, conformité EN-54. Audit gratuit. DIONORD région Nord Maroc.',
    keywords: ['système incendie Tanger', 'sécurité incendie Maroc', 'installation détection incendie', 'norme EN-54 Maroc', 'sprinkler Tanger', 'audit incendie gratuit'],
  },
  {
    slug: 'travaux-amenagement',
    title: 'Travaux d\'Aménagement & Finitions',
    shortTitle: 'Aménagement',
    tagline: 'Peinture, électricité et finitions pour transformer vos espaces',
    description: 'Réalisation de travaux d\'aménagement intérieur et extérieur : peinture, électricité, faux plafonds, revêtements et finitions complètes.',
    longDescription: [
      'DIONORD réalise des travaux d\'aménagement complets pour les espaces résidentiels, commerciaux et professionnels. Notre équipe prend en charge l\'ensemble des corps d\'état secondaires pour livrer des espaces prêts à l\'usage.',
      'Nous intervenons sur la peinture intérieure et extérieure, l\'installation électrique (courant fort et courant faible), la pose de faux plafonds, les revêtements de sols et muraux, l\'agencement de locaux commerciaux et de bureaux, ainsi que tous les travaux de finition.',
      'Que ce soit pour une rénovation complète d\'appartement, l\'aménagement d\'un local commercial ou la finition d\'un bâtiment neuf, DIONORD apporte le même niveau d\'exigence et de soin dans l\'exécution.',
      'Nos équipes de peintres et d\'électriciens sont formées et expérimentées. Nous utilisons des matériaux de première qualité pour des finitions durables.',
    ],
    prestations: [
      'Peinture intérieure et extérieure',
      'Installation électrique (courant fort et faible)',
      'Faux plafonds (suspendus, modulaires, décoratifs)',
      'Revêtements de sols et muraux',
      'Agencement de locaux commerciaux',
      'Rénovation complète d\'intérieur',
      'Cloisons sèches et doublages',
      'Finitions et second œuvre complet',
    ],
    targets: [
      'Particuliers en rénovation ou construction',
      'Propriétaires de locaux commerciaux',
      'Entreprises pour aménagement de bureaux',
      'Syndics et gestionnaires d\'immeubles',
      'Hôtels et restaurants en rénovation',
    ],
    whyDionord: [
      'Équipes polyvalentes : peinture + électricité + finitions en un seul intervenant',
      'Matériaux de qualité professionnelle inclus dans le devis',
      'Propreté du chantier garantie, nettoyage fin de travaux inclus',
      'Délais respectés avec planning de chantier communiqué en avance',
      'Service unique : possibilité d\'enchaîner avec menuiserie alu ou clôture',
    ],
    images: [
      '/images/realisations/renovation-bureau.jpg',
    ],
    heroImage: '/images/services/travaux-amenagement.jpg',
    icon: 'Paintbrush',
    color: '#2E75B6',
    priority: 'low',
    segment: 'B2C',
    ticketRange: '5 000 – 80 000 MAD',
    metaTitle: 'Travaux Aménagement Tanger | Peinture, Électricité, Rénovation – DIONORD',
    metaDescription: 'Travaux d\'aménagement intérieur et extérieur à Tanger. Peinture, électricité, faux plafonds, rénovation complète. DIONORD, votre artisan de confiance.',
    keywords: ['travaux aménagement Tanger', 'peinture Tanger', 'rénovation intérieur Tanger', 'électricité Tanger', 'aménagement bureau Tanger'],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getRelatedServices(slug: string, count = 3): Service[] {
  return services.filter((s) => s.slug !== slug).slice(0, count)
}
