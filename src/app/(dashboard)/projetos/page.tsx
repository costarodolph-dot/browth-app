'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FbBadge, IgBadge } from '@/components/ui/ChannelIcons'
import Link from 'next/link'

type CampanhaCard = {
  id: string
  nome: string
  canais: ('facebook' | 'instagram')[]
  stage: number
  statusLabel: string
  statusType: 'aprovacao' | 'publicado' | 'criacao'
  proximaAcao: string
}

const campanhas: CampanhaCard[] = [
  { id: '1', nome: 'H3: Lançamento Novo Sérum', canais: ['instagram', 'facebook'], stage: 2, statusLabel: 'Aprovação', statusType: 'aprovacao', proximaAcao: 'Revisar criativos para Facebook' },
  { id: '2', nome: 'H3: Lançamento Novo Sérum', canais: ['instagram', 'facebook'], stage: 2, statusLabel: 'Aprovação', statusType: 'aprovacao', proximaAcao: 'Revisar criativos para Facebook' },
  { id: '3', nome: 'H3: Lançamento Novo Sérum', canais: ['instagram', 'facebook'], stage: 2, statusLabel: 'Aprovação', statusType: 'aprovacao', proximaAcao: 'Revisar criativos para Facebook' },
  { id: '4', nome: 'H3: Lançamento Sérum', canais: ['instagram', 'facebook'], stage: 4, statusLabel: 'Publicado', statusType: 'publicado', proximaAcao: 'Revisar criativos para Facebook' },
  { id: '5', nome: 'H3: Lanrpaign Novo Sérum', canais: ['instagram', 'facebook'], stage: 2, statusLabel: 'Aprovação', statusType: 'aprovacao', proximaAcao: 'Revisar criativos para Facebook' },
  { id: '6', nome: 'H3: Lanpaign Novo Sérum', canais: ['instagram', 'facebook'], stage: 4, statusLabel: 'Publicado', statusType: 'publicado', proximaAcao: 'Revisar criativos para Facebook' },
]

const pipelineLabels = ['Estratégia', 'Criação', 'Aprovação', 'Programado', 'Publicado']

const statusStyles = {
  aprovacao: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  publicado: 'bg-green-100 text-green-700 border border-green-200',
  criacao: 'bg-blue-100 text-blue-700 border border-blue-200',
}

function PipelineBar({ stage }: { stage: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        {pipelineLabels.map((label, i) => (
          <span key={label} className={`font-archivo text-[9px] uppercase tracking-wide ${i <= stage ? 'text-text-primary' : 'text-text-tertiary'}`}>
            {label}
          </span>
        ))}
      </div>
      <div className="flex gap-0.5">
        {pipelineLabels.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ background: i <= stage ? '#E8181A' : '#F0F0F0' }}
          />
        ))}
      </div>
    </div>
  )
}

function ChannelBadges({ canais }: { canais: ('facebook' | 'instagram')[] }) {
  return (
    <div className="flex gap-1">
      {canais.includes('instagram') && <IgBadge size={28} />}
      {canais.includes('facebook') && <FbBadge size={28} />}
    </div>
  )
}

export default function ProjetosPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-anton text-[28px] text-text-primary tracking-wide">Campaigns Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#E8181A] hover:bg-[#C41214] text-white font-arimo text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Nova campanha
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {campanhas.map((c) => (
          <div
            key={c.id}
            className={`bg-white rounded-xl border p-5 shadow-soft hover:shadow-md transition-shadow ${
              c.statusType === 'aprovacao' ? 'border-[#E8181A]' : 'border-gray-100'
            }`}
            style={c.statusType === 'aprovacao' ? { boxShadow: '0 0 0 1px #E8181A, 0 2px 12px rgba(232,24,26,0.08)' } : {}}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-anton text-[16px] text-text-primary">{c.nome}</h3>
              <ChannelBadges canais={c.canais} />
            </div>

            <PipelineBar stage={c.stage} />

            <div className="flex items-center justify-between mt-3">
              <div>
                <span className={`inline-block font-archivo text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full mb-1 ${statusStyles[c.statusType]}`}>
                  {c.statusLabel}
                </span>
                <p className="font-arimo text-[12px] text-text-tertiary">Próxima ação</p>
                <p className="font-arimo text-[13px] text-text-secondary">{c.proximaAcao}</p>
              </div>
              <Link
                href={`/campanhas/${c.id}`}
                className="font-arimo text-sm text-text-secondary border border-gray-200 hover:border-[#E8181A] hover:text-[#E8181A] px-4 py-1.5 rounded-lg transition-colors"
              >
                Ver campanha
              </Link>
            </div>
          </div>
        ))}
      </div>

      {showModal && <NovaCampanhaModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function NovaCampanhaModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nome: '', canal: '', produto: '', objetivo: '', publico_alvo: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-soft p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <h2 className="font-anton text-[20px] text-text-primary mb-6">Nova Campanha</h2>
        <div className="space-y-4">
          <Field label="Nome da campanha">
            <input name="nome" value={form.nome} onChange={handleChange} className={inputCls} placeholder="Ex: Lançamento Sérum Verão" />
          </Field>
          <Field label="Canal">
            <select name="canal" value={form.canal} onChange={handleChange} className={inputCls}>
              <option value="">Selecione</option>
              <option value="facebook">Facebook Ads</option>
              <option value="instagram">Instagram Orgânico</option>
              <option value="ambos">Facebook + Instagram</option>
            </select>
          </Field>
          <Field label="Produto">
            <input name="produto" value={form.produto} onChange={handleChange} className={inputCls} placeholder="Ex: Sérum Vitamina C" />
          </Field>
          <Field label="Objetivo">
            <input name="objetivo" value={form.objetivo} onChange={handleChange} className={inputCls} placeholder="Ex: Aumentar vendas em 20%" />
          </Field>
          <Field label="Público-alvo">
            <input name="publico_alvo" value={form.publico_alvo} onChange={handleChange} className={inputCls} placeholder="Ex: Mulheres, 25-45 anos" />
          </Field>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-text-secondary font-arimo text-sm py-2.5 rounded-lg hover:border-gray-300 transition-colors">
            Cancelar
          </button>
          <button className="flex-1 bg-[#E8181A] text-white font-arimo text-sm py-2.5 rounded-lg hover:bg-[#C41214] transition-colors">
            Criar campanha
          </button>
        </div>
      </div>
    </div>
  )
}

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 font-arimo text-sm text-text-primary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition bg-white'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-archivo text-[10px] uppercase tracking-widest text-text-tertiary mb-1">{label}</label>
      {children}
    </div>
  )
}
