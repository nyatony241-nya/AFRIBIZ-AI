import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { AuthLayout } from './LoginPage'

const schema = z.object({
  email: z.string().email('Adresse email invalide'),
})
type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, getValues } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.email)
      setSent(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la réinitialisation'
      setError('root', { message: msg })
    }
  }

  return (
    <AuthLayout
      title="Mot de passe oublié"
      subtitle="Saisissez votre email pour recevoir un lien de réinitialisation"
    >
      {sent ? (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-brand-muted flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-brand" />
          </div>
          <h2 className="font-display font-bold text-xl text-slate-900 mb-2">Email envoyé</h2>
          <p className="text-slate-600 text-sm mb-6">
            Si un compte est associé à <strong>{getValues('email')}</strong>, vous recevrez un email avec un lien valide 1 heure.
          </p>
          <Link to="/connexion" className="btn-secondary inline-flex gap-2">
            <ArrowLeft size={16} />
            Retour à la connexion
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          {errors.root && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-input p-4" role="alert">
              <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
              <p className="text-sm text-error">{errors.root.message}</p>
            </div>
          )}

          <div>
            <label className="label" htmlFor="email">Adresse email</label>
            <div className="relative">
              <input id="email" type="email" className={`${errors.email ? 'input-error' : 'input'} pl-11`} placeholder="vous@exemple.com" autoComplete="email" {...register('email')} />
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            {errors.email && <p className="error-message"><AlertCircle size={12} />{errors.email.message}</p>}
          </div>

          <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi…' : 'Envoyer le lien'}
          </button>

          <Link to="/connexion" className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-brand-dark transition-colors">
            <ArrowLeft size={15} />
            Retour à la connexion
          </Link>
        </form>
      )}
    </AuthLayout>
  )
}
