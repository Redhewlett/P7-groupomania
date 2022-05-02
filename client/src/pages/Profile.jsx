import React from 'react'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import { StyledCard } from '../components/Card'
import { Avatar } from '@mantine/core'
import styles from './Profile.module.css'

export default function Profile() {
  return (
    <div>
      <NavBar />
      <div className={styles.profil_card_container}>
        <StyledCard color={'#ffac99'}>
          <div className={styles.inner_card_container}>
            <div className={styles.avatar}>
              <Avatar radius='xl' color='pink' />
            </div>

            <p>
              <strong>Prénom:</strong> John,
            </p>
            <p>
              <strong>Nom</strong> Doe,
            </p>
            <p>
              <strong>Département:</strong> Comptabilité,
            </p>
            <p>
              <strong>Email: </strong>johndoe@gmail.com,
            </p>
            <p>
              <strong>Nombre d'articles:</strong> 25
            </p>
            <hr />
            <Button>Delete Account</Button>
          </div>
        </StyledCard>
      </div>
    </div>
  )
}
