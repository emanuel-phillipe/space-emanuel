import WindowWorkspace from "../sections/WindowWorkspace"
import { useTranslation } from "react-i18next"
import Mobile_Navigation from "../sections/Mobile_Navigation"

function Mobile() {
  const { t } = useTranslation()

  return (
    <div className='min-h-screen w-full p-6 pb-44 text-zinc-50 relative flex flex-col justify-between'>
      {/* Top Status */}
      <div className="pt-2 pb-6">
        <p className="text-zinc-400 font-outfit text-sm tracking-wide">
          <span className="font-bold text-zinc-300">{t("common.statusLabel")}</span> &nbsp; {t("common.statusText")}
        </p>
      </div>

      {/* Main Routed Content */}
      <main className="w-full flex-1 flex flex-col justify-center">
        <WindowWorkspace />
      </main>

      {/* Fixed Bottom Navigation */}
      <footer className="w-full fixed bottom-5 left-0 flex justify-center px-4 z-40 pointer-events-auto">
        <Mobile_Navigation />
      </footer>

      {/* Floating Modals */}
    </div>
  )
}

export default Mobile