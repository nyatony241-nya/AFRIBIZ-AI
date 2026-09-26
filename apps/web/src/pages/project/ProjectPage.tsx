import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as Tabs from '@radix-ui/react-tabs'
import { 
  ArrowLeft, Download, RefreshCw, BarChart3, LayoutDashboard, 
  MapPin, Megaphone, Palette, Target, Calendar, AlertCircle
} from 'lucide-react'
import { type AfriBizDossier } from '@afribiz/shared'
import { FinancialTab } from './components/FinancialTab'
import { PlanTab } from './components/PlanTab'
import { StudioTab } from './components/StudioTab'

const TABS = [
  { id: 'synthese', label: 'Synthèse', icon: LayoutDashboard },
  { id: 'opportunite', label: 'Opportunité', icon: Target },
  { id: 'marque', label: 'Marque', icon: Palette },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'implantation', label: 'Implantation', icon: MapPin },
  { id: 'finances', label: 'Finances', icon: BarChart3 },
  { id: 'plan', label: 'Plan 90 jours', icon: Calendar },
  { id: 'studio', label: 'Studio Visuel', icon: Palette },
]

export default function ProjectPage() {
  const { projectId } = useParams()
  const [dossier, setDossier] = useState<AfriBizDossier | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDossier = async () => {
      setLoading(true)
      try {
        const { getLocalProject } = await import('@/lib/db')
        
        // 1. Try to load from Dexie.js (offline first)
        if (projectId) {
          const dbProject = await getLocalProject(projectId)
          if (dbProject) {
            setDossier(dbProject)
            setLoading(false)
            return
          }
        }
        
        // 2. Fallback to localStorage demo project
        const localDossier = localStorage.getItem('afribiz_demo_dossier')
        if (localDossier) {
          const parsed = JSON.parse(localDossier)
          // Also save it to DB for next time
          if (parsed && parsed.projectId) {
             const { saveProjectLocally } = await import('@/lib/db')
             await saveProjectLocally(parsed)
          }
          setDossier(parsed)
        } else {
          setError("Dossier introuvable en cache local")
        }
      } catch (e) {
        console.error(e)
        setError("Impossible de charger le dossier")
      } finally {
        setLoading(false)
      }
    }
    
    loadDossier()
  }, [projectId])

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col">
        <header className="bg-surface border-b border-border h-16 flex items-center px-6">
          <div className="skeleton w-8 h-8 rounded-full mr-4" />
          <div className="skeleton w-48 h-5 rounded" />
        </header>
        <div className="flex-1 p-8">
          <div className="skeleton w-full max-w-content mx-auto h-[600px] rounded-card" />
        </div>
      </div>
    )
  }

  if (error || !dossier) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-6">
        <div className="card text-center max-w-md">
          <AlertCircle size={48} className="text-error mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Erreur</h2>
          <p className="text-slate-600 mb-6">{error || 'Dossier introuvable'}</p>
          <Link to="/projets" className="btn-primary">Retour aux projets</Link>
        </div>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <header className="bg-surface border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-40 no-print">
        <div className="flex items-center gap-4">
          <Link to="/projets" className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 text-slate-500 hover:text-slate-900 hover:bg-neutral-200 transition-colors" aria-label="Retour">
            <ArrowLeft size={16} />
          </Link>
          <div className="w-px h-6 bg-border" />
          <div>
            <h1 className="font-display font-bold text-slate-900 text-lg leading-tight">
              {dossier.branding?.recommendedName || 'Mon Projet'}
            </h1>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="badge-available px-1.5 py-0 text-[10px]">Disponible</span>
              <span>Dernière modif : à l'instant</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-primary text-sm py-1.5 min-h-[36px]" onClick={handlePrint}>
            <Download size={14} /> Exporter PDF
          </button>
        </div>
      </header>

      <main className="flex-1">
        <Tabs.Root defaultValue="synthese" className="flex flex-col h-full">
          <div className="bg-surface border-b border-border sticky top-16 z-30 overflow-x-auto scrollbar-none no-print">
            <Tabs.List className="flex px-4 sm:px-8 max-w-content mx-auto min-w-max">
              {TABS.map((tab) => (
                <Tabs.Trigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 px-4 py-4 text-sm font-medium text-slate-500 border-b-2 border-transparent hover:text-slate-900 data-[state=active]:text-brand-dark data-[state=active]:border-brand transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-[-2px]"
                >
                  <tab.icon size={16} />
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>

          <div className="flex-1 p-4 sm:p-8 max-w-content mx-auto w-full">
            <Tabs.Content value="synthese" className="outline-none">
              <div className="card text-center py-20">
                <LayoutDashboard size={48} className="text-brand mx-auto mb-4 opacity-50" />
                <h2 className="font-display text-2xl font-bold mb-2">Synthèse</h2>
                <p className="text-slate-500">Module en cours de construction.</p>
              </div>
            </Tabs.Content>
            
            <Tabs.Content value="opportunite" className="outline-none">
              <div className="card">Opportunité</div>
            </Tabs.Content>
            
            <Tabs.Content value="marque" className="outline-none">
              <div className="card">Marque</div>
            </Tabs.Content>
            
            <Tabs.Content value="marketing" className="outline-none">
              <div className="card">Marketing</div>
            </Tabs.Content>
            
            <Tabs.Content value="implantation" className="outline-none">
              <div className="card">Implantation</div>
            </Tabs.Content>
            
            <Tabs.Content value="finances" className="outline-none">
              <FinancialTab financials={dossier.financialLogic} />
            </Tabs.Content>
            
            <Tabs.Content value="plan" className="outline-none">
              <PlanTab plan={dossier.businessPlan} />
            </Tabs.Content>
            
            <Tabs.Content value="studio" className="outline-none">
              <StudioTab dossier={dossier} />
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </main>
    </div>
  )
}

