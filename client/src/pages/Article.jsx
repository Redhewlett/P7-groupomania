import { useState, useEffect, useContext } from 'react'
import NavBar from '../components/NavBar'
import { StyledCard } from '../components/Card'
import styles from './Article.module.css'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { UserContext } from '../context/UserContext'

import trash from '../assets/icons/trash-can-regular.svg'

export default function Article() {
  const id = useParams('id').id
  const [article, setArticle] = useState([])
  const { cookies, setCookie, removeCookie } = useContext(UserContext)

  //random id for tags
  const randomKey = () => {
    const num = Math.random()
    const randomId = num.toString()
    return randomId
  }

  //for some reason axios is not setting the headers so we do it manually
  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }

  useEffect(() => {
    Axios.get(`http://localhost:4000/api/social/posts/${id}`, auth)
      .then((res) => {
        setArticle(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  return (
    <div>
      <NavBar />
      <div className={styles.main_container}>
        {article.map((article) => (
          <div key={article.id} className={styles.article_container}>
            <StyledCard color='#ffac99'>
              <div className={styles.title_line}>
                <h1>{article.title}</h1>
                <img className={styles.trash} src={trash} alt='trash icon' />
              </div>

              <div className={styles.article_text}>
                <p>{article.article}</p>
              </div>

              <span className={styles.info}>
                <p>Written by: {article.author}</p>
              </span>
              <span className={styles.tags}>
                {article.tags.split(/[, ]+/).map((article) => (
                  <p key={randomKey()}>#{article}</p>
                ))}
              </span>
            </StyledCard>
          </div>
        ))}
      </div>
    </div>
  )
}
