import { React, useState } from 'react'
import NavBar from '../components/NavBar'
import styles from './ArticleBuilder.module.css'
import RichEditor from '../components/TextEditor'

const MyInput = ({ name, ariaLabel, placeholder, maxLength = 5 }) => {
  const [value, setValue] = useState('')
  const onChange = (evt) => {
    setValue(evt.target.value)
    // the code down below should be used to limit the lenght of an input field
    // const inputValue = evt.target.value
    // const valueLength = inputValue.split('').length
    // if (valueLength < maxLength) {
    //   setValue(evt.target.value)
    // } else {
    //   //alerté que le titre ou le ashtag est trop long, ou ne rien faire
    // }
  }

  return (
    <div className={styles.inputs}>
      <input type='text' value={value} onChange={onChange} aria-label={ariaLabel} name={name} placeholder={placeholder} />
    </div>
  )
}

export default function ArticleBuilder() {
  return (
    <div>
      <NavBar />
      <div className={styles.article_editor_container}>
        <MyInput ariaLabel='titre' name='title' placeholder='Titre...' maxLength={100} />
        <RichEditor />

        <MyInput ariaLabel='hashtag' name='hashtag' placeholder='hashtags puis virgule' />
      </div>
    </div>
  )
}
