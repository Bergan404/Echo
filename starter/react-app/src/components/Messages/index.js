import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getMessages } from '../../store/messages'
import {useParams} from 'react-router-dom'
// import io from "socket.io-client"

// let server = "http://localhost:5000"
// export let socket = io.connect(`${server}`)
const io = require('socket.io-client');
export const socket = io('http://localhost:5000');

export default function Messages(props) {
  const dispatch = useDispatch();
  const {serverId} = useParams()
  const messages = useSelector(state => state.messages)
  const user = useSelector(state => state.session.user)
  const [message, setMessage] = useState('');
  const [stateMessages, setStateMessages] = useState(messages)
  const [thing, setThing] = useState(null)


//   const getMessage = (messages1) => {
//       console.log(props.currentChannelId, '$#%$%#$%#$%$#%#$%')
//       console.log(messages1, '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
//       socket.on("message", (msg) => {
//           console.log(messages1, '$^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')

//         setStateMessages([...messages1.messages, msg])
//         dispatch(getMessages(serverId, props.currentChannelId))
//     });
//     return 'I did it'
// };

  const onClick = e =>{
      e.preventDefault();
      if (message !== "") {
        user.messages = message
        user.room = props.currentChannelId
        user.user_id = user.id
        socket.send(user);
        setMessage("");
    } else {
        alert("Please Add A Message");
    }
}
useEffect(()=>{
    if (thing === null){
        setStateMessages(messages)
    } else{
        setStateMessages([...stateMessages, thing])
    }


}, [messages.length, thing]
)
useEffect(() =>{
    socket.on("room", (msg) => {
        console.log(messages, '$^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        console.log(msg, 'ddddddddddddddddddddddddddddddddddddddddddddddddd')
        setThing(msg)
    //   setStateMessages([...messages.messages, msg])

})}, [thing]);

  return (
    <div>
        <ul>
            {stateMessages.length && stateMessages.map((message) => (
                <li key={message.id} >
                    {message.messages}
                    {message.created_at}
                    {message.username}
                </li>
            ))}
        </ul>
        <input type="text"
         value={message}
         onChange={(e)=> setMessage(e.target.value)}
         placeholder='Message'
         >
        </input>
        <button
        onClick={onClick}
        >Send</button>
    </div>
  )
}
