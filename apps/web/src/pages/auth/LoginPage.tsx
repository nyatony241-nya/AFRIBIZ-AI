import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from ?? '/projets'
  const [showPw, setShowPw] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password)
      navigate(from, { replace: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Connexion échouée'
      setError('root', { message: msg })
    }
  }

  return (
    <AuthLayout
      title="Bon retour"
      subtitle="Connectez-vous pour accéder à vos projets"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        {errors.root && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-input p-4" role="alert">
            <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
            <p className="text-sm text-error">{errors.root.message}</p>
          </div>
        )}

        <div>
          <label className="label" htmlFor="email">Adresse email</label>
          <input
            id="email"
            type="email"
            className={errors.email ? 'input-error' : 'input'}
            placeholder="vous@exemple.com"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && <p className="error-message"><AlertCircle size={12} />{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="label mb-0" htmlFor="password">Mot de passe</label>
            <Link to="/mot-de-passe-oublie" className="text-xs text-brand-dark hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              className={`${errors.password ? 'input-error' : 'input'} pr-12`}
              placeholder="••••••••"
              autoComplete="current-password"
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              onClick={() => setShowPw(!showPw)}
              aria-label={showPw ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="error-message"><AlertCircle size={12} />{errors.password.message}</p>}
        </div>

        {/* Mode démo */}
        <div className="bg-brand-muted border border-green-200 rounded-input p-3 text-sm text-slate-600">
          <strong className="text-brand-dark">Démo :</strong> email <code className="bg-green-100 px-1 rounded">demo@afribiz.io</code> · mdp <code className="bg-green-100 px-1 rounded">demo1234</code>
        </div>

        <button type="submit" className="btn-primary w-full mt-1" disabled={isSubmitting}>
          {isSubmitting ? 'Connexion…' : 'Se connecter'}
          {!isSubmitting && <ArrowRight size={16} />}
        </button>

        <p className="text-center text-sm text-slate-600">
          Pas encore de compte ?{' '}
          <Link to="/inscription" className="text-brand-dark font-semibold hover:underline">
            Créer un compte
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

// ============================================================
// LAYOUT AUTH PARTAGÉ
// ============================================================
export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Panneau gauche sombre — style du design de référence */}
      <div className="hidden lg:flex w-1/2 bg-forest-gradient flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Orbe */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(5,150,105,0.4) 0%, transparent 70%)'
        }} />
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-sm text-center">
          <Link to="/" className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-brand">
              <span className="text-white font-display font-bold text-xl">A</span>
            </div>
            <div className="text-left">
              <div className="text-white font-display font-bold text-xl leading-none">AfriBiz</div>
              <div className="text-green-300 text-sm">Architect</div>
            </div>
          </Link>

          <h2 className="font-display text-white text-2xl font-bold mb-4">
            De l'idée au lancement
          </h2>
          <p className="text-green-200 text-sm leading-relaxed mb-8">
            Transformez votre idée et votre budget en un dossier d'entreprise adapté à votre marché local.
          </p>

          {/* Mini features */}
          {['Analyse de marché locale', '6 modules complets', 'Projections financières', 'Export PDF'].map(f => (
            <div key={f} className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 rounded-full bg-brand/30 border border-brand/50 flex items-center justify-center shrink-0">
                <span className="text-brand text-xs">✓</span>
              </div>
              <span className="text-green-200 text-sm text-left">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-brand">
                <span className="text-white font-display font-bold text-lg">A</span>
              </div>
              <div>
                <div className="font-display font-bold text-slate-900">AfriBiz Architect</div>
                <div className="text-xs text-slate-400">De l'idée au lancement</div>
              </div>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-slate-900 mb-1">{title}</h1>
            <p className="text-slate-600 text-sm">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
