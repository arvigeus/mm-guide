# Ha Long guide billing and service options

Prepared for management decisions. Prices verified October 14, 2026. All amounts are USD per month unless stated otherwise, before applicable taxes and currency conversion.

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

At the largest scenario, Professional's $250 base covers the modeled volume and is cheaper than Standard. This is an alternative plan selection, not an additional subscription. Retries, route recalculation, different travel profiles, and other APIs can change usage. Test Ha Long routes; offshore destinations need boat or harbour guidance, not a road-route assumption.

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
