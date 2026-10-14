import { demoLocation, places, type Category, type Coordinates } from '../data/places';
import { distanceKm, findPlaces, formatDistance } from '../lib/explore';
import type * as Leaflet from 'leaflet';

const search = document.querySelector<HTMLInputElement>('#search')!;
const nearby = document.querySelector<HTMLInputElement>('#nearby')!;
const results = document.querySelector<HTMLElement>('#results')!;
const locate = document.querySelector<HTMLButtonElement>('#locate')!;
const message = document.querySelector<HTMLElement>('#location-message')!;
const mapStatus = document.querySelector<HTMLElement>('#map-status')!;
const liveMap = document.querySelector<HTMLElement>('#live-map')!;
const demoMap = document.querySelector<HTMLElement>('#demo-map')!;
const liveLabel = document.querySelector<HTMLElement>('#live-map-label')!;
const retryMap = document.querySelector<HTMLButtonElement>('#retry-map')!;
const cards = new Map(Array.from(document.querySelectorAll<HTMLElement>('[data-card]')).map(card => [card.dataset.card!, card]));
const pins = Array.from(document.querySelectorAll<HTMLElement>('[data-pin]'));
const categories = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-category]'));
let category: Category | 'All' = 'All';
let origin: Coordinates = { ...demoLocation };
let usingLocation = false;
let map: Leaflet.Map | undefined;
let locationMarker: Leaflet.Marker | undefined;
let connecting = false;
let tileTimeout: number | undefined;
const markers = new Map<string, Leaflet.Marker>();

