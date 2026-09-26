import React, { createContext, useState, useEffect, useCallback } from 'react'

interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

// En mode démo, on simule un utilisateur local
const DEMO_USER: User = {
  id: 'demo-user-001',
  email: 'demo@afribiz.io',
  name: 'Utilisateur Démo',
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérification de session au démarrage
    checkSession()
  }, [])

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.data?.user) {
          setUser(data.data.user)
        }
      }
    } catch {
      // En mode démo sans API, vérifier localStorage
      const stored = localStorage.getItem('afribiz_demo_user')
      if (stored) {
        try { setUser(JSON.parse(stored)) } catch { /* ignore */ }
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error ?? 'Connexion échouée')
      setUser(data.data.user)
    } catch (err) {
      // Mode démo fallback
      if (email === 'demo@afribiz.io' && password === 'demo1234') {
        setUser(DEMO_USER)
        localStorage.setItem('afribiz_demo_user', JSON.stringify(DEMO_USER))
        return
      }
      throw err
    }
  }, [])

  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error ?? 'Inscription échouée')
      setUser(data.data.user)
    } catch (err) {
      // Demo fallback — créer compte local
      const newUser: User = { id: `demo-${Date.now()}`, email, name }
      setUser(newUser)
      localStorage.setItem('afribiz_demo_user', JSON.stringify(newUser))
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch { /* ignore */ }
    setUser(null)
    localStorage.removeItem('afribiz_demo_user')
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error ?? 'Erreur lors de la réinitialisation')
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
