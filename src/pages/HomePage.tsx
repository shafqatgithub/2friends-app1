import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { Icon } from '../components/Icon'
import { categories, featuredProducts, products } from '../data/products'

export function HomePage() {
  const heroProducts = useMemo(() => products.slice(0, 5), [])
  const [activeHero, setActiveHero] = useState(0)
  const [communityEmail, setCommunityEmail] = useState('')
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroProducts.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [heroProducts.length])

  const heroProduct = heroProducts[activeHero]

  return (
    <main className="mx-auto max-w-screen-xl pb-6">
      <section className="mt-gutter px-margin-mobile">
        <div className="relative min-h-[230px] overflow-hidden rounded-3xl bg-primary-container text-white shadow-lg">
          {heroProducts.map((product, index) => (
            <img
              key={product.id}
              src={product.image}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                index === activeHero
                  ? 'scale-100 opacity-80'
                  : 'scale-105 opacity-0'
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/10" />

          <div className="relative z-10 flex min-h-[230px] flex-col justify-center px-5 py-6">
            <span className="text-xs font-semibold tracking-widest text-secondary-fixed uppercase">
              New Arrival
            </span>

            <h2 className="mt-2 max-w-[240px] text-[27px] leading-8 font-bold">
              {heroProduct?.name || 'New Arrivals'}
            </h2>

            <p className="mt-3 max-w-[250px] text-sm leading-5 text-white/90">
              Discover premium 2Friends products made for your daily lifestyle.
            </p>

            <Link
              to="/shop"
              className="mt-5 w-fit rounded-full bg-secondary px-7 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95"
            >
              Shop Now
            </Link>

            <div className="mt-5 flex gap-2">
              {heroProducts.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveHero(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeHero ? 'w-7 bg-white' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Show ${product.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-stack-lg">
        <div className="mb-stack-md flex items-center justify-between px-margin-mobile">
          <h3 className="text-2xl font-semibold text-on-surface">Categories</h3>
          <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="no-scrollbar flex gap-gutter overflow-x-auto px-margin-mobile pb-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              className="flex flex-shrink-0 flex-col items-center gap-stack-sm transition-transform active:scale-95"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high text-primary shadow-sm">
                <Icon name={cat.icon} className="text-3xl" />
              </div>
              <span className="text-xs font-medium text-on-surface-variant">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-stack-lg px-margin-mobile">
        <h3 className="mb-stack-md text-2xl font-semibold text-on-surface">
          Featured Products
        </h3>

        <div className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-24 mt-stack-lg px-margin-mobile">
        <div className="rounded-3xl bg-primary p-5 text-white shadow-lg">
          <div className="mb-4 text-center">
            <h3 className="text-2xl font-bold">Join the Community</h3>
            <p className="mx-auto mt-2 max-w-[280px] text-sm leading-5 text-white/80">
              Get early access to new drops, special deals, and exclusive 2Friends offers.
            </p>
          </div>

          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              if (communityEmail.trim()) {
                setJoined(true)
                setCommunityEmail('')
              }
            }}
          >
            <input
              type="email"
              required
              value={communityEmail}
              onChange={(e) => {
                setCommunityEmail(e.target.value)
                setJoined(false)
              }}
              placeholder="Enter your email"
              className="min-h-[48px] flex-1 rounded-full border-0 bg-white px-5 text-primary outline-none focus:ring-2 focus:ring-secondary"
            />

            <button
              type="submit"
              className="min-h-[48px] rounded-full bg-secondary px-7 font-bold text-white transition-all active:scale-95"
            >
              Join
            </button>
          </form>

          {joined && (
            <p className="mt-3 text-center text-sm font-medium text-secondary-fixed">
              Thank you! You joined the 2Friends community.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}