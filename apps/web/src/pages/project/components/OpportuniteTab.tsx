import { type Concept } from '@afribiz/shared'
import { Lightbulb, Trophy, Target, AlertTriangle } from 'lucide-react'

interface OpportuniteTabProps {
  concept: Concept
}

export function OpportuniteTab({ concept }: OpportuniteTabProps) {
  // Le premier ranking correspond souvent à l'idée recommandée
  const mainRanking = concept.rankings[0]

  return (
    <div className="space-y-6">
      <div className="card bg-brand/5 border-brand/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Lightbulb size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-brand-dark mb-4">
            <Trophy size={20} />
            <h2 className="font-display font-bold text-lg">Idée Recommandée par l'IA</h2>
          </div>
          <p className="font-display font-semibold text-2xl mb-4 leading-tight">
            {concept.recommendedIdea}
          </p>
          <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-slate-700 leading-relaxed">
              {concept.justification}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {concept.rankings.map((ranking, index) => (
          <div key={ranking.id || index} className={`card \${index === 0 ? 'border-brand/30 shadow-sm' : ''}`}>
            <div className="flex justify-between items-start mb-3">
              <span className="badge-available bg-slate-100 text-slate-700 border-none px-2 py-1">
                Option #{index + 1}
              </span>
              <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-amber-100 text-amber-800">
                Score: {ranking.score}/10
              </div>
            </div>
            
            <h3 className="font-display font-bold mb-2">{ranking.idea}</h3>
            <p className="text-sm text-slate-600 mb-4 line-clamp-3" title={ranking.description}>
              {ranking.description}
            </p>
            
            <div className="space-y-2 mt-auto">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Rentabilité</span>
                <span className="font-medium capitalize">{ranking.estimatedProfitability}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Vitesse de lancement</span>
                <span className="font-medium capitalize">{ranking.startupSpeed}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Risque</span>
                <span className={`font-medium capitalize \${ranking.risk === 'high' ? 'text-error' : ranking.risk === 'medium' ? 'text-amber-600' : 'text-success'}`}>
                  {ranking.risk}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
