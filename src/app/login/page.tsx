'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou senha incorretos.')
      setLoading(false)
      return
    }

    router.push('/visao-geral')
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: '#F5F5F5',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="bg-white rounded-2xl shadow-soft p-10 w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#E8181A] rounded-lg flex items-center justify-center">
              <span className="font-anton text-white text-xl leading-none">B</span>
            </div>
            <span className="font-anton text-[#0A0A0A] text-[26px] tracking-wide">Browth</span>
          </div>
          <p className="font-arimo text-text-secondary text-sm">Revenue Automation Engine</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-archivo text-text-secondary uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 font-arimo text-sm text-text-primary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 font-arimo text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-[#E8181A] focus:ring-1 focus:ring-[#E8181A] transition"
            />
          </div>

          {error && (
            <p className="text-xs font-arimo text-status-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E8181A] hover:bg-[#C41214] text-white font-anton text-base py-3 rounded-lg transition-colors duration-150 disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button className="font-arimo text-sm text-text-secondary hover:text-[#E8181A] transition-colors">
            Esqueci minha senha
          </button>
        </div>
      </div>
    </div>
  )
}
