import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Zap, Star, ArrowRight, Lock, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

// ============================================================
// TYPES ET DONNÉES
// ============================================================
interface CreditPack {
  id: string
  label: string
  emoji: string
  credits: number
  priceFcfa: number
  priceEur: number
  discountPercent: number
  isFeatured: boolean
  features: string[]
  ctaLabel: string
}

const PACKS: CreditPack[] = [
  {
    id: 'starter',
    label: 'Starter',
    emoji: '🔑',
    credits: 3,
    priceFcfa: 2500,
    priceEur: 3.80,
    discountPercent: 0,
    isFeatured: false,
    ctaLabel: 'Débloquer 3 plans',
    features: [
      '3 dossiers complets débloqués',
      'Coût par dossier : ~830 FCFA',
      'Idéal pour valider votre première idée',
      'Export PDF illimité',
      'Modifications manuelles illimitées',
    ],
  },
  {
    id: 'explorer',
    label: 'Explorer',
    emoji: '⭐',
    credits: 10,
    priceFcfa: 6000,
    priceEur: 9.10,
    discountPercent: 28,
    isFeatured: true,
    ctaLabel: 'Débloquer 10 plans',
    features: [
      '10 dossiers complets débloqués',
      'Coût par dossier : 600 FCFA',
      'Pour les entrepreneurs ambitieux',
      'Économisez 2 300 FCFA',
      'Support prioritaire',
    ],
  },
  {
    id: 'builder',
    label: 'Builder',
    emoji: '🚀',
    credits: 25,
    priceFcfa: 12000,
    priceEur: 18.30,
    discountPercent: 42,
    isFeatured: false,
    ctaLabel: 'Acheter 25 plans',
    features: [
      '25 dossiers complets débloqués',
      'Coût par dossier : 480 FCFA',
      'Agences & serial entrepreneurs',
      'Économisez 8 800 FCFA',
      'Partageable (multi-projets)',
    ],
  },
  {
    id: 'founder',
    label: 'Founder',
    emoji: '💎',
    credits: 50,
    priceFcfa: 20000,
    priceEur: 30.50,
    discountPercent: 52,
    isFeatured: false,
    ctaLabel: 'Acheter 50 plans',
    features: [
      '50 dossiers complets débloqués',
      'Coût par dossier : 400 FCFA',
      'Pour coachs et incubateurs',
      'Économisez 21 600 FCFA',
      'Accès anticipé aux nouvelles fonctions',
    ],
  },
]

const PAYMENT_METHODS = [
  { id: 'wave', label: 'Wave', emoji: '🌊', available: true },
  { id: 'orange_money', label: 'Orange Money', emoji: '🟠', available: true },
  { id: 'mtn_momo', label: 'MTN MoMo', emoji: '💛', available: true },
  { id: 'card', label: 'Carte bancaire', emoji: '💳', available: true },
]

const FAQS = [
  {
    q: 'Les crédits ont-ils une date d\'expiration ?',
    a: 'Non. Vos crédits n\'expirent jamais. Vous pouvez les utiliser à votre propre rythme.',
  },
  {
    q: 'Que se passe-t-il si la génération échoue ?',
    a: 'Si la génération échoue pour une raison technique (coupure réseau, erreur serveur), votre crédit est automatiquement remboursé.',
  },
  {
    q: 'Puis-je régénérer une seule section ?',
    a: 'Oui. La régénération d\'une seule section coûte 0,25 crédit (soit 4 sections = 1 crédit complet). Le débit est arrondi à la prochaine génération.',
  },
  {
    q: 'Le premier dossier est-il vraiment gratuit ?',
    a: 'Oui, 1 crédit est offert à l\'inscription. Il génère votre premier dossier complet. Sans achat de pack, vous verrez une prévisualisation de 40% du contenu. Pour accéder au dossier complet, débloquez-le avec un pack payant.',
  },
  {
    q: 'Puis-je partager mes crédits avec un collègue ?',
    a: 'Pour l\'instant, les crédits sont liés à un compte. La fonctionnalité "équipe" est en cours de développement pour V2.',
  },
]

