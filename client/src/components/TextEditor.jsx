import { useState } from 'react'
import { RichTextEditor } from '@mantine/rte'

const initialValue = ''

function RichEditor() {
  const [value, onChange] = useState(initialValue)
  //value to access what the user types
  return <RichTextEditor value={value} onChange={onChange} />
}

export default RichEditor
