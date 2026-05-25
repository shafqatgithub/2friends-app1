import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../context/CartContext'

export function WishlistPage() {
  const { wishlistItems, clearWishlist } = useCart()

  if (wishlistItems.length === 0) {
    return (
      <main className="flex min-h-[65dvh] flex-col items-center justify-center px-margin-mobile text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container">
          <Icon name="favorite" className="text-5xl text-outline" />
        </div>

        <h2 className="text-2xl font-bold text-primary">Your wishlist is empty</h2>

        <p className="mt-2 max-w-sm text-on-surface-variant">
          Tap the heart icon on products you like, and they will appear here.
        </p>

        <Link
          to="/shop"
          className="mt-6 rounded-full bg-secondary px-8 py-3 font-bold text-white active:scale-95"
        >
          Browse Products
        </Link>
      </main>
    )
  }

  return (
    <main className="px-margin-mobile py-stack-lg pb-28">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Wishlist</h1>
          <p className="text-sm text-on-surface-variant">
            {wishlistItems.length} saved product{wishlistItems.length > 1 ? 's' : ''}
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="rounded-full border border-error/30 px-4 py-2 text-sm font-semibold text-error active:scale-95"
        >
          Clear
        </button>
      </div>

      <section className="grid grid-cols-2 gap-gutter md:grid-cols-3 lg:grid-cols-4">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} variant="full" />
        ))}
      </section>
    </main>
  )
}