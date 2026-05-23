import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { Icon } from '../components/Icon'
import { categories, featuredProducts, HERO_IMAGE } from '../data/products'

export function HomePage() {
  return (
    <main className="mx-auto max-w-screen-xl">
      <section className="mt-gutter px-margin-mobile">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-primary-container text-white">
          <img
            src={HERO_IMAGE}
            alt="New arrivals collection"
            className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-primary/80 to-transparent p-gutter">
            <span className="text-sm font-semibold tracking-widest text-secondary-fixed uppercase">
              Special Offer
            </span>
            <h2 className="mt-2 text-[26px] leading-8 font-bold">New Arrivals</h2>
            <p className="mt-stack-md max-w-xs text-base text-on-primary-container opacity-90">
              Discover our latest collection of essentials designed for your vibrant lifestyle.
            </p>
            <Link
              to="/shop"
              className="mt-stack-lg w-fit rounded-full bg-secondary px-8 py-3 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-95"
            >
              Shop Now
            </Link>
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
        <div className="no-scrollbar flex gap-gutter overflow-x-auto px-margin-mobile">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              className="flex flex-shrink-0 flex-col items-center gap-stack-sm transition-transform active:scale-95"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high text-primary shadow-sm">
                <Icon name={cat.icon} className="text-3xl" />
              </div>
              <span className="text-xs font-medium text-on-surface-variant">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-stack-lg px-margin-mobile">
        <h3 className="mb-stack-md text-2xl font-semibold text-on-surface">Featured Products</h3>
        <div className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-gutter mt-stack-lg px-margin-mobile">
        <div className="flex flex-col items-center justify-between gap-gutter rounded-2xl bg-surface-variant/30 p-margin-mobile md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-primary">Join the Community</h3>
            <p className="mt-2 text-base text-on-surface-variant">
              Get early access to drops and exclusive offers.
            </p>
          </div>
          <form
            className="flex w-full gap-2 md:w-auto"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              type="email"
              placeholder="Email address"
              className="flex-grow rounded-full border-none bg-white px-6 py-3 shadow-sm focus:ring-2 focus:ring-primary md:w-64"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 font-bold text-white transition-all active:scale-95"
            >
              Join
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
