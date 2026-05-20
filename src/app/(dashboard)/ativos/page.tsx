'use client'

import { Calendar, AlertCircle } from 'lucide-react'
import { FbBadge, IgBadge } from '@/components/ui/ChannelIcons'

type Package = {
  id: string
  title: string
  canal: 'facebook' | 'instagram'
  description: string
  img: string
}

const readyPackages: Package[] = [
  {
    id: '1',
    title: 'Summer Glow Sale',
    canal: 'facebook',
    description: "Boost your skin's radiance and gloir your skin to sake their radiant...",
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80',
  },
  {
    id: '2',
    title: 'New Product Launch',
    canal: 'facebook',
    description: 'Introduce our newest serum to your custom-boenttoing skincare...',
    img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&q=80',
  },
  {
    id: '3',
    title: 'New Product Launch',
    canal: 'instagram',
    description: 'Reduce your newest serum: your oiv. and dispoqttiying campaign...',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80',
  },
  {
    id: '4',
    title: 'Flash Sale Collection',
    canal: 'instagram',
    description: 'Boost your skin collection and product copy soauist our customize details.',
    img: 'https://images.unsplash.com/photo-1631730486572-226d1f595058?w=300&q=80',
  },
]

const history = [
  { campaign: 'Spring Collection', channel: 'Instagram Organic', status: 'Published', statusType: 'success', timestamp: '20 May 2024, 10:00 AM' },
  { campaign: 'Weekend Promo', channel: 'Facebook Ads', status: 'Scheduled', statusType: 'neutral', timestamp: '22 May 2024, 03:00 PM' },
  { campaign: 'Flash Sale', channel: 'Instagram Organic', status: 'Error (Check details)', statusType: 'error', timestamp: '18 May 2024, 05:45 PM' },
]

const historyStatus: Record<string, string> = {
  success: 'text-status-success font-medium',
  neutral: 'text-text-secondary',
  error: 'text-status-error font-medium',
}

export default function AtivosPage() {
  return (
    <div>
      <h1 className="font-anton text-[28px] text-text-primary mb-6 tracking-wide">Campaign Execution Status</h1>

      {/* Ready Packages */}
      <section className="mb-8">
        <h2 className="font-arimo text-[15px] font-semibold text-text-primary mb-4">Ready Packages</h2>
        <div className="grid grid-cols-4 gap-4 mb-5">
          {readyPackages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-xl border border-gray-100 shadow-soft p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-arimo text-[13px] font-semibold text-text-primary leading-tight">{pkg.title}</h3>
                    {pkg.canal === 'facebook' ? (
                      <FbBadge size={24} />
                    ) : (
                      <IgBadge size={24} />
                    )}
                  </div>
                </div>
              </div>
              <p className="font-arimo text-[12px] text-text-secondary leading-relaxed mb-3">{pkg.description}</p>
              <span className="inline-block bg-green-100 text-green-700 font-archivo text-[10px] uppercase tracking-wide px-3 py-1 rounded-full">
                Pronto para execução
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center gap-2 bg-[#E8181A] hover:bg-[#C41214] text-white font-arimo text-sm font-medium px-8 py-3 rounded-xl transition-colors">
            Enviar para execução
          </button>
          <button className="flex items-center gap-2 border border-[#E8181A] text-[#E8181A] hover:bg-[#FFF5F5] font-arimo text-sm font-medium px-6 py-3 rounded-xl transition-colors">
            <Calendar size={15} />
            Agendar
          </button>
        </div>
      </section>

      {/* History */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
        <h2 className="font-arimo text-[15px] font-semibold text-text-primary mb-4">History of Previous Publications</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Campaign', 'Channel', 'Status', 'Timestamp'].map(h => (
                <th key={h} className="text-left font-archivo text-[11px] uppercase tracking-widest text-text-tertiary pb-3 pr-6">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((row, i) => (
              <tr key={i} className={`border-b border-gray-50 ${row.statusType === 'error' ? 'bg-red-50' : ''}`}>
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-primary">{row.campaign}</td>
                <td className="py-3 pr-6 font-arimo text-[13px] text-text-secondary">{row.channel}</td>
                <td className="py-3 pr-6">
                  <div className="flex items-center gap-1.5">
                    {row.statusType === 'error' && <AlertCircle size={13} className="text-status-error" />}
                    <span className={`font-arimo text-[13px] ${historyStatus[row.statusType]}`}>{row.status}</span>
                  </div>
                </td>
                <td className="py-3 font-arimo text-[13px] text-text-secondary">{row.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
