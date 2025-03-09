import { ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme.ts'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import SignUp from './pages/SignUp.tsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<SignUp/>}/>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
