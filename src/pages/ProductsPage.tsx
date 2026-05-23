import { useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { Icon } from '../components/Icon'
import { products } from '../data/products'

const filters = ['All Items', 'Apparel', 'Accessories', 'Home', 'Tech', 'Footwear', 'Lifestyle']

export function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All Items')

  const filtered = useMemo(() => {
    if (activeFilter === 'All Items') return products
    return products.filter(
      (p) => p.category.toLowerCase() === activeFilter.toLowerCase(),
    )
  }, [activeFilter])

  return (
    <main className="px-margin-mobile pt-stack-lg">
      <section className="mb-stack-lg">
        <div className="no-scrollbar flex items-center justify-between gap-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2 text-on-surface transition-all hover:bg-surface-container active:scale-95"
            >
              <Icon name="tune" className="text-[20px]" />
              <span className="text-sm font-semibold">Filters</span>
            </button>
            <div className="h-6 w-px bg-outline-variant" />
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeFilter === filter
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-variant/50 text-on-surface-variant'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-on-surface-variant"
          >
            <span>Sort by: Featured</span>
            <Icon name="expand_more" className="text-[18px]" />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-gutter md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} variant="full" />
        ))}
      </section>

      {filtered.length === 0 && (
        <p className="py-stack-lg text-center text-on-surface-variant">
          No products in this category yet.
        </p>
      )}
    </main>
  )
}
