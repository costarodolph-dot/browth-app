'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Calendar,
  Image as ImageIcon,
  CheckCircle,
  Send,
  BarChart2,
  Sliders,
  Archive,
  Settings,
  FileText,
} from 'lucide-react'

const navItems = [
  { href: '/visao-geral', label: 'Visão Geral', icon: Home },
  { href: '/briefings', label: 'Briefings', icon: FileText },
  { href: '/calendario', label: 'Calendário', icon: Calendar },
  { href: '/conteudos', label: 'Conteúdos', icon: ImageIcon },
  { href: '/aprovacoes', label: 'Aprovações', icon: CheckCircle, badge: 12 },
  { href: '/publicacoes', label: 'Publicações', icon: Send },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/otimizacoes', label: 'Otimizações', icon: Sliders },
  { href: '/ativos', label: 'Ativos', icon: Archive },
]

const bottomItems = [
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-gray-100 flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="w-8 h-8 bg-[#E8181A] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="font-anton text-white text-base leading-none">B</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-anton text-[#0A0A0A] text-lg tracking-wide">Browth</span>
          <span className="font-archivo text-[10px] font-medium text-text-secondary uppercase tracking-widest">LW</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-0.5 px-2">
          {navItems.map(({ href, label, icon: Icon, badge }) => {
            const active = isActive(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-100 group ${
                    active
                      ? 'bg-[#FFF5F5] border-l-2 border-[#E8181A] text-[#E8181A]'
                      : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                    <span className="font-arimo text-[13px]">{label}</span>
                  </div>
                  {badge && (
                    <span className="bg-[#E8181A] text-white font-archivo text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 border-t border-gray-100 pt-3">
        {bottomItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors duration-100 ${
                active
                  ? 'bg-[#FFF5F5] border-l-2 border-[#E8181A] text-[#E8181A]'
                  : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary border-l-2 border-transparent'
              }`}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span className="font-arimo text-[13px]">{label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
