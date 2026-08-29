import { MapPin, Store, Tag } from 'lucide-react'
import { SectionLabel } from '../components/ui'
import { demoPromos } from '../data/demo'
import { stores } from '../data/stores'

const exploreStores = stores.slice(0, 4)

export function Trip() {
  return (
    <div className="px-5 pb-24 pt-8">
      <h1 className="text-2xl font-bold tracking-tight">Trip</h1>
      <p className="mt-3 text-base leading-6 text-mute">
        Plan your next shop and see what is nearby.
      </p>

      <section className="mt-8">
        <SectionLabel>Your location</SectionLabel>
        <div className="glass-panel mt-3 flex h-36 items-center justify-center overflow-hidden rounded-2xl">
          <div className="text-center">
            <MapPin
              aria-hidden="true"
              className="mx-auto text-forest"
              size={32}
              strokeWidth={1.75}
            />
            <p className="mt-2 text-[15px] font-semibold">St Lucia 4067</p>
            <p className="mt-1 text-[13px] text-mute">Brisbane</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <SectionLabel>Promos nearby</SectionLabel>
        <ul className="mt-3">
          {demoPromos.map((promo) => (
            <li
              key={promo.id}
              className="group border-b border-rule py-4 transition-colors hover:bg-sunk last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <Tag
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-mute transition-colors group-hover:text-forest"
                  size={20}
                  strokeWidth={1.75}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold">{promo.title}</p>
                  <p className="mt-1 text-[13px] text-mute">
                    {promo.storeName}
                  </p>
                  <p className="mt-1 text-[13px]">{promo.detail}</p>
                  <p className="tnum mt-1 text-[13px] text-mute">
                    {promo.distanceKm.toFixed(1)} km away
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <SectionLabel>Explore grocery options</SectionLabel>
        <ul className="mt-3">
          {exploreStores.map((store) => (
            <li
              key={store.id}
              className="flex min-h-11 items-center justify-between gap-4 border-b border-rule py-3 last:border-b-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Store
                  aria-hidden="true"
                  className="shrink-0 text-mute"
                  size={20}
                  strokeWidth={1.75}
                />
                <div>
                  <p className="text-[15px] font-semibold">{store.name}</p>
                  <p className="text-[13px] text-mute">{store.suburb}</p>
                </div>
              </div>
              <p className="tnum shrink-0 text-[13px] text-mute">
                {store.distanceKm.toFixed(1)} km
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
