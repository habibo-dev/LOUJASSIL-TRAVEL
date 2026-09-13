export const agencyConfig = {
  name: 'LOUJASSIL TRAVEL',
  slogan: 'Le voyage à votre goût',
  city: 'El Malah',
  wilaya: 'Aïn Témouchent',
  country: 'Algeria',
  address: '12 CITE MOHAMED BOUDIAF EL MALAH',
  postalCode: '46007',
  phone: '043 75 17 80',
  phone2: '043 75 64 38',
  whatsapp: '043 75 17 80',
  email: 'loujassil.travel@gmail.com',
  website: 'loujassiltravel.business.site',
} as const

export function buildWhatsAppMessage(fields: Record<string, string>) {
  const lines = [
    `Bonjour ${agencyConfig.name},`,
    '',
    'Je souhaite avoir des informations concernant :',
    '',
    `Service : ${fields.service || 'Non précisé'}`,
    `Destination : ${fields.destination || 'Non précisée'}`,
    `Date : ${fields.date || 'Non précisée'}`,
    `Nombre de voyageurs : ${fields.travelers || 'Non précisé'}`,
    `Nom : ${fields.name || 'Non précisé'}`,
    '',
    `Message : ${fields.message || 'Je souhaite recevoir plus d’informations.'}`,
  ]
  return `https://wa.me/21343751780?text=${encodeURIComponent(lines.join('\n'))}`
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${agencyConfig.address}, ${agencyConfig.city}, Algeria ${agencyConfig.postalCode}`)}`
