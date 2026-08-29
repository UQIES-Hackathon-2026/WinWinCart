# Cloverpriced

Grocery savings app. Mobile prototype, Brisbane, hardcoded data.

**One liner:** Every basket you buy anyway, priced against the big two, routed into something you actually want.

**Name:** Cloverpriced, a play on "overpriced". Clover reads as luck, as green, as the four-leaf mark. Alternative considered and dropped: WinWin Cart.

---

## 1. Design principles

**Black is the design, green is the payoff.** The interface is black on white. The accent greens only appear where money is being saved or a goal is moving. If green shows up somewhere that isn't about savings, it's wrong.

**One number per screen.** Each screen has exactly one figure at display size. Everything else is support text. This kills the dashboard-collage look.

**No card soup.** Sections are separated by whitespace and hairline rules, not stacked boxes. A container only gets a border or fill when it is tappable or when it holds a comparison that must be visually grouped.

**The basket is the only spectacle.** One signature element, executed properly. Everything around it stays quiet.

---

## 2. Colour

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#000000` | Body text, headings, icons, the whole default UI |
| `--paper` | `#FFFFFF` | App background, all surfaces |
| `--forest` | `#084E46` | Primary accent. Savings figures, active tab, primary button fill, basket material |
| `--lime` | `#91EF5B` | Secondary accent. Goal progress fill, "best value" pill, basket highlight edge, selected state |
| `--rule` | `#E5E5E5` | Hairlines, dividers, table separators |
| `--mute` | `#6B6B6B` | Secondary and metadata text |
| `--sunk` | `#FAFAFA` | The only fill allowed on a non-interactive surface, used sparingly |

Rules.
- No gradients anywhere. The 3D basket uses flat-shaded materials with a single directional light, not a gradient sky.
- Lime on white fails contrast for text. Lime is a fill and a stroke colour only, never a text colour on white. Text on lime is `--ink`.
- Forest is the text-safe accent. Savings figures are forest, not lime.
- No red or amber. When a store is more expensive it is stated in plain black text, not coloured as an error. Overspending against budget is shown by an unfilled bar, not a red one.

---

## 3. Type

**Display / logo:** Sirage. Used for the wordmark, the home screen savings figure, and nothing else. It is a display face and falls apart at small sizes.

**Body / UI:** Assistant (Google Fonts), weights 400, 600, 700.

Load Sirage self-hosted from `/public/fonts/`, since it isn't on Google Fonts.

> Licensing flag: the Sirage download on ifonts.xyz is a personal-use listing, and that site's licensing is not reliable. Fine for a demo or a pitch. Before this goes near anything commercial, buy the licence from the foundry or swap the wordmark to a licensed display face.

| Role | Family | Size / weight | Notes |
|---|---|---|---|
| Wordmark | Sirage | 28px | Header only |
| Hero figure | Sirage | 64px | The one big number per screen |
| Screen title | Assistant | 24px / 700 | Sentence case |
| Section label | Assistant | 11px / 700 | Uppercase, 0.08em tracking, `--mute` |
| Body | Assistant | 16px / 400 | Line height 1.5 |
| Data row | Assistant | 15px / 600 | `font-variant-numeric: tabular-nums` |
| Meta | Assistant | 13px / 400 | `--mute` |

Every price, distance, and time in the app uses tabular numerals so columns align.

---

## 4. Icons

lucide-react. Open source, MIT, consistent 24px grid. No emoji anywhere in the UI or the copy.

Stroke width 1.75. Size 20px inline, 24px in the tab bar. Icons inherit `currentColor`.

Fixed mapping so icons stay consistent across screens.

- Home `basket` / List `list` / Savings `piggy-bank` / Settings `settings`
- Car `car` / Bus `bus` / Walk `footprints`
- Store `store` / Distance `map-pin` / Time `clock` / Price tag `tag`
- Dish expansion `utensils` / Add `plus` / Remove `x`
- Goal `target` / Trip logged `check`

