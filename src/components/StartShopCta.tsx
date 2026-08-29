import { useNavigate } from 'react-router-dom'
import { Button } from './ui'

export function StartShopCta() {
  const navigate = useNavigate()

  return (
    <div className="absolute inset-x-0 bottom-16 z-10 px-5 py-4">
      <Button className="w-full" onClick={() => navigate('/shop/create')}>
        Start shop
      </Button>
    </div>
  )
}
