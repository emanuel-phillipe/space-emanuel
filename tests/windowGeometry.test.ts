import assert from "node:assert/strict"
import test from "node:test"
import { clampWindowPosition } from "../src/lib/windowGeometry.ts"

const viewport = { width: 1280, height: 800 }
const size = { width: 560, height: 500 }

test("dragging past any edge keeps the entire window within the viewport", () => {
  assert.deepEqual(clampWindowPosition({ x: -200, y: -100 }, size, viewport), { x: 12, y: 12 })
  assert.deepEqual(clampWindowPosition({ x: 3000, y: 3000 }, size, viewport), { x: 708, y: 288 })
})

test("valid pointer positions are retained without snapping", () => {
  assert.deepEqual(clampWindowPosition({ x: 134.5, y: 230.25 }, size, viewport), { x: 134.5, y: 230.25 })
})

test("a resized window or viewport brings a formerly valid position back into reach", () => {
  const mobile = { width: 390, height: 844 }
  const responsiveWindow = { width: 366, height: 800 }
  assert.deepEqual(clampWindowPosition({ x: 708, y: 288 }, responsiveWindow, mobile), { x: 12, y: 32 })
})

test("the title bar stays reachable even while an oversized layout is being resized", () => {
  assert.deepEqual(clampWindowPosition({ x: 500, y: 500 }, { width: 1500, height: 1000 }, viewport), { x: 12, y: 12 })
})
