import { demoLocation, type Category, type Coordinates, type Place } from '../data/places.ts';
import { districtPlaceSlugs } from '../data/districts.ts';
import { findPlaces } from './explore.ts';
import type { SheetState } from './imap-prototype.ts';

export interface ExplorerState {
  query: string;
  category: Category | 'All';
  district: string;
  origin: Coordinates;
  nearby: boolean;
  selected?: string;
  sheet: SheetState;
}
export function createExplorerState(): ExplorerState {
  return { query: '', category: 'All', district: 'All', origin: { ...demoLocation }, nearby: false, sheet: 'collapsed' };
}
export function filterExplorerPlaces(all: Place[], state: ExplorerState, includeDistrict = true) {
  const slugs = includeDistrict && state.district !== 'All' ? new Set(districtPlaceSlugs[state.district] ?? []) : undefined;
  return findPlaces(all, state.query, state.category, state.origin, state.nearby).filter(place => !slugs || slugs.has(place.slug));
}

// Each rendered explorer owns one lifetime; nothing is shared between instances.
export function createInstanceLifetime() {
  const controller = new AbortController();
  const cleanups: Array<() => void> = [];
  let disposed = false;
  return {
    signal: controller.signal,
    get disposed() { return disposed; },
    onCleanup(cleanup: () => void) { if (disposed) cleanup(); else cleanups.push(cleanup); },
    dispose() {
      if (disposed) return;
      disposed = true;
      controller.abort();
      for (const cleanup of cleanups.reverse()) {
        try { cleanup(); } catch (error) { console.error('[iMap] cleanup failed', error); }
      }
      cleanups.length = 0;
    },
  };
}
