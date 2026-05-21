'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  X, MapPin, Tag, Diamond, Radio, User, Upload, Thermometer,
  Target, Funnel, MousePointerClick, Mic, Link as LinkIcon,
  Image as ImageIcon, FileText, Folder, Save, Sparkles, CloudUpload,
  Snowflake, Waves, Flame
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type AudienceTemp = 'frio' | 'morno' | 'quente'
type CampaignObjective =
  | 'vendas' | 'leads' | 'validacao' | 'awareness'
  | 'escala' | 'remarketing' | 'lancamento' | 'outro'

interface FormState {
  nicho: string
  produto: string
  ticket: string
  canal: string
  publico: string
  temperatura: AudienceTemp
  objetivo: CampaignObjective | ''
  tipoCampanha: string
  cta: string
  tomVoz: string
  tomsExtras: string[]
  diferencial: string
  linkConcorrente: string
  linkLP: string
}

// ─── Options ──────────────────────────────────────────────────────────────────

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

const CAMPAIGN_TYPES = [
  'Funil de conversão',
  'Campanha de branding',
  'Remarketing',
  'Lançamento de produto',
  'Geração de leads',
  'Promoção sazonal',
]

const CTAS = [
  'Comprar agora',
  'Saiba mais',
  'Falar com especialista',
  'Baixar grátis',
  'Cadastre-se',
  'Agendar demonstração',
  'Ver oferta',
]

const TONES_MAIN = [
  'Autoridade',
  'Conversacional',
  'Premium',
  'Direto',
  'Emocional',
  'Educacional',
  'Técnico',
  'Viral',
  'Storytelling',
  'Luxuoso',
  'Urgência',
]

