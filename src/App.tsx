import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { StartTripCta } from './components/StartTripCta'
import { TabBar } from './components/TabBar'
import { CreateTrip } from './pages/CreateTrip'
import { Home } from './pages/Home'
import { KitchenSink } from './pages/KitchenSink'
import { MyList } from './pages/MyList'
import { Profile } from './pages/Profile'
import { Results } from './pages/Results'
import { Savings } from './pages/Savings'
import { Trip } from './pages/Trip'
import { Wallet } from './pages/Wallet'

const tabBarHiddenPaths = new Set([
  '/profile',
  '/trip/create',
  '/create-trip',
  '/results',
  '/kitchen-sink',
])

export default function App() {
  const location = useLocation()
  const showTabBar = !tabBarHiddenPaths.has(location.pathname)
  const showStartTripCta =
    location.pathname === '/home' || location.pathname === '/trip'

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
          <Route element={<Trip />} path="/trip" />
          <Route element={<MyList />} path="/list" />
          <Route element={<Wallet />} path="/wallet" />
          <Route element={<Savings />} path="/savings" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<CreateTrip />} path="/trip/create" />
          <Route element={<CreateTrip />} path="/create-trip" />
          <Route element={<Results />} path="/results" />
          <Route element={<KitchenSink />} path="/kitchen-sink" />
          <Route element={<Navigate replace to="/home" />} path="*" />
        </Routes>
      </main>
      {showStartTripCta && <StartTripCta />}
      {showTabBar && <TabBar />}
    </PhoneFrame>
  )
}
