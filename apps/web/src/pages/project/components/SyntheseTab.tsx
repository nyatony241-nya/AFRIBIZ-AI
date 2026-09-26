import { type AfriBizDossier, formatCurrencyCompact } from '@afribiz/shared'
import { LayoutDashboard, Target, Activity, Banknote } from 'lucide-react'

interface SyntheseTabProps {
  dossier: AfriBizDossier
}

export function SyntheseTab({ dossier }: SyntheseTabProps) {
  const { businessPlan, financialLogic } = dossier
  const { hypotheses, scenarios, currency } = financialLogic

  // Calcul du budget initial estimé
  const initialBudget = 
    hypotheses.equipmentCost + 
    hypotheses.initialStock + 
    hypotheses.launchExpenses + 
    hypotheses.cashReserve

  // Scénario central par défaut
  const centralScenario = scenarios.find(s => s.type === 'central') || scenarios[0]

  return (
    <div className="space-y-6">
      
      {/* 4 KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <LayoutDashboard size={18} />
            <h3 className="font-medium text-sm">Secteur</h3>
          </div>
          <p className="font-display font-semibold text-lg capitalize">{dossier.inputSnapshot.sector.replace('-', ' ')}</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Target size={18} />
            <h3 className="font-medium text-sm">Zone d'implation</h3>
          </div>
          <p className="font-display font-semibold text-lg truncate" title={`\${dossier.inputSnapshot.city}, \${dossier.inputSnapshot.country}`}>
            {dossier.inputSnapshot.city}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Banknote size={18} />
            <h3 className="font-medium text-sm">Investissement</h3>
          </div>
          <p className="font-display font-semibold text-lg text-brand-dark">
            {formatCurrencyCompact(initialBudget, currency)}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Activity size={18} />
            <h3 className="font-medium text-sm">Rentabilité</h3>
          </div>
          <p className="font-display font-semibold text-lg">
            {centralScenario.breakEvenMonth ? `Mois \${centralScenario.breakEvenMonth}` : 'Long terme'}
          </p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="card">
        <h2 className="font-display font-bold text-xl mb-4">Executive Summary</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{businessPlan.executiveSummary}</p>
        </div>
      </div>

      {/* Grid pour les autres résumés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-display font-bold text-lg mb-3">Le Problème & La Solution</h2>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{businessPlan.problemSolution}</p>
        </div>
        <div className="card">
          <h2 className="font-display font-bold text-lg mb-3">Cible (Target Market)</h2>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{businessPlan.targetMarket}</p>
        </div>
      </div>

    </div>
  )
}
