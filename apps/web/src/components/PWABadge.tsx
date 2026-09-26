import { useState, useEffect } from 'react'
import { registerSW } from 'virtual:pwa-register'
import { Download, X } from 'lucide-react'

export function PWABadge() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [updateSW, setUpdateSW] = useState<((reloadPage?: boolean) => Promise<void>) | undefined>()

  useEffect(() => {
    const update = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true)
      },
      onRegistered(r) {
        console.log('SW Registered:', r)
      },
      onRegisterError(error) {
        console.log('SW registration error', error)
      }
    })
    setUpdateSW(() => update)
  }, [])

  if (!needRefresh) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-xl border border-border p-4 flex items-center gap-4 max-w-sm">
        <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
          <Download className="text-brand h-6 w-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-sm">Mise à jour disponible</h4>
          <p className="text-slate-500 text-xs mt-1">Une nouvelle version de l'application est prête à être installée.</p>
          <div className="flex items-center gap-2 mt-3">
            <button 
              onClick={() => updateSW && updateSW(true)}
              className="text-xs bg-brand text-white px-3 py-1.5 rounded-lg font-medium hover:bg-brand-dark transition-colors"
            >
              Mettre à jour
            </button>
            <button 
              onClick={() => setNeedRefresh(false)}
              className="text-xs text-slate-500 px-3 py-1.5 hover:text-slate-800 transition-colors"
            >
              Plus tard
            </button>
          </div>
        </div>
        <button 
          onClick={() => setNeedRefresh(false)}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
