import './App.css'
import Desktop from './device/Desktop'
import Mobile from './device/Mobile'

function App() {

  const isMobile = window.innerWidth < 768

  return (
    <div className='w-full h-screen p-10'>
      {!isMobile ? <Desktop /> : <Mobile />}
    </div>
  )
}

export default App
