import { Link } from 'react-router-dom'
import { ArrowLeft, User, Bell, Shield, Download, Trash2, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="bg-surface border-b border-border h-16 flex items-center px-6 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto w-full flex items-center gap-4">
          <Link to="/projets" className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 text-slate-500 hover:text-slate-900 hover:bg-neutral-200 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="font-display font-bold text-slate-900 text-lg">Paramètres</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6 sm:p-8 space-y-8">
        
        {/* Profil */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-brand" />
            <h2 className="font-display font-bold text-xl text-slate-900">Profil</h2>
          </div>
          <div className="card space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xl font-bold shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-slate-900">{user?.name}</div>
                <div className="text-sm text-slate-500">{user?.email}</div>
              </div>
            </div>
            
            <div className="divider my-4" />
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Nom complet</label>
                <input type="text" className="input" defaultValue={user?.name} />
              </div>
              <div>
                <label className="label">Langue de l'interface</label>
                <select className="input">
                  <option value="fr">Français</option>
                  <option value="en" disabled>English (Bientôt)</option>
                </select>
              </div>
            </div>
            <button className="btn-primary mt-2">Enregistrer les modifications</button>
          </div>
        </section>

        {/* Préférences */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-brand" />
            <h2 className="font-display font-bold text-xl text-slate-900">Préférences de génération</h2>
          </div>
          <div className="card space-y-4">
            <div>
              <label className="label">Devise par défaut</label>
              <select className="input max-w-xs">
                <option value="XOF">FCFA (XOF)</option>
                <option value="XAF">FCFA (XAF)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dollar (USD)</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Utilisée lors de la création d'un nouveau projet.</p>
            </div>
            
            <div className="divider my-4" />
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900 text-sm">Mode démo</div>
                <div className="text-xs text-slate-500">Utilise des données fictives sans consommer de crédits IA</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Données & Sécurité */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-brand" />
            <h2 className="font-display font-bold text-xl text-slate-900">Données & Sécurité</h2>
          </div>
          <div className="card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-xl">
              <div>
                <div className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  Exporter mes données <CheckCircle2 size={14} className="text-brand" />
                </div>
                <div className="text-xs text-slate-500 max-w-sm mt-0.5">Téléchargez tous vos projets et données personnelles au format JSON.</div>
              </div>
              <button className="btn-secondary text-sm whitespace-nowrap shrink-0">
                <Download size={14} /> Exporter
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-100 bg-red-50/50 rounded-xl">
              <div>
                <div className="font-semibold text-error text-sm">Supprimer mon compte</div>
                <div className="text-xs text-red-600/70 max-w-sm mt-0.5">Cette action est irréversible et supprimera tous vos projets.</div>
              </div>
              <button className="btn-danger text-sm whitespace-nowrap shrink-0">
                <Trash2 size={14} /> Supprimer le compte
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
