import { type Branding } from '@afribiz/shared'
import { Palette, Feather, Tag, Droplet } from 'lucide-react'

interface MarqueTabProps {
  branding: Branding
}

export function MarqueTab({ branding }: MarqueTabProps) {
  return (
    <div className="space-y-6">
      
      {/* Header Marque */}
      <div className="card text-center py-10 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-10">
          <Palette size={80} />
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-dark mb-4">
          {branding.recommendedName}
        </h2>
        <p className="text-xl md:text-2xl text-slate-600 font-medium font-display italic">
          "{branding.tagline}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Identité Visuelle */}
        <div className="card space-y-6">
          <div className="flex items-center gap-2 text-slate-900 border-b border-border pb-3">
            <Droplet size={20} className="text-brand" />
            <h3 className="font-display font-bold text-lg">Palette de couleurs</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-16 h-16 rounded-full shadow-inner border border-slate-200" 
                style={{ backgroundColor: branding.palette.primary }}
              />
              <span className="text-xs font-mono text-slate-500">{branding.palette.primary}</span>
              <span className="text-xs font-medium">Primaire</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-16 h-16 rounded-full shadow-inner border border-slate-200" 
                style={{ backgroundColor: branding.palette.secondary }}
              />
              <span className="text-xs font-mono text-slate-500">{branding.palette.secondary}</span>
              <span className="text-xs font-medium">Secondaire</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-16 h-16 rounded-full shadow-inner border border-slate-200" 
                style={{ backgroundColor: branding.palette.accent }}
              />
              <span className="text-xs font-mono text-slate-500">{branding.palette.accent}</span>
              <span className="text-xs font-medium">Accent</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-16 h-16 rounded-full shadow-inner border border-slate-200" 
                style={{ backgroundColor: branding.palette.background }}
              />
              <span className="text-xs font-mono text-slate-500">{branding.palette.background}</span>
              <span className="text-xs font-medium">Fond</span>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed border border-slate-100">
            <strong>Guide d'usage :</strong> {branding.palette.usageGuide}
          </div>
        </div>

        {/* Noms alternatifs */}
        <div className="card space-y-6">
          <div className="flex items-center gap-2 text-slate-900 border-b border-border pb-3">
            <Tag size={20} className="text-brand" />
            <h3 className="font-display font-bold text-lg">Autres options de noms</h3>
          </div>
          
          <div className="space-y-4">
            {branding.options.map((option, index) => (
              <div key={index} className="p-4 rounded-lg border border-border hover:border-brand/30 transition-colors bg-white">
                <h4 className="font-display font-bold text-lg mb-1">{option.name}</h4>
                <p className="text-sm text-slate-500 mb-2 italic">"{option.positioning}"</p>
                <p className="text-sm text-slate-700">{option.meaning}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}
