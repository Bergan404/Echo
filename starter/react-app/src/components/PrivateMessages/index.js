import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LeftNavBar from '../Navbars/LeftNavBar';
import {getPrivateMessageRecipients} from '../../store/privateMessageRecipients'
import {getPrivateMessages} from '../../store/privateMessages'
import PrivateMessagesDisplay, {
  privateSocket,
} from "../PrivateMessagesDisplay";


export default function Server() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [recipientsList, setRecipientList] = useState([])
  const [currentRecipientId, setCurrentRecipientId] = useState(null)
  const [roomId, setRoomId] = useState(null)

  useEffect(async () => {
      let data = await dispatch(getPrivateMessageRecipients(user.id))
      setRecipientList(data.recipients)
  }, [dispatch])

  const onClick = async (e) =>{
    console.log('we made it here **********************')
    let recipientId = e.target.id
    console.log(recipientId, "recipient IDd")
    let recipientName = e.target.classList[0]
    if(roomId !== null){
      privateSocket.emit('leave_room', roomId)
    }
    await dispatch(getPrivateMessages(user.id, recipientId))
    await setCurrentRecipientId(recipientId)
    let roomArray = [recipientName, user.username]
    let sortedRoomArray = roomArray.sort()
    await setRoomId(sortedRoomArray.join())

  }
  useEffect(async () => {
    console.log(roomId, '*************************************')
    privateSocket.emit('join_room', {roomId:roomId})
}, [roomId])


  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div>
        <div>{user.username}</div>
        {recipientsList.length > 0 && recipientsList.map((recipient)=>(
          <div id={recipient.id} className={recipient.username}
            onClick={onClick}
          >
              {recipient.username}
          </div>
        ))}
        <PrivateMessagesDisplay currentRecipientId={currentRecipientId} roomId={roomId}/>

      </div>
    </div>

  )
}
