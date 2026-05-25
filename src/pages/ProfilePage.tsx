import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

type LinkMenuItem = {
  type: 'link'
  icon: string
  label: string
  to: string
}

type ActionMenuItem = {
  type: 'action'
  icon: string
  label: string
  action: () => void
}

type MenuItem = LinkMenuItem | ActionMenuItem

export function ProfilePage() {
  const { user, logout, isDemoMode } = useAuth()
  const { itemCount, subtotal } = useCart()
  const [helpOpen, setHelpOpen] = useState(false)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const menuItems: MenuItem[] = [
    { type: 'link', icon: 'receipt_long', label: 'Order History', to: '/checkout' },
    { type: 'link', icon: 'favorite', label: 'Wishlist', to: '/shop' },
    { type: 'link', icon: 'settings', label: 'Settings', to: '/shop' },
    {
      type: 'action',
      icon: 'support_agent',
      label: 'Help & Support',
      action: () => setHelpOpen(true),
    },
  ]

  return (
    <main className="px-margin-mobile py-stack-lg pb-28">
      <div className="rounded-3xl bg-primary p-margin-mobile text-on-primary shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold">Hello, {user.name}</h2>
              <p className="truncate text-sm opacity-80">{user.email}</p>

              {isDemoMode ? (
                <span className="mt-2 inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs">
                  Demo account
                </span>
              ) : (
                <span className="mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs">
                  Verified customer
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="shrink-0 rounded-full bg-white/15 p-2 active:scale-95"
            aria-label="Help"
          >
            <Icon name="help_outline" />
          </button>
        </div>
      </div>

      <div className="mt-stack-lg grid grid-cols-2 gap-gutter">
        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
          <Icon name="shopping_cart" className="text-primary" />
          <p className="mt-2 text-2xl font-bold text-primary">{itemCount}</p>
          <p className="text-sm text-on-surface-variant">Cart items</p>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
          <Icon name="payments" className="text-secondary" />
          <p className="mt-2 text-2xl font-bold text-primary">
            {formatPrice(subtotal)}
          </p>
          <p className="text-sm text-on-surface-variant">Cart value</p>
        </div>
      </div>

      <ul className="mt-stack-lg space-y-3">
        {menuItems.map((item) => (
          <li key={item.label}>
            {item.type === 'link' ? (
              <Link
                to={item.to}
                className="flex items-center justify-between rounded-2xl bg-surface-container-lowest px-4 py-4 shadow-sm active:scale-[0.99]"
              >
                <span className="flex items-center gap-3 font-medium">
                  <Icon name={item.icon} className="text-primary" />
                  {item.label}
                </span>
                <Icon name="chevron_right" className="text-outline" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={item.action}
                className="flex w-full items-center justify-between rounded-2xl bg-surface-container-lowest px-4 py-4 text-left shadow-sm active:scale-[0.99]"
              >
                <span className="flex items-center gap-3 font-medium">
                  <Icon name={item.icon} className="text-primary" />
                  {item.label}
                </span>
                <Icon name="chevron_right" className="text-outline" />
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={logout}
        className="mt-stack-lg w-full rounded-2xl border border-error/30 bg-white py-4 font-semibold text-error shadow-sm active:scale-[0.98]"
      >
        Log Out
      </button>

      {helpOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end bg-black/40 px-margin-mobile pb-6">
          <div className="w-full rounded-3xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary">Help & Support</h3>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="rounded-full bg-surface-container p-2"
              >
                <Icon name="close" />
              </button>
            </div>

            <p className="text-sm leading-6 text-on-surface-variant">
              Need help with orders, payments, account, or products? Contact 2Friends
              support and we will help you as soon as possible.
            </p>

            <div className="mt-4 grid gap-3">
              <a
                href="mailto:support@2friends.site"
                className="flex items-center gap-3 rounded-2xl bg-surface-container px-4 py-3 font-semibold text-primary"
              >
                <Icon name="mail" />
                support@2friends.site
              </a>

              <Link
                to="/shop"
                onClick={() => setHelpOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-primary px-4 py-3 font-semibold text-white"
              >
                <Icon name="shopping_bag" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}