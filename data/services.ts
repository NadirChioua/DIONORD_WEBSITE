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
  faq: { question: string; answer: string }[]
}

// Villes et zones couvertes – affichées sur chaque page service et déclarées en données structurées
export const SERVICE_AREAS = [
  'Tanger',
  'Tanger Med',
  'Tanger Free Zone',
  'Tanger Automotive City',
  'Tétouan',
  'M\'diq',
  'Fnideq',
  'Martil',
  'Asilah',
  'Larache',
  'Ksar El Kébir',
  'Al Hoceima',
  'Chefchaouen',
]

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
    metaTitle: 'Construction Métallique Tanger | Hangar & Charpente – DIONORD',
    metaDescription: 'Construction métallique à Tanger et au Nord du Maroc : charpente, hangars, entrepôts, mezzanines. Étude, fabrication en atelier et montage. Devis gratuit 48h.',
    keywords: ['construction métallique Tanger', 'charpente métallique Tanger', 'hangar métallique Tanger', 'construction hangar Maroc', 'charpente métallique nord Maroc', 'structure métallique Tétouan', 'mezzanine métallique Tanger', 'entrepôt métallique Tanger', 'bardage métallique Tanger'],
    faq: [
      {
        question: 'Quel est le prix d\'un hangar métallique à Tanger ?',
        answer: 'Le prix dépend de la surface, de la portée, de la hauteur et du type de couverture. À titre indicatif, nos projets de construction métallique se situent entre 200 000 et plus de 5 000 000 MAD. Nous établissons un devis détaillé et gratuit sous 48h après étude de votre projet.',
      },
      {
        question: 'Réalisez-vous l\'étude technique de la charpente ?',
        answer: 'Oui. Notre bureau d\'études intégré réalise les plans et les notes de calcul, puis la structure est fabriquée dans notre atelier à Tanger et montée sur site par nos équipes avec les moyens de levage adaptés.',
      },
      {
        question: 'Intervenez-vous dans les zones franches de Tanger ?',
        answer: 'Oui, nous intervenons à Tanger Free Zone, Tanger Automotive City, Tanger Med, Gueznaya, MedHub ainsi que dans toute la région Tanger-Tétouan-Al Hoceima.',
      },
      {
        question: 'Quels types de structures métalliques fabriquez-vous ?',
        answer: 'Charpentes industrielles et commerciales, hangars et entrepôts, ossatures et portiques, plateformes, mezzanines et passerelles, bardage et couverture, extensions et surélévations de bâtiments.',
      },
    ],
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
    metaTitle: 'Menuiserie Aluminium Tanger | Fenêtres, Façades, Inox – DIONORD',
    metaDescription: 'Menuiserie aluminium et inox à Tanger : fenêtres, baies coulissantes, façades vitrées, cloisons de bureau, garde-corps inox. Sur mesure, pose incluse. Devis 48h.',
    keywords: ['menuiserie aluminium Tanger', 'fenêtre aluminium Tanger', 'baie vitrée coulissante Tanger', 'façade vitrée Tanger', 'garde-corps inox Tanger', 'rampe escalier inox Tanger', 'cloison vitrée bureau Tanger', 'mur rideau Maroc', 'véranda aluminium Tanger', 'menuiserie aluminium Tétouan'],
    faq: [
      {
        question: 'Fabriquez-vous des fenêtres et portes en aluminium sur mesure ?',
        answer: 'Oui. Toutes nos menuiseries (fenêtres, baies vitrées, portes coulissantes, vérandas) sont fabriquées sur mesure dans notre atelier après une prise de mesures sur site, puis posées par nos équipes.',
      },
      {
        question: 'Quel est le prix d\'une menuiserie aluminium à Tanger ?',
        answer: 'Selon le projet, de 5 000 MAD pour un ouvrage simple (garde-corps, paroi de douche) jusqu\'à 500 000 MAD pour une façade vitrée complète. Le devis est gratuit et inclut la prise de mesures.',
      },
      {
        question: 'Posez-vous des garde-corps et rampes d\'escalier en inox ?',
        answer: 'Oui, nous fabriquons et installons des garde-corps, rampes, mains courantes et habillages en inox pour villas, immeubles, hôtels et bâtiments professionnels.',
      },
      {
        question: 'Travaillez-vous pour les particuliers et les professionnels ?',
        answer: 'Oui, nous travaillons aussi bien pour les particuliers en construction ou rénovation que pour les promoteurs, architectes, hôtels et bureaux à Tanger, Tétouan et dans tout le Nord du Maroc.',
      },
    ],
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
    metaTitle: 'Installation Machines Industrielles Tanger | Montage – DIONORD',
    metaDescription: 'Installation, montage mécanique et mise en service de machines et lignes de production à Tanger (TFZ, TAC, Tanger Med). Transfert industriel. Devis gratuit 48h.',
    keywords: ['installation machines industrielles Tanger', 'montage équipements industriels Maroc', 'mise en service machines Tanger', 'transfert industriel Tanger', 'installation ligne de production Maroc', 'installation usine Tanger Free Zone', 'montage mécanique Tanger'],
    faq: [
      {
        question: 'Dans quelles zones industrielles intervenez-vous ?',
        answer: 'Nous intervenons à Tanger Free Zone, Tanger Automotive City, Tanger Med, Gueznaya, Mghogha, Tétouan Park et dans toute la région Nord du Maroc.',
      },
      {
        question: 'Pouvez-vous déménager une machine ou une ligne de production ?',
        answer: 'Oui, nous réalisons le transfert industriel : démontage, levage, transport, repositionnement, calage, alignement et raccordement mécanique sur le nouveau site.',
      },
      {
        question: 'Intervenez-vous en dehors des heures de production ?',
        answer: 'Oui, pour limiter l\'arrêt de votre production, nous pouvons intervenir les week-ends et la nuit selon vos contraintes.',
      },
    ],
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
    metaTitle: 'Clôture Métallique & Portail Tanger | Prix, Devis – DIONORD',
    metaDescription: 'Clôture métallique et portail à Tanger : panneaux rigides, grillage, portail coulissant ou battant motorisé. Galvanisé ou époxy, pose incluse. Devis gratuit 48h.',
    keywords: ['clôture métallique Tanger', 'portail coulissant Tanger', 'portail métallique Tanger', 'portail motorisé Tanger', 'grillage Tanger', 'clôture villa Tanger', 'clôture panneau rigide Maroc', 'clôture industrielle Tanger', 'clôture terrain Tanger', 'clôture métallique Tétouan', 'prix clôture métallique Maroc'],
    faq: [
      {
        question: 'Quel est le prix d\'une clôture métallique à Tanger ?',
        answer: 'Le prix dépend du linéaire, de la hauteur, du type de clôture (panneaux rigides, grillage simple ou double torsion) et du traitement anti-corrosion. Nos projets vont de 5 000 à 200 000 MAD. Nous établissons un devis gratuit incluant les métrés sur site.',
      },
      {
        question: 'Proposez-vous des portails coulissants motorisés ?',
        answer: 'Oui, nous fabriquons et installons des portails coulissants et battants, manuels ou motorisés, avec service après-vente sur la motorisation.',
      },
      {
        question: 'Vos clôtures résistent-elles au climat côtier de Tanger ?',
        answer: 'Oui, toutes nos clôtures sont traitées contre la corrosion par galvanisation à chaud ou peinture époxy, adaptées à l\'air marin de la région de Tanger.',
      },
      {
        question: 'Installez-vous des clôtures pour villas et terrains ?',
        answer: 'Oui, nous équipons aussi bien les sites industriels que les villas, terrains, lotissements et exploitations agricoles à Tanger, Tétouan, Asilah et dans tout le Nord.',
      },
    ],
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
    metaTitle: 'Sécurité Incendie Tanger | Détection, Sprinkler, RIA – DIONORD',
    metaDescription: 'Installation et maintenance de systèmes de sécurité incendie à Tanger : détection EN-54, sprinklers, RIA, alarme, mise en conformité. Audit gratuit. Devis 48h.',
    keywords: ['sécurité incendie Tanger', 'système incendie Tanger', 'détection incendie Tanger', 'sprinkler Tanger', 'RIA robinet incendie armé Maroc', 'installation sprinkler Maroc', 'maintenance incendie Tanger', 'norme EN-54 Maroc', 'mise en conformité incendie Tanger', 'audit incendie gratuit'],
    faq: [
      {
        question: 'Vos installations sont-elles conformes aux normes ?',
        answer: 'Oui, nos systèmes de détection et de protection incendie sont conformes aux normes EN-54 et à la réglementation marocaine en vigueur.',
      },
      {
        question: 'Proposez-vous des contrats de maintenance incendie ?',
        answer: 'Oui, nous proposons des contrats de maintenance annuelle pour vos détecteurs, centrales, sprinklers, RIA et alarmes, afin de garantir leur bon fonctionnement en permanence.',
      },
      {
        question: 'L\'audit sécurité incendie est-il gratuit ?',
        answer: 'Oui, nous réalisons un audit gratuit de votre site pour identifier les équipements nécessaires et les points de mise en conformité.',
      },
      {
        question: 'Quels bâtiments équipez-vous ?',
        answer: 'Usines, entrepôts, plateformes logistiques, hôtels, cliniques, bureaux, immeubles et centres commerciaux à Tanger et dans toute la région Tanger-Tétouan-Al Hoceima.',
      },
    ],
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
    metaTitle: 'Travaux Aménagement & Rénovation Tanger | Peinture – DIONORD',
    metaDescription: 'Travaux d\'aménagement et de rénovation à Tanger : peinture, électricité, faux plafonds, revêtements, aménagement de bureaux et commerces. Devis gratuit 48h.',
    keywords: ['travaux aménagement Tanger', 'rénovation appartement Tanger', 'peinture Tanger', 'faux plafond Tanger', 'électricité bâtiment Tanger', 'aménagement bureau Tanger', 'aménagement local commercial Tanger', 'entreprise rénovation Tanger'],
    faq: [
      {
        question: 'Quels travaux d\'aménagement réalisez-vous ?',
        answer: 'Peinture intérieure et extérieure, électricité (courant fort et faible), faux plafonds, revêtements de sols et muraux, cloisons sèches, agencement de bureaux et de commerces, rénovation complète.',
      },
      {
        question: 'Combien coûte une rénovation à Tanger ?',
        answer: 'Selon la surface et les travaux, nos chantiers d\'aménagement se situent généralement entre 5 000 et 80 000 MAD. Le devis est gratuit et inclut les matériaux.',
      },
      {
        question: 'Pouvez-vous gérer tous les corps de métier ?',
        answer: 'Oui, nos équipes polyvalentes prennent en charge peinture, électricité et finitions, et peuvent enchaîner avec la menuiserie aluminium ou la clôture : un seul interlocuteur pour tout votre projet.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getRelatedServices(slug: string, count = 3): Service[] {
  return services.filter((s) => s.slug !== slug).slice(0, count)
}
