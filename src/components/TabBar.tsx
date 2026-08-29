import {
  Home,
  List,
  MapPin,
  PiggyBank,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

type Tab = {
  label: string
  path: string
  icon: LucideIcon
}

const tabs: Tab[] = [
  { label: 'Home', path: '/home', icon: Home },
  { label: 'Trip', path: '/trip', icon: MapPin },
  { label: 'My list', path: '/list', icon: List },
  { label: 'Basket', path: '/basket', icon: ShoppingBag },
  { label: 'Savings', path: '/savings', icon: PiggyBank },
]

export function TabBar() {
  return (
    <nav
      aria-label="Primary navigation"
      className="absolute inset-x-0 bottom-0 z-20 grid h-16 grid-cols-5 border-t border-rule bg-paper"
    >
      {tabs.map(({ icon: Icon, label, path }) => (
        <NavLink
          key={path}
          className={({ isActive }) =>
            [
              'flex min-w-11 flex-col items-center justify-center gap-1 text-[11px] font-semibold',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest',
              isActive ? 'text-forest' : 'text-mute',
            ].join(' ')
          }
          to={path}
        >
          <Icon aria-hidden="true" size={24} strokeWidth={1.75} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
