'use client'

import { useState } from 'react'
import { Search, Bell, ChevronDown, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type HeaderProps = {
  projectName?: string
}

export default function Header({ projectName = 'Glow Skincare' }: HeaderProps) {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-[220px] right-0 h-[64px] bg-white border-b border-gray-100 flex items-center justify-between px-8 z-30">
      {/* Project selector */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-archivo text-[10px] uppercase tracking-widest text-text-tertiary">Empresário</span>
          <button className="flex items-center gap-2 font-arimo text-[15px] font-semibold text-text-primary hover:text-[#E8181A] transition-colors">
            {projectName}
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors">
          <Search size={18} />
        </button>

        <button className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#E8181A] rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8181A] flex items-center justify-center">
              <span className="font-anton text-white text-sm">M</span>
            </div>
            <ChevronDown size={12} className="text-text-secondary" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-soft border border-gray-100 py-1 w-40 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left font-arimo text-sm text-text-secondary hover:text-[#E8181A] hover:bg-[#FFF5F5] transition-colors"
              >
                <LogOut size={14} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
