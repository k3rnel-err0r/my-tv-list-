import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './components/Home'
import List from './components/List'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<List />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
