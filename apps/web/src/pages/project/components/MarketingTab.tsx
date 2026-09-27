import { type MarketingPrompts } from '@afribiz/shared'

interface MarketingTabProps {
  marketing: MarketingPrompts
}

const NETWORK_CONFIG = {
  instagramFeed: {
    emoji: '📸',
    label: 'Post Instagram',
    gradient: 'from-pink-500 to-orange-400',
    bg: 'bg-gradient-to-br from-pink-50 to-orange-50',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-800 border-pink-200',
  },
  instagramStory: {
    emoji: '🎬',
    label: 'Story Instagram',
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  tiktok: {
    emoji: '🎵',
    label: 'TikTok / Reels',
    gradient: 'from-slate-800 to-slate-600',
    bg: 'bg-gradient-to-br from-slate-50 to-slate-100',
    border: 'border-slate-300',
    badge: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  facebook: {
    emoji: '📘',
    label: 'Publicité Facebook',
    gradient: 'from-blue-600 to-blue-400',
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  whatsappFlyer: {
    emoji: '💬',
    label: 'Flyer WhatsApp',
    gradient: 'from-emerald-500 to-green-400',
    bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  billboard: {
    emoji: '🏙️',
    label: 'Affichage Physique',
    gradient: 'from-amber-500 to-yellow-400',
    bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
  },
}

export function MarketingTab({ marketing }: MarketingTabProps) {
  const entries = (Object.keys(NETWORK_CONFIG) as (keyof typeof NETWORK_CONFIG)[])
    .filter(key => marketing[key as keyof MarketingPrompts])

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)' }}
      >
        <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full opacity-10 bg-white pointer-events-none" />
        <div className="relative z-10">
          <span className="text-purple-200 text-xs font-bold uppercase tracking-widest">📣 Stratégie Marketing</span>
          <h2 className="font-display font-bold text-2xl mt-1">Plans de contenu par réseau social</h2>
          <p className="text-purple-200 text-sm mt-1">Créé par l'IA en fonction de votre marché et secteur</p>
        </div>
      </div>

      {/* ── Grille des réseaux ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {entries.map(key => {
          const config = NETWORK_CONFIG[key]
          const data = marketing[key as keyof MarketingPrompts] as any
          if (!data) return null

          return (
            <div key={key} className={`rounded-2xl border \${config.border} \${config.bg} overflow-hidden hover:shadow-card-hover transition-shadow`}>
              {/* Barre de couleur en haut */}
              <div className={`h-1.5 w-full bg-gradient-to-r \${config.gradient}`} />

              <div className="p-5 space-y-4">
                {/* Titre réseau */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{config.emoji}</span>
                    <h3 className="font-display font-bold text-base">{config.label}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border \${config.badge}`}>
                    {data.aspectRatio || '1:1'}
                  </span>
                </div>

                {/* Concept visuel */}
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">🖼️ Concept Visuel</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{data.description}</p>
                </div>

                {/* Légende */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-white">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">✍️ Légende proposée</p>
                  <p className="text-sm text-slate-800 italic leading-relaxed">"{data.caption}"</p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">🎯 CTA :</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r \${config.gradient} text-white`}>
                    {data.cta}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
