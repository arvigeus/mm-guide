/** Shared category registry for prototype markers, directory and filters only. */
import type { CityId, DestinationId, DestinationRecord } from './destination-content.ts';

/** Identifiers for existing trusted SVG paths in imap-neighborhood.ts, not asset URLs. */
export type ImapCategoryIconId = 'landmark' | 'utensils' | 'bed' | 'ticket';

/** Stable content IDs are independent of translated labels and SVG identifiers. */
export const imapCategories = [
  { id: 'stamp-worthy-spot', label: 'Di sản & điểm tham quan', icon: 'landmark' },
  { id: 'food-drink', label: 'Ẩm thực', icon: 'utensils' },
  { id: 'stay', label: 'Lưu trú', icon: 'bed' },
  { id: 'experience', label: 'Trải nghiệm', icon: 'ticket' },
] as const satisfies readonly { id: string; label: string; icon: ImapCategoryIconId }[];

export type ImapCategory = typeof imapCategories[number];
export type ImapCategoryId = ImapCategory['id'];

/** Reuse the content contract without changing production categories or migrating records. */
export type ImapDestinationRecord<
  Id extends string = DestinationId,
  City extends CityId = 'hanoi',
  RelatedIds extends string = DestinationId,
> = Omit<DestinationRecord<Id, City, RelatedIds>, 'category'> & {
  readonly category: ImapCategoryId;
};
