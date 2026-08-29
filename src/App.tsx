import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { StartTripCta } from './components/StartTripCta'
import { TabBar } from './components/TabBar'
import { Cart } from './pages/Cart'
import { Compare } from './pages/Compare'
import { Home } from './pages/Home'
import { KitchenSink } from './pages/KitchenSink'
import { Profile } from './pages/Profile'
import { Savings } from './pages/Savings'
import { Shop } from './pages/Shop'
import { Wallet } from './pages/Wallet'

const tabBarHiddenPaths = new Set([
  '/profile',
  '/shop/compare',
  '/cart',
  '/kitchen-sink',
])

export default function App() {
  const location = useLocation()
  const showTabBar = !tabBarHiddenPaths.has(location.pathname)
  const showStartTripCta = location.pathname === '/home'

  return (
    <PhoneFrame>
      <main
        className={[
          'scrollbar-hide min-h-0 flex-1 overflow-y-auto',
          showTabBar ? 'pb-16' : '',
        ].join(' ')}
      >
        <Routes>
          <Route element={<Navigate replace to="/home" />} path="/" />
          <Route element={<Home />} path="/home" />
          <Route element={<Shop />} path="/shop" />
          <Route element={<Compare />} path="/shop/compare" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<Wallet />} path="/wallet" />
          <Route element={<Savings />} path="/savings" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<KitchenSink />} path="/kitchen-sink" />
          <Route element={<Navigate replace to="/home" />} path="*" />
        </Routes>
      </main>
      {showStartTripCta && <StartTripCta />}
      {showTabBar && <TabBar />}
    </PhoneFrame>
  )
}
