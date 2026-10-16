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
    card.querySelector<HTMLElement>('[data-distance]')!.textContent = `Cách ${formatDistance(distanceKm(origin, place.coordinates))}`;
    results.append(card);
  }
  for (const pin of pins) pin.hidden = !visible.has(pin.dataset.pin!);
  if (map) for (const [slug, marker] of markers) {
    if (visible.has(slug) && !map.hasLayer(marker)) marker.addTo(map);
    else if (!visible.has(slug) && map.hasLayer(marker)) marker.remove();
  }
  document.querySelector<HTMLElement>('#empty-state')!.hidden = filtered.length > 0;
  document.querySelector<HTMLElement>('#result-count')!.textContent = `${filtered.length} địa điểm, gần nhất trước${nearby.checked ? ' · trong bán kính 10 km' : ''}`;
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
resetLocation.type = 'button'; resetLocation.className = 'reset-location'; resetLocation.textContent = 'Về vị trí mẫu ở Hồ Hoàn Kiếm'; resetLocation.hidden = true;
message.after(resetLocation);
resetLocation.addEventListener('click', () => {
  origin = { ...demoLocation }; usingLocation = false; resetLocation.hidden = true; message.textContent = '';
  document.querySelector<HTMLElement>('#location-label')!.textContent = 'Bắt đầu tại Hồ Hoàn Kiếm · vị trí mẫu';
  document.querySelector<HTMLElement>('.demo-origin')!.hidden = false;
  updateLocationMarker();
  fitDestinations(); render();
});

