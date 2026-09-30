'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Radar, Truck, Wallet, User, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/lib/app-context'

export function BottomNav() {
  const pathname = usePathname()
  const { role, t } = useApp()

  const navItems =
    role === 'shipper'
      ? [
          { href: '/home', label: 'Home', icon: Home },
          { href: '/post-cargo', label: 'Post Cargo', icon: PlusCircle, isHighlight: true },
          { href: '/find-trucks', label: 'Find Trucks', icon: Radar },
          { href: '/trips', label: 'Trips', icon: Truck },
          { href: '/profile', label: 'Account', icon: User },
        ]
      : [
          { href: '/home', label: 'Home', icon: Home },
          { href: '/hunt', label: 'Cargo Hunt', icon: Radar },
          { href: '/trips', label: 'My Trips', icon: Truck },
          { href: '/wallet', label: 'Wallet', icon: Wallet },
          { href: '/profile', label: 'Profile', icon: User },
        ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto border-t border-slate-200 bg-white/98 backdrop-blur-md px-2 py-1.5 z-40 shadow-lg">
      <ul className="flex items-center justify-around">
        {navItems.map(({ href, label, icon: Icon, isHighlight }) => {
          const active =
            pathname === href ||
            (href === '/hunt' && pathname?.startsWith('/hunt')) ||
            (href === '/trips' && (pathname?.startsWith('/trip') || pathname?.startsWith('/trips')))

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center gap-0.5 py-1 text-center transition active:scale-95',
                  isHighlight && '-mt-2'
                )}
                aria-current={active ? 'page' : undefined}
              >
                {isHighlight ? (
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#F06524] text-white shadow-md">
                    <Icon className="h-6 w-6" strokeWidth={2.4} />
                  </div>
                ) : (
                  <Icon
                    className={cn(
                      'h-5 w-5 transition-colors',
                      active ? 'text-[#0B192C]' : 'text-slate-400 hover:text-slate-600'
                    )}
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                )}
                <span
                  className={cn(
                    'text-[10px] leading-tight transition-colors',
                    active ? 'text-[#0B192C] font-extrabold' : 'text-slate-500 font-medium'
                  )}
                >
                  {label}
                </span>
                {active && !isHighlight && (
                  <span className="h-1 w-4 rounded-full bg-[#F06524]" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
