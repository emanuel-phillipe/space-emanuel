import './App.css'
import HomeLeftCorner from './sections/HomeLeftCorner'
import Welcome from './widgets/Welcome'

function App() {
  return (
    <div className='w-full h-screen p-12 div-container-body grid grid-cols-5 grid-rows-5 gap-4 text-zinc-50'>
      <section className="col-span-2 row-span-5"><HomeLeftCorner /></section>
      <section className="col-span-2 row-span-5 col-start-4 h-full flex justify-end items-center"><Welcome /></section>
    </div>
  )
}

export default App
