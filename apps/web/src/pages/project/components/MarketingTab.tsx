import { type MarketingPrompts } from '@afribiz/shared'
import { Instagram, Facebook, MessageCircle, Megaphone, Smartphone } from 'lucide-react'

interface MarketingTabProps {
  marketing: MarketingPrompts
}

export function MarketingTab({ marketing }: MarketingTabProps) {
  const networks = [
    { key: 'instagramFeed', label: 'Post Instagram', icon: Instagram, data: marketing.instagramFeed },
    { key: 'instagramStory', label: 'Story Instagram', icon: Smartphone, data: marketing.instagramStory },
    { key: 'tiktok', label: 'TikTok / Reels', icon: Smartphone, data: marketing.tiktok },
    { key: 'facebook', label: 'Publicité Facebook', icon: Facebook, data: marketing.facebook },
    { key: 'whatsappFlyer', label: 'Flyer WhatsApp', icon: MessageCircle, data: marketing.whatsappFlyer },
    { key: 'billboard', label: 'Affichage Physique', icon: Megaphone, data: marketing.billboard },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {networks.map((network) => {
          if (!network.data) return null
          
          return (
            <div key={network.key} className="card space-y-4">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <network.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">{network.label}</h3>
                  <span className="text-xs text-slate-500 font-mono">Format: {network.data.aspectRatio}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-1">Concept visuel</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{network.data.description}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Légende proposée</h4>
                <p className="text-sm text-slate-800 italic">"{network.data.caption}"</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-1">Appel à l'action (CTA)</h4>
                <span className="inline-block bg-brand/10 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                  {network.data.cta}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
