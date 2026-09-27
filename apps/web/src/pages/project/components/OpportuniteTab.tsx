import { type Concept } from '@afribiz/shared'

interface OpportuniteTabProps {
  concept: Concept
}

type Level = 'low' | 'medium' | 'high' | 'fast' | 'slow'

function ScoreMeter({ score }: { score: number }) {
  const pct = (score / 10) * 100
  const color = score >= 7 ? 'bg-emerald-500' : score >= 5 ? 'bg-amber-400' : 'bg-rose-400'
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 \${color}`}
          style={{ width: `\${pct}%` }}
        />
      </div>
      <span className="text-sm font-bold tabular-nums" style={{ minWidth: 32 }}>{score}/10</span>
    </div>
  )
}

function PillBadge({ value }: { value: Level | string }) {
  const map: Record<string, { label: string; cls: string }> = {
    high:   { label: '🔼 Élevé',   cls: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    medium: { label: '➡️ Moyen',   cls: 'bg-amber-100 text-amber-800 border-amber-200' },
    low:    { label: '🔽 Faible',  cls: 'bg-rose-100 text-rose-800 border-rose-200' },
    fast:   { label: '⚡ Rapide',  cls: 'bg-blue-100 text-blue-800 border-blue-200' },
    slow:   { label: '🐢 Lent',    cls: 'bg-slate-100 text-slate-700 border-slate-200' },
  }
  const entry = map[value] ?? { label: String(value), cls: 'bg-slate-100 text-slate-700 border-slate-200' }
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border \${entry.cls}`}>
      {entry.label}
    </span>
  )
}

export function OpportuniteTab({ concept }: OpportuniteTabProps) {
  const winner = concept.rankings[0]

  return (
    <div className="space-y-6">

      {/* ── Idée Vedette ── */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)' }}
      >
        <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full opacity-10 bg-white pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">🏆 Recommandation de l'IA</span>
          <h2 className="font-display font-bold text-3xl leading-tight">{concept.recommendedIdea}</h2>
          <p className="text-blue-100 leading-relaxed max-w-2xl">{concept.justification}</p>
        </div>
      </div>

      {/* ── 3 Concepts analysés ── */}
      <h3 className="font-display font-bold text-lg px-1">⚖️ Comparaison des 3 concepts analysés</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {concept.rankings.map((r, idx) => (
          <div
            key={r.id || idx}
            className={`card relative transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover
              \${idx === 0 ? 'border-2 border-brand' : ''}`}
          >
            {idx === 0 && (
              <span className="absolute -top-3 left-4 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                ✅ Recommandé
              </span>
            )}
            <div className="flex justify-between items-start mt-2 mb-4">
              <span className="text-3xl font-bold text-slate-200">#{idx + 1}</span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full
                  \${r.score >= 7 ? 'bg-emerald-100 text-emerald-800' : r.score >= 5 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}
              >
                {r.score}/10
              </span>
            </div>

            <h4 className="font-display font-bold text-base mb-1">{r.idea}</h4>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">{r.description}</p>

            <div className="space-y-3 border-t border-border pt-4">
              <div>
                <p className="text-xs text-slate-400 mb-1 font-medium">Score global</p>
                <ScoreMeter score={r.score} />
              </div>
              <div className="flex flex-wrap gap-2">
                <PillBadge value={r.estimatedProfitability} />
                <PillBadge value={r.startupSpeed} />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Risque :</span>
                <PillBadge value={r.risk} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