---

## 5. Layout

Frame: 390 × 844. On desktop, centre the frame with a 1px `--rule` border and a white page background. On mobile, full bleed.

- Horizontal gutter: 20px
- Vertical rhythm: 8px base, sections separated by 32px
- Tab bar: 64px tall, fixed bottom, hairline top rule
- Radius: 12px on buttons and tappable rows, 0 on rules and dividers. Nothing more rounded than 12px except the basket sphere geometry.
- Touch targets minimum 44px

---

## 6. Screens

### Welcome
Wordmark in Sirage, one line of positioning copy, one primary button. No illustration.

### Onboarding, three steps
1. Suburb (dropdown, seeded to St Lucia)
2. How you get there (car / bus / walk, and if car, litres per 100km with 8 as default)
3. Weekly grocery budget and one savings goal (name + target amount)

Progress shown as three hairline segments filling in lime.

### Home
Top to bottom.
- Wordmark, settings icon
- The 3D basket, 320px tall, rotatable, containing the equivalence items
- Hero figure in Sirage: total saved all time, in forest
- One line underneath: "That's 5 jugs of milk"
- Three stat rows separated by hairlines: this month saved, this month spent, last trip saved
- Goal progress: name, lime bar, "$47 of $180"
- Primary button, "Start a shop"

### Build list
Single input with three modes on a segmented control: Ingredient, Dish, Product.
- Ingredient adds one line item
- Dish expands into its component ingredients as a labelled group that can be collapsed, with individual lines removable
- Product adds a specific branded or packaged item

List rows show name, quantity stepper, and benchmark price in `--mute`. Running benchmark total pinned above the button.

### Optimise
Three-option segmented control: Price, Time, Both. One line of plain text explaining what each does, swapped on selection. When Both is selected, expose the time value slider ($/hour) with $22 default.

### Results
- Top pick occupies roughly the top 45% of the screen. Store name at 24px, total at 32px, savings in forest, then distance / commute time / travel cost as a single meta line.
- A "best value" pill in lime with ink text.
- Two runners-up below at 15px, in a plain two-row list with hairline separators, each showing store, total, and the delta against the top pick.
- If the top pick doesn't stock everything: "Missing 2 items, priced at benchmark" in meta text, not hidden.

### Store detail
Item-by-item table. Columns: item, this store, benchmark, difference. Differences in forest when cheaper, plain ink when not.

### Trip confirm
"Mark as shopped" writes the trip to history and animates the basket gaining items. One number: amount saved this trip.

### Savings
Trip history list, monthly spend, all-time saved, goal progress. Same layout language as home, no charts. If a chart is added later, a single bar row, no axes.

---

## 7. The basket

The signature element and the only place with any visual ambition.

**Geometry.** Low-poly basket built from primitives, no imported model. A truncated cone body in forest, a torus rim, a handle arc. Flat shading, one directional light plus a low ambient. No environment map, no shadows on the ground plane, no gradient background.

**Contents.** Items sit inside as simple primitives with flat colours drawn from the palette plus neutral greys.
- Milk: rounded box, white with a forest cap
- Bread: capsule-ish box, warm grey
- Eggs: half-carton box, white
- Bananas: bent extrusion or a simple cluster of tapered cylinders, kept in lime
- Rice: box, white with a forest band

**Interaction.** Drag to rotate on the Y axis only. No zoom, no pan, no tumbling. Slow ambient rotation until first touch, then it stops and stays where the user leaves it. Respect `prefers-reduced-motion` by disabling the ambient spin.

**Equivalence rule.** Pick the unit that makes the count land between 3 and 12. Try in order: rice, eggs, bananas, bread, milk, and use the first that fits. Prefer milk when several fit. Cap rendered objects at 12 and show the remainder as text ("×18 loaves"), never as a wall of geometry.

