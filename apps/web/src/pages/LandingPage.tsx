import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, Sparkles, MapPin, BarChart3, FileText,
  Palette, Megaphone, Target, Calendar, ChevronDown, ChevronUp,
  Star, Zap, Shield, Globe, Menu, X
} from 'lucide-react'

// ============================================================
// LANDING PAGE — Style NextGen Foundry adapté AfriBiz
// ============================================================

const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Comment ça marche', href: '#comment' },
  { label: 'Livrables', href: '#livrables' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'FAQ', href: '#faq' },
]

const DELIVERABLES = [
  {
    icon: Target,
    title: 'Analyse d\'opportunité',
    desc: 'Problème, clientèle, différenciation, scores expliqués et validation terrain.',
    color: 'text-brand',
  },
  {
    icon: Palette,
    title: 'Identité de marque',
    desc: 'Nom, slogan, 3 alternatives, palette, logo et guide de positionnement.',
    color: 'text-gold',
  },
  {
    icon: Megaphone,
    title: 'Kit marketing',
    desc: '6 visuels prêts à publier : TikTok, Instagram, WhatsApp, Facebook, billboard.',
    color: 'text-brand',
  },
  {
    icon: MapPin,
    title: 'Stratégie d\'implantation',
    desc: 'Zones candidates, justification, solution petit budget, checklist terrain.',
    color: 'text-gold',
  },
  {
    icon: BarChart3,
    title: 'Modèle économique',
    desc: '3 scénarios, 6 mois de projections, seuil de rentabilité, hypothèses éditables.',
    color: 'text-brand',
  },
  {
    icon: Calendar,
    title: 'Plan d\'action 90 jours',
    desc: 'Tâches cochables, priorités, coûts estimatifs et critères de réussite.',
    color: 'text-gold',
  },
]

const STATS = [
  { value: '6', label: 'Modules livrés', desc: 'Dossier complet en un seul outil' },
  { value: '11+', label: 'Pays couverts', desc: 'Du Sénégal au Kenya en passant par le Maroc' },
  { value: '3', label: 'Scénarios financiers', desc: 'Prudent, central et ambitieux' },
  { value: '90', label: 'Jours de plan', desc: 'Actions concrètes dès le premier jour' },
]

const STEPS = [
  {
    number: '01',
    title: 'Décrivez votre contexte',
    desc: 'Partagez votre idée ou votre budget, votre ville, votre secteur et vos ressources disponibles.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Explorez votre dossier',
    desc: 'L\'IA analyse votre marché local et génère votre dossier complet en quelques minutes.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Passez à l\'action',
    desc: 'Modifiez, affinez et exportez en PDF. Cochez vos tâches au fil de votre lancement.',
    icon: CheckCircle2,
  },
]

const FAQS = [
  {
    q: 'L\'application fonctionne-t-elle sans connexion internet rapide ?',
    a: 'La génération du dossier nécessite une connexion pour appeler l\'IA. Une fois votre dossier créé, vous pouvez le consulter et modifier vos hypothèses financières hors ligne. Nous optimisons les images pour les connexions lentes.',
  },
  {
    q: 'Les recommandations sont-elles vraiment adaptées à mon pays ?',
    a: 'Oui. Les conseils tiennent compte des moyens de paiement locaux disponibles (Wave, Orange Money, MTN MoMo, M-Pesa selon le pays), des habitudes d\'achat, du dernier kilomètre et des réalités locales. Nous signalons clairement ce qui est une hypothèse à valider sur le terrain.',
  },
  {
    q: 'Puis-je utiliser l\'outil si j\'ai un budget très limité ou nul ?',
    a: 'Oui. Un budget nul reste possible — le dossier affichera honnêtement les contraintes et proposera des solutions adaptées (démarrage minimal, ressources en nature, partenariats). Nous ne forçons pas des chiffres positifs.',
  },
  {
    q: 'Les projections financières sont-elles garanties ?',
    a: 'Non. Le dossier indique clairement : « Projections fondées sur les hypothèses indiquées ». Ce sont des outils d\'aide à la décision, pas des garanties de rentabilité. Vous pouvez ajuster toutes les hypothèses.',
  },
  {
    q: 'Comment fonctionne le parcours "J\'ai un budget" ?',
    a: 'Vous indiquez votre budget, votre ville et votre secteur préféré. L\'IA vous propose 3 concepts adaptés à votre contexte. Vous choisissez celui qui vous correspond, puis le dossier complet est généré pour ce concept.',
  },
  {
    q: 'Puis-je modifier le dossier après génération ?',
    a: 'Oui. Tous les textes sont éditables, les hypothèses financières ajustables et les sections régénérables indépendamment. L\'historique des révisions est conservé — vos corrections manuelles ne sont jamais effacées silencieusement.',
  },
]

