import { BrowserRouter, Routes, Route } from 'react-router'
import StartScreen from './views/StartScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
