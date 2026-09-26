import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus, Search, Filter, FolderOpen, MoreVertical, Trash2,
  Copy, Edit3, ChevronRight, Sparkles, FileText, Clock,
  AlertCircle, TrendingUp, LogOut, Settings
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { PROJECT_STATUS_LABELS, type ProjectStatus } from '@afribiz/shared'
import toast from 'react-hot-toast'

// ============================================================
// TYPES
// ============================================================
interface Project {
  id: string
  name: string
  status: ProjectStatus
  sector: string
  city: string
  country: string
  budget: number
  currency: string
  createdAt: string
  updatedAt: string
  completedTasks?: number
  totalTasks?: number
}

// ============================================================
// DONNÉES DE DÉMO
// ============================================================
const DEMO_PROJECTS: Project[] = [
  {
    id: 'demo-proj-001',
    name: 'FreshBox Dakar',
    status: 'available',
    sector: 'E-commerce & logistique',
    city: 'Dakar',
    country: 'Sénégal',
    budget: 850000,
    currency: 'XOF',
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-15T14:30:00Z',
    completedTasks: 8,
    totalTasks: 18,
  },
  {
    id: 'demo-proj-002',
    name: 'CantinaPlus Abidjan',
    status: 'generating',
    sector: 'Restauration',
    city: 'Abidjan',
    country: 'Côte d\'Ivoire',
    budget: 1200000,
    currency: 'XOF',
    createdAt: '2026-09-20T09:00:00Z',
    updatedAt: '2026-09-20T09:45:00Z',
    completedTasks: 0,
    totalTasks: 18,
  },
]

