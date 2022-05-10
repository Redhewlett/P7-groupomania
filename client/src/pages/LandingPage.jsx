import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import logo from '../assets/logos/icon.svg'
import illustration from '../assets/illustrations/Notifications_Flatline.png'

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Bienvenue sur le réseau social de groupomania!</h1>
        <h2>Prêt(e) à apprendre à connaîtres vos collègues?</h2>
        <div className={styles.links}>
          <Link to='/signup' className={styles.link}>
            S'inscrire
          </Link>
          <Link to='/signin' className={styles.link}>
            Se connecter
          </Link>
        </div>
      </div>

      <img src={illustration} alt='illustration personnage avec une notification sur son telephone' className={styles.illustration} />
      <img src={logo} alt='groupomania logo' className={styles.logo} />
    </div>
  )
}
