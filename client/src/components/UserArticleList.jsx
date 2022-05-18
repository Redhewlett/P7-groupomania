import { useState, useEffect, useContext } from 'react'
import { useCookies } from 'react-cookie'
import Axios from 'axios'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import { StyledCard } from '../components/Card'
import styles from './UserArticleList.module.css'

export default function UserArticleList() {
  const [userArticleList, setUserArticleList] = useState([])
  const { cookies, setCookie, removeCookie } = useContext(UserContext)
  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }
  //get the list of articles created by that user
  useEffect(() => {
    Axios.get('http://localhost:4000/api/social/articles', auth)
      .then((res) => {
        if (res) {
          setUserArticleList(res.data)
        }
      })
      .catch((error) => {
        //if error(meaning no token to identify the user) redirect and log
        console.log(error)
      })
  })

  const handleDelete = (e) => {
    const idPostToDelete = e.target.id
    Axios.delete(`http://localhost:4000/api/social/posts/${idPostToDelete}`, auth)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={styles.article_container}>
      <div className={styles.articleList}>
        <h1>All your articles, click to edit</h1>
        {userArticleList.map((articleListArticle) => (
          <div className={styles.card} key={articleListArticle.id}>
            <StyledCard color='white'>
              <Link to={'/articleManager/' + articleListArticle.id} className={styles.link}>
                <h2>{articleListArticle.title}</h2>
                <h3>{articleListArticle.date}</h3>
              </Link>
              <button className={styles.delete_button} id={articleListArticle.id} onClick={handleDelete}>
                supprimer
              </button>
            </StyledCard>
          </div>
        ))}
      </div>
    </div>
  )
}
