import Desktop_Navigation from "../sections/Desktop_Navigation"
import Desktop_Welcome from "../widgets/Desktop_Welcome"

function Desktop() {
  return (
    <div className='w-full h-full p-12 div-container-body grid grid-cols-5 grid-rows-5 gap-4 text-zinc-50'>
      <section className="col-span-2 row-span-5"><Desktop_Navigation /></section>
      <section className="col-span-2 row-span-5 col-start-4 h-full flex justify-end items-center"><Desktop_Welcome /></section>
    </div>
  )
}

export default Desktop