import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { ModalProvider } from './context/ModalContext'
import { WindowManagerProvider } from './context/WindowManagerProvider'
import './App.css'

function App() {
  return (
    <ModalProvider>
      <WindowManagerProvider>
        <RouterProvider router={router} />
      </WindowManagerProvider>
    </ModalProvider>
  )
}

export default App
