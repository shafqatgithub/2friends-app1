import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { TopAppBar } from './TopAppBar'

type AppLayoutProps = {
  hideNav?: boolean
}

export function AppLayout({ hideNav }: AppLayoutProps) {
  return (
    <div className="min-h-screen pb-28">
      <TopAppBar showLogo />
      <Outlet />
      {!hideNav && <BottomNav />}
    </div>
  )
}
