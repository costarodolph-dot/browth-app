'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  X, MapPin, Tag, Diamond, Radio, User, Thermometer,
  Target, Funnel, MousePointerClick, Mic, Link as LinkIcon,
  Image as ImageIcon, FileText, Folder, Save, Sparkles, CloudUpload,
  Snowflake, Waves, Flame, Upload,
} from 'lucide-react'

type AudienceTemp = 'frio' | 'morno' | 'quente'
type CampaignObjective =
  | 'vendas' | 'leads' | 'validacao' | 'awareness'
  | 'escala' | 'remarketing' | 'lancamento' | 'outro'

interface FormState {
  nicho: string; produto: string; ticket: string; canal: string
  publico: string; temperatura: AudienceTemp
  objetivo: CampaignObjective | ''; tipoCampanha: string; cta: string
  tomVoz: string; tomsExtras: string[]; diferencial: string
  linkConcorrente: string; linkLP: string
}

const OBJECTIVES: { key: CampaignObjective; label: string }[] = [
  { key: 'vendas', label: 'Gerar vendas' },
  { key: 'leads', label: 'Gerar leads' },
  { key: 'validacao', label: 'Validação de oferta' },
  { key: 'awareness', label: 'Awareness' },
  { key: 'escala', label: 'Escala' },
  { key: 'remarketing', label: 'Remarketing' },
  { key: 'lancamento', label: 'Lançamento' },
  { key: 'outro', label: 'Outro objetivo' },
]

const CAMPAIGN_TYPES = ['Funil de conversão','Remarketing','Lançamento de produto','Geração de leads','Promoção sazonal','Branding']
const CTAS = ['Comprar agora','Saiba mais','Falar com especialista','Baixar grátis','Cadastre-se','Ver oferta']
const TONES = ['Autoridade','Conversacional','Premium','Direto','Emocional','Educacional','Técnico','Viral','Storytelling','Luxuoso','Urgência']
const TONE_EMOJI: Record<string, string> = {
  Autoridade:'💼', Conversacional:'💬', Premium:'✨', Direto:'🎯',
  Emocional:'❤️', Educacional:'📚', Técnico:'⚙️', Viral:'🔥',
  Storytelling:'📖', Luxuoso:'💎', Urgência:'⚡',
}

// ── shared styles
const inputCls = 'w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2 font-arimo text-[12px] text-[#0A0A0A] outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition bg-white placeholder-[#ABABAB]'
const selectCls = 'w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2 font-arimo text-[12px] text-[#0A0A0A] outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition bg-white appearance-none cursor-pointer'

