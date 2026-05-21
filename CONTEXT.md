# CONTEXT.md — Browth LW

> Documento de contexto do projeto. Mantenha atualizado a cada sessão de desenvolvimento.

---

## 1. Visão Geral do Projeto

**Nome:** Browth LW  
**Subtítulo:** Revenue Automation Engine  
**Descrição:** Painel de automação de conteúdo com aprovação humana. O usuário cria campanhas por nicho e produto, a IA gera estratégia, criativos e copies, o usuário aprova o que quer e o sistema organiza tudo para execução. Foco em anúncios para Facebook Ads e conteúdo orgânico para Instagram.

**URLs:**
- Produção: https://browth-app.vercel.app
- Repositório: https://github.com/costarodolph-dot/browth-app
- Supabase Project ID: `uapoydvqnxvyzfhkheuo`

---

## 2. Stack Completa

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS 3.4 |
| Backend / Auth | Supabase (Auth + PostgreSQL + RLS) |
| Supabase Client | @supabase/ssr + @supabase/supabase-js |
| Gráficos | Recharts 3 |
| Ícones | lucide-react |
| Utilitários de data | date-fns |
| Deploy | Vercel (auto-deploy via GitHub) |
| CI/CD | Push no branch `main` → Vercel rebuild automático |

---

## 3. Estrutura de Pastas

```
browth-app/
├── src/
│   ├── app/
│   │   ├── (dashboard)/              # Grupo de rotas autenticadas
│   │   │   ├── layout.tsx            # Layout compartilhado: Sidebar + Header
│   │   │   ├── visao-geral/page.tsx  # Dashboard principal
│   │   │   ├── projetos/page.tsx     # Grid de campanhas
│   │   │   ├── briefings/page.tsx    # Formulário de briefing + geração IA
│   │   │   ├── conteudos/page.tsx    # Creative Assets Review
│   │   │   ├── aprovacoes/page.tsx   # Copywriting Review List
│   │   │   ├── publicacoes/page.tsx  # Approval Queue Detail
│   │   │   ├── ativos/page.tsx       # Campaign Execution Status
│   │   │   ├── analytics/page.tsx    # Analytics & Performance
│   │   │   ├── calendario/page.tsx   # Stub (a implementar)
│   │   │   ├── otimizacoes/page.tsx  # Stub (a implementar)
│   │   │   └── configuracoes/page.tsx # Stub (a implementar)
│   │   ├── login/page.tsx            # Tela de login (Supabase Auth)
│   │   ├── page.tsx                  # Redirect → /visao-geral
│   │   ├── layout.tsx                # Root layout (fontes, metadata)
│   │   └── globals.css               # Estilos globais + fundo com pontos
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx           # Sidebar 220px com navegação ativa
│   │   │   └── Header.tsx            # Header com seletor de projeto + avatar
│   │   └── ui/
│   │       └── ChannelIcons.tsx      # SVG inline: FbIcon, IgIcon, FbBadge, IgBadge
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts             # createBrowserClient (uso em 'use client')
│   │       └── server.ts             # createServerClient (uso em Server Components)
│   ├── middleware.ts                  # Proteção de rotas via Supabase Auth
│   └── types/
│       └── index.ts                  # Tipos TypeScript: User, Projeto, Campanha, etc.
├── supabase/
│   └── schema.sql                    # DDL completo com RLS (já aplicado no Supabase)
├── .env.local                        # Variáveis de ambiente (não commitado)
├── CONTEXT.md                        # Este arquivo
├── tailwind.config.ts                # Design tokens customizados
└── package.json
```

---

## 4. Páginas Implementadas

### `/login`
Tela de autenticação. Fundo `#F5F5F5` com textura de pontos. Card centralizado com logo, campos email/senha, botão "Entrar" vermelho. Integrada ao Supabase Auth (email + senha).

