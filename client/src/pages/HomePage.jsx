import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import styles from './HomePage.module.css'
import { StyledCard } from '../components/Card'
import Button from '../components/Button'
import Axios from 'axios'
import { useCookies } from 'react-cookie'
import { UserContext } from '../context/UserContext'
import { Collapse } from '@mantine/core'

export default function HomePage() {
  const { cookies, setCookie, removeCookie } = useContext(UserContext)
  //full article list
  const [articlesList, setArticlesList] = useState([])
  //last 3 posted article
  const [lastArticles, setLastArticles] = useState([])
  //article list without the 3 most recents
  const [restOfArticles, setRestOfArticles] = useState([])
  //collapse
  const [opened, setOpen] = useState(false)

  //for some reason axios is not setting the headers so we do it manually
  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }

  useEffect(() => {
    Axios.get('http://localhost:4000/api/social/posts', auth)
      .then((res) => {
        setArticlesList(res.data)
        const recentOne = res.data[res.data.length - 1]
        const recentTwo = res.data[res.data.length - 2]
        const recentThree = res.data[res.data.length - 3]
        setLastArticles([recentOne, recentTwo, recentThree])
        setRestOfArticles(res.data.slice(0, articlesList.length - 3))
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

          {lastArticles.map((lastArticle) => (
            <div className={styles.card_hover} key={lastArticle.id}>
              <StyledCard color='white'>
                <Link to={'/article/' + lastArticle.id} className={styles.link}>
                  <h2>{lastArticle.title}</h2>
                  <h3>
                    <div className={styles.summary} dangerouslySetInnerHTML={{ __html: lastArticle.decodedArticle }}></div>
                  </h3>
                  <span>publié par: {lastArticle.author}</span>
                </Link>
              </StyledCard>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.view_more}>
        <Button onClick={() => setOpen((o) => !o)}>Voir plus d'articles</Button>
      </div>
      <Collapse in={opened} transitionDuration={1000} transitionTimingFunction='linear'>
        <div className={styles.other_articles}>
          {restOfArticles.map((restOfArticle) => (
            <div className={styles.card_hover} key={restOfArticle.id}>
              <StyledCard color='white'>
                <Link to={'/article/' + restOfArticle.id} className={styles.link}>
                  <h2>{restOfArticle.title}</h2>
                  <h3>
                    <div className={styles.summary} dangerouslySetInnerHTML={{ __html: restOfArticle.decodedArticle }}></div>
                  </h3>
                  <span>publié par: {restOfArticle.author}</span>
                </Link>
              </StyledCard>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  )
}
