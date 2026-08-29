import { useNavigate } from 'react-router-dom'
import { Button } from './ui'

export function StartTripCta() {
  const navigate = useNavigate()

  return (
    <div className="glass-panel absolute inset-x-0 bottom-16 z-10 rounded-t-2xl border-x-0 border-b-0 px-5 py-4">
      <Button className="w-full" onClick={() => navigate('/trip/create')}>
        Start trip
      </Button>
    </div>
  )
}
