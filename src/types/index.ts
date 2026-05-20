export type User = {
  id: string
  nome: string
  email: string
  avatar_url?: string
  criado_em: string
}

export type Projeto = {
  id: string
  user_id: string
  nome: string
  nicho: string
  descricao?: string
  status: string
  criado_em: string
}

export type Campanha = {
  id: string
  projeto_id: string
  user_id: string
  nome: string
  canal: string
  produto: string
  objetivo?: string
  publico_alvo?: string
  status: string
  criado_em: string
}

export type Briefing = {
  id: string
  campanha_id: string
  nicho: string
  produto: string
  objetivo: string
  publico: string
  tom_de_voz?: string
  referencias?: string
  criado_em: string
}

export type Estrategia = {
  id: string
  campanha_id: string
  conteudo: string
  gerado_em: string
}

export type Criativo = {
  id: string
  campanha_id: string
  url_imagem: string
  prompt_usado?: string
  status: 'pendente' | 'aprovado' | 'reprovado'
  aprovado_por?: string
  aprovado_em?: string
  criado_em: string
}

export type Copy = {
  id: string
  campanha_id: string
  criativo_id?: string
  headline: string
  corpo: string
  cta: string
  formato?: string
  status: 'pendente' | 'aprovado' | 'reprovado'
  aprovado_por?: string
  aprovado_em?: string
  criado_em: string
}

export type Execucao = {
  id: string
  campanha_id: string
  criativo_id: string
  copy_id: string
  canal: string
  status: 'aguardando' | 'agendado' | 'publicado' | 'erro'
  agendado_para?: string
  publicado_em?: string
  criado_em: string
}

export type PipelineStage =
  | 'briefing'
  | 'pesquisa'
  | 'criacao'
  | 'revisao'
  | 'aprovacao'
  | 'agendado'
  | 'publicado'
  | 'pronto'
  | 'executando'
