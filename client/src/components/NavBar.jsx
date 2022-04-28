import React from 'react'
import styles from './NavBar.module.css'
import logo from '../assets/logos/icon-left-font-monochrome-white.svg'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className={styles.nav_contrainer}>
      <img className={styles.img} src={logo} alt='logo groupomania avec typo blanc' />
      <nav className={styles.nav}>
        <Link to='/home' style={{ textDecoration: 'none' }}>
          <li>Home</li>
        </Link>

        <Link to='/articlebuilder' style={{ textDecoration: 'none' }}>
          <li>Écrire un article</li>
        </Link>

        <Link to='/profile' style={{ textDecoration: 'none' }}>
          <li>Profile</li>
        </Link>
      </nav>
    </div>
  )
}
