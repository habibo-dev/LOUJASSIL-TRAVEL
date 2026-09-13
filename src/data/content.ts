export const services = [
  { icon: 'plane', title: 'Billetterie', description: 'Trouvez une solution adaptée à votre trajet.', href: '/billetterie' },
  { icon: 'hotel', title: 'Réservation d’hôtels', description: 'Préparez votre séjour avec une solution d’hébergement adaptée.', href: '/hotels' },
  { icon: 'compass', title: 'Voyages organisés', description: 'Découvrez des idées de programmes pour vos prochaines destinations.', href: '/voyages' },
  { icon: 'sparkles', title: 'Voyages à la carte', description: 'Un voyage pensé selon vos envies et votre projet.', href: '/voyages-a-la-carte' },
  { icon: 'moon', title: 'Omra', description: 'Informations et programmes disponibles selon les offres de l’agence.', href: '/omra' },
  { icon: 'passport', title: 'Visas', description: 'Informations et accompagnement selon la destination.', href: '/visas' },
]

export const destinations = [
  { slug: 'paris', city: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85', text: 'Une escapade élégante entre patrimoine, culture et art de vivre.' },
  { slug: 'london', city: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85', text: 'Une capitale iconique où histoire et énergie contemporaine se rencontrent.' },
  { slug: 'istanbul', city: 'Istanbul', country: 'Türkiye', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85', text: 'Entre deux continents, une destination riche en saveurs et découvertes.' },
  { slug: 'dubai', city: 'Dubai', country: 'United Arab Emirates', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85', text: 'Architecture spectaculaire, expériences premium et horizons infinis.' },
  { slug: 'new-york', city: 'New York', country: 'United States', image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=85', text: 'Une ville qui ne dort jamais, idéale pour un voyage plein d’énergie.' },
  { slug: 'cairo', city: 'Cairo', country: 'Egypt', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=85', text: 'Une porte ouverte sur l’histoire, les rives du Nil et les grands monuments.' },
  { slug: 'marrakech', city: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=85', text: 'Couleurs, architecture, gastronomie et douceur de vivre.' },
  { slug: 'makkah', city: 'Makkah', country: 'Saudi Arabia', image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=85', text: 'Une destination spirituelle à découvrir avec une préparation attentive.' },
  { slug: 'madinah', city: 'Madinah', country: 'Saudi Arabia', image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=85', text: 'Un cadre spirituel qui invite au recueillement et à la sérénité.' },
  { slug: 'rome', city: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=85', text: 'Une immersion dans des siècles d’histoire, de cuisine et de culture.' },
]

export const offers = [
  { slug: 'inspiration-paris', city: 'Paris', country: 'France', category: 'Inspiration', duration: 'À définir', image: destinations[0].image, description: 'Une idée de séjour à personnaliser selon vos envies.', tag: 'DEMO' },
  { slug: 'escapade-istanbul', city: 'Istanbul', country: 'Türkiye', category: 'City break', duration: 'À définir', image: destinations[2].image, description: 'Une inspiration pour découvrir Istanbul à votre rythme.', tag: 'DEMO' },
  { slug: 'horizon-dubai', city: 'Dubai', country: 'UAE', category: 'Découverte', duration: 'À définir', image: destinations[3].image, description: 'Une idée de voyage premium à construire ensemble.', tag: 'DEMO' },
]

export const faqs = [
  ['Comment demander un devis ?', 'Choisissez votre projet, renseignez quelques informations puis envoyez votre demande. L’équipe pourra vous recontacter pour préciser les détails.'],
  ['Comment demander un billet d’avion ?', 'Utilisez la rubrique Billetterie et indiquez votre départ, destination, dates et nombre de voyageurs. Il s’agit d’une demande de proposition, pas d’un moteur de réservation en temps réel.'],
  ['Proposez-vous des voyages sur mesure ?', 'Oui, la rubrique Voyage à la carte permet de présenter votre projet, vos préférences et votre budget indicatif afin d’échanger sur une solution adaptée.'],
  ['Comment fonctionne une réservation d’hôtel ?', 'Envoyez votre destination, vos dates et vos besoins. Les informations disponibles et les conditions sont ensuite précisées avec l’agence.'],
  ['Proposez-vous des programmes Omra ?', 'Une rubrique dédiée permet de demander des informations sur les programmes disponibles. Les détails doivent être confirmés par l’agence avant toute décision.'],
  ['Comment demander des informations sur un visa ?', 'La rubrique Visa permet de présenter votre destination et votre besoin. L’agence peut ensuite vous communiquer les informations et documents à prévoir selon le dossier.'],
  ['Puis-je vous contacter via WhatsApp ?', 'Oui. Le site met WhatsApp au centre du parcours de contact afin de faciliter les échanges.'],
  ['Comment préparer un voyage de groupe ?', 'Présentez votre projet, le nombre de voyageurs et vos besoins. L’équipe pourra échanger avec vous sur les possibilités disponibles.'],
]
