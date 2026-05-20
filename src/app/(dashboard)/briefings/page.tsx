'use client'

import { useState } from 'react'
import { Sparkles, Upload, Link as LinkIcon } from 'lucide-react'

const niches = ['Skincare', 'Fashion', 'Tech', 'Fitness', 'Food', 'Pets', 'Home Decor']
const tones = ['Profissional', 'Amigável', 'Divertido', 'Inspirador', 'Ganeti']

export default function BriefingsPage() {
  const [form, setForm] = useState({
    nicho: 'Skincare',
    produto: '',
    objetivo: '',
    publico: '',
    tom: 'Amigável',
    referencias: '',
    linkRef: '',
  })
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleGenerate() {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
    setGenerated(true)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-anton text-[28px] text-text-primary tracking-wide">Campaign Title: New Product Launch</h1>
        <span className="font-archivo text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
          Briefing
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-5">
          {/* Nicho */}
          <div>
            <label className="block font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-1.5">Nicho</label>
            <div className="relative">
              <select
                name="nicho"
                value={form.nicho}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-arimo text-sm text-text-primary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition bg-white appearance-none pr-8"
              >
                {niches.map(n => <option key={n}>{n}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1l5 5 5-5" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Dropdown preview */}
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-soft z-10 mt-1">
                {['Skincare', 'Fashion', 'Tech'].map(n => (
                  <button
                    key={n}
                    onClick={() => setForm(prev => ({ ...prev, nicho: n }))}
                    className={`w-full text-left px-4 py-2 font-arimo text-sm transition-colors ${
                      form.nicho === n ? 'bg-[#FFF5F5] text-[#E8181A]' : 'text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Produto */}
          <div>
            <label className="block font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-1.5">Produto</label>
            <input
              name="produto"
              value={form.produto || 'Glow Serum 2.0'}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 font-arimo text-sm text-text-primary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition"
              placeholder="Ex: Glow Serum 2.0"
            />
          </div>

          {/* Objetivo */}
          <div>
            <label className="block font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-1.5">Objetivo</label>
            <textarea
              name="objetivo"
              value={form.objetivo}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 font-arimo text-sm text-text-primary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition resize-none"
              placeholder="Descreva o objetivo principal da campanha (ex: aumentar vendas, gerar leads)"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Público-alvo */}
          <div>
            <label className="block font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-1.5">Público-alvo</label>
            <textarea
              name="publico"
              value={form.publico}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 font-arimo text-sm text-text-primary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition resize-none"
              placeholder="Descreva o público-alvo (ex: mulheres, 25-35 anos, interessadas em beleza natural)"
            />
          </div>

          {/* Tom de voz */}
          <div>
            <label className="block font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-2">Tom de voz</label>
            <div className="grid grid-cols-3 gap-2">
              {tones.map(tone => (
                <label key={tone} className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setForm(prev => ({ ...prev, tom: tone }))}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      form.tom === tone ? 'border-[#E8181A]' : 'border-gray-300'
                    }`}
                  >
                    {form.tom === tone && <div className="w-2 h-2 rounded-full bg-[#E8181A]" />}
                  </div>
                  <span className="font-arimo text-sm text-text-secondary">{tone}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Referências */}
          <div>
            <label className="block font-archivo text-[11px] uppercase tracking-widest text-text-secondary mb-2">Referências</label>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 font-arimo text-sm text-text-secondary hover:border-[#E8181A] hover:text-[#E8181A] transition-colors flex-1">
                <Upload size={14} />
                Upload de Arquivo
              </button>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 flex-1">
                <LinkIcon size={14} className="text-text-tertiary flex-shrink-0" />
                <input
                  name="linkRef"
                  value={form.linkRef}
                  onChange={handleChange}
                  className="flex-1 font-arimo text-sm text-text-primary outline-none bg-transparent placeholder-text-tertiary"
                  placeholder="Link de Referência"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <div className="mt-8">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-[#E8181A] hover:bg-[#C41214] text-white font-arimo text-base font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
        >
          <Sparkles size={18} />
          {generating ? 'Gerando estratégia...' : 'Gerar estratégia com IA'}
        </button>
      </div>

      {/* Strategy result */}
      {generated && (
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-soft p-6">
          <h3 className="font-anton text-[18px] text-text-primary mb-3">Estratégia Gerada</h3>
          <div className="font-arimo text-sm text-text-secondary leading-relaxed space-y-2">
            <p><strong className="text-text-primary">Posicionamento:</strong> Destacar os benefícios únicos do Glow Serum 2.0 para pele radiante em 7 dias.</p>
            <p><strong className="text-text-primary">Mensagem principal:</strong> &ldquo;Sua pele merece o melhor. Glow Serum 2.0 — resultados visíveis em uma semana.&rdquo;</p>
            <p><strong className="text-text-primary">Formatos sugeridos:</strong> Carrossel Facebook (antes/depois), Reels Instagram (depoimentos), Stories com CTA direto.</p>
            <p><strong className="text-text-primary">Frequência:</strong> 3 posts/semana no Instagram, 2 anúncios/semana no Facebook.</p>
          </div>
        </div>
      )}
    </div>
  )
}
