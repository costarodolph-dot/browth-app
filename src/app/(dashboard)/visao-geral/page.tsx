'use client'

import { FileText, Palette, AlignLeft, Users, CheckCircle } from 'lucide-react'
import { FbBadge, IgBadge } from '@/components/ui/ChannelIcons'


const kpis = [
  { label: 'Briefings', value: '54', suffix: 'novos', delta: '+12% vs. anterior', icon: FileText },
  { label: 'Criativos', value: '128', suffix: 'em produção', delta: '+8% vs. anterior', icon: Palette },
  { label: 'Copies', value: '42', suffix: 'revisados', delta: '+5% vs. anterior', icon: AlignLeft },
  { label: 'Aguardando aprovação', value: '16', suffix: 'pendentes', delta: '+3% vs. anterior', icon: Users },
]

const pipelineStages = [
  { label: 'Briefing', color: '#E8181A', bg: '#FFF0EF' },
  { label: 'Criação', color: '#E8181A', bg: '#FFF0EF' },
  { label: 'Revisão', color: '#2563EB', bg: '#EFF6FF' },
  { label: 'Aprovação', color: '#CA8A04', bg: '#FEFCE8' },
  { label: 'Agendado', color: '#2563EB', bg: '#EFF6FF' },
  { label: 'Pronto', color: '#16A34A', bg: '#F0FDF4' },
]

const pipelineRows = [
  {
    campanha: 'Lançamento Verão',
    canal: 'Facebook',
    produto: 'Sérum Vitamina C',
    criativos: 8,
    status: 'Aguardando Aprovação',
    statusColor: 'warning',
    acao: 'Aprovar criativos',
  },
  {
    campanha: 'Promoção Fim de Ano',
    canal: 'Instagram',
    produto: 'Kit Hidratação',
    criativos: 12,
    status: 'Em Criação',
    statusColor: 'info',
    acao: 'Concluir brief',
  },
  {
    campanha: 'Black Friday Antecipada',
    canal: 'Facebook/Instagram',
    produto: 'Todos Produtos',
    criativos: 24,
    status: 'Planejamento',
    statusColor: 'neutral',
    acao: 'Definir orçamento',
  },
]

const statusStyles: Record<string, string> = {
  warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
  neutral: 'bg-gray-100 text-gray-600 border border-gray-200',
}

function ChannelIcon({ canal }: { canal: string }) {
  if (canal.includes('Facebook') && canal.includes('Instagram')) {
    return (
      <div className="flex gap-1">
        <FbBadge size={20} />
        <IgBadge size={20} />
      </div>
    )
  }
  if (canal === 'Facebook') {
    return (
      <div className="flex items-center gap-1.5">
        <FbBadge size={20} />
        <span className="font-arimo text-[13px] text-text-secondary">{canal}</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1.5">
      <IgBadge size={20} />
      <span className="font-arimo text-[13px] text-text-secondary">{canal}</span>
    </div>
  )
}

export default function VisaoGeralPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-anton text-[28px] text-text-primary tracking-wide">Visão Geral</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(({ label, value, suffix, delta, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl shadow-soft p-5 border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <span className="font-arimo text-[13px] text-text-secondary">{label}</span>
              <Icon size={18} className="text-text-tertiary" strokeWidth={1.5} />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-anton text-[32px] text-text-primary leading-none">{value}</span>
              <span className="font-arimo text-sm text-text-secondary">{suffix}</span>
            </div>
            <p className="font-arimo text-xs text-status-success">{delta}</p>
          </div>
        ))}
      </div>

      {/* Pipeline Visual */}
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
        <h2 className="font-anton text-[20px] text-text-primary mb-6">Pipeline de Campanhas</h2>
        <div className="flex items-center gap-0">
          {pipelineStages.map((stage, i) => (
            <div key={stage.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ background: stage.bg }}
                >
                  <CheckCircle size={20} style={{ color: stage.color }} strokeWidth={1.5} />
                </div>
                <span className="font-arimo text-[12px] text-text-secondary text-center">{stage.label}</span>
              </div>
              {i < pipelineStages.length - 1 && (
                <div className="h-px w-6 bg-gray-200 flex-shrink-0 -mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Table */}
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
        <h2 className="font-anton text-[20px] text-text-primary mb-4">Tabela de Pipeline</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['CAMPANHA', 'CANAL', 'PRODUTO', 'CRIATIVOS', 'STATUS', 'PRÓXIMA AÇÃO'].map(h => (
                <th key={h} className="text-left font-archivo text-[10px] uppercase tracking-widest text-text-tertiary pb-3 pr-6">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pipelineRows.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-[#FAFAFA] transition-colors">
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-primary font-medium">{row.campanha}</td>
                <td className="py-3 pr-6">
                  <ChannelIcon canal={row.canal} />
                </td>
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-secondary">{row.produto}</td>
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-secondary">{row.criativos}</td>
                <td className="py-3 pr-6">
                  <span className={`font-archivo text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full ${statusStyles[row.statusColor]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3 font-arimo text-[13px] text-text-secondary">{row.acao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
