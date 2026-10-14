export type Category = 'Bay & boats' | 'Beaches' | 'Culture' | 'Food';
export type Coordinates = { lat: number; lng: number };
export type Place = {
  slug: string; name: string; vietnamese: string; category: Category;
  coordinates: Coordinates; area: string; description: string; story: string;
  tip: string; visit: string; access: string; art: 'bay' | 'beach' | 'museum' | 'market';
};
export const demoLocation: Coordinates = { lat: 20.9547, lng: 107.048 };
// Curated PoC content. Coordinates are approximate, not verified entrances.
export const places: Place[] = [
  {
    slug: 'bai-chay-beach', name: 'Bãi Cháy Beach', vietnamese: 'Bãi biển Bãi Cháy', category: 'Beaches',
    coordinates: { lat: 20.9514, lng: 107.0465 }, area: 'Bãi Cháy', art: 'beach',
    description: 'A little sea air, a long waterfront walk, and room to slow down.',
    story: 'Make the waterfront your first stop. Bãi Cháy is a simple way to enjoy the coastal side of Ha Long without organising a boat trip. Walk along the beach, look out across the bay, and leave time to explore the surrounding neighbourhood.',
    tip: 'Try an early morning or late afternoon walk. Bring water and sun protection.',
    visit: 'A relaxed stop', access: 'Waterfront',
  },
  {
    slug: 'tuan-chau-harbour', name: 'Tuần Châu Harbour', vietnamese: 'Cảng tàu Tuần Châu', category: 'Bay & boats',
    coordinates: { lat: 20.9213, lng: 106.9866 }, area: 'Tuần Châu Island', art: 'bay',
    description: 'The beginning of a day among limestone islands and emerald water.',
    story: 'Tuần Châu is a departure point for exploring Ha Long Bay by boat. Use it as a place to begin planning a cruise. This prototype showcases the destination; it does not offer bookings.',
    tip: 'Confirm the departure harbour, route, weather conditions, and inclusions with your cruise operator.',
    visit: 'Plan a bay day', access: 'Boat departure point',
  },
  {
    slug: 'quang-ninh-museum', name: 'Quảng Ninh Museum', vietnamese: 'Bảo tàng Quảng Ninh', category: 'Culture',
    coordinates: { lat: 20.9508, lng: 107.0963 }, area: 'Hòn Gai', art: 'museum',
    description: 'Meet the region beyond the bay, through its people and history.',
    story: 'Add a cultural stop to your day in Hòn Gai. Quảng Ninh Museum is a starting point for discovering the region’s history and local identity. Pair a visit with a walk along the nearby waterfront.',
    tip: 'Check the museum’s current opening hours and ticket information before visiting.',
    visit: 'An indoor escape', access: 'Ticketed attraction',
  },
  {
    slug: 'ha-long-market', name: 'Hạ Long Market', vietnamese: 'Chợ Hạ Long', category: 'Food',
    coordinates: { lat: 20.9509, lng: 107.0802 }, area: 'Hòn Gai', art: 'market',
    description: 'Browse local stalls and get a taste of everyday life by the coast.',
    story: 'A market visit brings a different rhythm to a Ha Long trip. Wander through local stalls in Hòn Gai and explore the surrounding area for something to eat. This sample destination is not a recommendation for an individual food vendor.',
    tip: 'Ask about prices before ordering, and bring cash for small purchases.',
    visit: 'Explore at your pace', access: 'Local market',
  },
  {
    slug: 'ti-top-island', name: 'Ti Tốp Island', vietnamese: 'Đảo Ti Tốp', category: 'Beaches',
    coordinates: { lat: 20.8589, lng: 107.0809 }, area: 'Ha Long Bay', art: 'beach',
    description: 'A small island stop with a beach and a different view of the bay.',
    story: 'Ti Tốp combines an island beach with a lookout over the bay. It is an offshore destination, so getting here means arranging a boat itinerary that includes the island. Straight-line distances do not represent a walk or drive.',
    tip: 'Check whether your boat itinerary includes this stop. Wear suitable shoes if you plan to climb to the viewpoint.',
    visit: 'Part of a boat trip', access: 'Boat access required',
  },
  {
    slug: 'sung-sot-cave', name: 'Sửng Sốt Cave', vietnamese: 'Hang Sửng Sốt', category: 'Bay & boats',
    coordinates: { lat: 20.8477, lng: 107.0877 }, area: 'Bồ Hòn Island', art: 'bay',
    description: 'Step off the boat and into another side of the limestone landscape.',
    story: 'Sửng Sốt is one of the cave stops in Ha Long Bay. It offers a chance to see the limestone landscape from the inside as part of a boat excursion. Choose an itinerary that includes the cave if it is on your wish list.',
    tip: 'Expect steps and walking. Ask your operator about accessibility and the route before booking.',
    visit: 'Part of a boat trip', access: 'Boat access required',
  },
];