function Chevron() {
  return (
    <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
      <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
        <path d="M1 1l3.5 3L8 1" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function SecLabel({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-[18px] h-[18px] rounded-full bg-[#E8181A] flex items-center justify-center flex-shrink-0">
        <span className="font-anton text-[9px] text-white leading-none">{n}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-archivo text-[10px] uppercase tracking-widest font-bold text-[#0A0A0A]">{title}</span>
        <span className="font-arimo text-[11px] text-[#6B6B6B]">{sub}</span>
      </div>
    </div>
  )
}

function FL({ icon: Icon, label, req, helper, children }: {
  icon: React.ElementType; label: string; req?: boolean; helper?: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Icon size={11} className="text-[#6B6B6B]" strokeWidth={2} />
        <span className="font-archivo text-[10px] uppercase tracking-widest font-semibold text-[#0A0A0A]">
          {label}{req && <span className="text-[#E8181A] ml-0.5">*</span>}
        </span>
      </div>
      {children}
      {helper && <span className="font-arimo text-[10px] text-[#ABABAB] leading-tight">{helper}</span>}
    </div>
  )
}

export default function BriefingsPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    nicho: '', produto: '', ticket: '', canal: '', publico: '',
    temperatura: 'frio', objetivo: '', tipoCampanha: '', cta: '',
    tomVoz: '', tomsExtras: [], diferencial: '', linkConcorrente: '', linkLP: '',
  })
  const [generating, setGenerating] = useState(false)

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm(p => ({ ...p, [k]: v }))
  }
  function toggleTom(t: string) {
    setForm(p => ({
      ...p, tomsExtras: p.tomsExtras.includes(t)
        ? p.tomsExtras.filter(x => x !== t)
        : [...p.tomsExtras, t],
    }))
  }
  async function handleGenerate() {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
  }

  return (
    <div className="flex flex-col gap-3 pb-20">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-6 py-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => router.back()}
            className="w-7 h-7 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:border-[#E8181A] hover:text-[#E8181A] transition-colors flex-shrink-0 mt-0.5"
          >
            <X size={13} strokeWidth={2} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="font-anton text-[20px] text-[#0A0A0A] tracking-wide leading-none">
                Criar Estratégia de Campanha
              </h1>
              <span className="font-archivo text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#E0E0E0] text-[#6B6B6B]">
                Briefing
              </span>
            </div>
            <p className="font-arimo text-[12px] text-[#6B6B6B]">
              Preencha as informações abaixo para gerar uma estratégia personalizada e orientada a resultados.
            </p>
          </div>
        </div>
      </div>

      {/* ── Seção 1 — CONTEXTO ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-6 py-4">
        <SecLabel n={1} title="Contexto" sub="Informações sobre seu negócio e oferta" />
        <div className="grid grid-cols-4 gap-4">

          <FL icon={MapPin} label="Nicho" req helper="Digite livremente o nicho">
            <input value={form.nicho} onChange={e => set('nicho', e.target.value)}
              className={inputCls} placeholder="Ex: Skincare premium, SaaS B2B..." />
          </FL>

          <FL icon={Tag} label="Produto / Oferta" req helper="O que você vende e como funciona">
            <input value={form.produto} onChange={e => set('produto', e.target.value)}
              className={inputCls} placeholder="Descreva seu produto ou serviço..." />
          </FL>

          <FL icon={Diamond} label="Ticket médio" req helper="Valor médio das suas vendas">
            <input value={form.ticket} onChange={e => set('ticket', e.target.value)}
              className={inputCls} placeholder="Ex: R$97, R$297, R$1200..." />
          </FL>

          <FL icon={Radio} label="Canal principal" req helper="Onde a campanha será executada">
            <div className="relative">
              <select value={form.canal} onChange={e => set('canal', e.target.value)} className={selectCls}>
                <option value="" disabled>Selecione o canal</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="ambos">Ambos</option>
              </select>
              <Chevron />
            </div>
          </FL>

        </div>
      </div>

      {/* ── Seção 2 — PÚBLICO ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-6 py-4">
        <SecLabel n={2} title="Público" sub="Defina seu público-alvo e contexto" />
        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 0.55fr 0.45fr' }}>

          <FL icon={User} label="Público-alvo" req helper="Ex: mulheres, 25-35 anos, interessadas em beleza natural...">
            <textarea value={form.publico} onChange={e => set('publico', e.target.value)}
              rows={3} className={`${inputCls} resize-none`}
              placeholder="Descreva seu público-alvo com o máximo de detalhes possível..." />
          </FL>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <CloudUpload size={11} className="text-[#6B6B6B]" strokeWidth={2} />
              <span className="font-archivo text-[10px] uppercase tracking-widest font-semibold text-[#0A0A0A]">
                Upload de persona
                <span className="normal-case tracking-normal font-arimo text-[10px] text-[#ABABAB] ml-1">(opcional)</span>
              </span>
            </div>
            <label className="flex-1 flex flex-col items-center justify-center gap-1 border border-dashed border-[#E0E0E0] rounded-[6px] p-3 cursor-pointer hover:border-[#E8181A] hover:bg-[#FFF5F5] transition-colors min-h-[76px]">
              <CloudUpload size={16} className="text-[#ABABAB]" strokeWidth={1.5} />
              <span className="font-arimo text-[11px] text-[#6B6B6B] text-center leading-tight">
                Clique ou arraste o arquivo aqui
              </span>
              <input type="file" className="hidden" accept=".txt,.pdf,.docx,.csv" />
            </label>
            <span className="font-arimo text-[10px] text-[#ABABAB]">TXT, PDF, DOCX, CSV — até 10MB</span>
          </div>

          <FL icon={Thermometer} label="Temperatura do público" req helper="Estágio atual do seu público">
            <div className="flex flex-col gap-1.5">
              {([
                { key: 'frio' as AudienceTemp, label: 'Frio', sub: 'Não conhece você', Icon: Snowflake },
                { key: 'morno' as AudienceTemp, label: 'Morno', sub: 'Já conhece sua marca', Icon: Waves },
                { key: 'quente' as AudienceTemp, label: 'Quente', sub: 'Pronto para comprar', Icon: Flame },
              ] as const).map(({ key, label, sub, Icon: TI }) => (
                <button key={key} type="button" onClick={() => set('temperatura', key)}
                  className={`flex items-center gap-2 border rounded-[6px] px-2.5 py-2 transition-all text-left ${
                    form.temperatura === key
                      ? 'border-[#E8181A] bg-[#FFF5F5]'
                      : 'border-[#E0E0E0] hover:border-[#E8181A]'
                  }`}
                >
                  <TI size={13} strokeWidth={2} className={form.temperatura === key ? 'text-[#E8181A]' : 'text-[#6B6B6B]'} />
                  <div>
                    <div className={`font-arimo text-[12px] font-semibold leading-tight ${form.temperatura === key ? 'text-[#E8181A]' : 'text-[#0A0A0A]'}`}>{label}</div>
                    <div className="font-arimo text-[10px] text-[#6B6B6B]">{sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </FL>

        </div>
      </div>

      {/* ── Seção 3 — ESTRATÉGIA ───────────────────────────────────────────── */}
      <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-6 py-4">
        <SecLabel n={3} title="Estratégia" sub="Defina os objetivos e abordagem da campanha" />
        <div className="grid grid-cols-4 gap-4">

          {/* Objetivo */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 mb-0.5">
              <Target size={11} className="text-[#6B6B6B]" strokeWidth={2} />
              <span className="font-archivo text-[10px] uppercase tracking-widest font-semibold text-[#0A0A0A]">
                Objetivo principal<span className="text-[#E8181A] ml-0.5">*</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {OBJECTIVES.map(obj => (
                <button key={obj.key} type="button" onClick={() => set('objetivo', obj.key)}
                  className={`text-left px-2 py-1.5 rounded-[5px] border font-arimo text-[11px] transition-all leading-tight ${
                    form.objetivo === obj.key
                      ? 'border-[#E8181A] bg-[#FFF5F5] text-[#E8181A]'
                      : 'border-[#E0E0E0] text-[#6B6B6B] hover:border-[#E8181A] hover:text-[#E8181A]'
                  }`}
                >
                  {obj.label}
                </button>
              ))}
            </div>
            <span className="font-arimo text-[10px] text-[#ABABAB]">Objetivo principal da campanha</span>
          </div>

          {/* Tipo + CTA + Diferencial empilhados */}
          <div className="flex flex-col gap-3">
            <FL icon={Funnel} label="Tipo de campanha" req helper="Foco principal da campanha">
              <div className="relative">
                <select value={form.tipoCampanha} onChange={e => set('tipoCampanha', e.target.value)} className={selectCls}>
                  <option value="" disabled>Selecione o tipo</option>
                  {CAMPAIGN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <Chevron />
              </div>
            </FL>

            <FL icon={MousePointerClick} label="CTA desejado" req helper="Ação que o público deve tomar">
              <div className="relative">
                <select value={form.cta} onChange={e => set('cta', e.target.value)} className={selectCls}>
                  <option value="" disabled>Selecione o CTA</option>
                  {CTAS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Chevron />
              </div>
            </FL>
          </div>

          {/* Tom de voz */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 mb-0.5">
              <Mic size={11} className="text-[#6B6B6B]" strokeWidth={2} />
              <span className="font-archivo text-[10px] uppercase tracking-widest font-semibold text-[#0A0A0A]">
                Tom de voz<span className="text-[#E8181A] ml-0.5">*</span>
              </span>
            </div>
            <div className="relative mb-1.5">
              <select value={form.tomVoz} onChange={e => set('tomVoz', e.target.value)} className={selectCls}>
                <option value="" disabled>Selecione o tom</option>
                {TONES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <Chevron />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {TONES.map(t => (
                <button key={t} type="button" onClick={() => toggleTom(t)}
                  className={`flex items-center gap-1 border rounded-[5px] px-1.5 py-1 font-arimo text-[10px] transition-all ${
                    form.tomsExtras.includes(t)
                      ? 'border-[#E8181A] bg-[#FFF5F5] text-[#E8181A]'
                      : 'border-[#E0E0E0] text-[#6B6B6B] hover:border-[#E8181A]'
                  }`}
                >
                  <span>{TONE_EMOJI[t]}</span><span>{t}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Diferencial */}
          <FL icon={Diamond} label="Diferencial da oferta" req helper="Por que o cliente deve escolher você">
            <textarea value={form.diferencial} onChange={e => set('diferencial', e.target.value)}
              rows={8} className={`${inputCls} resize-none h-full`}
              placeholder="Qual o principal diferencial da sua oferta? O que te torna único?" />
          </FL>

        </div>
      </div>

      {/* ── Seção 4 — REFERÊNCIAS ──────────────────────────────────────────── */}
      <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-6 py-4">
        <SecLabel n={4} title="Referências e Materiais" sub="Forneça materiais para melhor contexto" />
        <div className="grid grid-cols-5 gap-4">

          {[
            { Icon: Upload, title: 'Upload de arquivos', sub: 'Briefings, pesquisas, docs', type: 'upload' },
            { Icon: LinkIcon, title: 'Links de concorrentes', sub: 'Sites, páginas, funis', type: 'link', key: 'linkConcorrente', ph: 'https://exemplo.com' },
            { Icon: ImageIcon, title: 'Criativos de referência', sub: 'Anúncios, posts, vídeos', type: 'upload' },
            { Icon: FileText, title: 'Landing pages', sub: 'Páginas de vendas, LPs', type: 'link', key: 'linkLP', ph: 'https://exemplo.com/lp' },
            { Icon: Folder, title: 'Briefings antigos', sub: 'Campanhas anteriores', type: 'upload' },
          ].map(({ Icon, title, sub, type, key: fk, ph }) => (
            <div key={title} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Icon size={12} className="text-[#6B6B6B]" strokeWidth={2} />
                <span className="font-arimo text-[12px] font-semibold text-[#0A0A0A]">{title}</span>
              </div>
              <p className="font-arimo text-[10px] text-[#6B6B6B]">{sub}</p>
              {type === 'upload' ? (
                <label className="flex items-center justify-center gap-1.5 border border-[#E0E0E0] rounded-[6px] px-3 py-2 cursor-pointer hover:border-[#E8181A] hover:text-[#E8181A] hover:bg-[#FFF5F5] transition-colors font-arimo text-[12px] text-[#6B6B6B] mt-auto">
                  <Upload size={12} strokeWidth={2} />Enviar arquivos
                  <input type="file" className="hidden" multiple />
                </label>
              ) : (
                <div className="flex items-center border border-[#E0E0E0] rounded-[6px] px-2.5 overflow-hidden focus-within:border-[#E8181A] transition mt-auto">
                  <input
                    value={(form as unknown as Record<string, string>)[fk!] ?? ''}
                    onChange={e => set(fk as keyof FormState, e.target.value as never)}
                    className="flex-1 py-2 font-arimo text-[12px] text-[#0A0A0A] outline-none bg-transparent placeholder-[#ABABAB]"
                    placeholder={ph}
                  />
                  <LinkIcon size={11} className="text-[#ABABAB] flex-shrink-0" strokeWidth={2} />
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* ── Rodapé fixo ────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-[220px] right-0 bg-white border-t border-[#F0F0F0] px-8 py-3 flex items-center justify-end gap-3 z-40">
        <button type="button"
          className="flex items-center gap-2 border border-[#E0E0E0] rounded-[6px] px-5 py-2.5 font-arimo text-[12px] text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors">
          <Save size={13} strokeWidth={2} />Salvar rascunho
        </button>
        <button type="button" onClick={handleGenerate} disabled={generating}
          className="flex items-center gap-2 bg-[#E8181A] hover:bg-[#C41214] disabled:opacity-70 text-white rounded-[6px] px-5 py-2.5 font-arimo text-[12px] font-medium transition-colors">
          <Sparkles size={13} strokeWidth={2} />
          {generating ? 'Gerando...' : 'Gerar estratégia'}
        </button>
      </div>

    </div>
  )
}
