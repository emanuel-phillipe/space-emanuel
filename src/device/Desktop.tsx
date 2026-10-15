import WindowWorkspace from "../sections/WindowWorkspace"
import Desktop_Navigation from "../sections/Desktop_Navigation"

function Desktop() {
  return (
    <div className='w-full h-screen p-8 lg:p-10 relative overflow-hidden'>
      <div className='w-full h-full p-8 lg:p-12 div-container-body grid grid-cols-5 grid-rows-5 gap-4 text-zinc-50 relative'>
        <section className="col-span-2 row-span-5 h-full">
          <Desktop_Navigation />
        </section>
        <section className="col-span-3 row-span-5 col-start-3 h-full flex justify-end items-center">
          <WindowWorkspace />
        </section>
      </div>

      {/* Floating Interactive Overlays */}
    </div>
  )
}

export default Desktop