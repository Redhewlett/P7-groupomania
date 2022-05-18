import { useState, useEffect, useContext } from 'react'
import NavBar from '../components/NavBar'
import { StyledCard } from '../components/Card'
import styles from './ArticleManager.module.css'
import { RichTextEditor } from '@mantine/rte'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { UserContext } from '../context/UserContext'
import Button from '../components/Button'

export default function ArticleManager() {
  const id = useParams('id').id
  //tags and title
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  //article
  const [article, setArticle] = useState('')
  const [oldArticle, setOldArticle] = useState('')

  const { cookies, setCookie, removeCookie } = useContext(UserContext)

  const auth = {
    headers: { Authorization: 'JWT ' + cookies.token }
  }

  useEffect(() => {
    Axios.get(`http://localhost:4000/api/social/posts/${id}`, auth)
      .then((res) => {
        setArticle(res.data[0].article)
        setOldArticle(res.data[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleTags = (e) => {
    setTags(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const NewArticleObject = { title, article, tags, date: oldArticle.date, author: oldArticle.author, user_id: oldArticle.user_id, id: oldArticle.id }
    console.log(NewArticleObject)

    const url = `http://localhost:4000/api/social/posts/${id}`
    Axios.put(url, NewArticleObject, auth)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <NavBar />
      <div className={styles.main_container}>
        <h1>Modifying your Article</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.editor}>
            <input
              className={styles.inputs}
              type='text'
              value={title}
              onChange={handleTitle}
              name='title'
              aria-label='title'
              placeholder='Nouveau titre de l article'
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
              value={tags}
              onChange={handleTags}
              name='tags'
              aria-label='hashtags'
              placeholder='Reformulez vos hashtags'
            />

            <Button>Poster!</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
