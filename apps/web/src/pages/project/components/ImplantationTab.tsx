import { type LocationStrategy } from '@afribiz/shared'
import { MapPin, Users, Store, TrendingUp } from 'lucide-react'

interface ImplantationTabProps {
  location: LocationStrategy
}

export function ImplantationTab({ location }: ImplantationTabProps) {
  return (
    <div className="space-y-6">
      
      {/* Recommandation Principale */}
      <div className="card bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <MapPin size={160} />
        </div>
        <div className="relative z-10">
          <h2 className="font-display font-medium text-brand-light mb-2">Zone Stratégique Recommandée</h2>
          <p className="font-display font-bold text-3xl mb-4">{location.bestZone || 'Zone à définir'}</p>
          <p className="text-white/80 max-w-2xl leading-relaxed">
            {location.strategicValue}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Comportement client */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-slate-900 border-b border-border pb-3">
            <Users size={20} className="text-brand" />
            <h3 className="font-display font-bold text-lg">Comportement Client</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            {location.customerBehavior}
          </p>
        </div>

        {/* Alternative Budget */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-slate-900 border-b border-border pb-3">
            <Store size={20} className="text-brand" />
            <h3 className="font-display font-bold text-lg">Alternative Petit Budget</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            {location.lowBudgetAlternative}
          </p>
        </div>

      </div>

      {/* Recommandation Canaux */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2 text-slate-900 border-b border-border pb-3">
          <TrendingUp size={20} className="text-brand" />
          <h3 className="font-display font-bold text-lg">Recommandation des canaux d'acquisition</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">
          {location.channelRecommendation}
        </p>
      </div>

      {/* Autres zones étudiées */}
      {location.otherZones && location.otherZones.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xl px-2">Autres zones à considérer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {location.otherZones.map((zone, idx) => (
              <div key={idx} className="card">
                <h4 className="font-display font-bold text-lg mb-2">{zone.name}</h4>
                <p className="text-sm text-slate-500 mb-4">{zone.strategicValue}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-success block mb-1">Points Forts</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                      {zone.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-error block mb-1">Points Faibles</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                      {zone.cons.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  )
}
