'use client'

import { useState } from 'react'
import { ChevronDown, CornerUpLeft } from 'lucide-react'

type QueueItem = {
  id: string
  name: string
  status: 'Pendente' | 'Aprovado' | 'Rejeitado'
  time: string
  img: string
  copy: string
  cta: string
  publico: string
  responsavel: string
}

const queueItems: QueueItem[] = [
  { id: '1', name: 'Summer Sale Campaign - FB Ad', status: 'Pendente', time: 'Hoje, 10:30', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', copy: 'Summer Glow Essentials | Limited Time Offer.\nUnlock your best skin yet with our curated Summer Glow collection. Get 20% off on select items now! Shop the sale before it ends.', cta: 'Shop Now', publico: 'Mulheres, 25-45, Interesse em Beleza', responsavel: 'Maria Silva' },
  { id: '2', name: 'Summer Sale Campaign - FB Ad', status: 'Pendente', time: 'Hoje, 10:30', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80', copy: 'Descubra a linha completa Glow Skincare com 20% de desconto.', cta: 'Comprar Agora', publico: 'Mulheres, 30-50, Interesse em Skincare', responsavel: 'Ana Costa' },
  { id: '3', name: 'Summer Glow Daign - FB Ad', status: 'Pendente', time: 'Hoje, 10:30', img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80', copy: 'Transforme sua rotina de beleza com Glow Skincare.', cta: 'Ver Produtos', publico: 'Mulheres, 20-40, Beleza Natural', responsavel: 'Pedro Santos' },
  { id: '4', name: 'Summer Serd Campaign - FB Ad', status: 'Pendente', time: 'Hoje, 10:30', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80', copy: 'Produtos premium para sua pele brilhar neste verão.', cta: 'Saiba Mais', publico: 'Mulheres, 25-45, Premium Beauty', responsavel: 'Lucia Torres' },
  { id: '5', name: 'Summer Sare Campaign - FB Ad', status: 'Pendente', time: 'Hoje, 10:30', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80', copy: 'Beleza natural com ingredientes orgânicos.', cta: 'Experimentar', publico: 'Mulheres, 25-40, Orgânico & Sustentável', responsavel: 'Carla Lima' },
  { id: '6', name: 'Summer Sare Campaign - FB Ad', status: 'Pendente', time: 'Hoje, 10:30', img: 'https://images.unsplash.com/photo-1631730486572-226d1f595058?w=400&q=80', copy: 'Hidratação profunda para o verão.', cta: 'Comprar', publico: 'Mulheres, 30-55, Hidratação', responsavel: 'Julia Ferreira' },
]

const statusBadge: Record<string, string> = {
  Pendente: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Aprovado: 'bg-green-100 text-green-700 border border-green-200',
  Rejeitado: 'bg-red-100 text-[#E8181A] border border-red-200',
}

export default function PublicacoesPage() {
  const [selectedId, setSelectedId] = useState('1')
  const [onlyPending, setOnlyPending] = useState(true)

  const selected = queueItems.find(q => q.id === selectedId) || queueItems[0]

  return (
    <div>
      <h1 className="font-anton text-[28px] text-text-primary mb-6 tracking-wide">Approval Queue Detail</h1>

      <div className="flex gap-5">
        {/* Left — Queue list */}
        <div className="w-[420px] flex-shrink-0">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 font-arimo text-sm text-text-secondary outline-none focus:border-[#E8181A] bg-white appearance-none pr-6">
                <option>Campanha</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 font-arimo text-sm text-text-secondary outline-none focus:border-[#E8181A] bg-white appearance-none pr-6">
                <option>Canal</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
            </div>
          </div>

          {/* Pending toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-arimo text-sm text-text-secondary">Pending</span>
              <button
                onClick={() => setOnlyPending(!onlyPending)}
                className="relative w-10 h-6 rounded-full transition-colors"
                style={{ background: onlyPending ? '#E8181A' : '#D1D5DB' }}
              >
                <div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
                  style={{ left: onlyPending ? '20px' : '4px' }}
                />
              </button>
            </div>
            <span className="bg-[#E8181A] text-white font-archivo text-[11px] uppercase tracking-wide px-3 py-1 rounded-full">
              {queueItems.length} itens aguardando
            </span>
          </div>

          {/* List */}
          <div className="space-y-2">
            {queueItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  selectedId === item.id
                    ? 'border-[#E8181A] bg-[#FFF5F5] shadow-red-glow'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-soft'
                }`}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-arimo text-[13px] text-text-primary font-medium truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`font-archivo text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${statusBadge[item.status]}`}>
                      {item.status}
                    </span>
                    <span className="font-arimo text-[11px] text-text-tertiary">{item.time}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — Detail */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
            {/* Image */}
            <div className="w-full h-64 overflow-hidden bg-gray-100">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
              {/* Copy */}
              <div className="bg-[#FFF8F7] rounded-xl p-4 mb-4">
                <h3 className="font-anton text-[16px] text-text-primary mb-2">{selected.name.split(' - ')[0]}</h3>
                <p className="font-arimo text-sm text-text-secondary leading-relaxed whitespace-pre-line mb-3">{selected.copy}</p>
                <button className="bg-[#E8181A] text-white font-arimo text-sm px-4 py-2 rounded-lg hover:bg-[#C41214] transition-colors">
                  {selected.cta}
                </button>
              </div>

              {/* Meta */}
              <div className="flex gap-4 mb-4 text-sm">
                <div>
                  <span className="font-archivo text-[10px] uppercase tracking-widest text-text-tertiary">Público: </span>
                  <span className="font-arimo text-text-secondary">{selected.publico}</span>
                </div>
                <div>
                  <span className="font-archivo text-[10px] uppercase tracking-widest text-text-tertiary">Responsável: </span>
                  <span className="font-arimo text-text-secondary">{selected.responsavel}</span>
                </div>
              </div>

              {/* Comment */}
              <div className="flex items-start gap-3 p-3 bg-[#F9F9F9] rounded-xl mb-4">
                <div className="w-8 h-8 rounded-full bg-[#E8181A] flex items-center justify-center flex-shrink-0">
                  <span className="font-anton text-white text-xs">P</span>
                </div>
                <div>
                  <p className="font-arimo text-[13px] font-semibold text-text-primary">Pedro Santos</p>
                  <p className="font-arimo text-sm text-text-secondary">Looks great, but let&apos;s adjust the headline slightly for better engagement.</p>
                  <button className="flex items-center gap-1 font-arimo text-xs text-text-tertiary hover:text-[#E8181A] transition-colors mt-1">
                    <CornerUpLeft size={12} />
                    Responde
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button className="flex-1 border border-gray-200 text-text-secondary font-arimo text-sm py-2.5 rounded-xl hover:border-red-300 hover:text-[#E8181A] transition-colors">
                  Rejeitar
                </button>
                <button className="flex-1 border border-gray-300 text-text-primary font-arimo text-sm py-2.5 rounded-xl hover:border-gray-400 transition-colors">
                  Solicitar revisão
                </button>
                <button className="flex-1 bg-[#E8181A] text-white font-arimo text-sm py-2.5 rounded-xl hover:bg-[#C41214] transition-colors">
                  Aprovar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
