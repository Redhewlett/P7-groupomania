import styles from './NavBar.module.css'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logos/icon-left-font-monochrome-white.svg'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@mantine/core'
import Button from '../components/Button'
import Axios from 'axios'

export default function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookielist'])
  const navigate = useNavigate()

  const handleLogOut = () => {
    removeCookie('token')
    window.location.reload()

    // Axios.get('http://localhost:4000/api/auth/logOut')
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  return (
    <div className={styles.nav_contrainer}>
      <img className={styles.img} src={logo} alt='logo groupomania avec typo blanc' />
      <nav className={styles.nav}>
        <NavLink to='/home' exact='true' className={(navData) => (navData.isActive ? styles.active : 'none')} style={{ textDecoration: 'none' }}>
          <li>Home</li>
        </NavLink>

        <NavLink to='/articlebuilder' className={(navData) => (navData.isActive ? styles.active : 'none')} style={{ textDecoration: 'none' }}>
          <li>Écrire un article</li>
        </NavLink>

        <NavLink to='/profile' className={(navData) => (navData.isActive ? styles.active : 'none')} style={{ textDecoration: 'none' }}>
          <li>
            <Avatar radius='xl' color='pink' />
          </li>
        </NavLink>
        <Button className={styles.logOut} onClick={handleLogOut}>
          LogOut
        </Button>
      </nav>
    </div>
  )
}
