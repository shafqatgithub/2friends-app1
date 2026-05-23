import { Link, Navigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const { itemCount, subtotal } = useCart()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <main className="px-margin-mobile py-stack-lg">
      <div className="rounded-2xl bg-primary p-margin-mobile text-on-primary shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">Hello, {user.name}</h2>
            <p className="text-sm opacity-80">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-stack-lg grid grid-cols-2 gap-gutter">
        <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <Icon name="shopping_cart" className="text-primary" />
          <p className="mt-2 text-2xl font-bold text-primary">{itemCount}</p>
          <p className="text-sm text-on-surface-variant">Cart items</p>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <Icon name="payments" className="text-secondary" />
          <p className="mt-2 text-2xl font-bold text-primary">{formatPrice(subtotal)}</p>
          <p className="text-sm text-on-surface-variant">Cart value</p>
        </div>
      </div>

      <ul className="mt-stack-lg space-y-2">
        {[
          { icon: 'receipt_long', label: 'Order History', to: '/checkout' },
          { icon: 'favorite', label: 'Wishlist', to: '/shop' },
          { icon: 'settings', label: 'Settings', to: '/shop' },
        ].map(({ icon, label, to }) => (
          <li key={label}>
            <Link
              to={to}
              className="flex items-center justify-between rounded-xl bg-surface-container-lowest px-4 py-4 shadow-sm active:scale-[0.99]"
            >
              <span className="flex items-center gap-3 font-medium">
                <Icon name={icon} className="text-primary" />
                {label}
              </span>
              <Icon name="chevron_right" className="text-outline" />
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={logout}
        className="mt-stack-lg w-full rounded-lg border border-error/30 py-3 font-semibold text-error active:scale-[0.98]"
      >
        Log Out
      </button>
    </main>
  )
}
