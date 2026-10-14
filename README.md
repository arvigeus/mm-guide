# A little Ha Long

A tourist discovery proof of concept built with Astro. Search sits above a map, followed by cards that open individual place pages. The site is a static build with six hardcoded destinations, no database, accounts, or backend service.

## Business decisions and billing

See [the billing brief](docs/billing.md) for verified provider rates, normal and heavy-use estimates, directions options, and costs excluded from the operating subtotal. A [shareable PDF](output/pdf/ha-long-billing-brief.pdf) is available for management review. Prices were checked on October 14, 2026; usage forecasts are assumptions, not measured traffic or guaranteed bills.

Future feature changes must include an updated billing assessment, as described in `AGENTS.md`. To regenerate the PDF after editing the brief, run `uv run --with reportlab python scripts/build-billing-brief.py`, then render and visually inspect the result.

## Try it

Use Node 22.12+ and install dependencies with `npm install`.

```sh
npm run dev -- --background
```

Open **http://localhost:4321**. The live Leaflet map loads OpenStreetMap tiles immediately, with no API key or account setup. Pins and cards open the same detail pages. Search accepts Vietnamese names with or without accents, and combines with category and optional 10 km filters. Results sort by straight-line distance.

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

“Use my location” requests browser permission only when clicked. The position stays in memory for the visit; the app does not store it. The position appears as a blue dot on the live map. HTTPS or localhost is required for browser geolocation; a plain HTTP address on your local network usually cannot use it. If you're outside Ha Long, use “Back to Ha Long demo” to demonstrate nearby discoveries.

## The map

The map uses [Leaflet](https://leafletjs.com/) with the standard [OpenStreetMap tile service](https://operations.osmfoundation.org/policies/tiles/). **No `.env` file, API key, billing account, or Google Maps setup is needed.** Leaflet's code and CSS are bundled with the application; map tiles load over HTTPS from `tile.openstreetmap.org` for the visible area.

- Drag the map or use its zoom controls. Mouse-wheel zoom is disabled so scrolling the page stays comfortable.
- Click a destination pin to open its place page. Pins also work with keyboard navigation; names appear on hover or focus.
- Search, category, and nearby filters update both the cards and the live map's pins.
- The initial blue dot is explicitly a sample starting point in Bãi Cháy. “Use my location” moves it to your browser-provided position and recalculates the distances. “Back to Ha Long demo” restores the sample position and map view.
- If the map cannot initialise, all initial tile requests fail, or the initial tiles time out, an illustrated map keeps the place links usable. “Try the live map again” retries on demand. Partial tile failures display a status message.
- Place-page map links open the destination in OpenStreetMap.

OpenStreetMap attribution stays visible. Tile requests use normal browser caching and referrer headers, with no prefetch or bulk downloading. The public tile service is for this small PoC; before wider deployment, review its usage policy and choose a dedicated tile provider if needed. The tile URL and attribution are in `src/scripts/explore.ts`.

## Refine it together

- Edit names, descriptions, categories, and approximate coordinates in **`src/data/places.ts`**. Detail pages are generated from that same list.
- For a new demo pin, add a schematic position to **`src/components/DemoMap.astro`**. Live Leaflet pins use the dataset's latitude and longitude automatically.
- Edit visual styling in **`src/styles/global.css`**.
- Bay photographs are atmospheric placeholders, not photos of each venue. Museum and market cards use illustrations. Replace these with destination-specific photos during refinement.

Coordinates are approximate sample points, not verified entrances. Distances are straight-line estimates, not travel times. Offshore islands require boats. Prices, operating hours, availability, and booking are intentionally left for a later iteration.

## Validate and build

```sh
npm run check
npm test
npm run build
```

Astro generates the home page and six detail pages in `dist/`, suitable for static hosting. Tests cover accent-insensitive search, combined filters, nearby filtering from different origins, and geographic distance/sorting.

## Credits

Ha Long Bay photograph: **Rafa Prada**, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ha_Long_Bay,_Vietnam_(Unsplash).jpg), published under **CC0**; resized and compressed locally. Illustration and interface assets are part of this project. Destination context: [Vietnam Tourism — Ha Long](https://vietnam.travel/places-to-go/red-river-delta/ha-long). Fonts: DM Sans and Newsreader, loaded from Google Fonts with system fallbacks.

Map data and tiles: © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). Map rendering: [Leaflet](https://leafletjs.com/), BSD-2-Clause.
