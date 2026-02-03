'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, Flame, Brain, BookOpen, BookText, Terminal, GitBranch, User } from 'lucide-react'

const navItems = [
  { href: '/aujourdhui', label: 'Aujourd\'hui', icon: Home },
  { href: '/parcours', label: 'Parcours', icon: Map },
  { href: '/survie', label: 'Survie', icon: Flame },
  { href: '/revisions', label: 'Révisions', icon: Brain },
  { href: '/fiches', label: 'Fiches', icon: BookOpen },
  { href: '/glossaire', label: 'Glossaire', icon: BookText },
  { href: '/terminal', label: 'Terminal', icon: Terminal },
  { href: '/git', label: 'Git', icon: GitBranch },
  { href: '/profil', label: 'Profil', icon: User },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/aujourdhui" className="flex items-center space-x-2">
            <span className="text-2xl">🌊</span>
            <span className="font-bold text-xl text-primary">Piscine42 Coach</span>
          </Link>

          {/* Navigation */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
