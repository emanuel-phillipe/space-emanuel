import OpenDetailButton from "../components/OpenDetailButton"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import {
  DownloadSimpleIcon,
  ArrowSquareOutIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowCounterClockwiseIcon,
  CaretLeftIcon,
  CaretRightIcon,
  FilePdfIcon,
  CircleNotchIcon,
  WarningCircleIcon
} from "@phosphor-icons/react"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import cvPdf from "../assets/Curriculo_Emanuel_Carvalho.pdf"

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

function Desktop_Curriculo() {
  const { t } = useTranslation()
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [containerWidth, setContainerWidth] = useState<number>(550)
  const [loadError, setLoadError] = useState(false)

  const viewerContainerRef = useRef<HTMLDivElement>(null)

  // Measure container width for responsive PDF page scaling
  useEffect(() => {
    const updateWidth = () => {
      if (viewerContainerRef.current) {
        // Leave room for padding (e.g. 32px on desktop, 16px on mobile)
        const offset = window.innerWidth < 640 ? 24 : 48
        const availableWidth = viewerContainerRef.current.clientWidth - offset
        if (availableWidth > 0) {
          setContainerWidth(Math.min(availableWidth, 650))
        }
      }
    }

    updateWidth()
    const resizeObserver = new ResizeObserver(updateWidth)
    if (viewerContainerRef.current) {
      resizeObserver.observe(viewerContainerRef.current)
    }

    window.addEventListener("resize", updateWidth)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
    setLoadError(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error("Erro ao carregar o PDF:", error)
    setLoadError(true)
  }

  const handleZoomIn = () => setScale((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 2.0))
  const handleZoomOut = () => setScale((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.6))
  const handleResetZoom = () => setScale(1.0)

  const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setPageNumber((prev) => (numPages ? Math.min(prev + 1, numPages) : prev))

  return (
    <section className="w-full h-[min(680px,calc(100dvh-100px))] flex flex-col">
      {/* Outer Card */}
      <div className="w-full h-full flex flex-col overflow-hidden">
        
        {/* Window Title & Action Bar */}
        <div className="flex flex-wrap gap-2 items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-950/60 select-none">
          <div className="flex items-center gap-3">
            {/* Document badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
              <FilePdfIcon size={15} className="text-red-400" />
              <span>{t("curriculum.fileName")}</span>
            </div>
          </div>

          <OpenDetailButton detail="summary">{t("windows.actions.summary")}</OpenDetailButton>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Open in new tab button */}
            <a
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800 transition-colors"
              title={t("curriculum.openInNewTab")}
            >
              <ArrowSquareOutIcon size={18} />
            </a>

            {/* Primary Download Button */}
            <a
              href={cvPdf}
              download="Curriculo_Emanuel_Carvalho.pdf"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 active:scale-95 text-zinc-100 text-sm font-medium font-poppins transition-all shadow-lg shadow-violet-950/40"
              title={t("curriculum.downloadTooltip")}
            >
              <DownloadSimpleIcon size={18} weight="bold" />
              <span>{t("curriculum.download")}</span>
            </a>
          </div>
        </div>

        {/* Secondary Toolbar: Zoom & Pagination */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/60 bg-zinc-900/40 text-xs font-outfit text-zinc-400 select-none">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.6}
              className="p-1.5 rounded hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-transparent text-zinc-300 hover:text-zinc-100 transition-colors"
              title={t("curriculum.zoomOut")}
            >
              <MagnifyingGlassMinusIcon size={16} />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 rounded hover:bg-zinc-800 font-mono text-zinc-300 hover:text-violet-400 transition-colors"
              title={t("curriculum.resetZoom")}
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 2.0}
              className="p-1.5 rounded hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-transparent text-zinc-300 hover:text-zinc-100 transition-colors"
              title={t("curriculum.zoomIn")}
            >
              <MagnifyingGlassPlusIcon size={16} />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:inline-flex"
              title={t("curriculum.fitScreen")}
            >
              <ArrowCounterClockwiseIcon size={15} />
            </button>
          </div>

          {/* Page Counter & Controls */}
          <div className="flex items-center gap-1.5">
            {numPages && numPages > 1 && (
              <>
                <button
                  onClick={handlePrevPage}
                  disabled={pageNumber <= 1}
                  className="p-1.5 rounded hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-transparent text-zinc-300 hover:text-zinc-100 transition-colors"
                  title={t("curriculum.prevPage")}
                >
                  <CaretLeftIcon size={15} weight="bold" />
                </button>
                <span className="font-mono text-zinc-300 px-1">
                  {t("curriculum.pageCounter", { current: pageNumber, total: numPages })}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={pageNumber >= numPages}
                  className="p-1.5 rounded hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-transparent text-zinc-300 hover:text-zinc-100 transition-colors"
                  title={t("curriculum.nextPage")}
                >
                  <CaretRightIcon size={15} weight="bold" />
                </button>
              </>
            )}
            {numPages && numPages <= 1 && (
              <span className="font-mono text-zinc-400">{t("curriculum.pageCounter", { current: 1, total: 1 })}</span>
            )}
          </div>
        </div>

        {/* PDF Document Canvas Viewport */}
        <div
          ref={viewerContainerRef}
          className="flex-1 overflow-auto bg-zinc-950/80 p-4 flex justify-center items-start relative select-text"
          style={{ minHeight: 0 }}
        >
          {loadError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center my-auto">
              <WarningCircleIcon size={48} className="text-amber-400 mb-3" />
              <p className="text-zinc-200 font-medium text-base mb-1">
                {t("curriculum.errorTitle")}
              </p>
              <p className="text-zinc-400 text-sm max-w-sm mb-5">
                {t("curriculum.errorDesc")}
              </p>
              <a
                href={cvPdf}
                download="Curriculo_Emanuel_Carvalho.pdf"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all shadow-lg"
              >
                <DownloadSimpleIcon size={18} />
                <span>{t("curriculum.downloadFallback")}</span>
              </a>
            </div>
          ) : (
            <div className="transition-transform duration-150 ease-out origin-top flex justify-center">
              <Document
                file={cvPdf}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <CircleNotchIcon size={32} className="text-violet-400 animate-spin" />
                    <span className="text-sm font-outfit text-zinc-400">
                      {t("curriculum.loading")}
                    </span>
                  </div>
                }
              >
                <div className="shadow-2xl rounded-lg overflow-hidden border border-zinc-800/80">
                  <Page
                    error={t("curriculum.errorDesc")}
                    noData={t("curriculum.errorDesc")}
                    pageNumber={pageNumber}
                    width={containerWidth}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={
                      <div className="w-full h-[600px] flex items-center justify-center bg-zinc-900/40 rounded-lg">
                        <CircleNotchIcon size={28} className="text-violet-400 animate-spin" />
                      </div>
                    }
                  />
                </div>
              </Document>
            </div>
          )}
        </div>

        {/* Footer Info Bar */}
        <div className="px-5 py-2.5 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-xs text-zinc-400 font-outfit select-none">
          <div className="flex items-center gap-3">
            <span className="text-zinc-300 font-medium">Emanuel Phillipe</span>
            <span className="text-zinc-600">•</span>
            <span>{t("curriculum.city")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Desktop_Curriculo
