import { type AfriBizDossier, formatCurrencyCompact } from '@afribiz/shared'
import { TrendingUp, MapPin, Banknote, Clock, Users, ShieldCheck, Zap } from 'lucide-react'

interface SyntheseTabProps {
  dossier: AfriBizDossier
}

function RiskBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const config = {
    low:    { label: 'Faible',  color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    medium: { label: 'Moyen',   color: 'bg-amber-100 text-amber-800 border-amber-200' },
    high:   { label: 'Élevé',   color: 'bg-red-100 text-red-800 border-red-200' },
  }
  const c = config[level]
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border \${c.color}`}>
      {c.label}
    </span>
  )
}

export function SyntheseTab({ dossier }: SyntheseTabProps) {
  const { businessPlan, financialLogic, concept, branding, inputSnapshot } = dossier
  const { hypotheses, scenarios, currency } = financialLogic

  const initialBudget =
    hypotheses.equipmentCost +
    hypotheses.initialStock +
    hypotheses.launchExpenses +
    hypotheses.cashReserve

  const centralScenario = scenarios.find(s => s.type === 'central') || scenarios[0]
  const mainRisk = businessPlan.risksMitigation?.[0]?.severity ?? 'medium'

  return (
    <div className="space-y-6">

      {/* ── Hero Banner ── */}
      <div
        className="rounded-2xl p-8 relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #102D26 0%, #1a5c49 60%, #059669 100%)' }}
      >
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10 bg-white pointer-events-none" />
        <div className="absolute bottom-0 left-40 w-40 h-40 rounded-full opacity-5 bg-white pointer-events-none" />
        <div className="relative z-10">
          <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">🧠 Analyse IA</span>
          <h1 className="font-display font-bold text-3xl md:text-4xl mt-2 mb-1">
            {branding?.recommendedName || 'Mon Projet'}
          </h1>
          <p className="text-emerald-200 text-base italic mb-6">"{branding?.tagline}"</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              📍 {inputSnapshot.city}
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              🏭 {inputSnapshot.sector.replace(/-/g, ' ')}
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              🎯 {inputSnapshot.ambition}
            </span>
          </div>
        </div>
      </div>

      {/* ── 4 KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex flex-col gap-1 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">
            <Banknote size={14} /> Investissement
          </div>
          <p className="font-display font-bold text-2xl text-brand-dark">
            {formatCurrencyCompact(initialBudget, currency)}
          </p>
          <p className="text-xs text-slate-400">Capital de départ estimé</p>
        </div>

        <div className="card flex flex-col gap-1 border-l-4 border-l-amber-400">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">
            <TrendingUp size={14} /> Rentabilité
          </div>
          <p className="font-display font-bold text-2xl text-slate-800">
            {centralScenario.breakEvenMonth ? `Mois ${centralScenario.breakEvenMonth}` : 'Long terme'}
          </p>
          <p className="text-xs text-slate-400">Seuil de rentabilité estimé</p>
        </div>

        <div className="card flex flex-col gap-1 border-l-4 border-l-blue-400">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">
            <Clock size={14} /> Temps requis
          </div>
          <p className="font-display font-bold text-2xl text-slate-800">
            {inputSnapshot.timeAvailablePerWeek}h/sem
          </p>
          <p className="text-xs text-slate-400">Disponibilité hebdomadaire</p>
        </div>

        <div className="card flex flex-col gap-1 border-l-4 border-l-rose-400">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">
            <ShieldCheck size={14} /> Niveau de risque
          </div>
          <div className="mt-1">
            <RiskBadge level={mainRisk} />
          </div>
          <p className="text-xs text-slate-400">Évaluation principale</p>
        </div>
      </div>

      {/* ── Executive Summary ── */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">
            📋
          </div>
          <div>
            <h2 className="font-display font-bold text-lg">Executive Summary</h2>
            <p className="text-xs text-slate-400">Synthèse globale du projet</p>
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed">{businessPlan.executiveSummary}</p>
      </div>

      {/* ── Problème / Solution / Marché ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card hover:shadow-card-hover transition-shadow">
          <div className="text-2xl mb-2">🔥</div>
          <h3 className="font-display font-bold text-base mb-2">Le Problème</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{businessPlan.problemSolution}</p>
        </div>
        <div className="card hover:shadow-card-hover transition-shadow">
          <div className="text-2xl mb-2">👥</div>
          <h3 className="font-display font-bold text-base mb-2">Cible Client</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{businessPlan.targetMarket}</p>
        </div>
        <div className="card hover:shadow-card-hover transition-shadow">
          <div className="text-2xl mb-2">💡</div>
          <h3 className="font-display font-bold text-base mb-2">Modèle économique</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{businessPlan.businessModel}</p>
        </div>
      </div>

    </div>
  )
}
