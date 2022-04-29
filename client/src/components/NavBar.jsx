import React from 'react'
import styles from './NavBar.module.css'
import logo from '../assets/logos/icon-left-font-monochrome-white.svg'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className={styles.nav_contrainer}>
      <img className={styles.img} src={logo} alt='logo groupomania avec typo blanc' />
      <nav className={styles.nav}>
        <NavLink to='/home' exact='true' className={(navData) => (navData.isActive ? 'active' : 'none')} style={{ textDecoration: 'none' }}>
          <li>Home</li>
        </NavLink>

        <NavLink to='/articlebuilder' className={(navData) => (navData.isActive ? 'active' : 'none')} style={{ textDecoration: 'none' }}>
          <li>Écrire un article</li>
        </NavLink>

        <NavLink to='/profile' className={(navData) => (navData.isActive ? 'active' : 'none')} style={{ textDecoration: 'none' }}>
          <li>Profile</li>
        </NavLink>
      </nav>
    </div>
  )
}
