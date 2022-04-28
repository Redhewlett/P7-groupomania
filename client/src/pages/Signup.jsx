import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import styles from './Signup.module.css'
import logo from '../assets/logos/icon.svg'
import illustration from '../assets/illustrations/Notifications_Flatline.png'

export default function Login() {
  return (
    <div className={styles.container}>
      <Card color='white'>
        <label for='name'>Nom</label>
        <input type='text' name='nom' placeholder='Nom' />

        <label for='prenom'>Prénom</label>
        <input type='text' name='prenom' placeholder='Prenom' />

        <label for='email'>Email</label>
        <input type='text' name='email' placeholder='Email' />

        <label for='email'>Département groupomania</label>
        <input type='text' name='Département' placeholder='Département' />

        <label for='password'>Password</label>
        <input type='password' name='password' placeholder='Secure Password' />

        <div>
          <Button>S'inscrire</Button>
        </div>
      </Card>
      <img src={illustration} alt='illustration personnage avec une notification sur son telephone' className={styles.illustration} />
      <img src={logo} alt='groupomania logo' className={styles.logo} />
    </div>
  )
}
