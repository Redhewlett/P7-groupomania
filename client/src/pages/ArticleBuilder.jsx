import { useState, useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import styles from './ArticleBuilder.module.css'
import RichEditor from '../components/TextEditor'
import { useCookies } from 'react-cookie'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function ArticleBuilder() {
  const { cookies } = useContext(UserContext)
  const navigate = useNavigate()

  //check if we are already loggedin
  useEffect(() => {
    const cookieList = cookies.token
    if (!cookieList) {
      console.log('not logged in')
      navigate('/signin')
    }
  }, [cookies.token, navigate])

  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }
  //post request here, dont forget to pass the auth constant

  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.article_editor_container}>
        <div className={styles.richTextEditor_root}>
          <RichEditor />
        </div>
      </div>
    </div>
  )
}
