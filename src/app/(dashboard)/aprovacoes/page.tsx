'use client'

import { useState } from 'react'
import { Check, X, Pencil, Filter, Search, ChevronDown } from 'lucide-react'

type CopyItem = {
  id: string
  campaignName: string
  format: string
  headline: string
  body: string
  cta: string
  status: 'pending' | 'editing' | 'approved' | 'rejected'
}

const initialCopies: CopyItem[] = [
  {
    id: '1',
    campaignName: 'Summer Sale Campaign - 01',
    format: 'Feed',
    headline: '(H3) 🔥 Descontos Imperdíveis!',
    body: 'Aproveite nossa promoção de verão com ofertas incríveis em toda a loja. Não perca a chance de economizar e renovar seu guarda-roupa.',
    cta: 'Comprar Agora',
    status: 'pending',
  },
  {
    id: '2',
    campaignName: 'Summer Sale Campaign - 01',
    format: 'Feed',
    headline: '(H3): 🔥 Descontos Imperdíveis!',
    body: 'Aproveite nossa promoção de verão com ofertas incríveis em toda a loja. Não perca a chance de economizar e renovar seu guarda-roupa.',
    cta: 'Comprar Agora',
    status: 'editing',
  },
  {
    id: '3',
    campaignName: 'Summer Sale Campaign - 01',
    format: 'Feed',
    headline: '(H3): 🔥 Descontos Imperdíveis!',
    body: 'Aproveite nossa promoção de verão com ofertas incríveis em toda a loja. Não perca a chance de economizar e renovar seu guarda-roupa.',
    cta: 'Comprar Agora',
    status: 'pending',
  },
  {
    id: '4',
    campaignName: 'Summer Sale Campaign - 01',
    format: 'Stories',
    headline: '(H3): 🔥 Descontos Imperdíveis!',
    body: 'Aproveite nossa promoção de verão com ofertas incríveis em toda a loja. Não perca a chance de economizar e renovar seu guarda-roupa.',
    cta: 'Saiba Mais',
    status: 'pending',
  },
]

