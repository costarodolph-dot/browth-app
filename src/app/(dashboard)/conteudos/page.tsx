'use client'

import { useState } from 'react'
import { Check, X, CheckCircle, Clock, XCircle } from 'lucide-react'

type Criativo = {
  id: string
  label: string
  img: string
  status: 'aprovado' | 'aguardando' | 'reprovado'
}

const IMAGES = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&q=80',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80',
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&q=80',
  'https://images.unsplash.com/photo-1631730486572-226d1f595058?w=300&q=80',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&q=80',
  'https://images.unsplash.com/photo-1617897903246-719242758050?w=300&q=80',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&q=80',
]

const initialCriativos: Criativo[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  label: `FB - Carrossel - ${i < 7 ? 'Promoção Verão' : i === 7 ? 'Bekera' : 'Gskincare'}`,
  img: IMAGES[i % IMAGES.length],
  status: 'aguardando',
}))

type Tab = 'aprovado' | 'aguardando' | 'reprovado'

export default function ConteudosPage() {
  const [criativos, setCriativos] = useState(initialCriativos)
  const [activeTab, setActiveTab] = useState<Tab>('aguardando')
  const [selected, setSelected] = useState<Criativo | null>(criativos[5])

  function handleStatus(id: string, status: 'aprovado' | 'reprovado') {
    setCriativos(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  const counts = {
    aprovado: criativos.filter(c => c.status === 'aprovado').length,
    aguardando: criativos.filter(c => c.status === 'aguardando').length,
    reprovado: criativos.filter(c => c.status === 'reprovado').length,
  }

  const filtered = criativos.filter(c => c.status === activeTab)

  const tabs: { key: Tab; label: string; icon: React.ReactNode; color: string }[] = [
    { key: 'aprovado', label: 'Aprovados', icon: <CheckCircle size={14} />, color: 'text-status-success' },
    { key: 'aguardando', label: 'Aguardando', icon: <Clock size={14} />, color: 'text-status-warning' },
    { key: 'reprovado', label: 'Reprovados', icon: <XCircle size={14} />, color: 'text-status-error' },
  ]

  return (
    <div>
      <h1 className="font-anton text-[28px] text-text-primary mb-6 tracking-wide">Creative Assets Review</h1>

      <div className="flex gap-4">
        {/* Main area */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="flex gap-3 mb-5">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-arimo text-sm transition-all ${
                  activeTab === tab.key
                    ? 'bg-white border-gray-200 shadow-soft'
                    : 'border-transparent text-text-secondary hover:bg-white hover:border-gray-200'
                }`}
              >
                <span className={tab.color}>{tab.icon}</span>
                <span className="text-text-secondary">{tab.label}</span>
                <span className={`font-anton text-[14px] ${tab.color}`}>{counts[tab.key]}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-5 gap-3">
            {filtered.map(c => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className={`bg-white rounded-xl overflow-hidden border cursor-pointer transition-all hover:shadow-md ${
                  selected?.id === c.id ? 'border-[#E8181A] shadow-[0_0_0_2px_rgba(232,24,26,0.15)]' : 'border-gray-100'
                }`}
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={c.img}
                    alt={c.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="font-arimo text-[10px] text-text-secondary mb-2 leading-tight">{c.label}</p>
                  <div className="flex gap-1">
                    <button
                      onClick={e => { e.stopPropagation(); handleStatus(c.id, 'aprovado') }}
                      className="flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 px-2 py-1 rounded-md font-archivo text-[9px] uppercase tracking-wide transition-colors flex-1 justify-center"
                    >
                      <Check size={9} />
                      Aprovar
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleStatus(c.id, 'reprovado') }}
                      className="flex items-center gap-1 bg-red-50 text-[#E8181A] hover:bg-red-100 px-2 py-1 rounded-md font-archivo text-[9px] uppercase tracking-wide transition-colors flex-1 justify-center"
                    >
                      <X size={9} />
                      Reprovar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-[320px] flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden sticky top-[80px]">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img src={selected.img} alt={selected.label} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-anton text-[16px] text-text-primary mb-3">Legenda sugerida</h3>
                <p className="font-arimo text-sm text-text-secondary leading-relaxed mb-4">
                  Sua pele merece o melhor cuidado neste verão! Aproveite 20% OFF em toda a linha Glow Skincare, com telas necestanis com para compartrcer...
                </p>
                <h4 className="font-anton text-[13px] text-text-primary mb-2">Hashtags</h4>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['#GlowSkincare', '#PromoVerão', '#SkinCareRoutine', '#BelezaNatural', '#BelezaNatura'].map(tag => (
                    <span key={tag} className="font-archivo text-[10px] uppercase tracking-wide bg-[#FFF0EF] text-[#E8181A] px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleStatus(selected.id, 'aprovado')}
                  className="w-full bg-status-success hover:bg-green-700 text-white font-arimo text-sm font-medium py-3 rounded-xl transition-colors"
                >
                  Aprovado
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