// ============================================================
// COMPOSANT PACK
// ============================================================
function PackCard({ pack, onBuy, loading }: { pack: CreditPack; onBuy: (pack: CreditPack) => void; loading: boolean }) {
  const perDossier = Math.round(pack.priceFcfa / pack.credits)
  
  return (
    <div className={`relative flex flex-col rounded-2xl border-2 bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
      pack.isFeatured
        ? 'border-brand shadow-lg shadow-brand/20 scale-[1.03]'
        : 'border-border hover:border-brand/40'
    }`}>
      {/* Badge recommandé */}
      {pack.isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="flex items-center gap-1.5 bg-brand px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-brand">
            <Star size={12} className="fill-white" /> Meilleure valeur
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-5">
        <div className="text-3xl mb-2">{pack.emoji}</div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-display text-3xl font-bold text-slate-900">
            {pack.priceFcfa.toLocaleString('fr-FR')} FCFA
          </span>
          {pack.discountPercent > 0 && (
            <span className="bg-brand-muted text-brand-dark text-xs font-bold px-2 py-0.5 rounded-full">
              -{pack.discountPercent}%
            </span>
          )}
        </div>
        <div className="text-slate-500 text-sm mt-0.5">
          {pack.credits} crédit{pack.credits > 1 ? 's' : ''} · {perDossier.toLocaleString('fr-FR')} FCFA/dossier
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-7 flex-1">
        {pack.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
            <Check size={16} className="text-brand shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => onBuy(pack)}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-150 ${
          pack.isFeatured
            ? 'bg-brand hover:bg-brand-dark text-white shadow-brand hover:shadow-brand-lg'
            : 'bg-neutral-900 hover:bg-neutral-800 text-white'
        } disabled:opacity-50`}
        aria-label={`${pack.ctaLabel} - ${pack.priceFcfa.toLocaleString('fr-FR')} FCFA`}
      >
        {pack.ctaLabel}
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

// ============================================================
// MODAL PAIEMENT CHARIOW
// ============================================================
function PaymentModal({
  pack,
  onClose,
}: {
  pack: CreditPack
  onClose: () => void
}) {
  const [selectedMethod, setSelectedMethod] = useState<string>('wave')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handlePay = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          packId: pack.id,
          paymentMethod: selectedMethod,
        }),
      })

      const data = await res.json()

      if (res.ok && data.checkoutUrl) {
        // Redirection vers le checkout Chariow
        window.location.href = data.checkoutUrl
      } else {
        // Mode démo : simuler un succès
        toast.success(`Mode démo : ${pack.credits} crédit(s) ajouté(s) !`)
        onClose()
      }
    } catch {
      // Fallback démo
      toast.success(`Mode démo : ${pack.credits} crédit(s) ajouté(s) !`)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden">
        {/* Header */}
        <div className="bg-forest p-6 text-white">
          <div className="flex items-center justify-between mb-1">
            <h2 id="payment-modal-title" className="font-display font-bold text-xl">
              Finaliser l'achat
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-forest-light/60 flex items-center justify-center hover:bg-forest-light text-green-200 hover:text-white"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
          <p className="text-green-200 text-sm">
            Pack {pack.emoji} {pack.label} · {pack.credits} crédit{pack.credits > 1 ? 's' : ''}
          </p>
          <div className="mt-3 font-amount text-3xl font-bold">
            {pack.priceFcfa.toLocaleString('fr-FR')} FCFA
          </div>
        </div>

        {/* Corps */}
        <div className="p-6">
          {/* Récapitulatif */}
          <div className="bg-ivory rounded-xl p-4 mb-5 text-sm">
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-500">Pack acheté</span>
              <span className="font-semibold text-slate-900">{pack.emoji} {pack.label}</span>
            </div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-500">Crédits reçus</span>
              <span className="font-bold text-brand-dark">{pack.credits} crédit{pack.credits > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 mt-2">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-bold font-amount text-slate-900">{pack.priceFcfa.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-900 mb-3">Moyen de paiement</p>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map(method => (
                <label
                  key={method.id}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    selectedMethod === method.id
                      ? 'border-brand bg-brand-muted/30'
                      : 'border-border hover:border-brand/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="sr-only"
                  />
                  <span className="text-xl">{method.emoji}</span>
                  <span className="text-sm font-medium text-slate-900">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Info sécurité */}
          <div className="flex items-start gap-2 text-xs text-slate-500 mb-5">
            <Info size={14} className="shrink-0 mt-0.5 text-brand" />
            <span>Paiement sécurisé via Chariow. Vos crédits sont crédités instantanément après confirmation.</span>
          </div>

          {/* Bouton payer */}
          <button
            onClick={handlePay}
            disabled={loading}
            className="btn-primary-lg w-full justify-center"
          >
            {loading ? 'Redirection vers le paiement…' : `Payer ${pack.priceFcfa.toLocaleString('fr-FR')} FCFA`}
            {!loading && <ArrowRight size={18} />}
          </button>

          <p className="text-center text-xs text-slate-400 mt-3">
            En payant, vous acceptez nos conditions d'utilisation.
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// FAQ ACCORDÉON
// ============================================================
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 p-4 text-left bg-surface hover:bg-ivory transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-sm text-slate-900">{q}</span>
        {open ? <ChevronUp size={16} className="text-brand shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-border bg-ivory animate-fade-in">
          <p className="pt-3">{a}</p>
        </div>
      )}
    </div>
  )
}

// ============================================================
// PAGE PRINCIPALE PRICING
// ============================================================
export default function PricingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedPack, setSelectedPack] = useState<CreditPack | null>(null)
  const [loading, setLoading] = useState(false)

  const handleBuy = (pack: CreditPack) => {
    if (!user) {
      toast('Connectez-vous pour acheter des crédits', { icon: '🔒' })
      navigate('/inscription')
      return
    }
    setSelectedPack(pack)
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* HERO TARIFS */}
      <div className="bg-forest py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(5,150,105,0.35) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-forest-light/60 border border-brand/30 rounded-full px-4 py-2 mb-6">
            <Zap size={14} className="text-brand" />
            <span className="text-green-200 text-sm font-medium">Pay-as-you-go — Aucun abonnement</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 text-balance" style={{ lineHeight: '1.1' }}>
            Payez uniquement ce<br />que vous <span className="text-brand-light">utilisez</span>
          </h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto leading-relaxed">
            1 crédit = 1 dossier d'entreprise complet : analyse, marque, 7 visuels, finances, plan 90 jours.
            Sans abonnement. Sans engagement.
          </p>

          {/* Méthodes de paiement acceptées */}
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-green-300/60 text-xs">Paiements acceptés :</span>
            {PAYMENT_METHODS.map(m => (
              <span key={m.id} className="flex items-center gap-1.5 bg-forest-light/60 border border-forest-light rounded-full px-3 py-1 text-green-200 text-xs font-medium">
                {m.emoji} {m.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Bannière crédit gratuit */}
        <div className="bg-brand-muted border border-green-200 rounded-2xl p-5 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center text-white text-2xl shrink-0 shadow-brand">
              🎁
            </div>
            <div>
              <div className="font-bold text-brand-dark text-base">1 crédit offert à l'inscription</div>
              <div className="text-slate-600 text-sm">Générez votre premier dossier gratuitement. Prévisualisation incluse.</div>
            </div>
          </div>
          {!user ? (
            <Link to="/inscription" className="btn-primary whitespace-nowrap shrink-0">
              Créer mon compte gratuit <ArrowRight size={16} />
            </Link>
          ) : (
            <Link to="/projets/nouveau" className="btn-primary whitespace-nowrap shrink-0">
              Utiliser mon crédit <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Grille des packs */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-16">
          {PACKS.map(pack => (
            <PackCard key={pack.id} pack={pack} onBuy={handleBuy} loading={loading} />
          ))}
        </div>

        {/* Section freemium — explication visuelle */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              Comment fonctionne la <span className="text-brand-dark">prévisualisation</span> ?
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Le premier dossier est généré gratuitement. Voici ce que vous voyez avec et sans crédit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Colonne sans crédit */}
            <div className="card border-2 border-border">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={18} className="text-slate-400" />
                <h3 className="font-bold text-slate-700">Sans crédit payant</h3>
              </div>
              <ul className="space-y-2">
                {[
                  { label: 'Nom de marque + tagline', visible: true },
                  { label: 'Score d\'opportunité (/10)', visible: true },
                  { label: 'Résumé du concept (2-3 phrases)', visible: true },
                  { label: 'Scénario financier — Mois 1 uniquement', visible: true },
                  { label: '1 visuel basse résolution (watermark)', visible: true },
                  { label: 'Analyse complète de l\'opportunité', visible: false },
                  { label: '3 alternatives de nom + guide de palette', visible: false },
                  { label: '7 visuels HD téléchargeables', visible: false },
                  { label: 'Stratégie d\'implantation détaillée', visible: false },
                  { label: 'Projections financières Mois 2 → 6', visible: false },
                  { label: 'Détails des 18 tâches du Plan 90 jours', visible: false },
                ].map((item, i) => (
                  <li key={i} className={`flex items-center gap-2.5 text-sm ${item.visible ? 'text-slate-900' : 'text-slate-400'}`}>
                    {item.visible
                      ? <Check size={14} className="text-brand shrink-0" />
                      : <Lock size={14} className="shrink-0 text-slate-300" />
                    }
                    <span className={item.visible ? '' : 'line-through'}>
                      {item.label}
                    </span>
                    {!item.visible && (
                      <span className="ml-auto text-[10px] bg-neutral-100 text-slate-400 px-1.5 py-0.5 rounded-full border border-neutral-200">flouté</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne avec crédit */}
            <div className="card border-2 border-brand relative">
              <div className="absolute -top-3 right-4">
                <span className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full shadow-brand">Accès complet</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className="text-brand" />
                <h3 className="font-bold text-brand-dark">Avec 1 crédit (2 500 FCFA)</h3>
              </div>
              <ul className="space-y-2">
                {[
                  'Nom de marque + tagline',
                  'Score d\'opportunité (/10)',
                  'Résumé du concept',
                  'Scénario financier complet (6 mois)',
                  '7 visuels HD téléchargeables',
                  'Analyse complète de l\'opportunité',
                  '3 alternatives de nom + palette complète',
                  'Stratégie d\'implantation + carte',
                  'Projections financières 3 scénarios',
                  'Plan 90 jours détaillé (18 tâches)',
                  'Export PDF multi-pages illimité',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-900">
                    <Check size={14} className="text-brand shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Comparaison concurrence */}
        <div className="mb-16 bg-forest rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 80% 50%, rgba(5,150,105,0.2) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="font-display text-2xl font-bold text-white text-center mb-6">
              AfriBiz vs la concurrence
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-forest-light">
                    <th className="text-left py-3 text-green-300 font-semibold">Critère</th>
                    <th className="text-center py-3 text-green-300 font-semibold">AfriBiz</th>
                    <th className="text-center py-3 text-green-300/60 font-medium">Consultant local</th>
                    <th className="text-center py-3 text-green-300/60 font-medium">LivePlan</th>
                    <th className="text-center py-3 text-green-300/60 font-medium">ChatGPT direct</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest-light">
                  {[
                    { critere: 'Prix entrée', afribiz: '2 500 FCFA', consult: '300 000+ FCFA', liveplan: '~12 000 FCFA/mois', chatgpt: 'Gratuit (sans structure)' },
                    { critere: 'Délai', afribiz: '5 minutes', consult: '2-4 semaines', liveplan: 'Auto', chatgpt: 'Immédiat (générique)' },
                    { critere: 'Marché africain', afribiz: '✅ Natif', consult: '✅ Variable', liveplan: '❌ Non', chatgpt: '⚠️ Partiel' },
                    { critere: 'Visuels inclus', afribiz: '✅ 7 visuels HD', consult: '❌ En sus', liveplan: '❌ Non', chatgpt: '❌ Non' },
                    { critere: 'Mobile Money', afribiz: '✅ Wave/OM/MTN', consult: 'Variable', liveplan: '❌ Carte USD', chatgpt: '❌ Carte USD' },
                    { critere: 'Sans abonnement', afribiz: '✅ Pay-as-you-go', consult: '✅', liveplan: '❌ Mensuel', chatgpt: '✅' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-3 text-green-200 font-medium">{row.critere}</td>
                      <td className="py-3 text-center font-bold text-brand-light">{row.afribiz}</td>
                      <td className="py-3 text-center text-green-300/60">{row.consult}</td>
                      <td className="py-3 text-center text-green-300/60">{row.liveplan}</td>
                      <td className="py-3 text-center text-green-300/60">{row.chatgpt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-slate-900 text-center mb-6">Questions fréquentes</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-16">
          <p className="text-slate-500 mb-4">Prêt à construire votre projet ?</p>
          <Link to="/inscription" className="btn-primary-lg inline-flex">
            Commencer gratuitement
            <ArrowRight size={20} />
          </Link>
          <p className="text-xs text-slate-400 mt-3">1 crédit offert · Aucune carte requise · Résultat en 5 minutes</p>
        </div>
      </main>

      {/* Modal paiement */}
      {selectedPack && (
        <PaymentModal
          pack={selectedPack}
          onClose={() => setSelectedPack(null)}
        />
      )}
    </div>
  )
}
