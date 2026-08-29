import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { StartShopCta } from './components/StartShopCta'
import { TabBar } from './components/TabBar'
import { CreateShop } from './pages/CreateShop'
import { Home } from './pages/Home'
import { KitchenSink } from './pages/KitchenSink'
import { MyList } from './pages/MyList'
import { Profile } from './pages/Profile'
import { Results } from './pages/Results'
import { Savings } from './pages/Savings'
import { Shop } from './pages/Shop'
import { Wallet } from './pages/Wallet'

const tabBarHiddenPaths = new Set([
  '/profile',
  '/shop/create',
  '/create-shop',
  '/results',
  '/kitchen-sink',
])

export default function App() {
  const location = useLocation()
  const showTabBar = !tabBarHiddenPaths.has(location.pathname)
  const showStartShopCta =
    location.pathname === '/home' || location.pathname === '/shop'

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
          <Route element={<Navigate replace to="/shop" />} path="/trip" />
          <Route element={<MyList />} path="/list" />
          <Route element={<Wallet />} path="/wallet" />
          <Route element={<Savings />} path="/savings" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<CreateShop />} path="/shop/create" />
          <Route
            element={<Navigate replace to="/shop/create" />}
            path="/trip/create"
          />
          <Route element={<CreateShop />} path="/create-shop" />
          <Route
            element={<Navigate replace to="/shop/create" />}
            path="/create-trip"
          />
          <Route element={<Results />} path="/results" />
          <Route element={<KitchenSink />} path="/kitchen-sink" />
          <Route element={<Navigate replace to="/home" />} path="*" />
        </Routes>
      </main>
      {showStartShopCta && <StartShopCta />}
      {showTabBar && <TabBar />}
    </PhoneFrame>
  )
}
