import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const io = require('socket.io-client');
export const privateSocket = io('http://localhost:5000/private');

export default function PrivateMessagesDisplay(props) {
  const messages = useSelector(state => state.privateMessages)
  const user = useSelector(state => state.session.user)
  const [message, setMessage] = useState('');
  const [stateMessages, setStateMessages] = useState(messages)
  const [thing, setThing] = useState(null)

  const onClick = e =>{
      console.log(props.currentRecipientId,"current recipeient id***********************")
      e.preventDefault();
      if (message !== "") {
        user.messages = message
        user.roomId = props.roomId
        user.reciever_id = Number(props.currentRecipientId)
        user.sender_id = user.id
       privateSocket.emit("private_message", user);
        setMessage("");

    } else {
        alert("Please Add A Message");
    }
}
    useEffect(() =>{
        setThing(null)
    }, [props.currentRecipientId])
useEffect(()=>{
    if (thing === null){
        setStateMessages(messages)

    } else{
        setStateMessages([...stateMessages, thing])
    }
}, [messages.length, thing])
useEffect(() =>{
    privateSocket.on("private_room", (msg) => {
      setThing(msg);
    });}, [stateMessages]);

  return (
    <div>
        <ul>
            {stateMessages.length && stateMessages.map((message) => (
                <li >
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
/*
private messages
we need unique room names
we can use usernames and make the in alphabetic order to ensure same room connected
open private messages tab
a list of the users that have messages with you
query the database for your user id being either sender or reciever
limit down to unique pairs
the other id that is not yours query for user based on that id
return a list of users based on those querys
render user objects as channels
add an onclick to join the room based on the unique room name
save unique room name to state and query database for private messages based on the two user ids
render messages
sent save to state

 */
