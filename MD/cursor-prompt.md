# Cursor prompt, Cloverpriced base app

Paste this into Cursor with `design.md` in the repo root and open as context. Work through the phases in order and stop after each one.

---

## Context

Build **Cloverpriced**, a mobile-first grocery savings prototype for Brisbane. All pricing and store data is hardcoded. No backend, no APIs, no auth.

`design.md` in the repo root is the source of truth for colour, type, layout, copy rules, and the pricing maths. Read it before writing any code. Where this prompt and `design.md` disagree, `design.md` wins.

Three hard constraints that apply to every phase.
- No emoji anywhere, in the UI or in code comments. Icons come from `lucide-react` only.
- No gradients. Not in CSS, not in the 3D scene, not as a fallback.
- No nested cards. Sections separate with whitespace and 1px hairline rules. A bordered or filled container is only allowed when the element is tappable or holds a direct comparison.

---

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS, with the palette wired into `tailwind.config.js` as named tokens, not arbitrary hex values in JSX
- `react-router-dom` for routing
- `lucide-react` for icons
- `@react-three/fiber` and `@react-three/drei` for the basket
- `zustand` for state, persisted to `localStorage`
- No component library, no shadcn, no Framer Motion unless a phase asks for it

---

## Phase 1, scaffold and design tokens

Set up the Vite project and lock the visual system before any screens exist.

