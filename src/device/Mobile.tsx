import Mobile_Navigation from "../sections/Mobile_Navigation"
import Mobile_Welcome from "../widgets/Mobile_Welcome"

function Mobile() {
  return (
    <div className='text-zinc-50'>
      <main className="">
        <Mobile_Welcome />
      </main>
      <footer className="w-full fixed bottom-6 left-0 flex justify-center">
        <Mobile_Navigation />
      </footer>
    </div>
  )
}

export default Mobile