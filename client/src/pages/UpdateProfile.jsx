import NavBar from '../components/NavBar'
import { StyledCard } from '../components/Card'
import styles from './UpdateProfile.module.css'
import Axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import pen from '../assets/icons/pen-to-square-solid.svg'
import Button from '../components/Button'

export default function UpdateProfile() {
  const [values, setValues] = useState({
    nom: '',
    prenom: '',
    email: '',
    departement: ''
  })
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
          setValues(res.data)
        }
      })
      .catch((error) => {
        //if error(meaning no token to identify the user) redirect and log
        navigate('/signin')
        console.log(error)
      })
  }, [])

  // input array for light html below
  const inputs = [
    {
      id: 1,
      name: 'nom',
      type: 'text',
      placeholder: 'Nom',
      label: 'Nom',
      pattern: '^[A-Za-zÀ-ú]{3,20}$',
      required: true
    },
    {
      id: 2,
      name: 'prenom',
      type: 'text',
      placeholder: 'Prénom',
      label: 'Prénom',
      pattern: '^[A-Za-zÀ-ú]{3,20}$',
      required: true
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'monemail@gmail.com',
      label: 'Email',
      required: true
    },
    {
      id: 4,
      name: 'departement',
      type: 'text',
      placeholder: 'Département au seins de groupomania',
      label: 'Département',
      pattern: '^[A-Za-zÀ-ú ]{3,30}$',
      required: true
    }
  ]

  //set the values onChange
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    //data is sent only went the respect the patern or/and the built in html verification
    e.preventDefault()

    const url = 'http://localhost:4000/api/auth/profile'
    Axios.put(url, values, auth)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
    navigate('/profile')
  }

  return (
    <div>
      <NavBar />
      <div className={styles.form_position}>
        <StyledCard color={'#65E2FD'}>
          <h1>Modifier mon profile</h1>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <div key={input.id} className={styles.form}>
                <label>{input.label}</label>
                <input key={input.id} {...input} value={values[input.name]} onChange={onChange} />
              </div>
            ))}
            <Button>Enregistrer les modifications</Button>
          </form>
        </StyledCard>
      </div>
    </div>
  )
}