| Item | Price |
|---|---|
| 3L milk | $5.00 |
| Loaf of bread | $2.50 |
| Dozen eggs | $6.00 |
| 1kg bananas | $3.90 |
| 5kg jasmine rice | $16.00 |

**Empty state.** Under $2.50, the basket is empty and the line reads "Nothing in here yet. Your first shop fills it." An empty basket is a fine empty state, so don't fake items.

---

## 8. Pricing model

All prices hardcoded. This is the part that has to be honest, because inflated savings numbers are the fastest way to lose a room.

**Benchmark.** The mean of the Coles and Woolworths regular shelf price for that item. Not the cheapest of the two, not a special. Stated in the UI as "vs Coles/Woolworths average" so the number is defensible.

**Travel cost.**
- Car: `2 × distanceKm × (litresPer100km / 100) × 1.85`
- Bus: `$1.00` flat round trip, Queensland 50c fare
- Walk: `$0`

**Round trip minutes:** `2 × oneWayMinutes + 12` in-store.

**Time cost (Both mode only):** `(roundTripMinutes / 60) × timeValuePerHour`, default $22.

**Totals.**
```
basketBenchmark = Σ benchmarkPrice × qty
storeBasket     = Σ storePrice × qty
outOfPocket     = storeBasket + travelCost
savings         = basketBenchmark - outOfPocket
trueCost        = outOfPocket + timeCost
```

Savings deliberately excludes time cost. Time is a ranking input, not a dollar you get back.

**Ranking.**
- Price mode: ascending `outOfPocket`
- Time mode: ascending `roundTripMinutes`, tie-break on `outOfPocket`
- Both mode: ascending `trueCost`

**Coverage.** A store must stock at least 80% of the list to be ranked. Missing items are priced at benchmark and surfaced in the UI. Below 80%, the store is excluded and shown in a collapsed "not enough stock" line.

---

## 9. Seed data, Brisbane

Home: St Lucia 4067.

| Store | Distance | Drive | Bus |
|---|---|---|---|
| IGA St Lucia | 0.9 km | 4 min | 8 min |
| Coles Toowong | 2.6 km | 7 min | 14 min |
| Woolworths Toowong | 2.8 km | 8 min | 15 min |
| ALDI Indooroopilly | 3.5 km | 9 min | 19 min |
| Woolworths Indooroopilly | 3.4 km | 9 min | 18 min |
| Coles Indooroopilly | 3.6 km | 9 min | 19 min |
| Yuen's Market, Sunnybank | 13.8 km | 20 min | 47 min |
| ALDI Moorooka | 7.2 km | 13 min | 26 min |

Prices in AUD. `null` means not stocked.

