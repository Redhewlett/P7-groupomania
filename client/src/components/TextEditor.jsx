import { useState } from 'react'
import { RichTextEditor } from '@mantine/rte'
import Button from '../components/Button'

function RichEditor() {
  const [article, setArticle] = useState()
  const [title, setTitle] = useState(' ')
  const [hashtags, setHashtags] = useState(' ')
  const handlePost = () => {
    console.log(title)
    console.log(article)
    console.log(hashtags)
  }

  //value to access what the user types
  return (
    <div>
      <input type='text' onChange={setTitle} aria-label='titre' name='titre' placeholder='titre de l article' />

      <RichTextEditor value={article} onChange={setArticle} />

      <input type='text' onChange={setHashtags} aria-label='hashtag' name='hastag' placeholder='hashtags puis virgule' />

      <Button onClick={handlePost}>Poster!</Button>
    </div>
  )
}

export default RichEditor
