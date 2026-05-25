import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

type TopAppBarProps = {
  title?: string
  showLogo?: boolean
  showBack?: boolean
  onBack?: () => void
}

export function TopAppBar({ title = '2friends', showLogo, showBack, onBack }: TopAppBarProps) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = searchText.trim()

    if (q) {
      navigate(`/shop?search=${encodeURIComponent(q)}`)
      setSearchOpen(false)
      setMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-[9998] w-full bg-surface pt-[env(safe-area-inset-top)] shadow-sm">
      <div className="flex items-center justify-between px-margin-mobile py-base">
        <div className="flex items-center gap-4">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="rounded-full p-2 text-primary transition-colors hover:bg-surface-variant/50 active:scale-95"
              aria-label="Go back"
            >
              <Icon name="arrow_back" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMenuOpen((prev) => !prev)
                setSearchOpen(false)
              }}
              className="rounded-full p-2 text-primary transition-colors hover:bg-surface-variant/50 active:scale-95"
              aria-label="Menu"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          )}

          {showLogo ? (
            <Link to="/" className="text-[26px] font-bold tracking-tight text-primary">
              2friends
            </Link>
          ) : (
            <span className="text-[26px] font-bold tracking-tight text-primary">{title}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setSearchOpen((prev) => !prev)
            setMenuOpen(false)
          }}
          className="rounded-full p-2 text-primary transition-colors hover:bg-surface-variant/50 active:scale-95"
          aria-label="Search"
        >
          <Icon name={searchOpen ? 'close' : 'search'} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 z-[9999] w-full bg-surface-container-lowest px-margin-mobile py-4 shadow-lg">
          <div className="grid gap-3">
            <Link onClick={() => setMenuOpen(false)} to="/" className="rounded-xl bg-surface-container-low px-4 py-3 font-medium text-primary">
              Home
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/shop" className="rounded-xl bg-surface-container-low px-4 py-3 font-medium text-primary">
              Shop
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/checkout" className="rounded-xl bg-surface-container-low px-4 py-3 font-medium text-primary">
              Cart
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/profile" className="rounded-xl bg-surface-container-low px-4 py-3 font-medium text-primary">
              Profile
            </Link>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="absolute top-full left-0 z-[9999] w-full bg-surface-container-lowest px-margin-mobile py-4 shadow-lg">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products..."
              className="min-w-0 flex-1 rounded-xl border border-outline-variant bg-white px-4 py-3 text-base outline-none focus:border-primary"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-4 py-3 font-semibold text-on-primary active:scale-95"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  )
}