| Item | Unit | Coles | Woolies | ALDI | IGA | Yuen's |
|---|---|---|---|---|---|---|
| Full cream milk | 2L | 3.30 | 3.30 | 3.15 | 3.90 | 4.10 |
| Full cream milk | 3L | 5.00 | 5.00 | 4.85 | 5.80 | 5.95 |
| White sandwich loaf | 700g | 2.50 | 2.50 | 2.19 | 3.20 | 2.90 |
| Free range eggs | 12 | 6.50 | 6.70 | 5.79 | 7.50 | 6.20 |
| Bananas | 1kg | 3.90 | 4.00 | 3.49 | 4.90 | 2.99 |
| Brown onions | 1kg | 3.00 | 3.00 | 2.49 | 3.80 | 1.99 |
| Potatoes | 2kg | 6.00 | 5.90 | 4.99 | 7.20 | 4.50 |
| Tomatoes | 1kg | 6.90 | 7.00 | 5.99 | 8.50 | 4.99 |
| Carrots | 1kg | 2.20 | 2.20 | 1.79 | 3.00 | 1.80 |
| Garlic | 3 bulbs | 3.50 | 3.50 | 2.99 | 4.20 | 1.99 |
| Ginger | 100g | 1.80 | 1.85 | 1.60 | 2.20 | 0.99 |
| Chicken breast | 1kg | 12.50 | 13.00 | 10.99 | 15.00 | 11.50 |
| Beef mince | 500g | 8.00 | 8.50 | 6.99 | 9.50 | 8.90 |
| Pork belly | 1kg | 16.00 | 16.50 | 14.99 | 18.00 | 12.50 |
| Firm tofu | 300g | 3.50 | 3.60 | 2.99 | 4.20 | 2.20 |
| Jasmine rice | 5kg | 16.00 | 16.50 | 13.99 | 18.50 | 11.90 |
| Spaghetti | 500g | 2.00 | 2.00 | 1.19 | 2.60 | 2.40 |
| Rice noodles | 400g | 3.20 | 3.30 | 2.80 | 3.80 | 1.90 |
| Soy sauce | 500ml | 4.50 | 4.60 | 3.49 | 5.20 | 2.80 |
| Olive oil | 1L | 12.00 | 12.50 | 9.99 | 14.00 | 13.50 |
| Chopped tomatoes | 400g can | 1.30 | 1.30 | 0.85 | 1.70 | 1.50 |
| Cheddar block | 500g | 8.50 | 8.50 | 7.29 | 9.80 | 9.50 |
| Butter | 250g | 4.50 | 4.60 | 3.99 | 5.20 | 5.00 |
| Greek yoghurt | 1kg | 7.00 | 7.20 | 5.99 | 8.00 | 7.50 |
| Spring onions | bunch | 2.50 | 2.50 | 2.20 | 3.00 | 1.50 |
| Bok choy | bunch | 3.00 | 3.00 | null | 3.50 | 1.80 |
| Red chilli | 100g | 2.50 | 2.50 | null | 3.00 | 1.20 |
| Coriander | bunch | 3.00 | 3.00 | null | 3.50 | 1.50 |

Woolworths Toowong and Woolworths Indooroopilly share the Woolies column, same for the two Coles and the two ALDIs. Store-level variation comes from distance, not price.

The shape this produces is the interesting one. Yuen's wins on produce and pantry but is 20 minutes each way, so it only takes the top slot in Price mode or on a big list. ALDI usually wins Both mode. IGA only wins Time mode.

**Dishes.** Ten seeded, expanding to ingredient lines.

Spaghetti bolognese, chicken stir fry, nasi goreng, beef noodle soup, fried rice, butter chicken, tacos, pad thai, congee, shakshuka.

---

## 10. Copy rules

Sentence case everywhere except section labels. No exclamation marks except the single savings callout on the home screen. No emoji. No "Oops" or "Uh oh". Buttons name the action and keep the same verb through the flow, so "Start a shop" leads to a screen headed "Your shop".

Savings language stays specific. "You saved $12.40 against Coles/Woolworths average" beats "Great savings!".

---

## 11. Motion

Three moments, nothing else.
- Basket ambient spin until first touch
- Items dropping into the basket after a trip is logged, staggered 80ms, spring settle
- Goal bar filling on the savings screen, 400ms

Use the custom ease-out curve `cubic-bezier(0.23, 1, 0.32, 1)` for every timed UI animation so movement feels controlled and refined. Do not use browser-default easing curves. The basket item settle remains spring-based because it represents physical motion.

No page transitions, no skeleton shimmer, no hover flourishes. Everything respects `prefers-reduced-motion`.

---

## 12. Known gaps

- Savings are measured against a benchmark the app defines. Anyone in a pitch will ask how that's set, so the "vs Coles/Woolworths average" label needs to be visible on every savings figure, not buried in a settings page.
- Time value at $22/hour is a default, not a fact. It's exposed as a slider so it reads as a user assumption instead of a claim.
- Sirage licensing needs resolving before any commercial use.
- The 80% coverage rule means a very short list makes almost every store eligible and the ranking gets noisy. Demo lists should be six items or more.
