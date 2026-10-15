import { useNavigate, useRouter, useRouterState } from "@tanstack/react-router"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useTranslation } from "react-i18next"
import AppWindow from "../components/AppWindow"

const pages: Record<string, { title: string; width: number }> = {
  "/sobre-mim": { title: "about.screenDesc", width: 660 },
  "/informacoes": { title: "info.screenDesc", width: 660 },
  "/formacoes": { title: "education.screenDesc", width: 560 },
  "/experiencia": { title: "experience.screenDesc", width: 620 },
  "/curriculo": { title: "curriculum.screenDesc", width: 900 },
  "/contato": { title: "contact.screenDesc", width: 650 },
}

function RouteWindow({ routeId }: { routeId: string }) {
  const router = useRouter()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const Component = router.routesById[routeId as keyof typeof router.routesById]?.options.component
  const page = pages[routeId]
  if (!Component) return null
  if (!page) return <motion.div className="w-full flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.15 }}><Component /></motion.div>
  return (
    <AppWindow id={routeId} title={t(page.title)} width={page.width} primary onClose={() => { void navigate({ to: "/" }) }}>
      <Component />
    </AppWindow>
  )
}

export default function WindowWorkspace() {
  const routeId = useRouterState({ select: (state) => state.matches.at(-1)!.routeId })
  // Retain the actual route component during exit. An Outlet would read the new
  // match immediately and replace the old window's content before it closes.
  return <AnimatePresence mode="wait"><RouteWindow key={routeId} routeId={routeId} /></AnimatePresence>
}
