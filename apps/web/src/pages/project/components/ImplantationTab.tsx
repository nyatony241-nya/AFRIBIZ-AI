import { type LocationStrategy } from '@afribiz/shared'
import { Check, X } from 'lucide-react'

interface ImplantationTabProps {
  location: LocationStrategy
}

export function ImplantationTab({ location }: ImplantationTabProps) {
  return (
    <div className="space-y-6">

      {/* ── Hero Zone ── */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)' }}
      >
        <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full opacity-10 bg-white pointer-events-none" />
        <div className="absolute top-6 right-6 text-6xl opacity-20 pointer-events-none">📍</div>
        <div className="relative z-10">
          <span className="text-amber-200 text-xs font-bold uppercase tracking-widest">📍 Zone stratégique recommandée</span>
          <h2 className="font-display font-bold text-3xl mt-2 mb-3">
            {location.bestZone || 'À définir avec votre terrain'}
          </h2>
          <p className="text-amber-100 leading-relaxed max-w-2xl">
            {location.strategicValue}
          </p>
        </div>
      </div>

      {/* ── 3 infos clés ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card hover:shadow-card-hover transition-shadow">
          <div className="text-3xl mb-3">👣</div>
          <h3 className="font-display font-bold text-base mb-2">Comportement client</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{location.customerBehavior}</p>
        </div>
        <div className="card hover:shadow-card-hover transition-shadow bg-emerald-50 border-emerald-200">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="font-display font-bold text-base mb-2">Alternative petit budget</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{location.lowBudgetAlternative}</p>
        </div>
        <div className="card hover:shadow-card-hover transition-shadow bg-blue-50 border-blue-200">
          <div className="text-3xl mb-3">📡</div>
          <h3 className="font-display font-bold text-base mb-2">Canaux d'acquisition</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{location.channelRecommendation}</p>
        </div>
      </div>

      {/* ── Validations terrain ── */}
      {location.terrainValidations && location.terrainValidations.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔎</span>
            <div>
              <h3 className="font-display font-bold text-lg">Validations terrain recommandées</h3>
              <p className="text-xs text-slate-400">Actions concrètes avant de vous lancer</p>
            </div>
          </div>
          <ul className="space-y-3">
            {location.terrainValidations.map((v, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Autres zones ── */}
      {location.otherZones && location.otherZones.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xl px-1">🗺️ Autres zones analysées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {location.otherZones.map((zone, idx) => (
              <div key={idx} className="card hover:shadow-card-hover transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-bold text-lg">{zone.name}</h4>
                  {zone.estimatedRent && (
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded-full">
                      💸 {zone.estimatedRent}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mb-4">{zone.strategicValue}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">✅ Atouts</p>
                    <ul className="space-y-1.5">
                      {zone.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <Check size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-2">❌ Défis</p>
                    <ul className="space-y-1.5">
                      {zone.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <X size={12} className="text-rose-500 mt-0.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
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
