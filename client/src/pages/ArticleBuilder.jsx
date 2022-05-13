import { useState, useContext } from 'react'
import NavBar from '../components/NavBar'
import styles from './ArticleBuilder.module.css'
import RichEditor from '../components/TextEditor'
import { useCookies } from 'react-cookie'
import { UserContext } from '../context/UserContext'

const MyInput = ({ name, ariaLabel, placeholder, maxLength = 5 }) => {
  const [value, setValue] = useState('')
  const onChange = (evt) => {
    setValue(evt.target.value)
  }
  const { cookies, setCookie, removeCookie } = useContext(UserContext)

  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }
  //post request here, dont forget to pass the auth constant

  return (
    <div className={styles.inputs}>
      <input type='text' value={value} onChange={onChange} aria-label={ariaLabel} name={name} placeholder={placeholder} />
    </div>
  )
}

export default function ArticleBuilder() {
  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.article_editor_container}>
        <MyInput ariaLabel='titre' name='title' placeholder='Titre...' maxLength={100} />
        <div className={styles.richTextEditor_root}>
          <RichEditor />
        </div>
        <MyInput ariaLabel='hashtag' name='hashtag' placeholder='hashtags puis virgule' />
      </div>
    </div>
  )
}
