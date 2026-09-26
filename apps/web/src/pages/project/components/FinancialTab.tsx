import { FinancialLogic, formatCurrencyCompact } from '@afribiz/shared'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts'
import { TrendingUp, AlertTriangle, Info, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'

interface Props {
  financials: FinancialLogic;
}

export function FinancialTab({ financials }: Props) {
  // Par défaut on affiche le scénario central
  const centralScenario = financials.scenarios.find(s => s.type === 'central') || financials.scenarios[0];
  
  if (!centralScenario) return <div>Pas de données financières.</div>;

  const projections = centralScenario.projections;
  const currency = financials.currency;

  const data = projections.map(p => ({
    name: `Mois ${p.month}`,
    'Chiffre d\'affaires': p.revenue,
    'Charges (Variables + Fixes)': p.variableCosts + p.fixedCosts,
    'Trésorerie': p.closingCash,
    'Bénéfice (EBITDA)': p.operatingResult,
  }));

  const month6 = projections[5];
  const initialInv = financials.hypotheses.equipmentCost + financials.hypotheses.initialStock + financials.hypotheses.launchExpenses + financials.hypotheses.cashReserve;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER : Résumé des hypothèses */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-brand/5 border border-brand/20 p-5 rounded-2xl">
        <div>
          <h3 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2">
            <TrendingUp size={20} className="text-brand" />
            Scénario Central (Objectif 100%)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Basé sur la vente de {financials.hypotheses.monthlyVolume} unités par mois à {formatCurrencyCompact(financials.hypotheses.unitPrice, currency)}.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Besoin initial estimé</div>
          <div className="text-2xl font-bold text-slate-900">{formatCurrencyCompact(initialInv, currency)}</div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card border-l-4 border-l-brand">
          <div className="text-sm text-slate-500 mb-1 font-medium">Chiffre d'Affaires (Mois 6)</div>
          <div className="text-3xl font-display font-bold text-slate-900">
            {formatCurrencyCompact(month6.revenue, currency)}
          </div>
          <div className="text-xs text-emerald-600 flex items-center gap-1 mt-2 font-medium bg-emerald-50 w-max px-2 py-0.5 rounded-full">
            <ArrowUpRight size={14} /> Marge brute : {Math.round((month6.grossMargin / month6.revenue) * 100)}%
          </div>
        </div>

        <div className="card border-l-4 border-l-amber-500">
          <div className="text-sm text-slate-500 mb-1 font-medium flex items-center gap-1">
            Charges fixes <Info size={14} className="text-slate-400" />
          </div>
          <div className="text-3xl font-display font-bold text-slate-900">
            {formatCurrencyCompact(month6.fixedCosts, currency)}
            <span className="text-sm font-normal text-slate-500 ml-1">/mois</span>
          </div>
          <div className="text-xs text-amber-700 flex items-center gap-1 mt-2 font-medium bg-amber-50 w-max px-2 py-0.5 rounded-full">
            Point mort au Mois {centralScenario.breakEvenMonth || '> 6'}
          </div>
        </div>

        <div className="card border-l-4 border-l-emerald-500">
          <div className="text-sm text-slate-500 mb-1 font-medium flex items-center gap-1">
            Trésorerie Fin Mois 6 <Wallet size={14} className="text-slate-400" />
          </div>
          <div className="text-3xl font-display font-bold text-emerald-600">
            {formatCurrencyCompact(month6.closingCash, currency)}
          </div>
          <div className="text-xs text-slate-600 flex items-center gap-1 mt-2 font-medium bg-slate-100 w-max px-2 py-0.5 rounded-full">
            Bénéfice M6 : {formatCurrencyCompact(month6.operatingResult, currency)}
          </div>
        </div>
      </div>

      {/* GRAPHIQUES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique P&L */}
        <div className="card">
          <h4 className="font-display font-bold text-slate-900 mb-6">Évolution CA vs Charges</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12 }} 
                  tickFormatter={(val) => formatCurrencyCompact(val, currency)}
                />
                <RechartsTooltip 
                  formatter={(value: number) => formatCurrencyCompact(value, currency)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                <Bar dataKey="Chiffre d'affaires" fill="#F05A28" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Charges (Variables + Fixes)" fill="#94A3B8" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique Tréso */}
        <div className="card">
          <h4 className="font-display font-bold text-slate-900 mb-6">Évolution de la Trésorerie</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12 }} 
                  tickFormatter={(val) => formatCurrencyCompact(val, currency)}
                />
                <RechartsTooltip 
                  formatter={(value: number) => formatCurrencyCompact(value, currency)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                <Line type="monotone" dataKey="Trésorerie" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Bénéfice (EBITDA)" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Avertissement IA */}
      <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
        <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <p>
          <strong>Avertissement :</strong> Ces projections sont générées à titre indicatif selon les hypothèses du marché local de l'IA. Elles ne constituent pas une garantie de succès financier. Ajustez toujours ces chiffres selon vos devis réels avant de demander un financement.
        </p>
      </div>
    </div>
  )
}
