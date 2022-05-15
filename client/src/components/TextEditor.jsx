import { useState } from 'react'
import { RichTextEditor } from '@mantine/rte'
import Button from '../components/Button'
import styles from './TextEditor.module.css'
//this code structure is very important because it solves the problem
//of having multiple inputs, and since i use the riche text editor from mantine i can't access name.e.target
const initialValues = {
  title: '',
  hashtags: ''
}

function RichEditor() {
  const [values, setValues] = useState(initialValues)
  const [article, setArticle] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const articleObject = { ...values, article }
    console.log(articleObject)
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

      <RichTextEditor value={article} name='article' onChange={setArticle} />

      <input
        className={styles.inputs}
        type='text'
        value={values.hashtags}
        onChange={handleInputChange}
        name='hashtags'
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
