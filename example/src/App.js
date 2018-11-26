import React, { useState } from 'react'

import { createOnKeyDownBinding } from 'key-bidings'

export default () => {
  const { inputProps, addToChat, messages } = useChat()
  const onKeyDown = createOnKeyDownBinding({
    '*-Enter': (e) => {
      e.preventDefault()
      console.log('saving...')
      addToChat()
    }
  })

  return <div className="container" style={{ marginTop: '40px' }}>
    <textarea className="form-control" onKeyDown={onKeyDown} {...inputProps} />
    <hr />
    {messages.map(message => <p className="text-primary" style={{padding: '10px', border: '1px solid #ccc'}}>{message}</p>)}
  </div>
}

// --------------------------------------------
function useChat() {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  const inputProps = { value: message, onChange: (e) => setMessage(e.target.value) }
  const addToChat = () => {
    setHistory([message, ...history])
    setMessage('')
  }
  return { inputProps, addToChat, messages: history }
}