// Exemple de dossier fictif pour l\'aperçu
const DEMO_PREVIEW = {
  name: 'FreshBox Dakar',
  sector: 'Agro-business & e-commerce',
  city: 'Dakar, Sénégal',
  budget: '850 000 FCFA',
  tagline: 'La fraîcheur du marché, livrée chez vous',
  score: 7.8,
}

// ============================================================
// NAVIGATION
// ============================================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-forest/95 backdrop-blur-md shadow-lg border-b border-forest-light/50'
          : 'bg-transparent'
      }`}
      aria-label="Navigation principale"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="AfriBiz Architect accueil">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-brand group-hover:shadow-brand-lg transition-shadow duration-200">
              <span className="text-white font-display font-bold text-base">A</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-display font-bold text-base leading-none">AfriBiz</div>
              <div className="text-green-300 text-xs font-medium">Architect</div>
            </div>
          </Link>

          {/* Nav desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-green-200 hover:text-white px-3 py-2 rounded-lg hover:bg-forest-light/60 transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/connexion"
              className="text-sm font-medium text-green-200 hover:text-white transition-colors px-3 py-2"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              className="btn-primary text-sm"
            >
              Construire mon projet
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden p-2 text-green-200 hover:text-white rounded-lg hover:bg-forest-light/60"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menu mobile */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-forest-deep border-b border-forest-light shadow-xl animate-fade-in-up">
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-green-200 hover:text-white px-3 py-3 rounded-lg hover:bg-forest-light/60 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-forest-light mt-2 pt-3 flex flex-col gap-2">
                <Link to="/connexion" className="btn-secondary text-sm w-full justify-center">
                  Connexion
                </Link>
                <Link to="/inscription" className="btn-primary text-sm w-full justify-center">
                  Construire mon projet <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ============================================================
// HERO
// ============================================================
function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-forest-gradient"
      aria-label="Section héro"
    >
      {/* Grille décorative */}
      <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />

      {/* Orbe lumineux — inspiré du design NextGen Foundry */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full animate-glow-pulse"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(5,150,105,0.45) 0%, rgba(5,150,105,0.2) 35%, rgba(16,45,38,0.05) 70%, transparent 100%)',
            filter: 'blur(2px)',
          }}
        />
        {/* Second orbe plus petit et plus intense */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[280px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(5,150,105,0.6) 0%, rgba(16,45,38,0.1) 60%, transparent 100%)',
          }}
        />
        {/* Particules étoiles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-green-300/60 rounded-full"
            style={{
              left: `${10 + (i * 4.5) % 80}%`,
              top: `${5 + (i * 7) % 55}%`,
              opacity: 0.3 + (i % 5) * 0.14,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Contenu hero */}
      <div className="section-container relative z-10 text-center pt-28 pb-20 flex flex-col items-center">

        {/* Badge NEW */}
        <div className="inline-flex items-center gap-2 bg-forest-light/80 border border-brand/40 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <span className="badge-new text-xs px-2 py-0.5">NOUVEAU</span>
          <span className="text-green-200 text-sm font-medium">
            Dossier d'entreprise adapté à votre marché local
          </span>
        </div>

        {/* Titre principal */}
        <h1 className="font-display text-white mb-6 animate-fade-in-up text-balance" style={{ animationDelay: '0.1s', fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', lineHeight: '1.08', letterSpacing: '-0.02em' }}>
          Votre idée mérite<br />
          <span className="text-brand-light">un vrai plan</span> de lancement.
        </h1>

        {/* Sous-titre */}
        <p className="text-green-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-fade-in-up font-sans" style={{ animationDelay: '0.2s' }}>
          Étudiez votre marché, créez votre marque et préparez vos premiers mois
          d'activité, selon votre ville et votre budget.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/inscription" className="btn-primary-lg">
            Construire mon projet
            <ArrowRight size={20} />
          </Link>
          <Link to="/exemple" className="btn-outline-white text-base px-8">
            Explorer un dossier exemple
          </Link>
        </div>

        {/* Social proof miniature */}
        <p className="text-green-300/60 text-sm mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Adapté aux réalités des marchés africains · Sénégal · Côte d'Ivoire · Cameroun · Kenya · et plus
        </p>

        {/* Aperçu dossier fictif flottant */}
        <DemoPreviewCard />
      </div>

      {/* Flèche de scroll */}
      <a
        href="#comment"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-green-300/60 hover:text-green-300 transition-colors"
        aria-label="Faire défiler vers le bas"
      >
        <span className="text-xs font-medium">Découvrir</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  )
}

function DemoPreviewCard() {
  return (
    <div className="mt-16 w-full max-w-2xl animate-float animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      {/* Label fictif */}
      <div className="flex items-center justify-center mb-3">
        <span className="badge bg-gold/20 text-gold border border-gold/30 text-xs">
          ★ Exemple fictif — données illustratives
        </span>
      </div>

      <div className="bg-forest-light/60 backdrop-blur-md border border-forest-light rounded-card p-6 shadow-dialog text-left">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white font-display font-bold text-xl">{DEMO_PREVIEW.name}</h3>
            <p className="text-green-300 text-sm mt-0.5">{DEMO_PREVIEW.sector} · {DEMO_PREVIEW.city}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="badge-available text-xs">Dossier disponible</div>
            <span className="text-gold font-bold text-lg">{DEMO_PREVIEW.score}/10</span>
          </div>
        </div>

        <p className="text-green-200 text-sm italic mb-4">« {DEMO_PREVIEW.tagline} »</p>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Budget', val: DEMO_PREVIEW.budget },
            { label: 'Seuil', val: 'Mois 4' },
            { label: 'Visuels', val: '7 prêts' },
          ].map(item => (
            <div key={item.label} className="bg-forest/60 rounded-input p-3 text-center">
              <div className="text-white font-bold text-sm">{item.val}</div>
              <div className="text-green-400 text-xs mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          {['Opportunité ✓', 'Marque ✓', 'Marketing ✓', 'Finances ✓', 'Plan 90j ✓'].map(tag => (
            <span key={tag} className="text-xs bg-brand/20 text-brand-light border border-brand/30 rounded-full px-2.5 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// LOGOS / PAYS (remplace les logos partenaires du design)
// ============================================================
function CountriesBar() {
  const countries = [
    '🇸🇳 Sénégal', '🇨🇮 Côte d\'Ivoire', '🇨🇲 Cameroun', '🇬🇦 Gabon',
    '🇨🇩 RD Congo', '🇧🇯 Bénin', '🇳🇬 Nigéria', '🇰🇪 Kenya',
    '🇬🇭 Ghana', '🇲🇦 Maroc', '🇹🇬 Togo',
  ]

  return (
    <section className="bg-ivory border-y border-border py-8 overflow-hidden">
      <div className="section-container">
        <p className="text-center text-sm text-slate-400 font-medium mb-6 uppercase tracking-wider">
          Marchés couverts
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {countries.map(c => (
            <span key={c} className="text-sm font-medium text-slate-600 px-3 py-1.5 rounded-full border border-border bg-surface hover:border-brand hover:text-brand-dark transition-all duration-150 cursor-default">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// STATS (style NextGen Foundry — 4 grandes cartes)
// ============================================================
function StatsSection() {
  return (
    <section className="bg-ivory py-20">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="section-tag">
            <Zap size={14} />
            Bénéfices
          </span>
          <h2 className="font-display text-title text-slate-900 mb-3">
            Les avantages d'<span className="text-brand-dark">AfriBiz Architect</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Un outil conçu pour les réalités des marchés africains, pas une solution générique adaptée.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <div key={i} className="stat-card text-center group hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// COMMENT ÇA MARCHE (3 étapes)
// ============================================================
function HowItWorksSection() {
  return (
    <section id="comment" className="bg-surface py-24 border-t border-border">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-tag">
            <Sparkles size={14} />
            Comment ça marche
          </span>
          <h2 className="font-display text-title text-slate-900 mb-3">
            Transformez vos <span className="text-brand-dark">idées</span> en solutions de marché
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Créez votre dossier d'entrepreneur en 4 étapes — sans expérience en rédaction de business plans.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Ligne de connexion desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-brand/30 via-brand to-brand/30" style={{ left: '18%', right: '18%' }} />

          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
              {/* Numéro d'étape */}
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center shadow-brand text-white relative z-10">
                  <step.icon size={26} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-forest flex items-center justify-center text-white text-xs font-bold border-2 border-ivory z-20">
                  {i + 1}
                </div>
              </div>

              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link to="/inscription" className="btn-primary-lg inline-flex">
            Commencer maintenant
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 6 LIVRABLES
// ============================================================
function DeliverablesSection() {
  return (
    <section id="livrables" className="bg-ivory py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-tag">
            <FileText size={14} />
            Votre dossier
          </span>
          <h2 className="font-display text-title text-slate-900 mb-3">
            Six modules, un dossier <span className="text-brand-dark">complet</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Chaque section est générée, modifiable et exportable en PDF.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DELIVERABLES.map((d, i) => (
            <div key={i} className="card group hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`w-11 h-11 rounded-xl bg-brand-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <d.icon size={22} className={d.color} />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 mb-2">{d.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA encadré — style CTA section du design */}
        <div className="mt-16 rounded-card bg-forest p-10 text-center relative overflow-hidden">
          {/* Orbe décoratif */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(5,150,105,0.2) 0%, transparent 70%)'
          }} />
          <div className="relative z-10">
            <h3 className="font-display text-white text-2xl md:text-3xl font-bold mb-3">
              Prêt à lancer votre projet ?
            </h3>
            <p className="text-green-200 mb-7 max-w-lg mx-auto">
              Rejoignez des porteurs de projets qui préparent leur activité sur les marchés africains avec méthode.
            </p>
            <Link to="/inscription" className="btn-primary-lg inline-flex">
              Construire mon projet
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// FAQ
// ============================================================
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-surface py-24 border-t border-border">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">
              <Shield size={14} />
              FAQ
            </span>
            <h2 className="font-display text-title text-slate-900 mb-3">
              Questions fréquentes
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="card border border-border">
                <button
                  className="w-full flex items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-slate-900 text-sm leading-relaxed">{faq.q}</span>
                  <span className="text-brand mt-0.5 shrink-0">
                    {openIndex === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {openIndex === i && (
                  <p className="mt-4 text-slate-600 text-sm leading-relaxed border-t border-border pt-4 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="bg-forest-deep border-t border-forest-light py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">A</span>
              </div>
              <span className="text-white font-display font-bold">AfriBiz Architect</span>
            </div>
            <p className="text-green-300/70 text-sm leading-relaxed">
              De l'idée au lancement. Transformez votre idée et votre budget en un dossier d'entreprise adapté à votre marché local.
            </p>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Produit</h4>
              <ul className="flex flex-col gap-2">
                {[
                  { label: 'Comment ça marche', href: '#comment' },
                  { label: 'Livrables', href: '#livrables' },
                  { label: 'Exemple de dossier', href: '/exemple' },
                  { label: 'FAQ', href: '#faq' },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-green-300/70 hover:text-green-200 text-sm transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Compte</h4>
              <ul className="flex flex-col gap-2">
                {[
                  { label: 'Connexion', href: '/connexion' },
                  { label: 'Inscription', href: '/inscription' },
                  { label: 'Paramètres', href: '/parametres' },
                ].map(l => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-green-300/70 hover:text-green-200 text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-forest-light mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-300/50 text-xs">
            © 2026 AfriBiz Architect. Projections fondées sur les hypothèses indiquées — pas de rentabilité garantie.
          </p>
          <div className="flex items-center gap-1 text-green-300/50 text-xs">
            <Globe size={12} />
            <span>Fait pour l'Afrique</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================================
// PAGE PRINCIPALE
// ============================================================
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CountriesBar />
        <StatsSection />
        <HowItWorksSection />
        <DeliverablesSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
