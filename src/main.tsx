import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, CalendarDays, Check, ChevronDown, Compass, Facebook, Globe2, Hotel, Instagram, Mail, MapPin, Menu, MessageCircle, Moon, Plane, Search, ShieldCheck, Sparkles, Star, Ticket, Users, X } from 'lucide-react'
import { agencyConfig, buildWhatsAppMessage, mapsUrl } from './data/agencyConfig'
import { destinations, faqs, offers, services } from './data/content'
import './styles.css'

type Lang = 'fr' | 'ar'

const navItems = [
  ['Accueil', '/'], ['Nos offres', '/offres'], ['Destinations', '/destinations'], ['Billetterie', '/billetterie'],
  ['Hôtels', '/hotels'], ['Voyages', '/voyages'], ['Omra', '/omra'], ['Visas', '/visas'], ['À propos', '/a-propos'], ['Contact', '/contact'],
]

const iconMap: Record<string, typeof Plane> = { plane: Plane, hotel: Hotel, compass: Compass, sparkles: Sparkles, moon: Moon, passport: ShieldCheck }

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const I = iconMap[name] || Sparkles
  return <I size={size} strokeWidth={1.7} />
}

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

function App() {
  const [lang, setLang] = useState<Lang>('fr')
  const [menu, setMenu] = useState(false)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [inquiryType, setInquiryType] = useState('Voyage')
  const location = useLocation()

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    scrollTop()
  }, [location.pathname, lang])

  return <div className="app-shell">
    <Header lang={lang} setLang={setLang} menu={menu} setMenu={setMenu} onInquiry={() => setInquiryOpen(true)} />
    <main>
      <Routes>
        <Route path="/" element={<Home onInquiry={() => setInquiryOpen(true)} setInquiryType={setInquiryType} />} />
        <Route path="/offres" element={<OffersPage />} />
        <Route path="/offres/:slug" element={<OfferDetail />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/billetterie" element={<ServicePage kind="flight" />} />
        <Route path="/hotels" element={<ServicePage kind="hotel" />} />
        <Route path="/voyages" element={<ServicePage kind="voyage" />} />
        <Route path="/voyages-a-la-carte" element={<ServicePage kind="custom" />} />
        <Route path="/omra" element={<ServicePage kind="omra" />} />
        <Route path="/visas" element={<ServicePage kind="visa" />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <MobileBar />
    <a className="whatsapp-float" href={buildWhatsAppMessage({ service: 'Demande générale' })} target="_blank" rel="noreferrer" aria-label="Parler sur WhatsApp"><MessageCircle size={24} /></a>
    {inquiryOpen && <InquiryModal type={inquiryType} setType={setInquiryType} onClose={() => setInquiryOpen(false)} />}
  </div>
}

function Header({ lang, setLang, menu, setMenu, onInquiry }: { lang: Lang; setLang: (l: Lang) => void; menu: boolean; setMenu: (v: boolean) => void; onInquiry: () => void }) {
  const location = useLocation()
  return <>
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={() => setMenu(false)}>
          <img src="/loujassil-logo.jpg" alt="LOUJASSIL TRAVEL" />
          <span><b>LOUJASSIL</b><small>TRAVEL</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map(([label, href]) => <Link className={location.pathname === href ? 'active' : ''} key={href} to={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="lang" onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} aria-label="Changer de langue">{lang === 'fr' ? 'العربية' : 'Français'}</button>
          <button className="gold-button compact" onClick={onInquiry}>Demander un devis <ArrowRight size={16} /></button>
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Menu"><Menu size={23} /></button>
        </div>
      </div>
    </header>
    {menu && <div className="mobile-menu">
      {navItems.map(([label, href]) => <Link key={href} to={href} onClick={() => setMenu(false)}>{label}</Link>)}
      <button className="gold-button" onClick={() => { setMenu(false); onInquiry() }}>Demander un devis</button>
    </div>}
  </>
}

function Home({ onInquiry, setInquiryType }: { onInquiry: () => void; setInquiryType: (s: string) => void }) {
  return <>
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content container">
        <div className="eyebrow"><span /> LOUJASSIL TRAVEL <span /></div>
        <h1>Le voyage<br /><em>à votre goût.</em></h1>
        <p>Découvrez une nouvelle façon de préparer vos voyages, vos séjours et vos projets de déplacement avec LOUJASSIL TRAVEL.</p>
        <div className="hero-actions">
          <Link className="gold-button" to="/destinations">Découvrir nos voyages <ArrowRight size={18} /></Link>
          <button className="outline-button" onClick={onInquiry}>Demander un devis</button>
          <a className="text-link" href={buildWhatsAppMessage({ service: 'Demande générale' })} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Parler sur WhatsApp</a>
        </div>
        <div className="hero-meta"><span><MapPin size={15} /> El Malah · Aïn Témouchent</span><span><ShieldCheck size={15} /> Service personnalisé</span><span><Globe2 size={15} /> Travel made personal</span></div>
      </div>
      <div className="hero-route"><span /><i>✦</i><span /><b>✈</b></div>
    </section>
    <InquiryWidget onInquiry={onInquiry} setInquiryType={setInquiryType} />
    <section className="section services-section">
      <div className="container">
        <SectionHeading kicker="NOS SERVICES" title="Tout commence par une bonne idée de voyage." text="Un seul point de contact pour vos projets de déplacement, avec une approche simple, humaine et personnalisée." />
        <div className="service-grid">{services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}</div>
      </div>
    </section>
    <section className="section dark-section destinations-section">
      <div className="container">
        <SectionHeading dark kicker="DESTINATIONS" title="Le monde vous attend." text="Des inspirations pour commencer à imaginer votre prochaine échappée. Les destinations présentées sont des exemples de démonstration." />
        <div className="destination-grid">{destinations.slice(0, 5).map((d, i) => <DestinationCard key={d.slug} destination={d} featured={i === 0} />)}</div>
        <div className="center"><Link className="outline-button light" to="/destinations">Explorer toutes les destinations <ArrowRight size={17} /></Link></div>
      </div>
    </section>
    <section className="section offer-section">
      <div className="container">
        <div className="section-row"><SectionHeading kicker="INSPIRATIONS" title="Nos offres" text="Des idées de voyage pour vous inspirer. Les contenus affichés ici sont des exemples de démonstration, sans prix ni disponibilité fictifs." /><Link className="under-link" to="/offres">Voir toutes les offres <ArrowRight size={16} /></Link></div>
        <div className="offer-grid">{offers.map(o => <OfferCard key={o.slug} offer={o} />)}</div>
      </div>
    </section>
    <section className="editorial">
      <div className="editorial-image" />
      <div className="editorial-copy"><span className="gold-line" /><p className="eyebrow">L’ART DU VOYAGE</p><h2>LE VOYAGE<br /><em>À VOTRE GOÛT</em></h2><p>Parce que chaque voyage est différent, votre expérience doit l’être aussi. Nous partons de votre projet pour construire une demande claire et personnalisée.</p><Link className="gold-button" to="/voyages-a-la-carte">Créer mon voyage <ArrowRight size={18} /></Link></div>
    </section>
    <section className="section umrah-home">
      <div className="container split-section">
        <div><span className="eyebrow green">OMRA</span><h2>Votre voyage spirituel mérite une attention particulière.</h2><p>Préparez votre projet avec sérénité et demandez les informations disponibles sur les programmes, billets, hôtels, transport et accompagnement.</p><div className="mini-list"><span><Check size={15} /> Programmes</span><span><Check size={15} /> Billetterie</span><span><Check size={15} /> Hôtels</span><span><Check size={15} /> Informations</span></div><Link className="dark-button" to="/omra">Découvrir la rubrique Omra <ArrowRight size={17} /></Link></div>
        <div className="umrah-image"><img src={destinations.find(d => d.slug === 'makkah')?.image} alt="Makkah - inspiration de voyage" /></div>
      </div>
    </section>
    <section className="section why-section"><div className="container"><SectionHeading kicker="POURQUOI LOUJASSIL ?" title="Une approche humaine, avant tout." text="Pas de promesses artificielles. Une expérience digitale qui facilite le premier échange et laisse la place au conseil." /><div className="why-grid"><Benefit title="Une approche personnalisée" icon="sparkles" /><Benefit title="Des solutions adaptées" icon="check" /><Benefit title="Un contact direct" icon="message" /><Benefit title="Un accompagnement humain" icon="users" /><Benefit title="Plusieurs services réunis" icon="globe" /><Benefit title="Une expérience simplifiée" icon="shield" /></div></div></section>
    <section className="cta-band"><div className="container cta-content"><div><span className="eyebrow">VOTRE PROJET COMMENCE ICI</span><h2>Une destination en tête ?<br /><em>Parlons-en.</em></h2></div><div><p>Partagez votre besoin. Nous vous recontactons pour préciser votre projet.</p><button className="gold-button" onClick={onInquiry}>Demander mon devis <ArrowRight size={18} /></button></div></div></section>
  </>
}

function InquiryWidget({ onInquiry, setInquiryType }: { onInquiry: () => void; setInquiryType: (s: string) => void }) {
  const [type, setType] = useState('Voyage')
  const tabs = ['Voyage', 'Vol', 'Hôtel', 'Omra', 'Visa', 'Sur mesure']
  return <section className="inquiry-wrap"><div className="inquiry container">
    <div className="inquiry-top"><div><span className="eyebrow green">VOTRE PROJET</span><h2>Parlons de votre prochaine étape.</h2></div><span className="demo-note">DEMANDE DE DEVIS · PAS DE RÉSERVATION EN TEMPS RÉEL</span></div>
    <div className="tabs">{tabs.map(t => <button className={type === t ? 'selected' : ''} onClick={() => setType(t)} key={t}>{t}</button>)}</div>
    <div className="inquiry-fields">
      <Field icon={<MapPin size={17} />} label={type === 'Vol' ? 'Départ' : 'Destination'} value={type === 'Vol' ? 'Votre ville de départ' : 'Où souhaitez-vous aller ?'} />
      <Field icon={<CalendarDays size={17} />} label="Date" value="Choisir une date" />
      <Field icon={<Users size={17} />} label="Voyageurs" value="Nombre de voyageurs" />
      <button className="gold-button inquiry-submit" onClick={() => { setInquiryType(type); onInquiry() }}>Demander mon devis <ArrowRight size={17} /></button>
    </div>
  </div></section>
}

function Field({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="field"><span className="field-icon">{icon}</span><div><small>{label}</small><strong>{value}</strong></div><ChevronDown size={16} /></div> }

function SectionHeading({ kicker, title, text, dark = false }: { kicker: string; title: string; text: string; dark?: boolean }) { return <div className={`section-heading ${dark ? 'dark' : ''}`}><span className="eyebrow">{kicker}</span><h2>{title}</h2><p>{text}</p></div> }

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) { return <Link className="service-card" to={service.href}><div className="card-number">0{index + 1}</div><div className="service-icon"><Icon name={service.icon} /></div><h3>{service.title}</h3><p>{service.description}</p><span className="card-arrow"><ArrowRight size={17} /></span></Link> }

function DestinationCard({ destination, featured = false }: { destination: typeof destinations[number]; featured?: boolean }) { return <Link className={`destination-card ${featured ? 'featured' : ''}`} to={`/destinations/${destination.slug}`}><img src={destination.image} alt={`${destination.city}, ${destination.country}`} loading="lazy" /><div className="destination-shade" /><div className="destination-copy"><span>{destination.country}</span><h3>{destination.city}</h3><small>Explorer <ArrowRight size={14} /></small></div></Link> }

function OfferCard({ offer }: { offer: typeof offers[number] }) { return <article className="offer-card"><div className="offer-image"><img src={offer.image} alt={offer.city} loading="lazy" /><span>{offer.tag}</span></div><div className="offer-body"><div className="offer-meta"><span>{offer.category}</span><span>{offer.duration}</span></div><h3>{offer.city}</h3><p>{offer.description}</p><strong>Prix sur demande</strong><Link to={`/offres/${offer.slug}`} className="under-link">Découvrir <ArrowRight size={15} /></Link></div></article> }

function Benefit({ title, icon }: { title: string; icon: string }) { return <div className="benefit"><div className="benefit-icon"><Icon name={icon} size={20} /></div><h3>{title}</h3><span>Une attention portée à votre projet.</span></div> }

function PageHero({ kicker, title, text, image }: { kicker: string; title: string; text: string; image?: string }) { return <section className="page-hero" style={image ? { backgroundImage: `url(${image})` } : undefined}><div className="page-hero-overlay" /><div className="container"><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{text}</p></div></section> }

function OffersPage() { return <><PageHero kicker="INSPIRATIONS" title="Nos offres" text="Des idées de voyage pour nourrir vos envies. Contenu de démonstration, à confirmer avec l’agence." image={offers[0].image} /><section className="section"><div className="container"><div className="demo-banner"><Sparkles size={18} /> Les offres affichées sont des exemples de démonstration. Aucun prix, départ ou disponibilité n’est présenté comme réel.</div><div className="offer-grid large">{offers.concat(offers).map((o, i) => <OfferCard key={`${o.slug}-${i}`} offer={o} />)}</div></div></section></> }

function OfferDetail() { const { slug } = useParams(); const offer = offers.find(o => o.slug === slug) || offers[0]; return <><PageHero kicker="OFFRE · DEMO" title={offer.city} text={offer.description} image={offer.image} /><section className="section"><div className="container detail-grid"><article className="detail-copy"><span className="eyebrow green">{offer.country} · {offer.category}</span><h2>Une idée de voyage, à construire selon vous.</h2><p>Cette page présente une inspiration éditoriale. Les dates, prestations, hôtels, transport et tarifs doivent être confirmés directement avec LOUJASSIL TRAVEL.</p><div className="detail-points"><span><Check size={16} /> Programme personnalisable</span><span><Check size={16} /> Prix sur demande</span><span><Check size={16} /> Informations confirmées avant décision</span></div><InquiryForm preset={`Demande d’information — ${offer.city}`} /></article><img className="detail-image" src={offer.image} alt={offer.city} /></div></section></> }

function DestinationsPage() { return <><PageHero kicker="INSPIRATIONS" title="Le monde vous attend." text="Une sélection de destinations de démonstration pour imaginer votre prochain voyage." image={destinations[3].image} /><section className="section"><div className="container destination-grid all">{destinations.map(d => <DestinationCard key={d.slug} destination={d} />)}</div></section></> }

function DestinationDetail() { const { slug } = useParams(); const d = destinations.find(x => x.slug === slug) || destinations[0]; return <><PageHero kicker="DESTINATION · DEMO" title={d.city} text={d.text} image={d.image} /><section className="section"><div className="container narrow"><span className="eyebrow green">{d.country}</span><h2>Imaginez votre séjour à {d.city}.</h2><p className="lead">Une destination présentée à titre d’inspiration. Les offres réelles, conditions, dates et tarifs sont à confirmer avec l’agence.</p><div className="destination-detail-card"><div><MapPin size={20} /><span>Destination</span><b>{d.city}, {d.country}</b></div><div><CalendarDays size={20} /><span>Dates</span><b>À définir</b></div><div><Users size={20} /><span>Voyageurs</span><b>À définir</b></div></div><InquiryForm preset={`Projet de voyage — ${d.city}`} /></div></section></> }

function ServicesPage() { return <><PageHero kicker="NOS SERVICES" title="Un seul point de contact." text="Des services complémentaires pour préparer votre prochain déplacement." image={destinations[1].image} /><section className="section"><div className="container service-grid large">{services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}</div></section></> }

type ServiceKind = 'flight' | 'hotel' | 'voyage' | 'custom' | 'omra' | 'visa'
const serviceCopy: Record<ServiceKind, { kicker: string; title: string; text: string; image: string; fields: string[] }> = {
  flight: { kicker: 'BILLETTERIE', title: 'Votre prochaine destination commence par un billet.', text: 'Présentez votre trajet et recevez une proposition adaptée. Aucun résultat de vol fictif n’est affiché ici.', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85', fields: ['Départ', 'Destination', 'Date', 'Retour', 'Voyageurs', 'Classe'] },
  hotel: { kicker: 'HÔTELS', title: 'Une belle destination mérite une belle adresse.', text: 'Indiquez votre destination et vos dates. Les disponibilités, tarifs et établissements sont à confirmer.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85', fields: ['Destination', 'Check-in', 'Check-out', 'Voyageurs'] },
  voyage: { kicker: 'VOYAGES ORGANISÉS', title: 'Des idées structurées pour vos prochaines découvertes.', text: 'Découvrez des inspirations et demandez les informations disponibles selon les offres de l’agence.', image: destinations[2].image, fields: ['Destination', 'Date', 'Voyageurs', 'Type de voyage'] },
  custom: { kicker: 'VOYAGE À LA CARTE', title: 'Votre voyage, à votre goût.', text: 'Une destination particulière ? Une envie de séjour ? Partagez votre projet et construisons ensemble une solution adaptée.', image: destinations[4].image, fields: ['Destination', 'Date', 'Nombre de voyageurs', 'Type de voyage', 'Budget indicatif'] },
  omra: { kicker: 'OMRA', title: 'Votre voyage spirituel mérite une attention particulière.', text: 'Demandez les informations disponibles sur les programmes, billets, hôtels, transport et préparation.', image: destinations[7].image, fields: ['Programme', 'Date', 'Voyageurs'] },
  visa: { kicker: 'VISAS', title: 'Préparez votre départ en toute sérénité.', text: 'Informations, documents à prévoir et accompagnement selon la destination et le service disponible. Aucune garantie d’acceptation n’est promise.', image: destinations[5].image, fields: ['Destination', 'Type de visa'] },
}

function ServicePage({ kind }: { kind: ServiceKind }) { const c = serviceCopy[kind]; return <><PageHero kicker={c.kicker} title={c.title} text={c.text} image={c.image} /><section className="section"><div className="container split-service"><div className="service-info"><span className="eyebrow green">VOTRE DEMANDE</span><h2>Quelques informations suffisent pour commencer.</h2><p>Ce formulaire est une demande de contact. Il ne simule ni disponibilité, ni paiement, ni réservation instantanée.</p><div className="feature-list">{c.fields.map(x => <span key={x}><Check size={15} /> {x}</span>)}</div></div><InquiryForm preset={`${c.kicker} — Demande d’information`} /></div></section></> }

function InquiryForm({ preset = 'Demande de devis' }: { preset?: string }) { const [sent, setSent] = useState(false); const [form, setForm] = useState({ name: '', phone: '', date: '', travelers: '', destination: '', message: preset }); const update = (k: string, v: string) => setForm({ ...form, [k]: v }); const submit = (e: FormEvent) => { e.preventDefault(); if (!form.name || !form.phone) return; setSent(true) }; if (sent) return <div className="success-box"><Check size={24} /><h3>Votre demande est prête.</h3><p>Pour éviter de prétendre qu’une base de données a enregistré votre demande, nous vous proposons de la transmettre directement par WhatsApp.</p><a className="gold-button" target="_blank" rel="noreferrer" href={buildWhatsAppMessage({ ...form, service: preset })}>Envoyer sur WhatsApp <MessageCircle size={17} /></a></div>; return <form className="inquiry-form" onSubmit={submit}><h3>Demander un devis</h3><label>Nom complet<input value={form.name} onChange={e => update('name', e.target.value)} required placeholder="Votre nom" /></label><label>Téléphone<input value={form.phone} onChange={e => update('phone', e.target.value)} required placeholder="05 / 06 / 07 ..." /></label><div className="form-row"><label>Destination<input value={form.destination} onChange={e => update('destination', e.target.value)} placeholder="Ex. Paris" /></label><label>Date souhaitée<input type="date" value={form.date} onChange={e => update('date', e.target.value)} /></label></div><label>Voyageurs<input value={form.travelers} onChange={e => update('travelers', e.target.value)} placeholder="Ex. 2" /></label><label>Message<textarea value={form.message} onChange={e => update('message', e.target.value)} rows={4} /></label><button className="dark-button" type="submit">Préparer ma demande <ArrowRight size={17} /></button></form> }

function AboutPage() { return <><PageHero kicker="LOUJASSIL TRAVEL" title="Le voyage à votre goût." text="Une identité profondément liée au voyage, à l’élégance et à la relation humaine." image={destinations[0].image} /><section className="section"><div className="container about-grid"><div><span className="eyebrow green">NOTRE APPROCHE</span><h2>Une présence digitale à la hauteur de votre marque.</h2><p>LOUJASSIL TRAVEL est présentée ici à travers une expérience digitale premium pensée pour le marché algérien. Le site facilite la découverte, la demande d’informations et le contact direct.</p><p>Les informations commerciales qui nécessitent une confirmation restent volontairement éditables : disponibilités, tarifs, programmes, partenariats et services précis.</p></div><div className="about-card"><img src="/loujassil-logo.jpg" alt="Logo LOUJASSIL TRAVEL" /><p>Le voyage à votre goût</p></div></div></section><HowItWorks /></> }

function HowItWorks() { return <section className="section soft-section"><div className="container"><SectionHeading kicker="SIMPLE & HUMAIN" title="Comment ça marche ?" text="Un parcours clair, du premier clic au premier échange." /><div className="steps">{['Choisissez votre projet', 'Envoyez votre demande', 'Nous vous contactons', 'Préparez votre voyage'].map((x, i) => <div className="step" key={x}><span>0{i + 1}</span><div><h3>{x}</h3><p>Une étape simple pour avancer sereinement.</p></div></div>)}</div></div></section> }

function FaqPage() { const [open, setOpen] = useState<number | null>(0); return <><PageHero kicker="FAQ" title="Questions fréquentes" text="Les réponses essentielles avant de nous présenter votre projet." image={destinations[3].image} /><section className="section"><div className="container faq-list">{faqs.map(([q, a], i) => <div className={`faq-item ${open === i ? 'open' : ''}`} key={q}><button onClick={() => setOpen(open === i ? null : i)}><span>{q}</span><ChevronDown size={19} /></button>{open === i && <p>{a}</p>}</div>)}</div></section></> }

function ContactPage() { return <><PageHero kicker="CONTACT" title="Parlons de votre projet." text="Une question, une destination ou simplement une idée ? LOUJASSIL TRAVEL est à votre écoute." image={destinations[9].image} /><section className="section"><div className="container contact-grid"><div className="contact-details"><span className="eyebrow green">LOUJASSIL TRAVEL</span><h2>Le voyage à votre goût.</h2><div className="contact-item"><MapPin size={21} /><div><small>Adresse</small><strong>{agencyConfig.address}<br />{agencyConfig.city}, Algeria {agencyConfig.postalCode}</strong></div></div><div className="contact-item"><Ticket size={21} /><div><small>Téléphone</small><a href={`tel:+21343751780`}>{agencyConfig.phone}</a><a href={`tel:+21343756438`}>{agencyConfig.phone2}</a></div></div><div className="contact-item"><Mail size={21} /><div><small>Email</small><a href={`mailto:${agencyConfig.email}`}>{agencyConfig.email}</a></div></div><div className="contact-actions"><a className="gold-button" href={buildWhatsAppMessage({ service: 'Contact général' })} target="_blank" rel="noreferrer">Parler sur WhatsApp <MessageCircle size={17} /></a><a className="outline-button" href={mapsUrl} target="_blank" rel="noreferrer">Voir l’emplacement <MapPin size={17} /></a></div></div><InquiryForm preset="Contact général" /></div></section></> }

function NotFound() { return <section className="not-found"><div><span>404</span><h1>Cette page n’existe pas.</h1><p>La route que vous cherchez n’est pas disponible.</p><Link className="gold-button" to="/">Retour à l’accueil <ArrowRight size={17} /></Link></div></section> }

function InquiryModal({ type, setType, onClose }: { type: string; setType: (s: string) => void; onClose: () => void }) { return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}><div className="modal"><button className="modal-close" onClick={onClose} aria-label="Fermer"><X /></button><span className="eyebrow green">VOTRE PROJET</span><h2>Demander un devis</h2><p>Choisissez votre type de demande puis partagez les premières informations. Vous pourrez ensuite poursuivre par WhatsApp.</p><div className="modal-types">{['Voyage', 'Vol', 'Hôtel', 'Omra', 'Visa', 'Sur mesure'].map(t => <button className={type === t ? 'selected' : ''} onClick={() => setType(t)} key={t}>{t}</button>)}</div><InquiryForm preset={`${type} — Demande de devis`} /></div></div> }

function Footer() { return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><img src="/loujassil-logo.jpg" alt="LOUJASSIL TRAVEL" /><h3>LOUJASSIL TRAVEL</h3><p>Le voyage à votre goût.</p><div className="socials"><a href="#" aria-label="Facebook"><Facebook size={18} /></a><a href="#" aria-label="Instagram"><Instagram size={18} /></a><a href="#" aria-label="Email"><Mail size={18} /></a></div></div><div><h4>Navigation</h4>{navItems.slice(0, 5).map(([x, h]) => <Link key={h} to={h}>{x}</Link>)}</div><div><h4>Services</h4>{services.slice(0, 5).map(s => <Link key={s.href} to={s.href}>{s.title}</Link>)}</div><div><h4>Nous trouver</h4><p>{agencyConfig.address}<br />{agencyConfig.city}<br />{agencyConfig.country} · {agencyConfig.postalCode}</p><a href="tel:+21343751780">{agencyConfig.phone}</a><a href={`mailto:${agencyConfig.email}`}>{agencyConfig.email}</a></div></div><div className="footer-bottom"><div className="container"><span>© {new Date().getFullYear()} LOUJASSIL TRAVEL</span><span>Le voyage à votre goût</span></div></div></footer> }

function MobileBar() { return <div className="mobile-bar"><Link to="/"><Globe2 size={18} /><span>Accueil</span></Link><Link to="/offres"><Sparkles size={18} /><span>Offres</span></Link><a className="mobile-whatsapp" href={buildWhatsAppMessage({ service: 'Contact général' })} target="_blank" rel="noreferrer"><MessageCircle size={20} /></a><Link to="/destinations"><Search size={18} /><span>Destinations</span></Link><Link to="/contact"><Mail size={18} /><span>Contact</span></Link></div> }

function Root() { return <BrowserRouter><App /></BrowserRouter> }

export default Root