const TONE_EMOJIS: Record<string, string> = {
  Autoridade: '💼', Conversacional: '💬', Premium: '✨', Direto: '🎯',
  Emocional: '❤️', Educacional: '📚', Técnico: '⚙️', Viral: '🔥',
  Storytelling: '📖', Luxuoso: '💎', Urgência: '⚡',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  num, title, subtitle,
}: { num: number; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-5 h-5 rounded-full bg-[#E8181A] flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="font-anton text-[10px] text-white leading-none">{num}</span>
      </div>
      <div>
        <span className="font-archivo text-[11px] uppercase tracking-widest font-bold text-[#0A0A0A]">
          {title}
        </span>
        <p className="font-arimo text-[12px] text-[#6B6B6B] mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}

function FieldWrapper({
  icon: Icon, label, helper, required = false, children,
}: {
  icon: React.ElementType
  label: string
  helper?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <Icon size={13} className="text-[#6B6B6B] flex-shrink-0" strokeWidth={2} />
        <label className="font-archivo text-[11px] uppercase tracking-widest text-[#0A0A0A] font-semibold">
          {label}
          {required && <span className="text-[#E8181A] ml-0.5">*</span>}
        </label>
      </div>
      {children}
      {helper && (
        <span className="font-arimo text-[11px] text-[#ABABAB]">{helper}</span>
      )}
    </div>
  )
}

const inputCls =
  'w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2.5 font-arimo text-[13px] text-[#0A0A0A] outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition bg-white placeholder-[#ABABAB]'

const selectCls =
  'w-full border border-[#E0E0E0] rounded-[6px] px-3 py-2.5 font-arimo text-[13px] text-[#0A0A0A] outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition bg-white appearance-none cursor-pointer'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BriefingsPage() {
  const router = useRouter()

  const [form, setForm] = useState<FormState>({
    nicho: '',
    produto: '',
    ticket: '',
    canal: '',
    publico: '',
    temperatura: 'frio',
    objetivo: '',
    tipoCampanha: '',
    cta: '',
    tomVoz: '',
    tomsExtras: [],
    diferencial: '',
    linkConcorrente: '',
    linkLP: '',
  })

  const [generating, setGenerating] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function toggleTom(tone: string) {
    setForm(prev => ({
      ...prev,
      tomsExtras: prev.tomsExtras.includes(tone)
        ? prev.tomsExtras.filter(t => t !== tone)
        : [...prev.tomsExtras, tone],
    }))
  }

  async function handleGenerate() {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] pb-24">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#F0F0F0] px-8 py-5">
        <div className="flex items-start gap-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:border-[#E8181A] hover:text-[#E8181A] transition-colors flex-shrink-0 mt-0.5"
          >
            <X size={14} strokeWidth={2} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-anton text-[24px] text-[#0A0A0A] tracking-wide leading-tight">
                Criar Estratégia de Campanha
              </h1>
              <span className="font-archivo text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border border-[#E0E0E0] text-[#6B6B6B] leading-none">
                Briefing
              </span>
            </div>
            <p className="font-arimo text-[13px] text-[#6B6B6B]">
              Preencha as informações abaixo para gerar uma estratégia personalizada e orientada a resultados.
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 max-w-[1200px]">

        {/* ── Seção 1 — CONTEXTO ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-8 py-8 mb-4">
          <SectionHeader
            num={1}
            title="Contexto"
            subtitle="Informações sobre seu negócio e oferta"
          />
          <div className="grid grid-cols-4 gap-5">

            <FieldWrapper icon={MapPin} label="Nicho" helper="Digite livremente o nicho do seu negócio" required>
              <input
                value={form.nicho}
                onChange={e => set('nicho', e.target.value)}
                className={inputCls}
                placeholder="Ex: Skincare premium, Encapsulado feminino, SaaS B2B..."
              />
            </FieldWrapper>

            <FieldWrapper icon={Tag} label="Produto / Oferta" helper="Seja claro sobre o que você vende e como funciona" required>
              <input
                value={form.produto}
                onChange={e => set('produto', e.target.value)}
                className={inputCls}
                placeholder="Descreva seu produto, serviço ou oferta principal..."
              />
            </FieldWrapper>

            <FieldWrapper icon={Diamond} label="Ticket médio" helper="Valor médio das suas vendas" required>
              <input
                value={form.ticket}
                onChange={e => set('ticket', e.target.value)}
                className={inputCls}
                placeholder="Ex: R$97, R$297, R$1200..."
              />
            </FieldWrapper>

            <FieldWrapper icon={Radio} label="Canal principal" helper="Onde sua campanha será executada" required>
              <div className="relative">
                <select
                  value={form.canal}
                  onChange={e => set('canal', e.target.value)}
                  className={selectCls}
                >
                  <option value="" disabled>Selecione o canal principal</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="ambos">Ambos</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </FieldWrapper>

          </div>
        </div>

        {/* ── Seção 2 — PÚBLICO ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-8 py-8 mb-4">
          <SectionHeader
            num={2}
            title="Público"
            subtitle="Defina seu público-alvo e contexto"
          />
          <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 0.5fr 0.5fr' }}>

            {/* Público-alvo */}
            <FieldWrapper
              icon={User}
              label="Público-alvo"
              helper="Ex: mulheres, 25-35 anos, interessadas em beleza natural..."
              required
            >
              <textarea
                value={form.publico}
                onChange={e => set('publico', e.target.value)}
                rows={5}
                className={`${inputCls} resize-none`}
                placeholder="Descreva seu público-alvo com o máximo de detalhes possível..."
              />
            </FieldWrapper>

            {/* Upload de persona */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <CloudUpload size={13} className="text-[#6B6B6B] flex-shrink-0" strokeWidth={2} />
                <label className="font-archivo text-[11px] uppercase tracking-widest text-[#0A0A0A] font-semibold">
                  Upload de persona / pesquisa
                  <span className="text-[#ABABAB] ml-1 normal-case tracking-normal font-arimo text-[10px]">(opcional)</span>
                </label>
              </div>
              <label className="flex-1 flex flex-col items-center justify-center gap-2 border border-dashed border-[#E0E0E0] rounded-[8px] p-5 cursor-pointer hover:border-[#E8181A] hover:bg-[#FFF5F5] transition-colors min-h-[120px]">
                <CloudUpload size={20} className="text-[#ABABAB]" strokeWidth={1.5} />
                <span className="font-arimo text-[12px] text-[#6B6B6B] text-center">
                  Clique para fazer upload ou arraste o arquivo aqui
                </span>
                <input type="file" className="hidden" accept=".txt,.pdf,.docx,.csv" />
              </label>
              <span className="font-arimo text-[11px] text-[#ABABAB]">
                Formatos suportados: TXT, PDF, DOCX, CSV (até 10MB)
              </span>
            </div>

            {/* Temperatura do público */}
            <FieldWrapper
              icon={Thermometer}
              label="Temperatura do público"
              helper="Escolha o estágio atual do seu público"
              required
            >
              <div className="flex flex-col gap-2">
                {([
                  {
                    key: 'frio' as AudienceTemp,
                    label: 'Frio',
                    sub: 'Não conhece você',
                    Icon: Snowflake,
                  },
                  {
                    key: 'morno' as AudienceTemp,
                    label: 'Morno',
                    sub: 'Já conhece sua marca',
                    Icon: Waves,
                  },
                  {
                    key: 'quente' as AudienceTemp,
                    label: 'Quente',
                    sub: 'Pronto para comprar',
                    Icon: Flame,
                  },
                ] as const).map(({ key, label, sub, Icon: TIcon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => set('temperatura', key)}
                    className={`flex items-center gap-3 border rounded-[6px] px-3 py-2.5 transition-all text-left ${
                      form.temperatura === key
                        ? 'border-[#E8181A] bg-[#FFF5F5]'
                        : 'border-[#E0E0E0] bg-white hover:border-[#E8181A]'
                    }`}
                  >
                    <TIcon
                      size={15}
                      strokeWidth={2}
                      className={form.temperatura === key ? 'text-[#E8181A]' : 'text-[#6B6B6B]'}
                    />
                    <div>
                      <div className={`font-arimo text-[13px] font-semibold ${form.temperatura === key ? 'text-[#E8181A]' : 'text-[#0A0A0A]'}`}>
                        {label}
                      </div>
                      <div className="font-arimo text-[11px] text-[#6B6B6B]">{sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </FieldWrapper>

          </div>
        </div>

        {/* ── Seção 3 — ESTRATÉGIA ───────────────────────────────────────────── */}
        <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-8 py-8 mb-4">
          <SectionHeader
            num={3}
            title="Estratégia"
            subtitle="Defina os objetivos e abordagem da campanha"
          />

          {/* Linha 1 — 4 colunas */}
          <div className="grid grid-cols-4 gap-5 mb-5">

            {/* Objetivo principal */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Target size={13} className="text-[#6B6B6B] flex-shrink-0" strokeWidth={2} />
                <label className="font-archivo text-[11px] uppercase tracking-widest text-[#0A0A0A] font-semibold">
                  Objetivo principal<span className="text-[#E8181A] ml-0.5">*</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {OBJECTIVES.map(obj => (
                  <button
                    key={obj.key}
                    type="button"
                    onClick={() => set('objetivo', obj.key)}
                    className={`text-left px-2.5 py-2 rounded-[6px] border font-arimo text-[12px] transition-all ${
                      form.objetivo === obj.key
                        ? 'border-[#E8181A] bg-[#FFF5F5] text-[#E8181A]'
                        : 'border-[#E0E0E0] text-[#6B6B6B] hover:border-[#E8181A] hover:text-[#E8181A]'
                    }`}
                  >
                    {obj.label}
                  </button>
                ))}
              </div>
              <span className="font-arimo text-[11px] text-[#ABABAB]">
                Selecione o objetivo principal da sua campanha
              </span>
            </div>

            {/* Tipo de campanha */}
            <FieldWrapper icon={Funnel} label="Tipo de campanha" helper="Qual o foco principal da campanha?" required>
              <div className="relative">
                <select
                  value={form.tipoCampanha}
                  onChange={e => set('tipoCampanha', e.target.value)}
                  className={selectCls}
                >
                  <option value="" disabled>Selecione o tipo de campanha</option>
                  {CAMPAIGN_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </FieldWrapper>

            {/* CTA desejado */}
            <FieldWrapper icon={MousePointerClick} label="CTA desejado" helper="Qual ação você quer que o público tome?" required>
              <div className="relative">
                <select
                  value={form.cta}
                  onChange={e => set('cta', e.target.value)}
                  className={selectCls}
                >
                  <option value="" disabled>Selecione o CTA principal</option>
                  {CTAS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </FieldWrapper>

            {/* Tom de voz */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Mic size={13} className="text-[#6B6B6B] flex-shrink-0" strokeWidth={2} />
                <label className="font-archivo text-[11px] uppercase tracking-widest text-[#0A0A0A] font-semibold">
                  Tom de voz<span className="text-[#E8181A] ml-0.5">*</span>
                </label>
              </div>
              <div className="relative mb-2">
                <select
                  value={form.tomVoz}
                  onChange={e => set('tomVoz', e.target.value)}
                  className={selectCls}
                >
                  <option value="" disabled>Selecione o tom de voz</option>
                  {TONES_MAIN.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {TONES_MAIN.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTom(t)}
                    className={`flex items-center gap-1.5 border rounded-[6px] px-2 py-1.5 font-arimo text-[11px] transition-all ${
                      form.tomsExtras.includes(t)
                        ? 'border-[#E8181A] bg-[#FFF5F5] text-[#E8181A]'
                        : 'border-[#E0E0E0] text-[#6B6B6B] hover:border-[#E8181A]'
                    }`}
                  >
                    <span>{TONE_EMOJIS[t]}</span>
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Linha 2 — Diferencial da oferta */}
          <FieldWrapper
            icon={Diamond}
            label="Diferencial da oferta"
            helper="Explique por que o cliente deve escolher você"
            required
          >
            <textarea
              value={form.diferencial}
              onChange={e => set('diferencial', e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              placeholder="Qual o principal diferencial da sua oferta? O que te torna único?"
            />
          </FieldWrapper>

        </div>

        {/* ── Seção 4 — REFERÊNCIAS E MATERIAIS ─────────────────────────────── */}
        <div className="bg-white rounded-[10px] border border-[#E8E8E8] px-8 py-8">
          <SectionHeader
            num={4}
            title="Referências e Materiais"
            subtitle="Forneça materiais e referências para melhor contexto"
          />
          <div className="grid grid-cols-5 gap-5">

            {/* Upload de arquivos */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Upload size={13} className="text-[#6B6B6B]" strokeWidth={2} />
                <span className="font-arimo text-[13px] font-semibold text-[#0A0A0A]">Upload de arquivos</span>
              </div>
              <p className="font-arimo text-[11px] text-[#6B6B6B]">Briefings, pesquisas, documentos, etc.</p>
              <label className="flex items-center justify-center gap-2 border border-[#E0E0E0] rounded-[6px] px-3 py-2.5 cursor-pointer hover:border-[#E8181A] hover:text-[#E8181A] hover:bg-[#FFF5F5] transition-colors font-arimo text-[13px] text-[#6B6B6B] mt-auto">
                <Upload size={13} strokeWidth={2} />
                Enviar arquivos
                <input type="file" className="hidden" multiple />
              </label>
            </div>

            {/* Links de concorrentes */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <LinkIcon size={13} className="text-[#6B6B6B]" strokeWidth={2} />
                <span className="font-arimo text-[13px] font-semibold text-[#0A0A0A]">Links de concorrentes</span>
              </div>
              <p className="font-arimo text-[11px] text-[#6B6B6B]">Links de sites, páginas, funis, etc.</p>
              <div className="flex items-center border border-[#E0E0E0] rounded-[6px] px-3 overflow-hidden focus-within:border-[#E8181A] focus-within:ring-1 focus-within:ring-[#E8181A] transition mt-auto">
                <input
                  value={form.linkConcorrente}
                  onChange={e => set('linkConcorrente', e.target.value)}
                  className="flex-1 py-2.5 font-arimo text-[13px] text-[#0A0A0A] outline-none bg-transparent placeholder-[#ABABAB]"
                  placeholder="https://exemplo.com"
                />
                <LinkIcon size={13} className="text-[#ABABAB] flex-shrink-0 ml-2" strokeWidth={2} />
              </div>
            </div>

            {/* Criativos de referência */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <ImageIcon size={13} className="text-[#6B6B6B]" strokeWidth={2} />
                <span className="font-arimo text-[13px] font-semibold text-[#0A0A0A]">Criativos de referência</span>
              </div>
              <p className="font-arimo text-[11px] text-[#6B6B6B]">Anúncios, posts, vídeos, prints, etc.</p>
              <label className="flex items-center justify-center gap-2 border border-[#E0E0E0] rounded-[6px] px-3 py-2.5 cursor-pointer hover:border-[#E8181A] hover:text-[#E8181A] hover:bg-[#FFF5F5] transition-colors font-arimo text-[13px] text-[#6B6B6B] mt-auto">
                <Upload size={13} strokeWidth={2} />
                Enviar arquivos
                <input type="file" className="hidden" multiple accept="image/*,video/*" />
              </label>
            </div>

            {/* Landing pages */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <FileText size={13} className="text-[#6B6B6B]" strokeWidth={2} />
                <span className="font-arimo text-[13px] font-semibold text-[#0A0A0A]">Landing pages</span>
              </div>
              <p className="font-arimo text-[11px] text-[#6B6B6B]">Páginas de vendas, sites, LPs, etc.</p>
              <div className="flex items-center border border-[#E0E0E0] rounded-[6px] px-3 overflow-hidden focus-within:border-[#E8181A] focus-within:ring-1 focus-within:ring-[#E8181A] transition mt-auto">
                <input
                  value={form.linkLP}
                  onChange={e => set('linkLP', e.target.value)}
                  className="flex-1 py-2.5 font-arimo text-[13px] text-[#0A0A0A] outline-none bg-transparent placeholder-[#ABABAB]"
                  placeholder="https://exemplo.com/landing"
                />
                <LinkIcon size={13} className="text-[#ABABAB] flex-shrink-0 ml-2" strokeWidth={2} />
              </div>
            </div>

            {/* Briefings antigos */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Folder size={13} className="text-[#6B6B6B]" strokeWidth={2} />
                <span className="font-arimo text-[13px] font-semibold text-[#0A0A0A]">Briefings antigos</span>
              </div>
              <p className="font-arimo text-[11px] text-[#6B6B6B]">Campanhas anteriores, estratégias, etc.</p>
              <label className="flex items-center justify-center gap-2 border border-[#E0E0E0] rounded-[6px] px-3 py-2.5 cursor-pointer hover:border-[#E8181A] hover:text-[#E8181A] hover:bg-[#FFF5F5] transition-colors font-arimo text-[13px] text-[#6B6B6B] mt-auto">
                <Upload size={13} strokeWidth={2} />
                Enviar arquivos
                <input type="file" className="hidden" multiple />
              </label>
            </div>

          </div>
        </div>

      </div>

      {/* ── Rodapé fixo ────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] px-8 py-4 flex items-center justify-end gap-3 z-40">
        <button
          type="button"
          className="flex items-center gap-2 border border-[#E0E0E0] rounded-[6px] px-6 py-3 font-arimo text-[13px] text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors"
        >
          <Save size={14} strokeWidth={2} />
          Salvar rascunho
        </button>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 bg-[#E8181A] hover:bg-[#C41214] disabled:opacity-70 text-white rounded-[6px] px-6 py-3 font-arimo text-[13px] font-medium transition-colors"
        >
          <Sparkles size={14} strokeWidth={2} />
          {generating ? 'Gerando estratégia...' : 'Gerar estratégia'}
        </button>
      </div>

    </div>
  )
}
