import NavBar from '../components/NavBar'
import Button from '../components/Button'
import { StyledCard } from '../components/Card'
import { Avatar } from '@mantine/core'
import styles from './Profile.module.css'
import Axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@mantine/core'

export default function Profile() {
  //modal
  const [opened, setOpened] = useState(false)
  //user profile
  const [userProfile, setUserProfile] = useState({})
  const { cookies, setCookie, removeCookie } = useContext(UserContext)

  const navigate = useNavigate()
  //for some reason axios is not setting the headers so we do it manually
  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }
  //get the user info with the token
  useEffect(() => {
    if (!cookies.token) {
      return navigate('/signin')
    }
    Axios.get('http://localhost:4000/api/auth/profile', auth)
      .then((res) => {
        if (res) {
          setUserProfile(res.data)
        }
      })
      .catch((error) => {
        //if error(meaning no token to identify the user) redirect and log
        navigate('/signin')
        console.log(error)
      })
  }, [])

  //deleting the account
  const handleDelete = () => {
    removeCookie('token')
    setOpened(false)
    navigate('/landingpage')
    Axios.delete('http://localhost:4000/api/auth/deleteAccount', auth)
      .then((res) => {})
      .catch((error) => {
        console.log(error)
      })
  }

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
              <strong>Prénom:</strong> {userProfile ? `${userProfile.nom}` : <p>no user?</p>},
            </p>
            <p>
              <strong>Nom</strong> {userProfile ? `${userProfile.prenom}` : <p>no user?</p>},
            </p>
            <p>
              <strong>Département:</strong> {userProfile ? `${userProfile.departement}` : <p>no user?</p>},
            </p>
            <p>
              <strong>Email: </strong>
              {userProfile ? `${userProfile.email}` : <p>no user?</p>},
            </p>
            <hr />
            <Modal opened={opened} size='sm' onClose={() => setOpened(false)}>
              <div className={styles.modal_content}>
                <p>Êtes-vous certain(e)? vous perdrez vos données de manière permanente!</p>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={() => setOpened(false)}>No</Button>
              </div>
            </Modal>
            <Button onClick={() => setOpened(true)}>Delete Account</Button>
          </div>
        </StyledCard>
      </div>
    </div>
  )
}
