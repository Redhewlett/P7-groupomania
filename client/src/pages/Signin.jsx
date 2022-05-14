import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { StyledCard } from '../components/Card'
import Button from '../components/Button'
import styles from './Signin.module.css'
import logo from '../assets/logos/icon.svg'
import illustration from '../assets/illustrations/Notifications_Flatline.svg'

export default function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [alertLoginError, setAlertLoginError] = useState('')

  const [cookies, setCookie, removeCookie] = useCookies(['cookielist'])

  const navigate = useNavigate()

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  Axios.defaults.withCredentials = true
  //send data to the api
  const handleSubmit = (e) => {
    e.preventDefault()
    const url = 'http://localhost:4000/api/auth/login'
    Axios.post(url, values)
      .then((res) => {
        if (res.data.message === 'Wrong username/password combination!') {
          //err msg then we cn't login

          setAlertLoginError(res.data.message)
        } else {
          //if not we are logged in sucessfully so we go to the home page
          //console.log(res)
          window.location.reload()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //check if we are already loggedin (this should redirect if we are)
  useEffect(() => {
    const cookieList = cookies.token
    if (!cookieList) {
      return console.log('not logged in')
    }
    navigate('/home')
  }, [cookies.token, navigate])

  return (
    <div className={styles.container}>
      <div className={styles.form_position}>
        <StyledCard color={'#65E2FD'}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' placeholder='Email' onChange={onChange} required />

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' placeholder='votre mot de passe' onChange={onChange} required />
            <span className={styles.login_error}>{alertLoginError}</span>
            <Button>Connexion</Button>
          </form>
        </StyledCard>
      </div>
      <img src={illustration} alt='illustration personnage avec une notification sur son telephone' className={styles.illustration} />
      <img src={logo} alt='groupomania logo' className={styles.logo} />
    </div>
  )
}
