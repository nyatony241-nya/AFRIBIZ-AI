import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { useAuth } from '@/hooks/useAuth'
import { OfflineWarning } from '@/components/OfflineWarning'

// Pages publiques
import LandingPage    from '@/pages/LandingPage'
import LoginPage      from '@/pages/auth/LoginPage'
import RegisterPage   from '@/pages/auth/RegisterPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'
import PricingPage    from '@/pages/PricingPage'

// Pages protégées
import DashboardPage  from '@/pages/dashboard/DashboardPage'
import NewProjectPage from '@/pages/dashboard/NewProjectPage'
import ProjectPage    from '@/pages/project/ProjectPage'
import SettingsPage   from '@/pages/settings/SettingsPage'
import DemoPage       from '@/pages/DemoPage'

// Guards
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <AppLoader />
  if (!user) return <Navigate to="/connexion" replace />
  return <>{children}</>
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <AppLoader />
  if (user) return <Navigate to="/projets" replace />
  return <>{children}</>
}

function AppLoader() {
  return (
    <div className="fixed inset-0 bg-ivory flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center">
          <span className="text-white font-display font-bold text-lg">A</span>
        </div>
        <div className="w-48 h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-brand rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/exemple" element={<DemoPage />} />
          <Route path="/tarifs" element={<PricingPage />} />

          {/* Auth — public seulement */}
          <Route path="/connexion" element={
            <PublicOnlyRoute><LoginPage /></PublicOnlyRoute>
          } />
          <Route path="/inscription" element={
            <PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>
          } />
          <Route path="/mot-de-passe-oublie" element={
            <PublicOnlyRoute><ResetPasswordPage /></PublicOnlyRoute>
          } />

          {/* Protégées */}
          <Route path="/projets" element={
            <PrivateRoute><DashboardPage /></PrivateRoute>
          } />
          <Route path="/projets/nouveau" element={
            <PrivateRoute><NewProjectPage /></PrivateRoute>
          } />
          <Route path="/projets/:projectId/*" element={
            <PrivateRoute><ProjectPage /></PrivateRoute>
          } />
          <Route path="/parametres" element={
            <PrivateRoute><SettingsPage /></PrivateRoute>
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <OfflineWarning />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#0F172A',
              borderRadius: '12px',
              border: '1px solid #E8E2D8',
              boxShadow: '0 8px 32px rgba(15,23,42,0.12)',
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#059669', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#B91C1C', secondary: '#fff' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}
