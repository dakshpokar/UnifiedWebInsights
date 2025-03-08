import { ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme.ts'
import Home from './pages/Home'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
