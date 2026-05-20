'use client'

import { useState } from 'react'
import {
  Radio, TrendingUp, BarChart2, CheckCircle,
  FileText, Pencil, Eye, Clock, CalendarCheck,
  MoreHorizontal, ArrowUpRight, ChevronRight,
} from 'lucide-react'
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { IgBadge, FbBadge } from '@/components/ui/ChannelIcons'

// ─── Sparkline SVG ────────────────────────────────────────────────────────────
function Sparkline({ color, points }: { color: string; points: number[] }) {
  const w = 64, h = 28
  const min = Math.min(...points), max = Math.max(...points)
  const range = max - min || 1
  const xs = points.map((_, i) => (i / (points.length - 1)) * w)
  const ys = points.map(v => h - ((v - min) / range) * h)
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Dados de gráficos ────────────────────────────────────────────────────────
const lineData = [
  { date: '20 Mai', alcance: 420, views: 280, engajamento: 52 },
  { date: '21 Mai', alcance: 510, views: 340, engajamento: 61 },
  { date: '22 Mai', alcance: 480, views: 310, engajamento: 58 },
  { date: '23 Mai', alcance: 620, views: 430, engajamento: 74 },
  { date: '24 Mai', alcance: 700, views: 490, engajamento: 82 },
  { date: '25 Mai', alcance: 760, views: 540, engajamento: 88 },
  { date: '26 Mai', alcance: 820, views: 610, engajamento: 96 },
]

const areaData = [
  { date: '20 Mai', views: 180 },
  { date: '21 Mai', views: 240 },
  { date: '22 Mai', views: 210 },
  { date: '23 Mai', views: 310 },
  { date: '24 Mai', views: 380 },
  { date: '25 Mai', views: 450 },
  { date: '26 Mai', views: 520 },
]

const sparkAlcance = [30, 42, 38, 55, 60, 70, 78, 86]
const sparkRoas = [20, 28, 32, 29, 38, 42, 46, 50]
const sparkTaxa = [60, 64, 62, 70, 74, 72, 80, 86]

// ─── Pipeline ─────────────────────────────────────────────────────────────────
const pipelineStages = [
  { label: 'BRIEFING', value: 12, icon: FileText, color: '#6B6B6B', valueColor: '#0A0A0A' },
  { label: 'CRIAÇÃO', value: 8, icon: Pencil, color: '#6B6B6B', valueColor: '#0A0A0A' },
  { label: 'REVISÃO', value: 5, icon: Eye, color: '#6B6B6B', valueColor: '#0A0A0A' },
  { label: 'APROVAÇÃO', value: 16, icon: CheckCircle, color: '#E8181A', valueColor: '#E8181A' },
  { label: 'AGENDADO', value: 7, icon: Clock, color: '#6B6B6B', valueColor: '#0A0A0A' },
  { label: 'PRONTO', value: 42, icon: CalendarCheck, color: '#16A34A', valueColor: '#16A34A' },
]

// ─── Campanhas ────────────────────────────────────────────────────────────────
const campanhas = [
  {
    nome: 'Lançamento Verão',
    canal: 'facebook',
    status: 'AGUARDANDO APROVAÇÃO',
    statusDot: '#CA8A04',
    statusBg: '#FEFCE8',
    statusText: '#854D0E',
    acao: 'Aprovar criativos',
    updated: 'há 2 horas',
  },
  {
    nome: 'Promoção Fim de Ano',
    canal: 'instagram',
    status: 'EM CRIAÇÃO',
    statusDot: '#2563EB',
    statusBg: '#EFF6FF',
    statusText: '#1D4ED8',
    acao: 'Concluir brief',
    updated: 'há 3 horas',
  },
  {
    nome: 'Black Friday Antecipada',
    canal: 'ambos',
    status: 'PLANEJAMENTO',
    statusDot: '#9CA3AF',
    statusBg: '#F9FAFB',
    statusText: '#6B7280',
    acao: 'Definir orçamento',
    updated: 'há 5 horas',
  },
]

// ─── Tooltip customizado ──────────────────────────────────────────────────────
type TooltipPayloadItem = { name: string; value: number; color: string }
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-soft text-xs font-arimo">
      <p className="text-text-tertiary mb-1">{label}</p>
      {payload.map((p: TooltipPayloadItem) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-text-secondary capitalize">{p.name}:</span>
          <span className="font-semibold text-text-primary">{p.value}K</span>
        </div>
      ))}
    </div>
  )
}