export default function AprovacoesPage() {
  const [copies, setCopies] = useState(initialCopies)
  const [editData, setEditData] = useState<Record<string, { headline: string; body: string }>>({})

  function startEdit(id: string, headline: string, body: string) {
    setEditData(prev => ({ ...prev, [id]: { headline, body } }))
    setCopies(prev => prev.map(c => c.id === id ? { ...c, status: 'editing' } : c))
  }

  function cancelEdit(id: string) {
    setCopies(prev => prev.map(c => c.id === id ? { ...c, status: 'pending' } : c))
  }

  function saveEdit(id: string) {
    const data = editData[id]
    if (!data) return
    setCopies(prev => prev.map(c =>
      c.id === id ? { ...c, status: 'pending', headline: data.headline, body: data.body } : c
    ))
  }

  function setStatus(id: string, status: 'approved' | 'rejected') {
    setCopies(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-anton text-[28px] text-text-primary tracking-wide">Copywriting Review List</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 font-arimo text-sm text-text-secondary hover:border-gray-300 transition-colors">
            <Filter size={14} />
            Filtra
            <ChevronDown size={12} />
          </button>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 w-52">
            <Search size={14} className="text-text-tertiary flex-shrink-0" />
            <input className="flex-1 font-arimo text-sm text-text-primary outline-none placeholder-text-tertiary bg-transparent" placeholder="Pescem" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {copies.map(copy => (
          <div
            key={copy.id}
            className={`bg-white rounded-xl border shadow-soft transition-all ${
              copy.status === 'editing' ? 'border-[#E8181A] shadow-[0_0_0_1px_rgba(232,24,26,0.2)]' : 'border-gray-100'
            }`}
          >
            {copy.status === 'editing' ? (
              <EditingRow
                copy={copy}
                editData={editData[copy.id] || { headline: copy.headline, body: copy.body }}
                onChange={(field, val) => setEditData(prev => ({ ...prev, [copy.id]: { ...prev[copy.id], [field]: val } }))}
                onSave={() => saveEdit(copy.id)}
                onCancel={() => cancelEdit(copy.id)}
              />
            ) : (
              <NormalRow
                copy={copy}
                onApprove={() => setStatus(copy.id, 'approved')}
                onReject={() => setStatus(copy.id, 'rejected')}
                onEdit={() => startEdit(copy.id, copy.headline, copy.body)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function NormalRow({
  copy,
  onApprove,
  onReject,
  onEdit,
}: {
  copy: CopyItem
  onApprove: () => void
  onReject: () => void
  onEdit: () => void
}) {
  return (
    <div className="flex items-start p-5 gap-4">
      {/* Left meta */}
      <div className="w-48 flex-shrink-0">
        <p className="font-arimo text-[12px] text-text-secondary">Creative Name:</p>
        <p className="font-arimo text-[13px] text-text-primary font-medium mb-2">{copy.campaignName}</p>
        <span className="inline-flex items-center gap-1 border border-gray-200 rounded-md px-2 py-0.5 font-archivo text-[10px] uppercase tracking-wide text-text-secondary">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40">
            <rect x="1" y="1" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1 4h8" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {copy.format}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="font-arimo text-[13px] font-semibold text-text-primary mb-1">{copy.headline}</p>
        <p className="font-arimo text-[13px] font-semibold text-text-primary mb-1">{copy.headline}</p>
        <p className="font-arimo text-[13px] text-text-secondary mb-2 leading-relaxed">
          {copy.body} <button className="text-[#E8181A] hover:underline">ver mais</button>
        </p>
        <span className="inline-block bg-[#E8181A] text-white font-archivo text-[10px] uppercase tracking-wide px-3 py-1 rounded-full">
          CTA: {copy.cta}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button onClick={onApprove} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors group-hover:border-green-500">
            <Check size={16} className="text-text-secondary group-hover:text-green-600" />
          </div>
          <span className="font-archivo text-[9px] uppercase tracking-wide text-text-tertiary">Approve</span>
        </button>
        <button onClick={onEdit} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Pencil size={14} className="text-text-secondary group-hover:text-blue-600" />
          </div>
          <span className="font-archivo text-[9px] uppercase tracking-wide text-text-tertiary">Edit</span>
        </button>
        <button onClick={onReject} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-red-500 hover:bg-red-50 transition-colors">
            <X size={16} className="text-text-secondary group-hover:text-[#E8181A]" />
          </div>
          <span className="font-archivo text-[9px] uppercase tracking-wide text-text-tertiary">Reject</span>
        </button>
      </div>
    </div>
  )
}

function EditingRow({
  copy,
  editData,
  onChange,
  onSave,
  onCancel,
}: {
  copy: CopyItem
  editData: { headline: string; body: string }
  onChange: (field: string, val: string) => void
  onSave: () => void
  onCancel: () => void
}) {
  return (
    <div className="p-5">
      <div className="flex items-start gap-4">
        {/* Left meta */}
        <div className="w-48 flex-shrink-0">
          <p className="font-arimo text-[12px] text-text-secondary">Creative Name:</p>
          <p className="font-arimo text-[13px] text-text-primary font-medium mb-2">{copy.campaignName}</p>
          <span className="inline-flex items-center gap-1 border border-gray-200 rounded-md px-2 py-0.5 font-archivo text-[10px] uppercase tracking-wide text-text-secondary">
            {copy.format}
          </span>
        </div>

        {/* Edit fields */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <input
              value={editData.headline}
              onChange={e => onChange('headline', e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 font-arimo text-sm text-text-primary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition"
            />
            <button onClick={onSave} className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors">
              <Check size={14} className="text-text-secondary" />
            </button>
            <button onClick={onCancel} className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center hover:border-red-500 hover:bg-red-50 transition-colors">
              <X size={14} className="text-text-secondary" />
            </button>
          </div>
          <textarea
            value={editData.body}
            onChange={e => onChange('body', e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 font-arimo text-sm text-text-primary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onCancel} className="border border-gray-200 text-text-secondary font-arimo text-sm px-5 py-2 rounded-lg hover:border-gray-300 transition-colors">
          Cancelar
        </button>
        <button onClick={onSave} className="bg-[#E8181A] text-white font-arimo text-sm px-5 py-2 rounded-lg hover:bg-[#C41214] transition-colors">
          Salvar
        </button>
      </div>
    </div>
  )
}
