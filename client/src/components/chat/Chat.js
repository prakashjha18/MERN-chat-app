import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { Link, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import Messages from './messages/Messages';
let socket

const Chat = () => {
  const ENDPT = 'localhost:5000'

  const { user, setUser } = useContext(UserContext)
  let { room_id, room_name } = useParams()
  const [message, SetMessage] = useState('')
  const [messages,setMessages] = useState([])

  useEffect(() => {
    socket = io(ENDPT)
    socket.emit('join', { name: user.name, room_id, user_id: user.id })
  }, [])
  useEffect(() => {
    socket.on('message',message=>{
      setMessages([...messages,message])
    })
  },[messages])
  useEffect(() => {
    socket.emit('get-messages-history', room_id)
    socket.on('output-messages', messages => {
        setMessages(messages)
    })
}, [])
  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      console.log(message)
      socket.emit('sendMessage', message, room_id, () => SetMessage(''))
    }
  }
  return (
    <div>
      
      <Messages messages={messages} user_id={user.id}/>
      <form action='' onSubmit={sendMessage}>
        <input
          type='text'
          value={message}
          onChange={(event) => SetMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === 'Enter' ? sendMessage(event) : null
          }
        />
        <button>Send Message</button>
      </form>
    </div>
  )
}

export default Chat
