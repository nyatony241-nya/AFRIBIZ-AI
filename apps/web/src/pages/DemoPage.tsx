import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Play } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <header className="bg-forest border-b border-forest-light h-16 flex items-center px-6 sticky top-0 z-40">
        <div className="max-w-content mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-green-200 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Retour à l'accueil</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="badge bg-gold/20 text-gold border border-gold/30">Mode Démonstration</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="card max-w-2xl w-full text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-brand-muted flex items-center justify-center mx-auto mb-6">
            <Play size={32} className="text-brand ml-1" />
          </div>
          
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-4">
            Dossier Exemple : FreshBox Dakar
          </h1>
          
          <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Pour explorer un dossier complet généré par l'IA, connectez-vous avec le compte de démonstration.
          </p>

          <div className="bg-neutral-50 border border-border rounded-xl p-6 max-w-md mx-auto mb-8 text-left">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Identifiants de test</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Email</span>
                <code className="bg-surface border border-border px-2 py-1 rounded font-mono text-sm text-slate-900">demo@afribiz.io</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Mot de passe</span>
                <code className="bg-surface border border-border px-2 py-1 rounded font-mono text-sm text-slate-900">demo1234</code>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/connexion" className="btn-primary-lg">
              Me connecter
              <ArrowLeft size={20} className="rotate-180" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