### `/visao-geral` ⭐ (refatorada)
Dashboard principal com 4 seções:
- **4 cards de métricas**: Alcance (2.4M), Conteúdos publicados (128), ROAS Orgânico (4.2x), Taxa de aprovação (86%) — cada um com sparklines SVG inline
- **Pipeline de campanhas**: 6 etapas horizontais com linha pontilhada (Briefing→Criação→Revisão→Aprovação→Agendado→Pronto)
- **Analytics 2 colunas**: LineChart com 3 linhas (Alcance/Views/Engajamento) + AreaChart com seletor de canal e grade de métricas clicáveis
- **Campanhas recentes**: tabela com badges de status, hover com borda vermelha, ícone de 3 pontos

### `/projetos`
Grid 2 colunas de campanhas com pipeline bar (progress por etapa), badges de canal (IG/FB), status badge, próxima ação. Botão "Nova campanha" abre modal com formulário.

### `/briefings`
Formulário de briefing por campanha: nicho (dropdown), produto, objetivo, público-alvo, tom de voz (radio), referências (upload + link). Botão "✨ Gerar estratégia com IA" (placeholder — exibe resultado mockado).

### `/conteudos`
Creative Assets Review. Tabs Aprovados/Aguardando/Reprovados com contadores. Grid 5 colunas de imagens com botões Aprovar/Reprovar. Painel lateral direito com preview, legenda sugerida e hashtags.

### `/aprovacoes`
Copywriting Review List. Lista de copies com modo de visualização normal e inline editing. Botões Approve/Edit/Reject por item. Quando em edição: campos de texto inline com Salvar/Cancelar.

### `/publicacoes`
Approval Queue Detail. Layout split: lista à esquerda com thumbnails e status, painel direito com preview de imagem, copy completa, público, responsável, comentário e botões Rejeitar/Solicitar revisão/Aprovar.

### `/ativos`
Campaign Execution Status. Grid de "Ready Packages" com canal, descrição e badge "Pronto para execução". Botões "Enviar para execução" e "Agendar". Tabela de histórico de publicações com status Published/Scheduled/Error.

### `/analytics`
Analytics & Performance. 6 KPIs com sparklines (Recharts). Gráfico de área "Criativos Gerados ao Longo do Tempo". Tabela de performance por campanha com progress bars de taxa de aprovação.

### `/calendario`, `/otimizacoes`, `/configuracoes`
Stubs — apenas título e placeholder "em desenvolvimento".

---

## 5. O que Já Foi Refatorado / Melhorado

| O que | Quando | Detalhes |
|---|---|---|
| Visão Geral | Sessão 2 | Rebuild completo das 4 seções com sparklines SVG, pipeline compacto, recharts LineChart + AreaChart, tabela de campanhas |
| Fundo da página | Sessão 2 | Restaurado `#FFF8F7` com textura de pontos no body; cards e sidebar com `bg-white` sólido para contraste |
| Build Vercel | Sessão 2 | Corrigidos erros de TypeScript (`any`, imports não usados) que travavam o deploy |
| Ícones de canais | Sessão 1 | `lucide-react` não tem Facebook/Instagram — criado `ChannelIcons.tsx` com SVG inline próprio |

---

## 6. Design System

### Cores
| Token | Valor | Uso |
|---|---|---|
| Brand Red | `#E8181A` | CTAs, elementos ativos, borda de item selecionado |
| Brand Red Hover | `#C41214` | Hover nos botões primários |
| Fundo body | `#FFF8F7` | Background global (rosa quente) |
| Fundo cards | `#FFFFFF` | Todos os cards e painéis |
| Borda cards | `#E8E8E8` | Separação visual dos cards |
| Texto principal | `#0A0A0A` | Títulos e valores |
| Texto secundário | `#6B6B6B` | Labels e descrições |
| Texto terciário | `#ABABAB` | Placeholders e metadados |
| Success | `#16A34A` | Aprovado, publicado, variações positivas |
| Warning | `#CA8A04` | Aguardando aprovação |
| Info | `#2563EB` | Em criação, em processamento |
| Error | `#BA1A1A` | Reprovado, erro |

