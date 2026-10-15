import { createContext, useContext } from "react"

export type DetailWindowId = "skills" | "courses" | "languages" | "localiza" | "grupoFacil" | "summary" | "channels"

export interface WindowManagerState {
  details: DetailWindowId[]
  order: string[]
  openDetail: (id: DetailWindowId) => void
  closeDetail: (id: DetailWindowId) => void
  focusWindow: (id: string) => void
  releaseWindow: (id: string) => void
}

export const WindowManagerContext = createContext<WindowManagerState | null>(null)

export function useWindowManager() {
  const context = useContext(WindowManagerContext)
  if (!context) throw new Error("WindowManagerProvider is required")
  return context
}
