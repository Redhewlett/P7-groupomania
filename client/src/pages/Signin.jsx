import React from 'react'
import { StyledCard } from '../components/Card'
import Button from '../components/Button'
import styles from './Signin.module.css'
import logo from '../assets/logos/icon.svg'
import illustration from '../assets/illustrations/Notifications_Flatline.png'

export default function Signin() {
  return (
    <div className={styles.container}>
      <div className={styles.form_position}>
        <StyledCard color={'#65E2FD'}>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' placeholder='Email' />

          <label htmlFor='password'>Password</label>
          <input type='password' name='password' placeholder='votre mot de passe' />

          <Button>Connexion</Button>
        </StyledCard>
      </div>
      <img src={illustration} alt='illustration personnage avec une notification sur son telephone' className={styles.illustration} />
      <img src={logo} alt='groupomania logo' className={styles.logo} />
    </div>
  )
}