### Tipografia
| Papel | Fonte | Tamanho | Uso |
|---|---|---|---|
| Títulos de página | Anton | 28px | H1 das páginas |
| Títulos de seção | Anton | 20px | H2 dos cards |
| Métricas / números | Anton | 32px | KPIs e contadores |
| Corpo de texto | Arimo | 13px | Parágrafos, labels |
| Labels / badges | Archivo Narrow | 10–11px, UPPERCASE | Status, tags, colunas de tabela |

### Componentes Reutilizáveis
- **`Sidebar.tsx`** — navegação lateral 220px, item ativo com borda vermelha e fundo `#FFF5F5`
- **`Header.tsx`** — seletor de projeto, sino, avatar, logout
- **`ChannelIcons.tsx`** — `FbBadge`, `IgBadge`, `FbIcon`, `IgIcon` (SVG inline)
- **`PeriodSelector`** (inline em visao-geral) — seletor 24h/7 dias/30 dias com pill ativo vermelho
- **`Sparkline`** (inline em visao-geral) — SVG de 64×28px com linha fina

### Padrões de Card
```
bg-white
border: 1px solid #E8E8E8
border-radius: 10px
padding: 24px
box-shadow: 0 1px 4px rgba(0,0,0,0.06)
```

---

## 7. O que Ainda Falta Implementar

### Alta Prioridade
- [ ] **Conectar dados reais ao banco** — todas as páginas usam dados mockados; implementar CRUD com Supabase em projetos, campanhas, briefings, criativos e copies
- [ ] **Criar projeto real** — fluxo de criação de projeto + campanha que persiste no banco
- [ ] **Integração real com IA** — conectar botão "Gerar estratégia com IA" à API da Anthropic (Claude)
- [ ] **Upload de criativos** — configurar Supabase Storage para armazenar imagens

### Média Prioridade
- [ ] **Fila de aprovação real** — aprovar/reprovar criativos e copies com persistência
- [ ] **Calendário** — visualização de conteúdos agendados por data
- [ ] **Otimizações** — sugestões automáticas de melhoria por campanha
- [ ] **Configurações** — edição de perfil, senha, preferências

### Baixa Prioridade
- [ ] **Notificações** — sino funcional com alertas de aprovações pendentes
- [ ] **Seletor de projeto real** — trocar entre projetos do usuário no header
- [ ] **Paginação** — nas tabelas de campanhas, copies e criativos
- [ ] **Modo mobile** — layout responsivo para telas menores

---

## 8. Dependências

### Produção
```json
{
  "@supabase/ssr": "^0.10.3",
  "@supabase/supabase-js": "^2.106.1",
  "date-fns": "^4.2.1",
  "lucide-react": "^1.16.0",
  "next": "14.2.35",
  "react": "^18",
  "react-dom": "^18",
  "recharts": "^3.8.1"
}
```

### Dev
```json
{
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "eslint": "^8",
  "eslint-config-next": "14.2.35",
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

---

## 9. Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://uapoydvqnxvyzfhkheuo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key do projeto>
```

> ⚠️ Nunca commitar o `.env.local`. Já está no `.gitignore`.  
> No Vercel, as variáveis estão configuradas em Settings → Environment Variables.

---

## 10. Banco de Dados (Supabase)

Todas as tabelas têm RLS ativo com policy `user_id = auth.uid()`.

| Tabela | Descrição |
|---|---|
| `users` | Perfil do usuário autenticado |
| `projetos` | Projetos por usuário (nicho, nome, status) |
| `campanhas` | Campanhas vinculadas a projetos (canal, produto, status) |
| `briefings` | Briefing de cada campanha (nicho, público, tom de voz) |
| `estrategias` | Estratégia gerada pela IA para cada campanha |
| `criativos` | Imagens geradas com status pendente/aprovado/reprovado |
| `copies` | Textos (headline + corpo + CTA) com aprovação |
| `execucoes` | Pacotes prontos para publicação com agendamento |

---

*Última atualização: 2026-05-20*
