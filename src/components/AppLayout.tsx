import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { TopAppBar } from './TopAppBar'

type AppLayoutProps = {
  hideNav?: boolean
}

export function AppLayout({ hideNav }: AppLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const isProductPage = location.pathname.startsWith('/product/')

  return (
    <div className="relative min-h-[100dvh] w-full bg-background pb-28">
      <TopAppBar
        showLogo={!isProductPage}
        title={isProductPage ? 'Product' : '2friends'}
        showBack={isProductPage}
        onBack={() => navigate(-1)}
      />

      <main className="w-full pb-8">
        <Outlet />
      </main>

      {!hideNav && <BottomNav />}
    </div>
  )
}