// ============================================================
// UTILITAIRES
// ============================================================
function formatBudget(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: ['XOF', 'XAF'].includes(currency) ? 'EUR' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('€', currency === 'XOF' ? 'FCFA' : currency === 'XAF' ? 'FCFA' : '')
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Aujourd\'hui'
  if (days === 1) return 'Hier'
  if (days < 7) return `Il y a ${days} jours`
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function statusBadgeClass(status: ProjectStatus): string {
  const map: Record<ProjectStatus, string> = {
    draft: 'badge-draft',
    generating: 'badge-generating',
    available: 'badge-available',
    partial: 'badge-partial',
    failed: 'badge-failed',
  }
  return map[status] ?? 'badge-draft'
}

// ============================================================
// SIDEBAR DASHBOARD
// ============================================================
function DashboardSidebar({ onLogout }: { onLogout: () => void }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className="sidebar no-print" aria-label="Navigation principale">
      {/* Logo */}
      <div className="p-5 border-b border-forest-light">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-brand">
            <span className="text-white font-display font-bold text-base">A</span>
          </div>
          <div>
            <div className="text-white font-display font-bold text-sm leading-none">AfriBiz</div>
            <div className="text-green-300 text-xs">Architect</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        <Link to="/projets" className="sidebar-link-active">
          <FolderOpen size={18} />
          Mes projets
        </Link>
        <Link to="/projets/nouveau" className="sidebar-link">
          <Plus size={18} />
          Nouveau projet
        </Link>
        <Link to="/exemple" className="sidebar-link">
          <FileText size={18} />
          Dossier exemple
        </Link>
      </nav>

      {/* Bas */}
      <div className="p-4 border-t border-forest-light flex flex-col gap-1">
        <Link to="/parametres" className="sidebar-link">
          <Settings size={18} />
          Paramètres
        </Link>
        <button onClick={onLogout} className="sidebar-link w-full text-left">
          <LogOut size={18} />
          Déconnexion
        </button>

        {/* Avatar utilisateur */}
        {user && (
          <div className="mt-3 p-3 bg-forest-light/50 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user.name}</p>
              <p className="text-green-300/70 text-xs truncate">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

// ============================================================
// CARTE PROJET
// ============================================================
function ProjectCard({
  project,
  onDelete,
  onRename,
  onDuplicate,
}: {
  project: Project
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
  onDuplicate: (id: string) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [newName, setNewName] = useState(project.name)
  const navigate = useNavigate()

  const progress = project.totalTasks
    ? Math.round((project.completedTasks ?? 0) / project.totalTasks * 100)
    : 0

  const handleOpenProject = () => {
    if (!renaming) navigate(`/projets/${project.id}`)
  }

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName.trim() && newName.trim() !== project.name) {
      onRename(project.id, newName.trim())
    }
    setRenaming(false)
  }

  return (
    <div className="card group relative hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 mr-3">
          {renaming ? (
            <form onSubmit={handleRenameSubmit}>
              <input
                className="input text-sm py-1.5 w-full"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onBlur={handleRenameSubmit}
                autoFocus
                maxLength={100}
              />
            </form>
          ) : (
            <h3
              className="font-display font-bold text-slate-900 text-base truncate cursor-pointer hover:text-brand-dark transition-colors"
              onClick={handleOpenProject}
            >
              {project.name}
            </h3>
          )}
          <p className="text-slate-500 text-xs mt-0.5">{project.sector} · {project.city}, {project.country}</p>
        </div>

        {/* Status badge */}
        <span className={`${statusBadgeClass(project.status)} shrink-0`}>
          {PROJECT_STATUS_LABELS[project.status]}
        </span>
      </div>

      {/* Budget */}
      <div className="mb-3">
        <span className="text-xs text-slate-500">Budget : </span>
        <span className="font-amount text-sm font-semibold text-slate-900">
          {formatBudget(project.budget, project.currency)}
        </span>
      </div>

      {/* Progress plan 90j */}
      {project.totalTasks && project.status === 'available' && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Plan 90 jours</span>
            <span>{project.completedTasks}/{project.totalTasks} tâches</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Génération en cours */}
      {project.status === 'generating' && (
        <div className="mb-4 flex items-center gap-2 text-amber-600 text-xs">
          <Sparkles size={14} className="animate-pulse" />
          <span>Génération du dossier en cours…</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock size={12} />
          {timeAgo(project.updatedAt)}
        </span>

        <div className="flex items-center gap-2">
          {/* Menu actions */}
          <div className="relative">
            <button
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-neutral-100 rounded-lg transition-colors"
              onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
              aria-label="Options du projet"
              aria-expanded={menuOpen}
            >
              <MoreVertical size={16} />
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-44 bg-surface border border-border rounded-card shadow-dialog z-20 py-1 animate-fade-in"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-ivory transition-colors" onClick={() => { setRenaming(true); setMenuOpen(false) }}>
                  <Edit3 size={14} className="text-slate-400" /> Renommer
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-ivory transition-colors" onClick={() => { onDuplicate(project.id); setMenuOpen(false) }}>
                  <Copy size={14} className="text-slate-400" /> Dupliquer
                </button>
                <div className="border-t border-border my-1" />
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-error hover:bg-red-50 transition-colors" onClick={() => { onDelete(project.id); setMenuOpen(false) }}>
                  <Trash2 size={14} /> Supprimer
                </button>
              </div>
            )}
          </div>

          {/* Ouvrir */}
          {project.status !== 'generating' && (
            <button
              className="flex items-center gap-1.5 btn-primary text-xs px-3"
              style={{ minHeight: '32px' }}
              onClick={handleOpenProject}
              aria-label={`Ouvrir le projet ${project.name}`}
            >
              Ouvrir <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// PAGE DASHBOARD
// ============================================================
export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setProjects(data.data ?? [])
      } else {
        setProjects(DEMO_PROJECTS)
      }
    } catch {
      setProjects(DEMO_PROJECTS)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  const handleDelete = (id: string) => {
    setDeleteConfirm(id)
  }

  const confirmDelete = async () => {
    if (!deleteConfirm) return
    try {
      await fetch(`/api/projects/${deleteConfirm}`, { method: 'DELETE', credentials: 'include' })
      setProjects(prev => prev.filter(p => p.id !== deleteConfirm))
      toast.success('Projet supprimé')
    } catch {
      setProjects(prev => prev.filter(p => p.id !== deleteConfirm))
      toast.success('Projet supprimé')
    }
    setDeleteConfirm(null)
  }

  const handleRename = async (id: string, name: string) => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ name }) })
      setProjects(prev => prev.map(p => p.id === id ? { ...p, name } : p))
      toast.success('Projet renommé')
    } catch {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, name } : p))
    }
  }

  const handleDuplicate = async (id: string) => {
    const src = projects.find(p => p.id === id)
    if (!src) return
    const copy: Project = { ...src, id: `copy-${Date.now()}`, name: `${src.name} (copie)`, status: 'draft', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), completedTasks: 0 }
    setProjects(prev => [copy, ...prev])
    toast.success('Projet dupliqué')
  }

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filterStatus === 'all' || p.status === filterStatus
    return matchSearch && matchFilter
  })

  const statusOptions: Array<{ value: ProjectStatus | 'all'; label: string }> = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'draft', label: PROJECT_STATUS_LABELS.draft },
    { value: 'generating', label: PROJECT_STATUS_LABELS.generating },
    { value: 'available', label: PROJECT_STATUS_LABELS.available },
    { value: 'partial', label: PROJECT_STATUS_LABELS.partial },
    { value: 'failed', label: PROJECT_STATUS_LABELS.failed },
  ]

  return (
    <div className="flex min-h-screen bg-ivory">
      <DashboardSidebar onLogout={handleLogout} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto" style={{ marginLeft: 'var(--sidebar-width)' }}>
        <div className="max-w-content mx-auto px-8 py-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">
                Bonjour, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {projects.length === 0 ? 'Votre prochain projet commence ici.' : `${projects.length} projet${projects.length > 1 ? 's' : ''}`}
              </p>
            </div>
            <Link to="/projets/nouveau" className="btn-primary shrink-0">
              <Plus size={18} />
              Nouveau projet
            </Link>
          </div>

          {/* Barre recherche + filtre */}
          {projects.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  className="input pl-10 text-sm"
                  placeholder="Rechercher par nom ou ville…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Rechercher un projet"
                />
              </div>
              <div className="relative">
                <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  className="input pl-8 pr-4 text-sm w-full sm:w-48 appearance-none cursor-pointer"
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value as ProjectStatus | 'all')}
                  aria-label="Filtrer par statut"
                >
                  {statusOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Grille projets */}
          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="card">
                  <div className="skeleton h-5 w-2/3 mb-2 rounded" />
                  <div className="skeleton h-3 w-1/2 mb-4 rounded" />
                  <div className="skeleton h-3 w-1/3 mb-3 rounded" />
                  <div className="skeleton h-2 w-full rounded" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 && projects.length === 0 ? (
            /* État vide */
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-2xl bg-brand-muted flex items-center justify-center mx-auto mb-5">
                <FolderOpen size={36} className="text-brand" />
              </div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
                Votre prochain projet commence ici.
              </h2>
              <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                Créez votre premier projet et obtenez un dossier d'entreprise complet adapté à votre marché.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/projets/nouveau" className="btn-primary">
                  <Plus size={18} /> Créer mon premier projet
                </Link>
                <Link to="/exemple" className="btn-secondary">
                  <FileText size={18} /> Voir un exemple
                </Link>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Search size={32} className="mx-auto mb-3 text-slate-300" />
              <p>Aucun projet ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(p => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onDelete={handleDelete}
                  onRename={handleRename}
                  onDuplicate={handleDuplicate}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dialog confirmation suppression */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="bg-surface rounded-dialog shadow-dialog max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertCircle size={20} className="text-error" />
              </div>
              <div>
                <h2 id="delete-title" className="font-display font-bold text-slate-900 text-lg">Supprimer le projet ?</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Cette action est irréversible. Le dossier, les visuels et les données associées seront supprimés.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button className="btn-secondary" onClick={() => setDeleteConfirm(null)}>Annuler</button>
              <button className="btn-danger" onClick={confirmDelete}>Supprimer définitivement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
