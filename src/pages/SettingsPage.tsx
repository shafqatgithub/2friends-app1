import { useState } from 'react'
import { Icon } from '../components/Icon'
import { useCart } from '../context/CartContext'

export function SettingsPage() {
  const { clearCart, clearWishlist } = useCart()
  const [notifications, setNotifications] = useState(true)
  const [emailOffers, setEmailOffers] = useState(true)
  const [saved, setSaved] = useState(false)

  const saveSettings = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main className="px-margin-mobile py-stack-lg pb-28">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-on-surface-variant">
          Manage your app preferences and account options.
        </p>
      </div>

      {saved && (
        <p className="mb-4 rounded-2xl bg-secondary-fixed/50 px-4 py-3 text-sm font-semibold text-secondary">
          Settings saved successfully.
        </p>
      )}

      <section className="space-y-4">
        <div className="rounded-3xl bg-surface-container-lowest p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-primary">
            <Icon name="notifications" />
            Notifications
          </h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between gap-4">
              <span>
                <span className="block font-semibold">Push notifications</span>
                <span className="text-sm text-on-surface-variant">
                  Get updates for orders and new products.
                </span>
              </span>

              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="h-5 w-5"
              />
            </label>

            <label className="flex items-center justify-between gap-4">
              <span>
                <span className="block font-semibold">Email offers</span>
                <span className="text-sm text-on-surface-variant">
                  Receive discounts and launch updates.
                </span>
              </span>

              <input
                type="checkbox"
                checked={emailOffers}
                onChange={(e) => setEmailOffers(e.target.checked)}
                className="h-5 w-5"
              />
            </label>
          </div>
        </div>

        <div className="rounded-3xl bg-surface-container-lowest p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-primary">
            <Icon name="cleaning_services" />
            App Data
          </h2>

          <div className="grid gap-3">
            <button
              type="button"
              onClick={clearCart}
              className="flex items-center justify-between rounded-2xl bg-surface-container px-4 py-3 font-semibold text-primary"
            >
              <span>Clear Cart</span>
              <Icon name="delete" />
            </button>

            <button
              type="button"
              onClick={clearWishlist}
              className="flex items-center justify-between rounded-2xl bg-surface-container px-4 py-3 font-semibold text-primary"
            >
              <span>Clear Wishlist</span>
              <Icon name="favorite" />
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-surface-container-lowest p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-primary">
            <Icon name="info" />
            About 2Friends
          </h2>

          <p className="text-sm leading-6 text-on-surface-variant">
            2Friends is a modern mobile accessories store focused on useful,
            stylish, and affordable tech products.
          </p>

          <p className="mt-3 text-sm font-semibold text-primary">
            Website: 2friends.site
          </p>
        </div>

        <button
          type="button"
          onClick={saveSettings}
          className="w-full rounded-2xl bg-primary py-4 font-bold text-white active:scale-95"
        >
          Save Settings
        </button>
      </section>
    </main>
  )
}