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
        <Route path='/' exact={true} element={<HomePage />} />
        <Route path='/landingpage' exact={true} element={<LandingPage />} />
        <Route path='/home' exact={true} element={<HomePage />} />
        <Route path='/profile' exact={true} element={<Profile />} />
        <Route path='/articlebuilder' exact={true} element={<ArticleBuilder />} />
        <Route path='/signup' exact={true} element={<Signup />} />
        <Route path='/signin' exact={true} element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App
