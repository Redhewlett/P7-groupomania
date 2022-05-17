import HomePage from './pages/HomePage'
import Profile from './pages/Profile'
import LandingPage from './pages/LandingPage'
import ArticleBuilder from './pages/ArticleBuilder'
import Article from './pages/Article'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { Routes, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { UserContext } from './context/UserContext'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookielist'])

  return (
    <UserContext.Provider value={{ cookies, setCookie, removeCookie }}>
      <Routes>
        <Route path='/' exact={true} element={<HomePage />} />
        <Route path='/landingpage' exact={true} element={<LandingPage />} />
        <Route path='/home' exact={true} element={<HomePage />} />
        <Route path='/profile' exact={true} element={<Profile />} />
        <Route path='/articlebuilder' exact={true} element={<ArticleBuilder />} />

        <Route path='/article/:id' exact={true} element={<Article />} />

        <Route path='/signup' exact={true} element={<Signup />} />
        <Route path='/signin' exact={true} element={<Signin />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
