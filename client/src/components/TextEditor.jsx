import { useState, useEffect, useContext } from 'react'
import { RichTextEditor } from '@mantine/rte'
import Axios from 'axios'
import { UserContext } from '../context/UserContext'
import Button from '../components/Button'
import styles from './TextEditor.module.css'
//this code structure is very important because it solves the problem
//of having multiple inputs, and since i use the riche text editor from mantine i can't access name.e.target
const initialValues = {
  title: '',
  tags: ''
}

const current = new Date()
const date = { date: ` ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}` }

function RichEditor() {
  const [userProfile, setUserProfile] = useState({})
  const { cookies } = useContext(UserContext)
  const [values, setValues] = useState(initialValues)
  const [article, setArticle] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }
  //get our user profile to send the name with the article
  useEffect(() => {
    Axios.get('http://localhost:4000/api/auth/profile', auth)
      .then((res) => {
        if (res) {
          setUserProfile(res.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const user_id = userProfile.id
    const author = userProfile.prenom + ' ' + userProfile.nom
    const articleObject = { ...values, article, ...date, user_id, author }
    console.log(articleObject)
    const url = 'http://localhost:4000/api/social/posts'
    Axios.post(url, articleObject, auth)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.inputs}
        type='text'
        value={values.title}
        onChange={handleInputChange}
        name='title'
        aria-label='title'
        placeholder='Titre de l article'
      />

      <RichTextEditor
        controls={[
          ['bold', 'italic', 'underline', 'link'],
          ['unorderedList', 'h1', 'h2', 'h3']
        ]}
        value={article}
        name='article'
        onChange={setArticle}
      />

      <input
        className={styles.inputs}
        type='text'
        value={values.tags}
        onChange={handleInputChange}
        name='tags'
        aria-label='hashtags'
        placeholder='Hashtags puis virgule'
      />
      <div className={styles.btn}>
        <Button>Poster!</Button>
      </div>
    </form>
  )
}

export default RichEditor