function render() {
  const filtered = findPlaces(places, search.value, category, origin, nearby.checked);
  const visible = new Set(filtered.map(place => place.slug));
  for (const [slug, card] of cards) card.hidden = !visible.has(slug);
  for (const place of filtered) {
    const card = cards.get(place.slug)!;
    card.querySelector<HTMLElement>('[data-distance]')!.textContent = `${formatDistance(distanceKm(origin, place.coordinates))} away`;
    results.append(card);
  }
  for (const pin of pins) pin.hidden = !visible.has(pin.dataset.pin!);
  if (map) for (const [slug, marker] of markers) {
    if (visible.has(slug) && !map.hasLayer(marker)) marker.addTo(map);
    else if (!visible.has(slug) && map.hasLayer(marker)) marker.remove();
  }
  document.querySelector<HTMLElement>('#empty-state')!.hidden = filtered.length > 0;
  document.querySelector<HTMLElement>('#result-count')!.textContent = `${filtered.length} ${filtered.length === 1 ? 'discovery' : 'discoveries'}, nearest first${nearby.checked ? ' · within 10 km' : ''}`;
  for (const button of categories) {
    const active = button.dataset.category === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
}

search.addEventListener('input', render);
nearby.addEventListener('change', render);
document.querySelector('#search-form')!.addEventListener('submit', event => {
  event.preventDefault(); render();
  document.querySelector('#results-heading')!.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
for (const button of categories) button.addEventListener('click', () => { category = button.dataset.category as Category | 'All'; render(); });
document.querySelector('#reset-filters')!.addEventListener('click', () => { search.value = ''; category = 'All'; nearby.checked = false; render(); search.focus(); });

const resetLocation = document.createElement('button');
resetLocation.type = 'button'; resetLocation.className = 'reset-location'; resetLocation.textContent = 'Back to Ha Long demo'; resetLocation.hidden = true;
message.after(resetLocation);
resetLocation.addEventListener('click', () => {
  origin = { ...demoLocation }; usingLocation = false; resetLocation.hidden = true; message.textContent = '';
  document.querySelector<HTMLElement>('#location-label')!.textContent = 'Starting in Bãi Cháy · demo location';
  document.querySelector<HTMLElement>('.demo-origin')!.hidden = false;
  updateLocationMarker();
  fitDestinations(); render();
});

locate.addEventListener('click', () => {
  if (!navigator.geolocation) { message.textContent = 'This browser cannot provide a location. You can still explore from the Ha Long demo starting point.'; return; }
  if (!window.isSecureContext) { message.textContent = 'Location needs HTTPS or localhost. You can still explore using the demo starting point.'; return; }
  locate.disabled = true; locate.querySelector('span')!.textContent = 'Finding you…';
  message.textContent = 'Your browser will ask to use your location. It is used for this visit only.';
  navigator.geolocation.getCurrentPosition(position => {
    origin = { lat: position.coords.latitude, lng: position.coords.longitude }; usingLocation = true;
    resetLocation.hidden = false;
    document.querySelector<HTMLElement>('#location-label')!.textContent = 'Using your location · nearest places first';
    document.querySelector<HTMLElement>('.demo-origin')!.hidden = true;
    const outside = distanceKm(origin, demoLocation) > 50;
    message.textContent = outside
      ? 'You’re outside Ha Long. Distances are from your location; use “Back to Ha Long demo” to preview a day here.'
      : 'Distances now start from you. They are straight-line estimates, not travel routes.';
    if (!map) message.textContent += ' The illustrated map stays in Ha Long; try the live map again to see your position.';
    updateLocationMarker();
    if (map) map.setView([origin.lat, origin.lng], 13);
    render(); finishLocate();
  }, error => {
    message.textContent = error.code === 1
      ? 'Location permission was declined. You can keep exploring from the current starting point.'
      : 'We couldn’t get your location. Try again, or keep exploring from the current starting point.';
    finishLocate();
  }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
});

function finishLocate() { locate.disabled = false; locate.querySelector('span')!.textContent = 'Use my location'; }
function updateLocationMarker() {
  if (!locationMarker) return;
  const title = usingLocation ? 'Your approximate location' : 'Demo starting point in Bãi Cháy';
  locationMarker.setLatLng([origin.lat, origin.lng]).setTooltipContent(title);
  locationMarker.getElement()?.setAttribute('title', title);
}
function fitDestinations() {
  if (!map) return;
  const points: Leaflet.LatLngTuple[] = places.map(place => [place.coordinates.lat, place.coordinates.lng]);
  points.push([demoLocation.lat, demoLocation.lng]);
  map.fitBounds(points, { padding: [45, 45], maxZoom: 14 });
}
function mapFallback(text: string) {
  window.clearTimeout(tileTimeout);
  map?.remove(); map = undefined; locationMarker = undefined; markers.clear();
  connecting = false; liveMap.hidden = true; liveLabel.hidden = true; demoMap.hidden = false;
  retryMap.hidden = false;
  mapStatus.textContent = text;
}

retryMap.addEventListener('click', () => { void connectMap(); });

async function connectMap() {
  if (connecting || map) return;
  connecting = true; retryMap.hidden = true;
  mapStatus.textContent = 'Loading the map…';
  try {
    // Load Leaflet only in the browser; all code and styles are bundled locally.
    const L = await import('leaflet');
    liveMap.hidden = false;
    map = L.map(liveMap, { scrollWheelZoom: false });
    const activeMap = map;
    let loadedTiles = 0;
    let failedTiles = 0;
    // Standard browser image caching and referrer headers are retained.
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
    tiles.on('loading', () => { loadedTiles = 0; failedTiles = 0; });
    tiles.on('tileload', () => {
      if (map !== activeMap) return;
      loadedTiles += 1; window.clearTimeout(tileTimeout);
      mapStatus.textContent = 'Live map · zoom, drag, or tap a place to explore';
    });
    tiles.on('tileerror', () => { failedTiles += 1; });
    tiles.on('load', () => {
      if (map !== activeMap) return;
      if (loadedTiles === 0 && failedTiles > 0) {
        mapFallback('Map tiles couldn’t load. You can still explore with the illustrated map.');
      } else if (failedTiles > 0) {
        mapStatus.textContent = 'Some map tiles couldn’t load. Pins and place pages are still available.';
      }
    });
    const symbols: Record<Category, string> = { 'Bay & boats': '↗', Beaches: '☀', Culture: '▥', Food: '♧' };
    for (const place of places) {
      const pin = document.createElement('span'); pin.className = 'place-map-pin';
      const symbol = document.createElement('span'); symbol.textContent = symbols[place.category]; pin.append(symbol);
      const label = document.createElement('span'); label.textContent = place.name;
      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        title: `Explore ${place.name}`,
        icon: L.divIcon({ className: 'place-map-icon', html: pin, iconSize: [36, 36], iconAnchor: [18, 36], tooltipAnchor: [0, -36] }),
      }).bindTooltip(label, { direction: 'top' });
      marker.on('add', () => { marker.getElement()?.setAttribute('aria-label', `Explore ${place.name}`); });
      marker.on('click', () => { window.location.assign(`/places/${place.slug}/`); });
      markers.set(place.slug, marker);
    }
    const dot = document.createElement('span'); dot.className = 'location-map-dot';
    locationMarker = L.marker([origin.lat, origin.lng], {
      title: 'Demo starting point in Bãi Cháy', keyboard: false, zIndexOffset: 1000,
      icon: L.divIcon({ className: 'location-map-icon', html: dot, iconSize: [19, 19], iconAnchor: [9.5, 9.5] }),
    }).bindTooltip('Demo starting point in Bãi Cháy').addTo(map);
    updateLocationMarker();
    demoMap.hidden = true; liveLabel.hidden = false;
    fitDestinations();
    if (usingLocation) map.setView([origin.lat, origin.lng], 13);
    tileTimeout = window.setTimeout(() => {
      if (map === activeMap) mapFallback('The map is taking too long to load. Explore the illustrated pins or try again.');
    }, 12000);
    tiles.addTo(map);
    render();
    connecting = false;
  } catch {
    mapFallback('The live map is unavailable. You can still explore with the illustrated map.');
  }
}
render(); void connectMap();
