import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatPrice, formatReviews } from '../data/products'
import { useCart } from '../context/CartContext'
import { Icon } from './Icon'

type ProductCardProps = {
  product: Product
  variant?: 'compact' | 'full'
}

export function ProductCard({ product, variant = 'compact' }: ProductCardProps) {
  const navigate = useNavigate()
  const { addItem, isWishlisted, toggleWishlist } = useCart()
  const liked = isWishlisted(product.id)

  const openProduct = () => {
    navigate(`/product/${product.id}`)
  }

  const stopCardClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  if (variant === 'full') {
    return (
      <article
        onClick={openProduct}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-lg active:scale-[0.99]"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-variant">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          <button
            type="button"
            onClick={(e) => {
              stopCardClick(e)
              toggleWishlist(product)
            }}
            className="absolute top-3 right-3 rounded-full bg-white/85 p-2 shadow-sm backdrop-blur active:scale-75"
            aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icon
              name="favorite"
              filled={liked}
              className={liked ? 'text-error' : 'text-on-surface-variant'}
            />
          </button>

          {product.badge && (
            <span className="absolute bottom-3 left-3 rounded bg-secondary-container px-2 py-1 text-xs font-medium text-on-secondary-container">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-grow flex-col p-4">
          <span className="mb-1 text-xs font-medium tracking-wider text-on-surface-variant uppercase">
            {product.category}
          </span>

          <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-on-surface group-hover:text-primary">
            {product.name}
          </h3>

          <div className="mb-3 flex items-center gap-1">
            <Icon name="star" filled className="text-base text-secondary" />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-on-surface-variant">
              ({formatReviews(product.reviews)})
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div>
              {product.originalPrice && (
                <span className="block text-xs text-error line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}

              <span className="text-xl font-semibold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                stopCardClick(e)
                addItem(product)
              }}
              className="rounded-lg bg-secondary p-2 text-on-secondary active:scale-95"
              aria-label={`Add ${product.name} to cart`}
            >
              <Icon name="shopping_cart" />
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      onClick={openProduct}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md active:scale-[0.99]"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-container">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <button
          type="button"
          onClick={(e) => {
            stopCardClick(e)
            toggleWishlist(product)
          }}
          className="absolute top-2 right-2 rounded-full bg-white/85 p-2 backdrop-blur active:scale-90"
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon
            name="favorite"
            filled={liked}
            className={liked ? 'text-error' : 'text-primary'}
          />
        </button>
      </div>

      <div className="flex flex-grow flex-col p-stack-md">
        <h4 className="line-clamp-1 text-sm font-semibold text-on-surface">
          {product.name}
        </h4>

        {product.subtitle && (
          <p className="mt-1 text-sm text-on-surface-variant">
            {product.subtitle}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-stack-md">
          <span className="text-xl font-semibold text-primary">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={(e) => {
              stopCardClick(e)
              addItem(product)
            }}
            className="flex items-center justify-center rounded-lg bg-secondary p-2 text-white active:scale-90"
            aria-label={`Add ${product.name} to cart`}
          >
            <Icon name="add_shopping_cart" />
          </button>
        </div>
      </div>
    </article>
  )
}