# Ha Noi guide billing and service options

Prepared for management decisions. Content scope updated October 15, 2026. Paid-plan prices below retain their October 14, 2026 verification date; they were not rechecked for this no-new-service content change and are not a new supplier quote. Reverify before any paid commitment or release. All amounts are USD per month unless stated otherwise, before applicable taxes and currency conversion.

**PDF status:** `output/pdf/ha-long-billing-brief.pdf` is the previous Ha Long brief, not this revision. Regeneration and visual inspection are pending because this instance prohibits running code and document generators. The filename is retained for compatibility; use this Markdown as the canonical record until the PDF is regenerated.

## Delivered change: Ha Noi and Vietnamese interface

October 15, 2026: the application source now uses six selected Ha Noi destinations (Ho Hoan Kiem, Old Quarter, Temple of Literature, Imperial Citadel of Thang Long, West Lake, and Long Bien Bridge), a Hoan Kiem sample starting point, Vietnamese interface text, and bundled SVG illustrations instead of the bay photograph. Runtime and visual validation are pending. This is a static-content replacement, not a new maps integration or deployment.

**Recommendation and decision:** retain the existing Leaflet/public OSM setup for small prototype reviews. No new subscription, paid API, or purchase approval is needed for this replacement. A public launch still needs the provider, traffic, and reliability decisions below.

**Incremental recurring vendor subtotal: USD $0/month before any applicable taxes**, assuming unchanged traffic and the same local/static delivery. No database, compute service, storage product, geocoding, routing, payment, or image service was added. The configured local prototype subtotal remains $0/month; domain names, deployment not yet selected, labor, translation/content maintenance, tax, and currency conversion are excluded. Illustrations ship with the static site; actual bandwidth and map requests can vary with visitor behavior and must be measured after deployment.

| Change-only scenario (assumptions, not measured traffic) | Map openings/month | Assumed tiles/opening | Tile requests/month | Added vendor fee/month |
| --- | ---: | ---: | ---: | ---: |
| Low | 1,000 | 15 | 15,000 | $0 |
| Expected | 10,000 | 15 | 150,000 | $0 |
| Heavy | 100,000 | 40 | 4,000,000 | $0, but public tile access may be blocked |

Requests = openings multiplied by tiles per opening. These are demand scenarios, **not an OSM allowance or assurance of service**. The public tile endpoint has no metered invoice, published numeric quota, uptime guarantee, or paid automatic overage. Its current policy was checked October 15, 2026: access, including commercial access, remains conditional on policy compliance and may be withdrawn without notice. Attribution, normal browser caching and referrer headers remain enabled; no offline downloads or prefetch were added. The policy is not presented as a paid commercial SLA. [1]

The simpler alternative is to use only the bundled illustrated map: no tile requests or tile-provider invoice, but no interactive geographic detail. The implemented live-map approach retains the illustrated fallback and on-demand retry. A paid tile provider remains a proposed reliability alternative, not an implemented commitment; the dated comparisons below need refreshing before selection. Monitor map openings and tile failures during a pilot. If a paid provider is adopted, configure its supported spending controls and alerts; an alert is not a hard cap. Content curation and implementation are one-time effort, with future content reviews as maintenance; neither labor amount is quoted.

## Delivered change: Visit Norway-style interface