// ─── Seletor de período ───────────────────────────────────────────────────────
function PeriodSelector({
  options,
  active,
  onChange,
}: {
  options: string[]
  active: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5">
      {options.map(o => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className="px-3 py-1 rounded-full font-archivo text-[10px] uppercase tracking-wide transition-all"
          style={
            active === o
              ? { background: '#E8181A', color: '#fff' }
              : { color: '#6B6B6B' }
          }
        >
          {o}
        </button>
      ))}
    </div>
  )
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function VisaoGeralPage() {
  const [card2Period, setCard2Period] = useState('7 dias')
  const [perfPeriod, setPerfPeriod] = useState('7 dias')
  const [canal, setCanal] = useState('Instagram')
  const [metricaSel, setMetricaSel] = useState('Views')

  const metricas = [
    { label: 'Views', value: '1.6M', delta: '+22%', color: '#E8181A' },
    { label: 'Alcance', value: '980K', delta: '+18%', color: '#6B6B6B' },
    { label: 'Curtidas', value: '86K', delta: '+15%', color: '#6B6B6B' },
    { label: 'Comentários', value: '12K', delta: '+10%', color: '#6B6B6B' },
    { label: 'Compartilhamentos', value: '8.4K', delta: '+12%', color: '#6B6B6B' },
  ]

  const cardCls = 'bg-white/70 backdrop-blur-[12px] border border-black/[0.06] rounded-[10px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'

  return (
    <div className="space-y-5 bg-white min-h-full p-1">

      {/* ── SEÇÃO 1 — Métricas ─────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">

        {/* Card 1 — Alcance */}
        <div className={cardCls}>
          <div className="flex items-start justify-between mb-3">
            <Radio size={18} className="text-text-tertiary" strokeWidth={1.5} />
          </div>
          <p className="font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-1">Alcance</p>
          <p className="font-anton text-[32px] text-text-primary leading-none mb-1">2.4M</p>
          <div className="flex items-center gap-1 mb-3">
            <ArrowUpRight size={12} className="text-status-success" />
            <span className="font-arimo text-[11px] text-status-success">+18% vs período anterior</span>
          </div>
          <div className="flex justify-end">
            <Sparkline color="#16A34A" points={sparkAlcance} />
          </div>
        </div>

        {/* Card 2 — Conteúdos publicados */}
        <div className={cardCls}>
          <div className="flex items-start justify-between mb-3">
            <span />
            <PeriodSelector options={['24h', '7 dias', '30 dias']} active={card2Period} onChange={setCard2Period} />
          </div>
          <p className="font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-1">Conteúdos publicados</p>
          <p className="font-anton text-[32px] text-text-primary leading-none mb-3">128 <span className="text-[20px]">conteúdos</span></p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <IgBadge size={18} />
              <span className="font-arimo text-[12px] text-text-secondary">94 Instagram</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FbBadge size={18} />
              <span className="font-arimo text-[12px] text-text-secondary">34 Facebook</span>
            </div>
          </div>
        </div>

        {/* Card 3 — ROAS Orgânico */}
        <div className={cardCls}>
          <div className="flex items-start justify-between mb-3">
            <TrendingUp size={18} className="text-text-tertiary" strokeWidth={1.5} />
          </div>
          <p className="font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-1">ROAS Orgânico</p>
          <p className="font-anton text-[32px] text-text-primary leading-none mb-1">4.2x</p>
          <p className="font-arimo text-[11px] text-text-tertiary mb-3">estimativa baseada em conversões orgânicas</p>
          <div className="flex justify-end">
            <Sparkline color="#7C3AED" points={sparkRoas} />
          </div>
        </div>

        {/* Card 4 — Taxa de aprovação */}
        <div className={cardCls}>
          <div className="flex items-start justify-between mb-3">
            <BarChart2 size={18} className="text-text-tertiary" strokeWidth={1.5} />
          </div>
          <p className="font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-1">Taxa de aprovação</p>
          <p className="font-anton text-[32px] text-text-primary leading-none mb-1">86%</p>
          <p className="font-arimo text-[12px] text-[#E8181A] font-medium mb-3">12 pendentes</p>
          <div className="flex justify-end">
            <Sparkline color="#CA8A04" points={sparkTaxa} />
          </div>
        </div>
      </div>

      {/* ── SEÇÃO 2 — Pipeline ─────────────────────────────────────────── */}
      <div className="bg-white border border-[#F0F0F0] rounded-[10px] px-6 py-4">
        <div className="flex items-center justify-between">
          {pipelineStages.map((stage, i) => {
            const Icon = stage.icon
            return (
              <div key={stage.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <Icon size={16} strokeWidth={1.5} style={{ color: stage.color }} className="mb-1" />
                  <span className="font-archivo text-[10px] uppercase tracking-widest mb-1" style={{ color: stage.color }}>
                    {stage.label}
                  </span>
                  <span className="font-anton text-[24px] leading-none" style={{ color: stage.valueColor }}>
                    {stage.value}
                  </span>
                </div>
                {i < pipelineStages.length - 1 && (
                  <div className="flex-shrink-0 w-6 border-t border-dashed border-[#E0E0E0] -mt-2" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── SEÇÃO 3 — Analytics 2 colunas ─────────────────────────────── */}
      <div className="grid grid-cols-5 gap-4">

        {/* Coluna esquerda — Performance do conteúdo (60%) */}
        <div className={`${cardCls} col-span-3`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-arimo text-[14px] font-semibold text-text-primary">Performance do conteúdo</h2>
            <PeriodSelector options={['24h', '7 dias', '30 dias']} active={perfPeriod} onChange={setPerfPeriod} />
          </div>

          {/* Mini métricas */}
          <div className="flex items-center gap-6 mb-4">
            <div>
              <p className="font-archivo text-[10px] uppercase tracking-widest text-text-tertiary">Alcance</p>
              <div className="flex items-baseline gap-1">
                <span className="font-anton text-[15px] text-text-primary">2.4M</span>
                <span className="font-arimo text-[11px] text-status-success">+18%</span>
              </div>
            </div>
            <div>
              <p className="font-archivo text-[10px] uppercase tracking-widest text-text-tertiary">Views</p>
              <div className="flex items-baseline gap-1">
                <span className="font-anton text-[15px] text-text-primary">1.6M</span>
                <span className="font-arimo text-[11px] text-status-info">+22%</span>
              </div>
            </div>
            <div>
              <p className="font-archivo text-[10px] uppercase tracking-widest text-text-tertiary">Engajamento</p>
              <div className="flex items-baseline gap-1">
                <span className="font-anton text-[15px] text-text-primary">96K</span>
                <span className="font-arimo text-[11px] text-purple-600">+14%</span>
              </div>
            </div>
          </div>

          {/* Gráfico */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gAlcance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F5F5F5" />
                <XAxis dataKey="date" tick={{ fontFamily: 'Arimo', fontSize: 10, fill: '#ABABAB' }} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={v => `${v}K`} tick={{ fontFamily: 'Arimo', fontSize: 10, fill: '#ABABAB' }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="alcance" stroke="#16A34A" strokeWidth={2} dot={{ r: 3, fill: '#16A34A', strokeWidth: 0 }} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2} dot={{ r: 3, fill: '#2563EB', strokeWidth: 0 }} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="engajamento" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3, fill: '#7C3AED', strokeWidth: 0 }} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Coluna direita — Dados ao longo do tempo (40%) */}
        <div className={`${cardCls} col-span-2`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-arimo text-[14px] font-semibold text-text-primary">Dados ao longo do tempo</h2>
            <div className="flex items-center gap-1.5">
              {['Instagram', 'Facebook'].map(c => (
                <button
                  key={c}
                  onClick={() => setCanal(c)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-archivo text-[10px] uppercase tracking-wide transition-all"
                  style={
                    canal === c
                      ? { background: '#FFF0EF', color: '#E8181A', border: '1px solid #FFD0CC' }
                      : { background: '#F5F5F5', color: '#6B6B6B', border: '1px solid transparent' }
                  }
                >
                  {c === 'Instagram' ? <IgBadge size={14} /> : <FbBadge size={14} />}
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className="font-anton text-[28px] text-text-primary leading-none mb-0.5">1.6M Views</p>
          <div className="flex items-center gap-1 mb-3">
            <ArrowUpRight size={12} className="text-status-success" />
            <span className="font-arimo text-[11px] text-status-success">+22% vs período anterior</span>
          </div>

          {/* Área chart */}
          <div className="h-28 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E8181A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#E8181A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontFamily: 'Arimo', fontSize: 9, fill: '#ABABAB' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontFamily: 'Arimo', fontSize: 11, border: '1px solid #E0E0E0', borderRadius: 8 }} />
                <Area type="monotone" dataKey="views" stroke="#E8181A" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Grid de métricas */}
          <div className="grid grid-cols-5 gap-1">
            {metricas.map(m => (
              <button
                key={m.label}
                onClick={() => setMetricaSel(m.label)}
                className="flex flex-col items-center py-2 px-1 rounded-lg transition-all"
                style={
                  metricaSel === m.label
                    ? { borderBottom: '2px solid #E8181A', background: '#FFF8F7' }
                    : { borderBottom: '2px solid transparent' }
                }
              >
                <span className="font-archivo text-[9px] uppercase tracking-wide text-text-tertiary mb-0.5">{m.label}</span>
                <span className="font-anton text-[13px] text-text-primary leading-none">{m.value}</span>
                <span className="font-arimo text-[10px] text-status-success">{m.delta}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEÇÃO 4 — Campanhas recentes ────────────────────────────── */}
      <div className={cardCls}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-arimo text-[14px] font-semibold text-text-primary">Campanhas recentes</h2>
          <button className="flex items-center gap-1 font-arimo text-[12px] text-[#E8181A] hover:underline">
            Ver todas <ChevronRight size={13} />
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['CAMPANHA', 'CANAL', 'STATUS', 'PRÓXIMA AÇÃO', 'ATUALIZADO', ''].map(h => (
                <th key={h} className="text-left font-archivo text-[10px] uppercase tracking-widest text-text-tertiary pb-2.5 pr-4 last:pr-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campanhas.map((row, i) => (
              <tr
                key={i}
                className="group border-b border-gray-50 last:border-0 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                style={{ borderLeft: '2px solid transparent' }}
                onMouseEnter={e => (e.currentTarget.style.borderLeftColor = '#E8181A')}
                onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}
              >
                <td className="py-3 pr-4 font-arimo text-[13px] text-text-primary font-medium">{row.nome}</td>
                <td className="py-3 pr-4">
                  {row.canal === 'facebook' && <FbBadge size={22} />}
                  {row.canal === 'instagram' && <IgBadge size={22} />}
                  {row.canal === 'ambos' && (
                    <div className="flex gap-1">
                      <FbBadge size={22} />
                      <IgBadge size={22} />
                    </div>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className="inline-flex items-center gap-1.5 font-archivo text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full"
                    style={{ background: row.statusBg, color: row.statusText }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: row.statusDot }} />
                    {row.status}
                  </span>
                </td>
                <td className="py-3 pr-4 font-arimo text-[13px] text-text-secondary">{row.acao}</td>
                <td className="py-3 pr-4 font-arimo text-[12px] text-text-tertiary">{row.updated}</td>
                <td className="py-3">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal size={14} className="text-text-tertiary" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
