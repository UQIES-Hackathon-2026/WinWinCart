import { Navigate, Route, Routes } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { TabBar } from './components/TabBar'
import { KitchenSink } from './pages/KitchenSink'
import { Placeholder } from './pages/Placeholder'

export default function App() {
  return (
    <PhoneFrame>
      <main className="min-h-0 flex-1 overflow-y-auto pb-16">
        <Routes>
          <Route element={<KitchenSink />} path="/kitchen-sink" />
          <Route element={<Placeholder title="Home" />} path="/home" />
          <Route element={<Placeholder title="Your shop" />} path="/list" />
          <Route element={<Placeholder title="Savings" />} path="/savings" />
          <Route element={<Placeholder title="Settings" />} path="/settings" />
          <Route
            element={<Navigate replace to="/kitchen-sink" />}
            path="*"
          />
        </Routes>
      </main>
      <TabBar />
    </PhoneFrame>
  )
}
