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
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-xl bg-surface-container-lowest px-4 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center transition-all active:scale-90 ${
              isActive
                ? 'font-semibold text-secondary'
                : 'text-on-surface-variant hover:text-secondary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={icon} filled={isActive} className="text-2xl" />
              <span className="text-xs">{label}</span>
              {icon === 'shopping_cart' && itemCount > 0 && (
                <span className="absolute -top-1 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-on-secondary">
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
