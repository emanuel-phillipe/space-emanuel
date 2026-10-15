export const WINDOW_MARGIN = 12
export const MOBILE_DOCK_SPACE = 184

// All positions are viewport coordinates, including on scrolled mobile pages.
export function clampWindowPosition(
  position: { x: number; y: number },
  size: { width: number; height: number },
  viewport: { width: number; height: number },
) {
  return {
    x: Math.max(WINDOW_MARGIN, Math.min(position.x, viewport.width - size.width - WINDOW_MARGIN)),
    y: Math.max(WINDOW_MARGIN, Math.min(position.y, viewport.height - size.height - WINDOW_MARGIN)),
  }
}
