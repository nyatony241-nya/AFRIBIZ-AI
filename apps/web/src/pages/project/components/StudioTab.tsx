import { useState, useEffect } from 'react'
import { Palette, ImageIcon, Megaphone, Image as ImageLucide, RefreshCw, Download } from 'lucide-react'
import { type AfriBizDossier } from '@afribiz/shared'
import toast from 'react-hot-toast'

interface StudioTabProps {
  dossier: AfriBizDossier
}

interface GeneratedImages {
  logo: string
  product: string
  marketing: string
}

export function StudioTab({ dossier }: StudioTabProps) {
  const [images, setImages] = useState<GeneratedImages | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Dans un vrai cas, on lierait ça à un ID de projet et on stockerait en BDD
  const fetchImages = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || "") + "/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: dossier.businessPlan.executiveSummary.substring(0, 100),
          sector: dossier.businessPlan.targetMarket.substring(0, 50)
        })
      })
      
      const data = await res.json()
      if (data.success) {
        setImages(data.data)
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      console.error(err)
      setError("Erreur lors de la génération du studio visuel. Veuillez réessayer.")
      toast.error("Échec de la génération des images")
    } finally {
      setLoading(false)
    }
  }

  // Auto-fetch on mount if no images yet
  useEffect(() => {
    if (!images && !loading && !error) {
      fetchImages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="card text-center py-12">
          <Palette className="mx-auto h-12 w-12 text-brand/40 animate-bounce mb-4" />
          <h3 className="font-display text-xl font-bold text-slate-800 mb-2">
            Création de votre identité visuelle...
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Notre IA design (DALL-E 3) génère actuellement votre logo professionnel et vos maquettes marketing. Cela prend généralement 10 à 20 secondes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-200 rounded-2xl h-80 w-full"></div>
          <div className="space-y-6">
            <div className="bg-slate-200 rounded-2xl h-36 w-full"></div>
            <div className="bg-slate-200 rounded-2xl h-36 w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card text-center py-12 border-error/20 bg-error/5">
        <ImageLucide className="mx-auto h-12 w-12 text-error/60 mb-4" />
        <h3 className="font-display text-xl font-bold text-error mb-2">Génération échouée</h3>
        <p className="text-slate-600 mb-6">{error}</p>
        <button onClick={fetchImages} className="btn-primary mx-auto">
          <RefreshCw size={18} /> Réessayer
        </button>
      </div>
    )
  }

  if (!images) return null

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Palette className="text-brand" /> Studio Visuel
          </h2>
          <p className="text-slate-600 mt-1">
            Votre kit de marque généré sur-mesure pour un lancement immédiat.
          </p>
        </div>
        <button onClick={fetchImages} className="btn-secondary text-sm" title="Régénérer les images">
          <RefreshCw size={16} /> Régénérer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LOGO */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="card p-4 group relative overflow-hidden bg-white">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 z-10 shadow-sm">
              <ImageIcon size={14} className="text-brand" /> Logo
            </div>
            <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <img src={images.logo} alt="Logo généré" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <button className="absolute bottom-6 right-6 w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-brand hover:text-white translate-y-4 group-hover:translate-y-0">
              <Download size={18} />
            </button>
          </div>
          
          <div className="card bg-brand-muted/30 border-none">
            <h4 className="font-bold text-slate-800 text-sm mb-2">Palette suggérée</h4>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 shadow-inner"></div>
              <div className="w-8 h-8 rounded-full bg-brand shadow-inner"></div>
              <div className="w-8 h-8 rounded-full bg-amber-500 shadow-inner"></div>
              <div className="w-8 h-8 rounded-full bg-emerald-600 shadow-inner"></div>
            </div>
          </div>
        </div>

        {/* PRODUIT & MARKETING */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Produit */}
          <div className="card p-4 group relative overflow-hidden h-[300px]">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 z-10 shadow-sm">
              <ImageLucide size={14} className="text-indigo-600" /> Produit / Service
            </div>
            <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
              <img src={images.product} alt="Mockup produit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <button className="absolute bottom-6 right-6 w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-brand hover:text-white translate-y-4 group-hover:translate-y-0">
              <Download size={18} />
            </button>
          </div>

          {/* Marketing */}
          <div className="card p-4 group relative overflow-hidden h-[300px]">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 z-10 shadow-sm">
              <Megaphone size={14} className="text-rose-500" /> Pub Réseaux Sociaux
            </div>
            <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
              <img src={images.marketing} alt="Affiche Marketing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <button className="absolute bottom-6 right-6 w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-brand hover:text-white translate-y-4 group-hover:translate-y-0">
              <Download size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
