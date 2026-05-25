import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useCart } from '../context/CartContext'
import { formatPrice, formatReviews, products } from '../data/products'

export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const product = useMemo(() => {
    return products.find((p) => p.id === id)
  }, [id])

  if (!product) {
    return (
      <div className="flex min-h-[70dvh] items-center justify-center px-6 text-center">
        <div>
          <h2 className="mb-2 text-2xl font-bold">
            Product not found
          </h2>

          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="rounded-xl bg-primary px-5 py-3 text-white"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="w-full px-margin-mobile py-stack-lg">
      <div className="overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm">
        <div className="aspect-square overflow-hidden bg-surface-container">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-on-surface">
              {product.name}
            </h1>

            <button
              type="button"
              className="rounded-full bg-surface-container p-3"
            >
              <Icon name="favorite" />
            </button>
          </div>

          {product.subtitle && (
            <p className="mb-4 text-on-surface-variant">
              {product.subtitle}
            </p>
          )}

          <div className="mb-5 flex items-center gap-2">
            <Icon
              name="star"
              filled
              className="text-secondary"
            />

            <span className="font-semibold">
              {product.rating}
            </span>

            <span className="text-sm text-on-surface-variant">
              ({formatReviews(product.reviews)} reviews)
            </span>
          </div>

          <div className="mb-6">
            {product.originalPrice && (
              <span className="mr-2 text-lg text-error line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}

            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="mb-6 rounded-2xl bg-surface-container p-4">
            <h3 className="mb-2 text-lg font-semibold">
              Product Details
            </h3>

            <p className="text-on-surface-variant">
              Premium 2Friends product designed for daily use,
              comfort, and style. High quality materials with
              modern aesthetic and durable performance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary py-4 text-lg font-semibold text-white active:scale-95"
          >
            <Icon name="shopping_cart" />
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}