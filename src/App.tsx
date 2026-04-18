import { BrowserRouter, Routes, Route } from 'react-router'
import StartScreen from './views/StartScreen'
import GameScreen from './views/GameScreen'
import VictoryScreen from './views/VictoryScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/victory" element={<VictoryScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
