import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/shop', label: 'Shop', icon: 'shopping_bag' },
  { to: '/checkout', label: 'Cart', icon: 'shopping_cart' },
  { to: '/profile', label: 'Profile', icon: 'person' },
] as const

export function BottomNav() {
  const { itemCount } = useCart()

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-[9999] flex w-full items-center justify-around rounded-t-2xl bg-surface-container-lowest px-4 pt-2 pb-[max(16px,env(safe-area-inset-bottom))] shadow-[0_-4px_18px_rgba(0,0,0,0.12)]">
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative flex min-w-[64px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-90 ${
              isActive
                ? 'font-semibold text-secondary'
                : 'text-on-surface-variant hover:text-secondary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={icon} filled={isActive} className="text-2xl" />
              <span className="text-[11px] leading-none">{label}</span>
              {icon === 'shopping_cart' && itemCount > 0 && (
                <span className="absolute -top-1 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-on-secondary">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}