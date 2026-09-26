import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Save, CheckCircle2, AlertCircle, Lightbulb, Wallet, Sparkles } from 'lucide-react'
import {
  ProjectInputSchema, type ProjectInput, type ProjectMode,
  COUNTRY_LABELS, SECTOR_LABELS, CURRENCY_LABELS, AMBITION_LABELS,
  type Country, type Sector, type CurrencyCode, type Ambition
} from '@afribiz/shared'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

const STEPS = [
  { id: 1, title: 'Point de départ' },
  { id: 2, title: 'Votre marché' },
  { id: 3, title: 'Vos moyens' },
  { id: 4, title: 'Votre ambition' },
]

export default function NewProjectPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [mode, setMode] = useState<ProjectMode | null>(null)
  
  const { register, handleSubmit, control, watch, formState: { errors, isValid }, trigger, setValue } = useForm<ProjectInput>({
    resolver: zodResolver(ProjectInputSchema),
    mode: 'onChange',
    defaultValues: {
      hasPhysicalLocation: false,
      isRemoteManaged: false,
      currency: 'XOF',
      ambition: 'main'
    }
  })

  // Sauvegarde automatique du brouillon
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('afribiz_draft_project', JSON.stringify(value))
    })
    
    // Restaurer le brouillon au chargement
    const draft = localStorage.getItem('afribiz_draft_project')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        if (parsed.mode) setMode(parsed.mode)
        Object.keys(parsed).forEach(key => {
          setValue(key as keyof ProjectInput, parsed[key])
        })
      } catch (e) { /* ignore */ }
    }
    
    return () => subscription.unsubscribe()
  }, [watch, setValue])

  const nextStep = async () => {
    let fieldsToValidate: (keyof ProjectInput)[] = []
    if (currentStep === 1) fieldsToValidate = ['mode', 'description', 'existingName']
    if (currentStep === 2) fieldsToValidate = ['country', 'city', 'zone', 'sector', 'targetAudience']
    if (currentStep === 3) fieldsToValidate = ['budget', 'currency', 'timeAvailablePerWeek', 'skills', 'hasPhysicalLocation', 'isRemoteManaged']
    
    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  const onSubmit = async (data: ProjectInput) => {
    try {
      // Afficher un loading toast (la génération prend ~20 sec)
      const toastId = toast.loading("Analyse de votre projet par l'IA...")
      
      const res = await fetch((import.meta.env.VITE_API_URL || "") + "/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await res.json()
      
      if (!res.ok || !result.success) {
        toast.error(result.error || 'Erreur lors de la génération', { id: toastId })
        return
      }
      
      // Enregistre le dossier généré en cache local pour la page projet
      localStorage.setItem('afribiz_demo_dossier', JSON.stringify(result.data))
      
      // Sauvegarde dans la base locale (IndexedDB / Dexie)
      const { saveProjectLocally } = await import('@/lib/db')
      await saveProjectLocally(result.data)

      localStorage.removeItem('afribiz_draft_project')
      
      toast.success('Dossier généré avec succès !', { id: toastId })
      
      // On redirige vers la page projet en mode démo
      navigate(`/projets/demo`)
      
    } catch (err) {
      toast.error('Impossible de se connecter au serveur IA')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Navbar simplifiée */}
      <nav className="bg-surface border-b border-border h-16 flex items-center px-6 no-print sticky top-0 z-50">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <Link to="/projets" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} />
            <span className="text-sm font-medium hidden sm:inline">Retour aux projets</span>
          </Link>
          <div className="font-display font-bold text-slate-900">Nouvel accompagnement</div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Save size={14} /> Sauvegarde auto
          </div>
        </div>
      </nav>

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-neutral-200 -z-10" />
              <div className="absolute left-0 top-1/2 h-0.5 bg-brand transition-all duration-500 -z-10" 
                   style={{ width: `\${((currentStep - 1) / 3) * 100}%` }} />
              
              {STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-ivory px-2">
                  <div className={`\${
                    currentStep > step.id ? 'step-dot-done' :
                    currentStep === step.id ? 'step-dot-active' : 'step-dot-pending'
                  }`}>
                    {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block \${
                    currentStep >= step.id ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div className="card shadow-lg bg-surface relative overflow-hidden">
            {/* Décoration subtile */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
              
              {/* ÉTAPE 1 : POINT DE DÉPART */}
              <div className={currentStep === 1 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Quel est votre point de départ ?</h2>
                <p className="text-slate-500 text-sm mb-8">Nous adapterons le dossier en fonction de votre situation.</p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div 
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all \${mode === 'idea' ? 'border-brand bg-brand-muted/30 shadow-sm' : 'border-border hover:border-brand/50 bg-surface'}`}
                    onClick={() => { setMode('idea'); setValue('mode', 'idea') }}
                  >
                    <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-3">
                      <Lightbulb size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">J'ai une idée précise</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Je sais ce que je veux faire. J'ai besoin d'analyser le marché, créer la marque et planifier le lancement.</p>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all \${mode === 'budget' ? 'border-gold bg-gold/5 shadow-sm' : 'border-border hover:border-gold/50 bg-surface'}`}
                    onClick={() => { setMode('budget'); setValue('mode', 'budget') }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-3">
                      <Wallet size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">J'ai un budget</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Je veux entreprendre mais je cherche la bonne idée. Proposez-moi 3 concepts adaptés à mon budget et ma ville.</p>
                  </div>
                </div>
                {errors.mode && <p className="error-message mb-4"><AlertCircle size={12} />Veuillez choisir une option</p>}

                {mode === 'idea' && (
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <label className="label">Nom du projet (optionnel)</label>
                      <input type="text" className="input" placeholder="Ex: FreshBox Dakar" {...register('existingName')} />
                    </div>
                    <div>
                      <label className="label">Décrivez votre idée <span className="text-red-500">*</span></label>
                      <textarea 
                        className={`input min-h-[120px] resize-y \${errors.description ? 'input-error' : ''}`} 
                        placeholder="Ex: Un service de livraison de paniers de légumes frais et bio aux particuliers et entreprises..."
                        {...register('description')}
                      />
                      {errors.description && <p className="error-message"><AlertCircle size={12} />{errors.description.message}</p>}
                    </div>
                  </div>
                )}
              </div>

              {/* ÉTAPE 2 : MARCHÉ */}
              <div className={currentStep === 2 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Où allez-vous vous implanter ?</h2>
                <p className="text-slate-500 text-sm mb-8">Les recommandations seront adaptées aux réalités de cette zone.</p>
                
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Pays <span className="text-red-500">*</span></label>
                      <select className={`input \${errors.country ? 'input-error' : ''}`} {...register('country')}>
                        <option value="">Sélectionnez un pays</option>
                        {Object.entries(COUNTRY_LABELS).map(([code, label]) => (
                          <option key={code} value={code}>{label}</option>
                        ))}
                      </select>
                      {errors.country && <p className="error-message"><AlertCircle size={12} />Pays requis</p>}
                    </div>
                    <div>
                      <label className="label">Ville <span className="text-red-500">*</span></label>
                      <input type="text" className={`input \${errors.city ? 'input-error' : ''}`} placeholder="Ex: Douala" {...register('city')} />
                      {errors.city && <p className="error-message"><AlertCircle size={12} />Ville requise</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="label">Zone / Quartier visé (optionnel)</label>
                    <input type="text" className="input" placeholder="Ex: Akwa, Bonanjo..." {...register('zone')} />
                    <span className="label-hint">Laissez vide si vous voulez que l'IA vous recommande une zone.</span>
                  </div>

                  <div>
                    <label className="label">Secteur d'activité <span className="text-red-500">*</span></label>
                    <select className={`input \${errors.sector ? 'input-error' : ''}`} {...register('sector')}>
                      <option value="">Sélectionnez un secteur</option>
                      {Object.entries(SECTOR_LABELS).map(([code, label]) => (
                        <option key={code} value={code}>{label}</option>
                      ))}
                    </select>
                    {errors.sector && <p className="error-message"><AlertCircle size={12} />Secteur requis</p>}
                  </div>

                  <div>
                    <label className="label">Public cible <span className="text-red-500">*</span></label>
                    <input type="text" className={`input \${errors.targetAudience ? 'input-error' : ''}`} placeholder="Ex: Jeunes cadres, étudiants, mères de famille..." {...register('targetAudience')} />
                    {errors.targetAudience && <p className="error-message"><AlertCircle size={12} />Public cible requis</p>}
                  </div>
                </div>
              </div>

              {/* ÉTAPE 3 : MOYENS */}
              <div className={currentStep === 3 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Quels sont vos moyens ?</h2>
                <p className="text-slate-500 text-sm mb-8">Soyez réaliste, l'IA construira le plan autour de ces contraintes.</p>
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-3 gap-5">
                    <div className="sm:col-span-2">
                      <label className="label">Budget disponible <span className="text-red-500">*</span></label>
                      <input 
                        type="number" 
                        min="0"
                        className={`input font-amount \${errors.budget ? 'input-error' : ''}`} 
                        placeholder="0" 
                        {...register('budget', { valueAsNumber: true })} 
                      />
                      {errors.budget && <p className="error-message"><AlertCircle size={12} />Budget invalide</p>}
                    </div>
                    <div>
                      <label className="label">Devise</label>
                      <select className="input font-amount" {...register('currency')}>
                        {Object.entries(CURRENCY_LABELS).map(([code, label]) => (
                          <option key={code} value={code}>{code}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label">Temps disponible (heures / semaine) <span className="text-red-500">*</span></label>
                    <input 
                      type="number" 
                      min="1" max="168"
                      className={`input \${errors.timeAvailablePerWeek ? 'input-error' : ''}`} 
                      placeholder="Ex: 20" 
                      {...register('timeAvailablePerWeek', { valueAsNumber: true })} 
                    />
                  </div>

                  <div>
                    <label className="label">Compétences / Ressources clés (optionnel)</label>
                    <textarea 
                      className="input min-h-[80px]" 
                      placeholder="Ex: Je suis développeur, j'ai une voiture utilitaire, mon oncle a un entrepôt vide..."
                      {...register('skills')}
                    />
                  </div>

                  <div className="bg-neutral-50 rounded-xl p-4 border border-border space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-brand rounded border-neutral-300 focus:ring-brand" {...register('hasPhysicalLocation')} />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">J'ai déjà un local physique</div>
                        <div className="text-xs text-slate-500">Cochez si vous ne payez pas de nouveau loyer de départ</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-brand rounded border-neutral-300 focus:ring-brand" {...register('isRemoteManaged')} />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Gestion à distance (Diaspora)</div>
                        <div className="text-xs text-slate-500">L'IA prévoira des outils de contrôle et de délégation</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* ÉTAPE 4 : AMBITION */}
              <div className={currentStep === 4 ? 'block animate-fade-in' : 'hidden'}>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Quelle est votre ambition ?</h2>
                <p className="text-slate-500 text-sm mb-8">Cela déterminera la stratégie de croissance proposée.</p>
                
                <div className="grid gap-3 mb-8">
                  {Object.entries(AMBITION_LABELS).map(([val, label]) => (
                    <label key={val} className={`border-2 rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-colors \${watch('ambition') === val ? 'border-brand bg-brand-muted/30' : 'border-border hover:border-brand/50'}`}>
                      <input type="radio" value={val} className="w-4 h-4 text-brand focus:ring-brand" {...register('ambition')} />
                      <span className="font-semibold text-sm text-slate-900">{label}</span>
                    </label>
                  ))}
                </div>

                <div className="bg-brand/5 border border-brand/20 rounded-xl p-5 mb-4">
                  <h3 className="font-bold text-brand-dark flex items-center gap-2 mb-2">
                    <Sparkles size={16} />
                    Prêt pour la génération
                  </h3>
                  <p className="text-sm text-slate-700">
                    En validant, l'IA va analyser vos réponses et {mode === 'budget' ? 'vous proposer 3 concepts' : 'générer votre dossier complet'}. Cette opération prendra quelques minutes.
                  </p>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-border mt-8 pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`btn-secondary \${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  <ArrowLeft size={16} /> Retour
                </button>
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={mode === null && currentStep === 1}
                    className="btn-primary"
                  >
                    Continuer <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" className="btn-primary" disabled={!isValid}>
                    <Sparkles size={16} />
                    Lancer la génération
                  </button>
                )}
              </div>
            </form>
          </div>
          
        </div>
      </main>
    </div>
  )
}
