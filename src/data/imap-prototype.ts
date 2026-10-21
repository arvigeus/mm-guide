/** 05B.1 conditional prototype integration only. Never imported by production pages.
 * Facts/pins come from the locally approved 05A.1 audit; this is not media approval.
 */
import audit from '../../output/sprint-05a/candidates.draft.json' with { type: 'json' };
import { places as originalPlaces } from './places.ts';
import { districtPlaceSlugs } from './districts.ts';
import { discoveryCategories, type DiscoveryCategory, type DiscoveryPlace } from '../lib/imap-neighborhood.ts';

const { candidates } = audit;

// Explicit allowlist: later audit edits cannot silently populate additional destinations.
export const integratedPrototypeIds = [
  'den-ngoc-son', 'nha-tho-lon-ha-noi', 'pho-sach-dinh-le',
  'sofitel-legend-metropole-hanoi', 'nha-hat-mua-roi-thang-long-hoan-kiem',
] as const;

function candidateById(id: string) {
  const candidate = candidates.find(candidate => candidate.id === id);
  if (!candidate) throw new Error(`Missing approved prototype candidate: ${id}`);
  return candidate;
}
function isCategory(value: string): value is DiscoveryCategory {
  return discoveryCategories.some(category => category.id === value);
}
// Visitor-facing excerpts of the audit angles, omitting internal editorial instructions.
const angleExcerpts: Readonly<Record<string, string>> = {
  'sofitel-legend-metropole-hanoi': 'Một địa chỉ lưu trú để kể về kiến trúc và ký ức đô thị.',
  'nha-hat-mua-roi-thang-long-hoan-kiem': 'Từ mặt nước sân khấu đến câu chuyện làng quê.',
  'khong-gian-di-bo-hoan-kiem': 'Khi không gian quanh hồ dành chỗ cho người đi bộ: nhịp gặp gỡ và sinh hoạt cộng đồng.',
};
function editorialText(id: string) {
  const candidate = candidateById(id);
  return angleExcerpts[id] ?? candidate.proposedEditorialStoryAngle;
}

export const prototypePlaces: DiscoveryPlace[] = [
  // Prototype-only photo fields: production records/content are never mutated.
  ...originalPlaces.map((place): DiscoveryPlace => {
    if (place.slug === 'ho-hoan-kiem') return { ...place, portraitImage: '/images/Ho%20Hoan%20kiem.jpg' };
    if (place.slug === 'pho-co') return { ...place, portraitImage: '/images/Pho%20co.jpg' };
    // 06I: client files visually inspected against the supplied destination identities.
    if (place.slug === 'van-mieu') return { ...place, portraitImage: '/images/văn%20miếu%20quốc%20tử%20giám%20ht.jpg' };
    if (place.slug === 'ho-tay') return { ...place, portraitImage: '/images/Ho%20tay.jpg' };
    if (place.slug === 'cau-long-bien') return { ...place, portraitImage: '/images/Cau%20Long%20Bien.jpg' };
    if (place.slug === 'hoang-thanh-thang-long') return { ...place, portraitImage: '/images/Hoang%20thanh%20Thang%20Long.jpg' };
    return place;
  }),
  ...integratedPrototypeIds.map((id): DiscoveryPlace => {
    const candidate = candidateById(id);
    if (!candidate.coordinates || !isCategory(candidate.categoryId)) {
      throw new Error(`Approved prototype candidate lacks a pin/category: ${id}`);
    }
    return {
      slug: candidate.id, name: candidate.name, vietnamese: candidate.name,
      category: candidate.categoryId, discoveryCategory: candidate.categoryId,
      coordinates: { ...candidate.coordinates }, area: candidate.address.value,
      description: editorialText(id), story: editorialText(id),
      tip: 'Kiểm tra lối vào và điều kiện tham quan tại nguồn trước khi đi.',
      visit: 'Khám phá theo nhịp riêng', access: 'Lối vào chưa được xác minh',
      // Client-supplied files only; one source field for both list placements.
      portraitImage: {
        'den-ngoc-son': '/images/den%20ngoc%20son.jpg',
        'nha-tho-lon-ha-noi': '/images/Nha%20tho%20lon.jpg',
        'pho-sach-dinh-le': '/images/pho%20sach%20Dinh%20Le.jpg',
        'sofitel-legend-metropole-hanoi': '/images/Metropole%20legand.jpeg',
        'nha-hat-mua-roi-thang-long-hoan-kiem': '/images/nha%20hat%20mua%20roi%20nuoc%20Thang%20Long.jpg',
      }[id],
      // No invented video, art classification, price or opening hours.
    };
  }),
];

// Prototype editorial grouping, not a change to production district data/boundaries.
export const prototypeDistrictPlaceSlugs: Readonly<Record<string, readonly string[]>> = {
  ...districtPlaceSlugs,
  'Hoàn Kiếm': [...(districtPlaceSlugs['Hoàn Kiếm'] ?? []), ...integratedPrototypeIds],
};
export const populatedPrototypeDistricts = Object.entries(prototypeDistrictPlaceSlugs)
  .map(([name, slugs]) => ({ name, count: prototypePlaces.filter(place => slugs.includes(place.slug)).length }))
  .filter(district => district.count > 0);

export const prototypeReferences = Object.fromEntries(integratedPrototypeIds.map(id => {
  const candidate = candidateById(id);
  return [id, { address: candidate.address.value, sourceUrl: candidate.sourceUrls[0] }] as const;
}));

const linkedStoryCandidates: ReadonlyArray<readonly [string, readonly string[]]> = [
  ['sofitel-legend-metropole-hanoi', ['la-terrasse-metropole']],
  ['ho-hoan-kiem', ['khong-gian-di-bo-hoan-kiem']],
];
export const prototypeLinkedStories = Object.fromEntries(linkedStoryCandidates.map(([parentId, ids]) => [
  parentId, ids.map(id => {
    const candidate = candidateById(id);
    if (!isCategory(candidate.categoryId)) throw new Error(`Invalid linked-story category: ${id}`);
    return { id, name: candidate.name, categoryId: candidate.categoryId,
      description: editorialText(id), sourceUrl: candidate.sourceUrls[0] };
  }),
] as const));

// Giang stays in the audit with unresolved coordinates; no display record/pin is created.
export const heldPrototypeIds = ['cafe-giang-nguyen-huu-huan'] as const;
