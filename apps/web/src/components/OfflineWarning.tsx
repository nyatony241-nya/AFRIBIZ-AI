import { useState, useEffect } from 'react'
import { WifiOff, Wifi } from 'lucide-react'
import toast from 'react-hot-toast'

export function OfflineWarning() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast.success('Connexion internet rétablie', {
        icon: <Wifi className="text-emerald-500" size={18} />
      })
    }
    const handleOffline = () => {
      setIsOnline(false)
      toast.error('Vous êtes hors ligne. Les modifications locales seront synchronisées plus tard.', {
        icon: <WifiOff className="text-amber-500" size={18} />,
        duration: 8000
      })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white text-xs font-medium py-1.5 px-4 flex items-center justify-center gap-2">
      <WifiOff size={14} />
      Mode hors ligne actif. Vous consultez les données en cache.
    </div>
  )
}
