import { Link } from 'react-router-dom'
import { Lock, ArrowRight, Zap } from 'lucide-react'
import type { ReactNode } from 'react'

// ============================================================
// COMPOSANT FREEMIUM GATE
// Floute le contenu et affiche un CTA d'achat
// ============================================================
interface FreemiumGateProps {
  children: ReactNode
  isUnlocked: boolean
  sectionLabel: string
  ctaText?: string
  /** 0 à 1 — pourcentage du contenu visible avant le flou */
  previewRatio?: number
}

export function FreemiumGate({
  children,
  isUnlocked,
  sectionLabel,
  ctaText = 'Débloquer cette section',
  previewRatio = 0.35,
}: FreemiumGateProps) {
  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Contenu flouté */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>

      {/* Overlay gradient + flou */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-6"
        style={{
          background: `linear-gradient(to bottom, transparent ${Math.round(previewRatio * 100)}%, rgba(255,251,245,0.85) ${Math.round(previewRatio * 100) + 15}%, rgba(255,251,245,0.97) 100%)`,
          backdropFilter: `blur(0px)`,
        }}
      >
        {/* Flou uniquement sur la partie basse */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            maskImage: `linear-gradient(to bottom, transparent ${Math.round(previewRatio * 100) - 5}%, black ${Math.round(previewRatio * 100) + 20}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent ${Math.round(previewRatio * 100) - 5}%, black ${Math.round(previewRatio * 100) + 20}%)`,
          }}
        />

        {/* CTA */}
        <div className="relative z-10 text-center">
          <div className="w-10 h-10 rounded-full bg-slate-900/10 border border-slate-200 flex items-center justify-center mx-auto mb-3">
            <Lock size={18} className="text-slate-500" />
          </div>
          <p className="font-semibold text-slate-900 text-sm mb-1">{sectionLabel}</p>
          <p className="text-xs text-slate-500 mb-4">Disponible avec 1 crédit (2 500 FCFA)</p>
          <Link
            to="/tarifs"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-brand hover:shadow-brand-lg"
          >
            <Zap size={15} />
            {ctaText}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Badge en haut */}
      <div className="absolute top-3 right-3 z-20">
        <span className="flex items-center gap-1 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
          <Lock size={10} /> Premium
        </span>
      </div>
    </div>
  )
}

// ============================================================
// BANNIÈRE "DÉBLOQUER LE DOSSIER COMPLET"
// Affichée en haut du dossier si non débloqué
// ============================================================
interface UnlockBannerProps {
  projectId: string
  creditsBalance: number
}

export function UnlockBanner({ projectId, creditsBalance }: UnlockBannerProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 no-print">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Lock size={18} className="text-amber-600" />
          <h3 className="font-bold text-amber-900">Prévisualisation — 40% du contenu visible</h3>
        </div>
        <p className="text-amber-700 text-sm leading-relaxed">
          Votre dossier est prêt. Débloquez le contenu complet pour accéder à l'analyse détaillée,
          les visuels HD, les projections financières complètes et le plan d'action détaillé.
        </p>
        {creditsBalance > 0 && (
          <p className="text-brand-dark font-semibold text-sm mt-1.5">
            ✅ Vous avez {creditsBalance} crédit{creditsBalance > 1 ? 's' : ''} disponible{creditsBalance > 1 ? 's' : ''} — déblocage immédiat !
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 shrink-0">
        {creditsBalance > 0 ? (
          <button
            className="btn-primary whitespace-nowrap"
            onClick={async () => {
              try {
                const res = await fetch((import.meta.env.VITE_API_URL || "") + , {
                  method: 'POST',
                  credentials: 'include',
                })
                if (res.ok) {
                  window.location.reload()
                }
              } catch {
                // Fallback démo
                window.location.reload()
              }
            }}
          >
            <Zap size={16} />
            Débloquer (1 crédit)
          </button>
        ) : (
          <Link to="/tarifs" className="btn-primary whitespace-nowrap">
            <Zap size={16} />
            Acheter des crédits
            <ArrowRight size={16} />
          </Link>
        )}
        <Link to="/tarifs" className="btn-secondary whitespace-nowrap text-sm">
          Voir les tarifs
        </Link>
      </div>
    </div>
  )
}
