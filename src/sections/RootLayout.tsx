import SecondaryWindows from "../widgets/SecondaryWindows"
import { TerminalModal } from "../widgets/TerminalModal"
import { JadeModal } from "../widgets/JadeModal"
import { useState, useEffect } from "react"
import Desktop from "../device/Desktop"
import Mobile from "../device/Mobile"
import Desktop_Welcome from "../widgets/Desktop_Welcome"
import Mobile_Welcome from "../widgets/Mobile_Welcome"

export function RootLayout() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <>
    {isMobile ? <Mobile /> : <Desktop />}
    <SecondaryWindows />
    <TerminalModal />
    <JadeModal />
  </>
}

export function WelcomeRoute() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile ? <Mobile_Welcome /> : <Desktop_Welcome />
}
