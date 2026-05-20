-- Enable UUID extension
create extension if not exists "pgcrypto";

-- USERS
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null unique,
  avatar_url text,
  criado_em timestamptz default now()
);
alter table public.users enable row level security;
create policy "Users see own row" on public.users for all using (id = auth.uid());

-- PROJETOS
create table if not exists public.projetos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  nome text not null,
  nicho text not null,
  descricao text,
  status text default 'ativo',
  criado_em timestamptz default now()
);
alter table public.projetos enable row level security;
create policy "Users see own projetos" on public.projetos for all using (user_id = auth.uid());

-- CAMPANHAS
create table if not exists public.campanhas (
  id uuid primary key default gen_random_uuid(),
  projeto_id uuid not null references public.projetos(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  nome text not null,
  canal text not null,
  produto text not null,
  objetivo text,
  publico_alvo text,
  status text default 'briefing',
  criado_em timestamptz default now()
);
alter table public.campanhas enable row level security;
create policy "Users see own campanhas" on public.campanhas for all using (user_id = auth.uid());

-- BRIEFINGS
create table if not exists public.briefings (
  id uuid primary key default gen_random_uuid(),
  campanha_id uuid not null references public.campanhas(id) on delete cascade,
  nicho text not null,
  produto text not null,
  objetivo text not null,
  publico text not null,
  tom_de_voz text,
  referencias text,
  criado_em timestamptz default now()
);
alter table public.briefings enable row level security;
create policy "Users see own briefings" on public.briefings for all
  using (campanha_id in (select id from public.campanhas where user_id = auth.uid()));

-- ESTRATEGIAS
create table if not exists public.estrategias (
  id uuid primary key default gen_random_uuid(),
  campanha_id uuid not null references public.campanhas(id) on delete cascade,
  conteudo text not null,
  gerado_em timestamptz default now()
);
alter table public.estrategias enable row level security;
create policy "Users see own estrategias" on public.estrategias for all
  using (campanha_id in (select id from public.campanhas where user_id = auth.uid()));

-- CRIATIVOS
create table if not exists public.criativos (
  id uuid primary key default gen_random_uuid(),
  campanha_id uuid not null references public.campanhas(id) on delete cascade,
  url_imagem text not null,
  prompt_usado text,
  status text default 'pendente',
  aprovado_por uuid references public.users(id),
  aprovado_em timestamptz,
  criado_em timestamptz default now()
);
alter table public.criativos enable row level security;
create policy "Users see own criativos" on public.criativos for all
  using (campanha_id in (select id from public.campanhas where user_id = auth.uid()));

-- COPIES
create table if not exists public.copies (
  id uuid primary key default gen_random_uuid(),
  campanha_id uuid not null references public.campanhas(id) on delete cascade,
  criativo_id uuid references public.criativos(id),
  headline text not null,
  corpo text not null,
  cta text not null,
  formato text,
  status text default 'pendente',
  aprovado_por uuid references public.users(id),
  aprovado_em timestamptz,
  criado_em timestamptz default now()
);
alter table public.copies enable row level security;
create policy "Users see own copies" on public.copies for all
  using (campanha_id in (select id from public.campanhas where user_id = auth.uid()));

-- EXECUCOES
create table if not exists public.execucoes (
  id uuid primary key default gen_random_uuid(),
  campanha_id uuid not null references public.campanhas(id) on delete cascade,
  criativo_id uuid not null references public.criativos(id),
  copy_id uuid not null references public.copies(id),
  canal text not null,
  status text default 'aguardando',
  agendado_para timestamptz,
  publicado_em timestamptz,
  criado_em timestamptz default now()
);
alter table public.execucoes enable row level security;
create policy "Users see own execucoes" on public.execucoes for all
  using (campanha_id in (select id from public.campanhas where user_id = auth.uid()));
