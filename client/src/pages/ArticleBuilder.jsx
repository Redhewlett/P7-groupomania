import { React, useState } from 'react'
import NavBar from '../components/NavBar'
import styles from './ArticleBuilder.module.css'
import RichEditor from '../components/TextEditor'

const MyInput = ({ name, ariaLabel, placeholder, maxLength = 5 }) => {
  const [value, setValue] = useState('')
  const onChange = (evt) => {
    setValue(evt.target.value)
  }

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
