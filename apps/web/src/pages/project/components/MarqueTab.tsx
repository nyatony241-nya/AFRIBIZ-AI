import { type Branding } from '@afribiz/shared'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface MarqueTabProps {
  branding: Branding
}

function ColorSwatch({ hex, label }: { hex: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(hex).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex flex-col items-center gap-2 group focus:outline-none"
      title={`Copier \${hex}`}
    >
      <div
        className="w-16 h-16 rounded-2xl shadow-md border border-black/10 relative transition-transform group-hover:scale-110 duration-200"
        style={{ backgroundColor: hex }}
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {copied
            ? <Check size={18} className="text-white drop-shadow" />
            : <Copy size={14} className="text-white drop-shadow" />}
        </span>
      </div>
      <span className="text-[11px] font-mono text-slate-500 font-medium">{hex}</span>
      <span className="text-[11px] font-semibold text-slate-700">{label}</span>
    </button>
  )
}

export function MarqueTab({ branding }: MarqueTabProps) {
  return (
    <div className="space-y-6">

      {/* ── Hero Marque ── */}
      <div
        className="rounded-2xl p-10 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, \${branding.palette.primary}22 0%, \${branding.palette.secondary}22 100%)` }}
      >
        <div
          className="absolute inset-0 rounded-2xl border-2 opacity-30"
          style={{ borderColor: branding.palette.primary }}
        />
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">🎨 Identité de marque</span>
          <h1
            className="font-display font-black text-5xl md:text-7xl my-4 leading-none"
            style={{ color: branding.palette.primary }}
          >
            {branding.recommendedName}
          </h1>
          <p className="text-slate-600 text-xl font-medium italic">
            « {branding.tagline} »
          </p>
        </div>
      </div>

      {/* ── Palette de couleurs ── */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🎨</span>
          <div>
            <h2 className="font-display font-bold text-lg">Palette de couleurs officielle</h2>
            <p className="text-xs text-slate-400">Cliquez sur une couleur pour copier le code HEX</p>
          </div>
        </div>

        {/* Preview visuel */}
        <div className="flex h-12 rounded-xl overflow-hidden mb-6 shadow-sm">
          <div className="flex-1" style={{ backgroundColor: branding.palette.primary }} />
          <div className="flex-1" style={{ backgroundColor: branding.palette.secondary }} />
          <div className="flex-1" style={{ backgroundColor: branding.palette.accent }} />
          <div className="flex-1" style={{ backgroundColor: branding.palette.background }} />
        </div>

        <div className="flex flex-wrap justify-around gap-6">
          <ColorSwatch hex={branding.palette.primary}    label="Primaire" />
          <ColorSwatch hex={branding.palette.secondary}  label="Secondaire" />
          <ColorSwatch hex={branding.palette.accent}     label="Accent" />
          <ColorSwatch hex={branding.palette.background} label="Fond" />
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800">📖 Guide d'utilisation :</span>{' '}
          {branding.palette.usageGuide}
        </div>
      </div>

      {/* ── Options de noms ── */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">✍️</span>
          <div>
            <h2 className="font-display font-bold text-lg">Autres noms proposés</h2>
            <p className="text-xs text-slate-400">3 alternatives explorées par l'IA</p>
          </div>
        </div>
        <div className="space-y-4">
          {branding.options.map((opt, idx) => (
            <div key={idx} className="flex gap-4 p-4 rounded-xl border border-border hover:border-brand/30 hover:bg-brand-muted/30 transition-all cursor-default group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-muted text-brand-dark font-display font-black text-lg flex items-center justify-center">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-lg group-hover:text-brand-dark transition-colors">{opt.name}</h3>
                <p className="text-xs text-slate-500 italic mb-1">"{opt.positioning}"</p>
                <p className="text-sm text-slate-600">{opt.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
