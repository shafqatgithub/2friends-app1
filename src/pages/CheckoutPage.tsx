import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { placeOrder } from '../services/orders'

type Step = 1 | 2 | 3

export function CheckoutPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, subtotal, updateQuantity, removeItem, clearCart, itemCount } = useCart()
  const [step, setStep] = useState<Step>(1)
  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    card: '',
  })

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || user.name,
        email: f.email || user.email,
      }))
    }
  }, [user])

  const shipping = subtotal > 0 ? 9.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (itemCount === 0 && step !== 3) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-margin-mobile text-center">
        <Icon name="shopping_cart" className="text-6xl text-outline" />
        <h2 className="text-2xl font-semibold text-primary">Your cart is empty</h2>
        <p className="text-on-surface-variant">Add items from the shop to checkout.</p>
        <Link
          to="/shop"
          className="rounded-full bg-secondary px-8 py-3 font-bold text-white active:scale-95"
        >
          Browse Shop
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-margin-mobile py-stack-lg">
      <nav className="mb-stack-lg hidden justify-center gap-8 md:flex">
        {[
          { n: 1, label: 'Shopping Cart' },
          { n: 2, label: 'Checkout Details' },
          { n: 3, label: 'Confirmation' },
        ].map(({ n, label }) => (
          <div
            key={n}
            className={`flex items-center gap-2 ${step >= n ? 'font-bold text-secondary' : 'text-outline'}`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                step >= n
                  ? 'bg-secondary text-on-secondary'
                  : 'border border-outline-variant bg-surface-container'
              }`}
            >
              {n}
            </span>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </nav>

      {step === 1 && (
        <section className="space-y-stack-lg">
          <h2 className="text-2xl font-semibold text-primary">Your Cart</h2>
          <div className="space-y-stack-md">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-gutter rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-grow flex-col">
                  <h3 className="font-semibold text-on-surface">{product.name}</h3>
                  <p className="text-sm text-on-surface-variant">{product.category}</p>
                  <p className="mt-auto text-lg font-semibold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg border border-outline-variant">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2 py-1 text-primary"
                        aria-label="Decrease quantity"
                      >
                        <Icon name="remove" />
                      </button>
                      <span className="min-w-[2ch] text-center font-semibold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2 py-1 text-primary"
                        aria-label="Increase quantity"
                      >
                        <Icon name="add" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-sm text-error hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-surface-container-low p-margin-mobile">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between border-t border-outline-variant pt-2 text-lg font-bold text-primary">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-stack-md w-full rounded-lg bg-secondary py-4 font-semibold text-on-secondary active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="mx-auto max-w-lg space-y-stack-lg">
          <h2 className="text-2xl font-semibold text-primary">Checkout Details</h2>
          {orderError && (
            <p className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
              {orderError}
            </p>
          )}
          <form
            className="space-y-stack-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-margin-mobile shadow-lg"
            onSubmit={async (e) => {
              e.preventDefault()
              setOrderError(null)
              setPlacing(true)
              try {
                await placeOrder({
                  userId: user?.id,
                  customerName: form.name,
                  customerEmail: form.email,
                  shippingAddress: form.address,
                  city: form.city,
                  items,
                  subtotal,
                  shipping,
                  tax,
                  total,
                })
                setStep(3)
              } catch (err) {
                setOrderError(err instanceof Error ? err.message : 'Could not place order')
              } finally {
                setPlacing(false)
              }
            }}
          >
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Alex Smith' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'alex@example.com' },
              { key: 'address', label: 'Address', type: 'text', placeholder: '123 Main St' },
              { key: 'city', label: 'City', type: 'text', placeholder: 'New York' },
              {
                key: 'card',
                label: 'Card Number',
                type: 'text',
                placeholder: '4242 4242 4242 4242',
              },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="mb-1 ml-1 block text-sm font-semibold text-on-surface-variant">
                  {label}
                </label>
                <input
                  required
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-lg border border-outline-variant py-3 font-semibold"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={placing}
                className="flex-1 rounded-lg bg-primary py-3 font-semibold text-on-primary active:scale-[0.98] disabled:opacity-60"
              >
                {placing ? 'Placing order…' : 'Place Order'}
              </button>
            </div>
          </form>
        </section>
      )}

      {step === 3 && (
        <section className="flex flex-col items-center py-stack-lg text-center">
          <div className="mb-stack-md flex h-20 w-20 items-center justify-center rounded-full bg-secondary-fixed/50">
            <Icon name="check_circle" filled className="text-5xl text-secondary" />
          </div>
          <h2 className="text-2xl font-semibold text-primary">Order Confirmed!</h2>
          <p className="mt-2 max-w-sm text-on-surface-variant">
            Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}! Your order is on its way.
          </p>
          <p className="mt-4 text-lg font-bold text-secondary">{formatPrice(total)}</p>
          <div className="mt-stack-lg flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                clearCart()
                navigate('/shop')
              }}
              className="rounded-full bg-secondary px-8 py-3 font-bold text-white"
            >
              Continue Shopping
            </button>
            <Link
              to="/"
              className="rounded-full border border-outline-variant px-8 py-3 font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}
