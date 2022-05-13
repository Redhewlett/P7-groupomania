import { useState } from 'react'
import Axios from 'axios'
import { StyledCard } from '../components/Card'
import Button from '../components/Button'
import styles from './Signup.module.css'
import logo from '../assets/logos/icon.svg'
import illustration from '../assets/illustrations/Notifications_Flatline.svg'

export default function Login() {
  //set the values
  const [values, setValues] = useState({
    nom: '',
    prenom: '',
    email: '',
    departement: '',
    password: ''
  })

  //send data to the api
  const handleSubmit = (e) => {
    //data is sent only went the respect the patern or/and the built in html verification
    e.preventDefault()
    const url = 'http://localhost:4000/api/auth/signup'
    Axios.post(url, values)
      .then((res) => {
        //case mail is already used
        if (res.data.message === 'already in data base') {
          window.alert('already in data base')
          return
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //set the values onChange
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

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
    },
    {
      id: 5,
      name: 'password',
      type: 'password',
      placeholder: '8-20,1 lettre, 1 nombre, 1 character special',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.form_position}>
        <StyledCard color={'#65E2FD'}>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <div key={input.id} className={styles.form}>
                <label>{input.label}</label>
                <input key={input.id} {...input} value={values[input.name]} onChange={onChange} />
              </div>
            ))}

            <Button>S'inscrire</Button>
          </form>
        </StyledCard>
      </div>
      <img src={illustration} alt='illustration personnage avec une notification sur son telephone' className={styles.illustration} />
      <img src={logo} alt='groupomania logo' className={styles.logo} />
    </div>
  )
}