October 15, 2026: the application source now uses a full-width illustrated hero, a white sticky header with a red Ha Noi wordmark, editorial destination cards, a mobile navigation menu, and matching place-page styling. The six destinations, Vietnamese descriptions, search, categories, browser location, map fallback, and external map links are retained. The visual reference is [Visit Norway](https://www.visitnorway.com/en/); no Visit Norway images, videos, fonts, branding files, scripts, or services are embedded. The new Ha Noi hero is a bundled original SVG, and system fonts replace the previous Google Fonts requests. Browser comparison and runtime validation have not been performed. PDF work and tests remain deferred at the owner's request.

**Decision and recommendation:** no new paid vendor is needed for this visual redesign; keep the existing prototype setup. Added subscriptions, API services, compute, database, image/video hosting services, and transaction fees are **USD $0/month before applicable tax**. This is an incremental vendor subtotal, not a full operating budget: implementation and future design maintenance, domain names, unselected public hosting, taxes and currency conversion remain unquoted. Bundled illustrations still consume ordinary hosting storage and bandwidth; no measured transfer sizes are available. No dependencies or paid font licenses were added.

The larger map frame may change tile demand even with unchanged visitor counts. Replace the earlier content-change demand assumptions with the following conservative **unmeasured** design-planning scenarios; they are not provider quotas or guaranteed bills. A map opening means one page load starting the interactive map, not a unique visitor. One tile request loads a small part of the visible map. Requests = openings times tiles per opening.

| Design-change scenario | Map openings/month | Assumed tiles/opening | Tile requests/month | Added vendor fee/month |
| --- | ---: | ---: | ---: | ---: |
| Low | 1,000 | 24 | 24,000 | $0 |
| Expected | 10,000 | 24 | 240,000 | $0 |
| Heavy exploration | 100,000 | 60 | 6,000,000 | $0, access can be blocked |

The public OSM tile policy was rechecked October 15, 2026 at [the primary policy source](https://operations.osmfoundation.org/policies/tiles/): no numeric quota, guaranteed availability, or automatic paid overage is offered; heavy or inappropriate use may be blocked without notice, including commercial use. This does not make heavy-use traffic suitable for that public service. Attribution and browser caching stay in place, with no prefetch or offline downloading. The existing illustrated map and retry button remain the fallback. Monitor tile failures and request counts during a pilot; confirm provider eligibility, Vietnam coverage, current rates, spending controls and interruption behavior before a commercial release. Alerts are not hard spending caps.

Keeping the previous compact interface is the simpler alternative (less design work and no added hero asset). Using only the illustrated map would avoid public-tile dependency but remove geographic interaction. A dedicated paid map provider is still a proposed reliability option, not a new commitment; the earlier paid-plan table retains its dated verification and must be refreshed for the new demand assumptions before purchase. No new paid pricing claim is made for this redesign.

## Delivered change: My Hanoi typography and navigation

October 15, 2026: source styling now requests Oswald for headlines and Source Sans Pro for supporting text and subheadings. The brand is My Hanoi. Desktop, mobile and footer navigation share five categories; new food/events sections explicitly mark their content as pending, and the local-tips section links to existing destination advice. No live event feed, restaurant service, CMS or additional map integration was added. This supersedes the system-font-only statement above.

**Recommendation:** use the requested Google Fonts stylesheet with `display=swap` and system fallbacks. Google's [primary font information](https://developers.google.com/fonts) was checked October 15, 2026: fonts are free and available for commercial projects. **Incremental font-service subtotal: USD $0/month before applicable taxes**, with no subscription, per-request charge, transaction fee or paid overage. A font request means the browser downloading the stylesheet or a font file; caching and language coverage determine the actual count and bytes. No geographic availability guarantee or service SLA is assumed. If Google Fonts is blocked or unavailable, system fonts remain readable; monitor font-loading failures during a pilot, not a paid spending cap.

| Unmeasured scenario | Page loads/month | Font-service calculation | Added fee/month |
| --- | ---: | --- | ---: |
| Low | 1,000 | 1,000 × $0 per page load | $0 |
| Expected | 10,000 | 10,000 × $0 per page load | $0 |
| Heavy | 100,000 | 100,000 × $0 per page load | $0 |

These are forecasts, not measured transfer counts or a hosting allowance. Google serves font files; the additional static text/CSS consumes ordinary site storage and bandwidth. Existing map assumptions are unchanged. No compute, database or other subscription was introduced. Public hosting, domains, taxes, currency conversion, implementation and future content/design maintenance remain excluded and unquoted; this is not the full business cost. No paid-service decision is required for this change.

The simpler alternative is the previous system-font stack: no external font requests, but it does not deliver the requested typefaces. Self-hosting licensed font files is another option (not implemented): fewer third-party browser connections and more control, at the cost of site bandwidth/storage and font-update work. Before release, verify font loading including Vietnamese characters and actual hosting transfer usage. Runtime/layout checks and PDF regeneration remain pending under the instance's no-code-execution policy; the PDF status at the top still applies.

## Delivered follow-up: map section order

“Bản đồ khám phá” now appears after the search/category tools and before “Theo bước tò mò”. This moves the existing map without adding another instance, service, asset or API integration. Incremental recurring vendor fees are USD $0/month before tax, assuming unchanged traffic, map dimensions and initialization behavior; existing low/expected/heavy forecasts and exclusions remain applicable. Earlier visibility could change visitor interaction and tile demand: monitor actual requests during the pilot. No new paid commitment or pricing claim is made. Implementation effort remains unquoted; validation and PDF regeneration remain deferred under the instance execution policy.

## Delivered follow-up: hero copy

Hero wording now reads “Khám phá Hà Nội của riêng bạn” and “Văn hiến. Sáng tạo. Trải nghiệm”. This static text-only edit adds no services, requests or assets: incremental recurring vendor cost is USD $0/month before tax, assuming unchanged hosting and traffic. Existing usage forecasts and exclusions remain unchanged; no new pricing claim or purchase decision is involved. Validation and PDF regeneration remain deferred under the instance execution policy.

## Delivered follow-up: full-bleed photographic hero

The supplied `mev9zaoqveug1.jpeg` now replaces the illustrated hero. The local photograph fills the page width and at least the viewport below navigation, with responsive cropping, a readability gradient, and large editorial text inspired by [Visit Norway](https://www.visitnorway.com/). No Visit Norway assets or remote image service are embedded. This supersedes the illustrated-hero description above. Browser verification and PDF regeneration remain pending under the instance execution policy.

**Recommendation and decision:** serve the supplied image as a static file; no new service commitment is needed. Added subscriptions, image APIs, compute, database and transaction fees are **USD $0/month before applicable tax**, assuming the current local prototype. This is not a quote for deployment bandwidth. The published JPEG adds 1,221,811 bytes of storage (about 1.22 MB); the original upload remains outside the published assets. Confirm commercial photo rights before public release; no license fee is assumed or verified from the upload alone.

A download means one complete JPEG transfer. With one uncached download per page load, image-only demand is:

| Unmeasured scenario | Page loads/month | Calculation (decimal GB) | Image transfer/month |
| --- | ---: | --- | ---: |
| Low | 1,000 | 1,221,811 × 1,000 ÷ 1,000,000,000 | 1.22 GB |
| Expected | 10,000 | 1,221,811 × 10,000 ÷ 1,000,000,000 | 12.22 GB |
| Heavy | 100,000 | 1,221,811 × 100,000 ÷ 1,000,000,000 | 122.18 GB |

These are gross JPEG estimates, not measured traffic, incremental transfer versus the old SVG, or a free hosting allowance. Caching can reduce traffic; other assets, headers, fonts and map tiles are excluded. Public hosting/storage/transfer costs and their quota/overage behavior remain unknown until a host is selected; no old provider rate is newly verified here. Monitor bytes served, image-load failures and host usage before launch; configure supported budget alerts (not hard caps). The retained SVG is a manual rollback option. Returning to it is cheaper in transfer but does not meet the photographic brief; creating compressed responsive variants is a proposed optimization, not implemented. Domain, taxes, currency conversion, photo licensing, one-time design work and maintenance remain excluded/unquoted. Existing font and map integrations are unchanged.

## Recommended decision

Keep the current free setup for private proof-of-concept reviews. For a public commercial launch, shortlist Stadia Maps Starter for maps, or MapTiler Flex as an alternative. If directions must work inside our site, budget a routing-capable service separately; this brief models Stadia Standard. Check Vietnam map quality, route quality, provider eligibility, and support requirements before selecting a supplier.

At 10,000 monthly map openings, the modeled map-service subtotal is **$20 with Stadia Starter** or **$30 with MapTiler Flex**, even in the heavy-use scenario below. Proposed in-app routing on Stadia Standard is **$80** in the same traffic scenario. These figures exclude labor, domains, taxes, and any future backend costs.

## What exists today

The site has six hardcoded destinations, interactive maps, browser location, filters, and place pages. Distances are straight-line estimates. There is no database, account system, booking, payment, route calculation, or live traffic information. Place-page links open OpenStreetMap at the destination; directions are not implemented.

The current local prototype has **$0 in configured recurring service fees**. Existing development equipment and labor are excluded. Public deployment has not been configured.

## Alternatives at a glance

| Option | Monthly starting price | Business implication |
| --- | ---: | --- |
| Current Leaflet and public OSM tiles | $0 service fee | Suitable for small reviews; shared tile capacity and no uptime guarantee. Not our recommended commercial dependency. [1] |
| Stadia Starter for maps | $20 | 1 million credits; standard tiles use 1 credit each. Extra usage is $0.03 per 1,000 credits when enabled. Commercial use allowed. [2] |
| MapTiler Flex for maps | $30 | 500,000 API requests; extra requests are $0.15 per 1,000. Leaflet uses request billing, not the SDK session allowance. [3] |
| Stadia Standard with routing | $80 | 7.5 million credits; routing uses 20 per request. Overage is $0.02 per 1,000 credits. Proposed integration, not current functionality. [2] |
| Self-hosted maps and routing | Quote required | Server, map updates, monitoring, and staff time replace provider fees. No defensible estimate without a deployment design. |
| Google Maps Platform | Not costed | Vietnam is listed as a prohibited territory under standard terms. Eligibility needs written clarification; overseas hosting alone is not a documented exception. [7][8] |

Leaflet itself has no per-user fee. Provider free plans are not interchangeable: Stadia allows development and demonstration on its free plan, but commercial production needs a paid plan. MapTiler also allows testing and development but excludes ordinary commercial production from its free plan. [4][9]

<!-- pagebreak -->

## Map usage and monthly estimates

A map opening is one page load that starts the interactive map, not one unique customer. A tile is a small image used to draw part of the map. Loading, panning, and zooming can request multiple tiles.

Planning assumptions, not measured usage: **15 billable 256-pixel tiles per opening normally**, and **40 with heavier exploration**. No satellite imagery, address search, routing, or uploaded data is included in this table. Normal browser caching remains enabled; actual paid requests must be measured after a pilot.

| Map openings per month | Stadia normal | Stadia heavy | MapTiler normal | MapTiler heavy |
| ---: | ---: | ---: | ---: | ---: |
| 1,000 | $20 Starter | $20 Starter | $30 | $30 |
| 10,000 | $20 Starter | $20 Starter | $30 | $30 |
| 100,000 | $35 Starter | $80 Standard | $180 | $555 |
| 1,000,000 | $230 Standard | $475 Professional | $2,205 | $5,955 |

Stadia rows select the least expensive of the three published paid tiers modeled here for each map-only workload; tier changes would need to be made. Professional is $250 with 25 million credits and $0.015 per 1,000 extra credits. MapTiler rows keep Flex unchanged; large-volume custom quotes may be cheaper. Prices and limits: [2][3].

## How to reproduce the estimates

Monthly tile requests = map openings multiplied by tiles per opening.

For each plan, monthly charge = base subscription plus the larger of zero or usage above the included allowance, multiplied by the overage price per unit. The calculation assumes overages are enabled and available. Do not add the included allowance again as a separate charge.

For example, 100,000 normal openings create 1,500,000 requests. MapTiler Flex costs $30 plus 1,000,000 extra requests divided by 1,000, multiplied by $0.15: **$180**. At 40 tiles, usage is 4,000,000 requests and the result is **$555**. [3]

## Hosting and excluded costs

Cloudflare Pages is a proposed static-hosting option: static asset requests are free and unlimited; its free tier allows 500 builds per month. The current seven-page static site needs no paid server or database. This adds **$0 to the modeled hosting subtotal** while the site remains static and within platform limits. Server functions have separate billing. [5][6]

The tables are **map-service subtotals**, not full business budgets. A domain name, development, maintenance, content work, taxes, and payment-currency conversion are not quoted. A free provider hostname avoids buying a domain for a pilot. Optional premium support, analytics, dynamic infrastructure, and other new services require a revised estimate.

<!-- pagebreak -->

## Directions and future feature costs

**External directions:** A proposed button could open a navigation app. It would not call a routing API through our account, so the expected incremental routing-vendor fee is $0. Implementation effort remains unquoted. This option moves the visitor away from our site and depends on the selected app's capabilities and terms.

**Directions inside our site:** A routing provider can supply a route line, travel distance, estimated duration, and instructions. This brief budgets Stadia Standard rather than assuming those capabilities are included in a map-only plan. Live traffic, offline navigation, and continuous turn-by-turn guidance are outside this scenario.

Assume 15 tiles per map opening, and 20% of openings request one standard route. Usage is 15 tile credits plus 4 routing credits per opening, or **19 credits per opening**. Using Standard gives the following service-only estimates. [2]

| Monthly map openings | Route requests | Total credits | Stadia Standard subtotal |
| ---: | ---: | ---: | ---: |
| 1,000 | 200 | 19,000 | $80 |
| 10,000 | 2,000 | 190,000 | $80 |
| 100,000 | 20,000 | 1,900,000 | $80 |
| 1,000,000 | 200,000 | 19,000,000 | $310 |

At the largest scenario, Professional's $250 base covers the modeled volume and is cheaper than Standard. This is an alternative plan selection, not an additional subscription. Retries, route recalculation, different travel profiles, and other APIs can change usage. Test Ha Noi routes, pedestrian access, and bridge restrictions; a map pin is not a verified entrance or evidence that a route is safe or permitted.

A secure routing integration may add a small backend or another authentication design. Its hosting and implementation costs must be scoped before calling this a complete directions budget. Routing is proposed, not implemented.

## Other requests from management

| Requested change | Billing assessment needed |
| --- | --- |
| More manually curated destinations or layout changes | Usually no extra service fee under today's static design; estimate content and implementation effort separately. |
| Search addresses or discover live businesses | New search/geocoding/places calls; estimate calls per search and retries, not just visitor count. |
| Accounts, saved trips, or an editing dashboard | Reassess authentication, database, storage, backups, and server functions. |
| Bookings, payments, email, SMS, or AI features | Quote the relevant subscriptions and transaction/message/model usage; no prices are assumed here. |

The alternative with the lowest vendor bill may require more staff time or offer fewer features. Decisions should consider both operating bills and delivery effort.

<!-- pagebreak -->

## Controls and conditions for a decision

Public OSM tiles have no published numeric allowance or guaranteed uptime. Heavy usage can be blocked without notice; there is no automatic paid upgrade. [1]

Stadia's additional usage is opt-in. Treat a plan without extra usage as capped; confirm the resulting service interruption and dashboard settings before launch. MapTiler Flex bills extra use automatically and supports a spending limit; confirm how reaching that limit affects service. Free-tier limits can suspend maps until the next billing period. [2][3][9]

For a pilot, monitor provider-request counts, map openings, routes, and errors. Set alerts at 70% and 90% of the agreed monthly budget. Those alert levels are our recommendation, not provider guarantees. An alert is not a spending cap. Choose explicitly whether crossing a supported limit should stop map requests, serve the illustrated fallback, or permit a budgeted overage.

Before a public launch, management needs to decide:

- Whether visitors need maps only, external directions, or directions within the site.
- The target monthly map openings, expected exploration, and acceptable service interruptions.
- The provider and tier, overage policy, and budget owner.
- Whether to use a free hostname or obtain a separate domain quote.
- The scope and internal effort budget for any new feature.

Current forecasts have **high confidence in the checked public unit rates and arithmetic**, and **low confidence in usage**, which has not been measured. Providers' account eligibility, Vietnam coverage, taxes, and any contractual exceptions must be confirmed for the actual purchaser. Quotes and measured traffic should replace assumptions as they become available. Recheck rates and scope before spending or releasing.

## Sources checked October 14 2026

[1] [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/) - capacity, attribution, caching, and availability.

[2] [Stadia Maps pricing](https://stadiamaps.com/pricing/) - monthly paid tiers, credit costs, commercial eligibility, and extra usage. Check feature entitlement and account settings before purchase.

[3] [MapTiler Cloud pricing](https://www.maptiler.com/cloud/pricing/) - Flex rates, request versus session billing, overages, and spending limits. Listed prices exclude VAT.

[4] [MapTiler Cloud terms](https://www.maptiler.com/terms/cloud/) - commercial-use limitations of the free plan.

[5] [Cloudflare Pages pricing](https://developers.cloudflare.com/pages/functions/pricing/) - static requests versus server-function charges.

[6] [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) - free-tier builds and platform limits.

[7] [Google Maps Platform terms](https://cloud.google.com/maps-platform/terms) - section 3.2.1(c)(v), standard territorial distribution restriction.

[8] [Google prohibited territories](https://cloud.google.com/maps-platform/terms/maps-prohibited-territories) - Vietnam listing.

[9] [Stadia Maps FAQ](https://stadiamaps.com/faqs/) - demonstration exceptions, prepaid subscriptions, opt-in additional usage, and account billing behavior.

## Keeping this brief current

Every proposed or delivered change must include a billing-impact assessment in this record. Refresh scope, verified rates, scenarios, alternatives, exclusions, and controls when they change. For changes that do not affect vendor billing, record that conclusion rather than inventing a charge. Maintain the PDF from this Markdown source; `AGENTS.md` makes this part of the development workflow.
