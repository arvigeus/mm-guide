import type { SheetState } from './imap-prototype.ts';

/** Homepage-only geometry; preserve the approved full-route/prototype snaps. */
export function mobileSheetHeight(state: SheetState, available: number, videoHeight = 0, safeArea = 0) {
  const height = Math.max(0, available);
  const collapsed = Math.min(height, 52 + Math.max(0, safeArea));
  const expanded = Math.max(collapsed, height * .9);
  if (state === 'collapsed') return collapsed;
  if (state === 'expanded') return expanded;
  return Math.min(expanded, Math.max(collapsed, height * .5, videoHeight + safeArea));
}

export function nearestMobileSheetState(height: number, available: number, videoHeight = 0, safeArea = 0): SheetState {
  const states: SheetState[] = ['collapsed', 'half', 'expanded'];
  return states.reduce((nearest, state) => Math.abs(mobileSheetHeight(state, available, videoHeight, safeArea) - height)
    < Math.abs(mobileSheetHeight(nearest, available, videoHeight, safeArea) - height) ? state : nearest, 'collapsed');
}
