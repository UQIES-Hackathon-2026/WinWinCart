import { useNavigate } from 'react-router-dom'
import { Button } from './ui'

export function StartTripCta() {
  const navigate = useNavigate()

  return (
    <div className="absolute inset-x-0 bottom-16 z-10 border-t border-rule bg-paper px-5 py-4">
      <Button className="w-full" onClick={() => navigate('/shop')}>
        Start a shop
      </Button>
    </div>
  )
}
