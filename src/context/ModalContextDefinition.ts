import { createContext } from "react"

export interface ModalContextType {
  isTerminalOpen: boolean
  isJadeOpen: boolean
  openTerminal: () => void
  closeTerminal: () => void
  toggleTerminal: () => void
  openJade: () => void
  closeJade: () => void
  toggleJade: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)
