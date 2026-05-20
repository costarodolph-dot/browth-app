'use client'

import { ChevronDown } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const kpis = [
  { label: 'Receita Total:', value: 'R$ 4.56M', delta: '+20.2%', positive: true },
  { label: 'Gasto Publicitário:', value: 'R$ 980K', delta: '+15.1%', positive: false },
  { label: 'ROAS:', value: '4.65x', delta: '+4.3%', positive: true },
  { label: 'Criativos Gerados:', value: '3.450', delta: '+25.6%', positive: true },
  { label: 'Aprovados:', value: '3.120', delta: '+28.1%', positive: true },
  { label: 'Taxa de Aprovação:', value: '90.4%', delta: '+2.1%', positive: true },
]

function generateChartData() {
  const data = []
  let val = 20
  for (let i = 1; i <= 30; i++) {
    val += Math.random() * 15 - 2
    data.push({ day: `Jun ${i}`, criativos: Math.max(0, Math.round(val)) })
  }
  return data
}
const chartData = generateChartData()

const sparkData = Array.from({ length: 8 }, (_, i) => ({ v: 10 + i * 3 + Math.random() * 5 }))

const tableRows = [
  { campanha: 'Lançamento Verão', gerados: 520, aprovados: 480, reprovados: 40, taxa: 82, publicados: 450 },
  { campanha: 'Promoção Black Friday', gerados: 850, aprovados: 780, reprovados: 70, taxa: 81, publicados: 750 },
  { campanha: 'Campanha Influencers', gerados: 600, aprovados: 540, reprovados: 60, taxa: 90, publicados: 520 },
  { campanha: 'Retargeting Geral', gerados: 450, aprovados: 410, reprovados: 40, taxa: 91, publicados: 400 },
  { campanha: 'Conteúdo Orgânico IG', gerados: 1030, aprovados: 980, reprovados: 50, taxa: 95, publicados: 950 },
]

export default function AnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-[#E8181A] rounded-md flex items-center justify-center">
              <span className="font-anton text-white text-sm">B</span>
            </div>
            <span className="font-anton text-[#0A0A0A] text-lg tracking-wide">Browth</span>
            <span className="font-archivo text-[10px] font-medium text-text-secondary uppercase tracking-widest">LW</span>
          </div>
          <h1 className="font-anton text-[36px] text-text-primary tracking-wide">Analytics and Performance</h1>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 font-arimo text-sm text-text-secondary hover:border-gray-300 transition-colors bg-white">
          Últimos 30 dias
          <ChevronDown size={14} />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 shadow-soft p-4">
            <p className="font-arimo text-[11px] text-text-secondary mb-1">{kpi.label}</p>
            <p className="font-anton text-[22px] text-text-primary leading-none mb-1">{kpi.value}</p>
            <p className={`font-arimo text-[11px] ${kpi.positive ? 'text-status-success' : 'text-status-error'}`}>
              ({kpi.delta})
            </p>
            {/* Mini sparkline */}
            <div className="mt-2 h-8">
              <ResponsiveContainer width="100%" height={32}>
                <AreaChart data={sparkData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id={`grad-${kpi.label}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8181A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#E8181A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#E8181A" strokeWidth={1.5} fill={`url(#grad-${kpi.label})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Area Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 mb-6">
        <h2 className="font-arimo text-[15px] font-semibold text-text-primary mb-4">Criativos Gerados ao Longo do Tempo</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8181A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#E8181A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis
                dataKey="day"
                tick={{ fontFamily: 'Arimo', fontSize: 10, fill: '#ABABAB' }}
                tickLine={false}
                axisLine={false}
                interval={2}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontFamily: 'Arimo', fontSize: 12, border: '1px solid #F0F0F0', borderRadius: 8 }}
                labelStyle={{ color: '#0A0A0A', fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="criativos"
                stroke="#E8181A"
                strokeWidth={2}
                fill="url(#chartGrad)"
                dot={{ r: 3, fill: '#E8181A', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#E8181A' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
        <h2 className="font-arimo text-[15px] font-semibold text-text-primary mb-4">Performance de Campanhas</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Campanha', 'Criativos Gerados', 'Aprovados', 'Reprovados', 'Taxa de Aprovação', 'Publicados'].map(h => (
                <th key={h} className="text-left font-archivo text-[10px] uppercase tracking-widest text-text-tertiary pb-3 pr-6">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-[#FAFAFA] transition-colors">
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-primary">{row.campanha}</td>
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-secondary">{row.gerados}</td>
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-secondary">{row.aprovados}</td>
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-secondary">{row.reprovados}</td>
                <td className="py-3 pr-6">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E8181A] rounded-full"
                        style={{ width: `${row.taxa}%` }}
                      />
                    </div>
                    <span className="font-arimo text-[12px] text-text-secondary">{(row.aprovados / row.gerados * 100).toFixed(1)}%</span>
                  </div>
                </td>
                <td className="py-3 font-arimo text-[13px] text-text-secondary">{row.publicados}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