locate.addEventListener('click', () => {
  if (!navigator.geolocation) { message.textContent = 'Trình duyệt này không hỗ trợ định vị. Bạn vẫn có thể khám phá từ vị trí mẫu ở Hồ Hoàn Kiếm.'; return; }
  if (!window.isSecureContext) { message.textContent = 'Định vị cần kết nối HTTPS hoặc localhost. Bạn vẫn có thể khám phá từ vị trí mẫu.'; return; }
  locate.disabled = true; locate.querySelector('span')!.textContent = 'Đang định vị…';
  message.textContent = 'Trình duyệt sẽ xin phép truy cập vị trí. Ứng dụng chỉ dùng vị trí cho lần truy cập này, không lưu lại.';
  navigator.geolocation.getCurrentPosition(position => {
    origin = { lat: position.coords.latitude, lng: position.coords.longitude }; usingLocation = true;
    resetLocation.hidden = false;
    document.querySelector<HTMLElement>('#location-label')!.textContent = 'Đang dùng vị trí của bạn · gần nhất trước';
    document.querySelector<HTMLElement>('.demo-origin')!.hidden = true;
    const outside = distanceKm(origin, demoLocation) > 50;
    message.textContent = outside
      ? 'Bạn đang ở xa khu vực trung tâm Hà Nội. Khoảng cách tính từ vị trí của bạn; chọn “Về vị trí mẫu ở Hồ Hoàn Kiếm” để khám phá thử.'
      : 'Khoảng cách hiện tính từ vị trí của bạn theo đường chim bay, không phải quãng đường di chuyển.';
    if (!map) message.textContent += ' Sơ đồ minh họa vẫn hiển thị Hà Nội; thử tải lại bản đồ tương tác để xem vị trí của bạn.';
    updateLocationMarker();
    if (map) map.setView([origin.lat, origin.lng], 13);
    render(); finishLocate();
  }, error => {
    message.textContent = error.code === 1
      ? 'Bạn chưa cho phép truy cập vị trí. Bạn vẫn có thể khám phá từ điểm xuất phát hiện tại.'
      : 'Chưa thể xác định vị trí. Hãy thử lại hoặc tiếp tục khám phá từ điểm xuất phát hiện tại.';
    finishLocate();
  }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
});

function finishLocate() { locate.disabled = false; locate.querySelector('span')!.textContent = 'Dùng vị trí của tôi'; }
function updateLocationMarker() {
  if (!locationMarker) return;
  const title = usingLocation ? 'Vị trí gần đúng của bạn' : 'Vị trí mẫu ở Hồ Hoàn Kiếm';
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
  mapStatus.textContent = 'Đang tải bản đồ…';
  try {
    // Load Leaflet only in the browser; all code and styles are bundled locally.
    const L = await import('leaflet');
    liveMap.hidden = false;
    map = L.map(liveMap, { scrollWheelZoom: false, zoomControl: false });
    L.control.zoom({ zoomInTitle: 'Phóng to', zoomOutTitle: 'Thu nhỏ' }).addTo(map);
    map.attributionControl.setPrefix('<a href="https://leafletjs.com/" title="Thư viện bản đồ tương tác">Leaflet</a>');
    const activeMap = map;
    let loadedTiles = 0;
    let failedTiles = 0;
    // Standard browser image caching and referrer headers are retained.
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; Những người đóng góp cho <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.on('loading', () => { loadedTiles = 0; failedTiles = 0; });
    tiles.on('tileload', () => {
      if (map !== activeMap) return;
      loadedTiles += 1; window.clearTimeout(tileTimeout);
      mapStatus.textContent = 'Bản đồ tương tác · phóng to, kéo hoặc chọn một địa điểm';
    });
    tiles.on('tileerror', () => { failedTiles += 1; });
    tiles.on('load', () => {
      if (map !== activeMap) return;
      if (loadedTiles === 0 && failedTiles > 0) {
        mapFallback('Không tải được hình ảnh bản đồ. Bạn vẫn có thể khám phá bằng sơ đồ minh họa.');
      } else if (failedTiles > 0) {
        mapStatus.textContent = 'Một phần bản đồ chưa tải được. Các ghim và trang địa điểm vẫn hoạt động.';
      }
    });
    const symbols: Record<Category, string> = { 'Hồ & cảnh quan': '≈', 'Phố & cầu': '↗', 'Di sản': '▥' };
    for (const place of places) {
      const pin = document.createElement('span'); pin.className = 'place-map-pin';
      const symbol = document.createElement('span'); symbol.textContent = symbols[place.category]; pin.append(symbol);
      const label = document.createElement('span'); label.textContent = place.name;
      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        title: `Khám phá ${place.name}`,
        icon: L.divIcon({ className: 'place-map-icon', html: pin, iconSize: [36, 36], iconAnchor: [18, 36], tooltipAnchor: [0, -36] }),
      }).bindTooltip(label, { direction: 'top' });
      marker.on('add', () => { marker.getElement()?.setAttribute('aria-label', `Khám phá ${place.name}`); });
      marker.on('click', () => { window.location.assign(`/places/${place.slug}/`); });
      markers.set(place.slug, marker);
    }
    const dot = document.createElement('span'); dot.className = 'location-map-dot';
    locationMarker = L.marker([origin.lat, origin.lng], {
      title: 'Vị trí mẫu ở Hồ Hoàn Kiếm', keyboard: false, zIndexOffset: 1000,
      icon: L.divIcon({ className: 'location-map-icon', html: dot, iconSize: [19, 19], iconAnchor: [9.5, 9.5] }),
    }).bindTooltip('Vị trí mẫu ở Hồ Hoàn Kiếm').addTo(map);
    updateLocationMarker();
    demoMap.hidden = true; liveLabel.hidden = false;
    fitDestinations();
    if (usingLocation) map.setView([origin.lat, origin.lng], 13);
    tileTimeout = window.setTimeout(() => {
      if (map === activeMap) mapFallback('Bản đồ tải quá lâu. Bạn có thể chọn ghim trên sơ đồ minh họa hoặc thử lại.');
    }, 12000);
    tiles.addTo(map);
    render();
    connecting = false;
  } catch {
    mapFallback('Bản đồ tương tác hiện không khả dụng. Bạn vẫn có thể khám phá bằng sơ đồ minh họa.');
  }
}
render(); void connectMap();
