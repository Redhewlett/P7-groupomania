import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import styles from './HomePage.module.css'
import { StyledCard } from '../components/Card'
import Button from '../components/Button'
import Axios from 'axios'
import { useCookies } from 'react-cookie'
import { UserContext } from '../context/UserContext'

export default function HomePage() {
  const { cookies, setCookie, removeCookie } = useContext(UserContext)
  const [articlesList, setArticlesList] = useState([])

  //for some reason axios is not setting the headers so we do it manually
  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }

  useEffect(() => {
    Axios.get('http://localhost:4000/api/social/posts', auth)
      .then((res) => {
        setArticlesList(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.recent}>
        <div className={styles.recent_three}>
          <h1>Récemment</h1>

          {articlesList.map((article) => (
            <div className={styles.card_hover} key={article.id}>
              <StyledCard color='white'>
                <Link to={'/article/' + article.id} className={styles.link}>
                  <h2>{article.title}</h2>
                  <h3>{article.article}</h3>
                  <span>publié par: {article.author}</span>
                </Link>
              </StyledCard>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.view_more}>
        <Button>Voir plus d'articles</Button>
      </div>
    </div>
  )
}