1. Init Vite React TS, install the stack above.
2. In `tailwind.config.js`, extend colours with `ink`, `paper`, `forest` (#084E46), `lime` (#91EF5B), `rule` (#E5E5E5), `mute` (#6B6B6B), `sunk` (#FAFAFA). Extend `fontFamily` with `sans` (Assistant) and `display` (Sirage).
3. Load Assistant from Google Fonts at weights 400, 600, 700. Create `public/fonts/` with a `README.md` noting that `Sirage.woff2` must be dropped in manually, and write the `@font-face` rule pointing at it with a `sans-serif` fallback so the app still runs without it.
4. Add a global `.tnum` utility applying `font-variant-numeric: tabular-nums`.
5. Build `src/components/PhoneFrame.tsx`. Above 480px viewport, centre a 390×844 frame with a 1px `rule` border on a white page. At or below 480px, full bleed.
6. Build the primitives in `src/components/ui/`: `Button` (primary = forest fill, paper text; secondary = 1px ink border, transparent), `SegmentedControl`, `StatRow` (label left, tabular value right, hairline underneath), `SectionLabel`, `HeroFigure` (Sirage, 64px, colour prop defaulting to forest).
7. Build `TabBar` with four tabs using `basket`, `list`, `piggy-bank`, `settings`. Active tab is forest, inactive is mute.

Acceptance: a blank routed shell with a working tab bar and a visible type scale demo page at `/kitchen-sink`.

---

## Phase 2, data layer

Create `src/data/` with typed hardcoded data. Transcribe the tables in `design.md` exactly, do not invent or round prices.

- `stores.ts` — the eight stores with `id`, `name`, `chain`, `suburb`, `distanceKm`, `driveMinutes`, `busMinutes`. Chain is one of `coles | woolworths | aldi | iga | independent`.
- `products.ts` — the 28 seed items with `id`, `name`, `unit`, `category`, and a `prices` record keyed by chain, using `null` for not stocked. Two Woolworths stores read the same chain price.
- `dishes.ts` — the ten seeded dishes, each mapping to product ids with quantities.
- `equivalents.ts` — the five basket equivalence items with their prices.

Then `src/lib/pricing.ts`, implementing section 8 of `design.md` exactly.

```ts
getBenchmarkPrice(productId): number          // mean of Coles and Woolworths
getTravelCost(store, transport, litresPer100km): number
getRoundTripMinutes(store, transport): number
getStoreQuote(store, list, settings): StoreQuote
rankStores(quotes, mode, timeValuePerHour): StoreQuote[]
```

`StoreQuote` carries `storeBasket`, `travelCost`, `outOfPocket`, `savings`, `trueCost`, `roundTripMinutes`, `missingItems`, and `coverage`. Stores below 0.8 coverage are flagged, not filtered, so the UI can decide how to show them.

Write Vitest unit tests for the ranking function covering all three modes, plus one case where the cheapest store loses in Both mode because of drive time.

Acceptance: tests pass, no UI yet.

---

## Phase 3, state

`src/store/useApp.ts` with zustand + persist.

```ts
{
  onboarded: boolean
  suburb: string
  transport: 'car' | 'bus' | 'walk'
  litresPer100km: number        // default 8
  timeValuePerHour: number      // default 22
  weeklyBudget: number
  goal: { name: string; target: number } | null
  list: { productId: string; qty: number; fromDish?: string }[]
  optimiseMode: 'price' | 'time' | 'both'
  trips: Trip[]                 // { id, date, storeId, itemCount, spend, benchmark, savings }
}
```

Derived selectors for all-time savings, current-month savings, current-month spend, last trip savings, and goal progress. Month boundaries are calendar months in local time.

Add a dev-only "seed demo data" action that writes four backdated trips so the home screen isn't empty during a pitch, plus a "reset" action.

---

## Phase 4, onboarding and shell

Routes `/welcome`, `/setup`, `/home`, `/list`, `/savings`, `/settings`, `/optimise`, `/results`, `/store/:id`, `/confirm`.

Welcome is the wordmark in Sirage, one line of copy, one primary button. No illustration, no hero image.

Setup is three steps with a three-segment hairline progress indicator filling in lime. Suburb dropdown seeded to St Lucia. Transport picker using `car`, `bus`, `footprints`, with the litres-per-100km field only appearing for car. Budget and goal on the last step.

Route guard sends un-onboarded users to `/welcome`.

---

## Phase 5, list building

`/list` with a segmented control for Ingredient, Dish, Product.

- **Ingredient** filters `products.ts` by name and adds a single line.
- **Dish** adds every ingredient from the dish as a group, rendered under a collapsible header showing the dish name and item count. Individual lines inside the group stay removable, and removing the header removes the group.
- **Product** behaves like Ingredient but scoped to items with a `packaged` category.

Rows show name, unit, a quantity stepper, and the benchmark price in mute. A pinned footer shows the running benchmark total and a "Find the best store" button, disabled below one item.

Empty state reads "Nothing on your list yet. Add an ingredient, a dish, or a product." with no illustration.

---

## Phase 6, optimise and results

`/optimise` has the three-way segmented control and a single line of plain-language explanation that swaps on selection.
- Price: "Cheapest total, including fuel or fare."
- Time: "Closest store, whatever it costs."
- Both: "Balances the money you save against the time it takes."

Both mode reveals a time value slider from $10 to $60 in $1 steps, defaulting to $22, labelled "What an hour of your time is worth".

`/results` renders the ranked list.
- Top pick fills roughly the top 45%. Store name 24px, out-of-pocket total 32px, savings figure in forest with the label "saved vs Coles/Woolworths average". A single meta line combining distance, round trip time, and travel cost, each with its lucide icon. A lime "Best value" pill with ink text, relabelled to "Fastest" in Time mode.
- Runners-up render as two plain hairline-separated rows at 15px, showing store, total, and the delta against the top pick as "+$3.20" or "+8 min" depending on mode.
- Missing items surface as a meta line, never hidden.
- Stores below 80% coverage collapse into a single tappable "3 stores don't stock enough of your list" row.

Tapping any store opens `/store/:id`, an item-by-item table with columns for item, this store, benchmark, and difference. Cheaper differences are forest, everything else is plain ink. No red.

---

## Phase 7, the basket

`src/components/SavingsBasket.tsx` using react-three-fiber. Follow section 7 of `design.md`.

- Build the basket from primitives, no imported models. Truncated cone body in forest, torus rim, handle arc. `MeshLambertMaterial` with flat shading, one directional light plus low ambient. Transparent canvas background, no ground plane, no shadows, no environment map.
- Contents come from the equivalence rule: try rice, eggs, bananas, bread, milk in that order and use the first that lands between 3 and 12 items, preferring milk when several fit. Cap rendered meshes at 12, show the remainder as text.
- Item meshes are simple primitives in flat palette colours, positioned with a small deterministic jitter seeded off the item index so the arrangement is stable across renders.
- `OrbitControls` with polar angle locked, zoom and pan disabled, so only Y rotation is possible. Slow ambient rotation until first pointer down, then it stops permanently for that session.
- Under $2.50 total, render the empty basket and the empty-state line.
- Disable ambient rotation under `prefers-reduced-motion`.
- Wrap the canvas in a Suspense boundary with a plain 320px placeholder, and make sure a WebGL failure degrades to a static text summary rather than a blank screen.

Home screen assembles the basket, the Sirage hero figure for all-time savings, the equivalence line, three stat rows, the goal bar, and the primary button.

---

## Phase 8, trip confirmation and savings

`/confirm` shows the chosen store, one hero figure for savings on this trip, and a "Mark as shopped" button. Confirming writes a `Trip`, clears the list, routes to `/home`, and triggers the basket fill animation, items dropping in on an 80ms stagger with a spring settle.

`/savings` shows all-time saved, this month saved, this month spent against budget as an unfilled-to-filled lime bar, goal progress, and a reverse-chronological trip history with date, store, spend, and savings. No charts.

`/settings` exposes transport, litres per 100km, time value, budget, goal, and the dev reset.

---

## Definition of done

- Runs clean on `npm run dev`, no console errors or warnings
- Works at 390px and scales up without breaking
- Every price, distance, and time uses tabular numerals
- Keyboard focus is visible on every interactive element
- `prefers-reduced-motion` disables all three motion moments
- Zero emoji, zero gradients, zero nested cards
- No colour used to signal error, and no red anywhere in the palette
