import HomePage from './pages/HomePage'
import Profile from './pages/Profile'
import LandingPage from './pages/LandingPage'
import ArticleBuilder from './pages/ArticleBuilder'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/articlebuilder' element={<ArticleBuilder />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App
