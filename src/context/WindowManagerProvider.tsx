import { useCallback, useState, type ReactNode } from "react"
import { WindowManagerContext, type DetailWindowId } from "./WindowManagerContext"

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [details, setDetails] = useState<DetailWindowId[]>([])
  const [order, setOrder] = useState<string[]>([])
  const focusWindow = useCallback((id: string) => {
    setOrder((previous) => previous.at(-1) === id ? previous : [...previous.filter((item) => item !== id), id])
  }, [])
  const releaseWindow = useCallback((id: string) => {
    setOrder((previous) => previous.filter((item) => item !== id))
  }, [])
  const openDetail = useCallback((id: DetailWindowId) => {
    setDetails((previous) => previous.includes(id) ? previous : [...previous, id])
    focusWindow(id)
  }, [focusWindow])
  const closeDetail = useCallback((id: DetailWindowId) => {
    setDetails((previous) => previous.filter((item) => item !== id))
    setOrder((previous) => previous.filter((item) => item !== id))
  }, [])

  return (
    <WindowManagerContext.Provider value={{ details, order, openDetail, closeDetail, focusWindow, releaseWindow }}>
      {children}
    </WindowManagerContext.Provider>
  )
}
