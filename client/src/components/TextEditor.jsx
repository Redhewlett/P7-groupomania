import { useState } from 'react'
import { RichTextEditor } from '@mantine/rte'

const initialValue = '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>'

function RichEditor() {
  const [value, onChange] = useState(initialValue)
  //value to access what the user types
  return <RichTextEditor value={value} onChange={onChange} />
}

export default RichEditor
