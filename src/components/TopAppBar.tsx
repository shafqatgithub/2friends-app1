import { Link } from 'react-router-dom'
import { Icon } from './Icon'

type TopAppBarProps = {
  title?: string
  showLogo?: boolean
  showBack?: boolean
  onBack?: () => void
}

export function TopAppBar({ title = '2friends', showLogo, showBack, onBack }: TopAppBarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface shadow-sm pt-[env(safe-area-inset-top)]">
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
              className="rounded-full p-2 text-primary transition-colors hover:bg-surface-variant/50 active:scale-95"
              aria-label="Menu"
            >
              <Icon name="menu" />
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
          className="rounded-full p-2 text-primary transition-colors hover:bg-surface-variant/50 active:scale-95"
          aria-label="Search"
        >
          <Icon name="search" />
        </button>
      </div>
    </header>
  )
}
