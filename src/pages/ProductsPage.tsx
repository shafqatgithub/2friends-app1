import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { Icon } from '../components/Icon'
import { products } from '../data/products'

const filters = ['All Items', 'Accessories', 'Tech', 'Footwear', 'Lifestyle'] as const

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search') || ''

  const [activeFilter, setActiveFilter] = useState('All Items')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]

    if (activeFilter !== 'All Items') {
      list = list.filter(
        (p) => p.category.toLowerCase() === activeFilter.toLowerCase(),
      )
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q),
      )
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [activeFilter, query, sortBy])

  const clearSearch = () => {
    setSearchParams({})
  }

  const sortLabel =
    sortBy === 'featured'
      ? 'Featured'
      : sortBy === 'price-low'
        ? 'Price: Low'
        : sortBy === 'price-high'
          ? 'Price: High'
          : 'Top Rated'

  return (
    <main className="px-margin-mobile pt-stack-lg pb-28">
      <section className="mb-stack-lg">
        {query && (
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-surface-container-lowest px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs text-on-surface-variant">Search results for</p>
              <p className="font-semibold text-primary">"{query}"</p>
            </div>

            <button
              type="button"
              onClick={clearSearch}
              className="rounded-full bg-surface-container p-2 text-primary"
            >
              <Icon name="close" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setShowFilters((prev) => !prev)
              setShowSort(false)
            }}
            className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-3 text-on-surface shadow-sm active:scale-95"
          >
            <Icon name="tune" className="text-[20px]" />
            <span className="text-sm font-semibold">Filters</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowSort((prev) => !prev)
              setShowFilters(false)
            }}
            className="flex items-center gap-1 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm font-semibold text-on-surface shadow-sm active:scale-95"
          >
            <span>Sort: {sortLabel}</span>
            <Icon name="expand_more" className="text-[18px]" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 rounded-2xl bg-surface-container-lowest p-3 shadow-sm">
            <p className="mb-2 text-sm font-semibold text-on-surface-variant">
              Choose Category
            </p>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter)
                    setShowFilters(false)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeFilter === filter
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-variant/60 text-on-surface-variant'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}

        {showSort && (
          <div className="mt-3 rounded-2xl bg-surface-container-lowest p-3 shadow-sm">
            {[
              { value: 'featured', label: 'Featured' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'rating', label: 'Top Rated' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSortBy(option.value as SortOption)
                  setShowSort(false)
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-medium ${
                  sortBy === option.value
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface'
                }`}
              >
                <span>{option.label}</span>
                {sortBy === option.value && <Icon name="check" />}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-2 gap-gutter md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} variant="full" />
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="rounded-3xl bg-surface-container-lowest px-5 py-10 text-center shadow-sm">
          <Icon name="search_off" className="text-5xl text-outline" />
          <p className="mt-3 text-lg font-semibold text-on-surface">
            No products found
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            Try another search, category, or sorting option.
          </p>
        </div>
      )}
    </main>
  )
}