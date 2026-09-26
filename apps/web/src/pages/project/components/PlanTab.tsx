import { Lock, Sparkles, AlertCircle, CheckCircle2, Clock, Target } from 'lucide-react'
import { BusinessPlanSchema } from '@afribiz/shared'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

type BusinessPlan = z.infer<typeof BusinessPlanSchema>

interface PlanTabProps {
  plan: BusinessPlan
}

export function PlanTab({ plan }: PlanTabProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isPaying, setIsPaying] = useState(false)

  // Simulation : vérifier si le projet (ou cache) est débloqué
  useEffect(() => {
    const status = localStorage.getItem('afribiz_payment_status')
    if (status === 'success') {
      setIsUnlocked(true)
    }
  }, [])

  const handlePayment = async () => {
    setIsPaying(true)
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || "") + "/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: 'demo-project-123',
          amount: 2500,
          currency: 'XOF'
        })
      })
      
      const data = await res.json()
      if (data.success) {
        // Normalement on redirige vers data.checkoutUrl
        // Ici on simule un paiement réussi au bout de 2 secondes
        toast.loading("Redirection vers Chariow...", { duration: 2000 })
        
        setTimeout(() => {
          localStorage.setItem('afribiz_payment_status', 'success')
          setIsUnlocked(true)
          toast.success("Paiement validé ! Dossier débloqué.")
          setIsPaying(false)
        }, 2000)
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      toast.error("Erreur d'initialisation du paiement")
      setIsPaying(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER : Executive Summary (Visible) */}
      <div className="card border-l-4 border-l-brand">
        <h2 className="font-display text-2xl font-bold mb-4">Executive Summary</h2>
        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
          {plan.executiveSummary}
        </p>
      </div>

      <div className="relative mt-8">
        {/* CONTENU FLOUTÉ */}
        <div className={`space-y-8 \${!isUnlocked ? 'blur-md opacity-60 select-none pointer-events-none' : ''}`}>
          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-error" /> Problème et Solution
            </h3>
            <p className="text-slate-700">{plan.problemSolution}</p>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="text-brand" /> Marché Cible
            </h3>
            <p className="text-slate-700">{plan.targetMarket}</p>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="text-indigo-500" /> Plan d'Action (90 Jours)
            </h3>
            
            <div className="space-y-4">
              {plan.actionPlan90Days.map((action) => (
                <div key={action.id} className="border border-border rounded-xl p-4 flex gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                    <span className="font-bold text-indigo-600">{action.phase}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{action.title}</h4>
                    <p className="text-sm text-slate-600 mb-2">{action.description}</p>
                    <div className="flex gap-2">
                      <span className="badge badge-primary">{action.priority}</span>
                      {(action.estimatedCost ?? 0) > 0 && <span className="badge badge-secondary">{action.estimatedCost} budget</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PAYWALL OVERLAY */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-t from-ivory via-ivory/80 to-transparent pt-32 pb-8 px-4 rounded-xl">
            <div className="bg-white shadow-xl shadow-brand/10 border-2 border-brand/20 p-8 rounded-2xl max-w-lg w-full text-center">
              <div className="w-16 h-16 bg-brand-muted text-brand rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
                Débloquez le plan d'action
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Accédez à l'étude de marché complète, au modèle économique, et au plan de lancement détaillé étape par étape pour seulement <strong className="text-slate-900">2 500 FCFA</strong>.
              </p>
              
              <ul className="text-left space-y-3 mb-8 mx-auto w-fit">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-green-500" /> Plan d'action détaillé J1 à J90
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-green-500" /> Modèle économique complet
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-green-500" /> Stratégie d'acquisition clients
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-green-500" /> Gestion des risques
                </li>
              </ul>

              <button 
                onClick={handlePayment} 
                disabled={isPaying}
                className="btn-primary w-full text-lg py-4 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles size={20} />
                  {isPaying ? "Connexion sécurisée..." : "Payer par Mobile Money"}
                </span>
              </button>
              
              <div className="mt-6 flex flex-col items-center">
                <p className="text-xs font-bold text-slate-500 mb-3 tracking-wider uppercase">
                  Paiement 100% sécurisé par Mobile Money et Carte Bancaire
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {/* MTN */}
                  <div className="bg-white rounded p-1 shadow-sm border border-slate-100 flex items-center justify-center h-8 w-12">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/MTN_Mobile_Money_logo.svg/1024px-MTN_Mobile_Money_logo.svg.png" className="h-full w-full object-contain" alt="MTN Momo" />
                  </div>
                  {/* Orange */}
                  <div className="bg-white rounded p-1 shadow-sm border border-slate-100 flex items-center justify-center h-8 w-12">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Orange_Money_logo.svg/1024px-Orange_Money_logo.svg.png" className="h-full w-full object-contain" alt="Orange Money" />
                  </div>
                  {/* Wave */}
                  <div className="bg-white rounded p-1 shadow-sm border border-slate-100 flex items-center justify-center h-8 w-12">
                    <img src="https://wave.com/wp-content/uploads/2021/07/wave-logo.svg" className="h-full w-full object-contain" alt="Wave" />
                  </div>
                  {/* Moov */}
                  <div className="bg-white rounded p-1 shadow-sm border border-slate-100 flex items-center justify-center h-8 w-12 bg-blue-600">
                    <span className="text-[10px] font-bold text-white tracking-wide">Moov</span>
                  </div>
                  {/* Airtel */}
                  <div className="bg-white rounded p-1 shadow-sm border border-slate-100 flex items-center justify-center h-8 w-12">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Airtel_logo.svg/1024px-Airtel_logo.svg.png" className="h-full w-full object-contain" alt="Airtel" />
                  </div>
                  {/* Separator */}
                  <div className="w-px h-6 bg-slate-200 mx-1"></div>
                  {/* Visa */}
                  <div className="bg-white rounded p-1 shadow-sm border border-slate-100 flex items-center justify-center h-8 w-12">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1024px-Visa_Inc._logo.svg.png" className="h-full w-full object-contain" alt="Visa" />
                  </div>
                  {/* Mastercard */}
                  <div className="bg-white rounded p-1 shadow-sm border border-slate-100 flex items-center justify-center h-8 w-12">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1024px-Mastercard-logo.svg.png" className="h-full w-full object-contain" alt="Mastercard" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
