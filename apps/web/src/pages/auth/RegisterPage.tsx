import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { AuthLayout } from './LoginPage'

const schema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères').max(60),
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const { register: doRegister } = useAuth()
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await doRegister(data.email, data.password, data.name)
      navigate('/projets', { replace: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Inscription échouée'
      setError('root', { message: msg })
    }
  }

  return (
    <AuthLayout
      title="Créer votre compte"
      subtitle="Commencez à construire votre dossier d'entreprise"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {errors.root && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-input p-4" role="alert">
            <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
            <p className="text-sm text-error">{errors.root.message}</p>
          </div>
        )}

        <div>
          <label className="label" htmlFor="name">Nom complet</label>
          <input id="name" type="text" className={errors.name ? 'input-error' : 'input'} placeholder="Jean Dupont" autoComplete="name" {...register('name')} />
          {errors.name && <p className="error-message"><AlertCircle size={12} />{errors.name.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" className={errors.email ? 'input-error' : 'input'} placeholder="vous@exemple.com" autoComplete="email" {...register('email')} />
          {errors.email && <p className="error-message"><AlertCircle size={12} />{errors.email.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="password">Mot de passe</label>
          <div className="relative">
            <input id="password" type={showPw ? 'text' : 'password'} className={`${errors.password ? 'input-error' : 'input'} pr-12`} placeholder="Minimum 8 caractères" autoComplete="new-password" {...register('password')} />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1" onClick={() => setShowPw(!showPw)} aria-label={showPw ? 'Masquer' : 'Afficher'}>
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="error-message"><AlertCircle size={12} />{errors.password.message}</p>}
        </div>

        <div>
          <label className="label" htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input id="confirmPassword" type={showPw ? 'text' : 'password'} className={errors.confirmPassword ? 'input-error' : 'input'} placeholder="••••••••" autoComplete="new-password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="error-message"><AlertCircle size={12} />{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="btn-primary w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? 'Création du compte…' : 'Créer mon compte'}
          {!isSubmitting && <ArrowRight size={16} />}
        </button>

        <p className="text-center text-sm text-slate-600">
          Déjà un compte ?{' '}
          <Link to="/connexion" className="text-brand-dark font-semibold hover:underline">Se connecter</Link>
        </p>

        <p className="text-center text-xs text-slate-400">
          En créant un compte, vous acceptez que vos données soient traitées pour vous fournir le service.
        </p>
      </form>
    </AuthLayout>
  )
}
