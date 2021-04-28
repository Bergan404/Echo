import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LeftNavBar from '../Navbars/LeftNavBar';
import {getPrivateMessageRecipients} from '../../store/privateMessageRecipients'
import {getPrivateMessages} from '../../store/privateMessages'
import PrivateMessagesDisplay from '../PrivateMessagesDisplay'
export default function Server() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [recipientsList, setRecipientList] = useState([])
  const [currentRecipientId, setCurrentRecipientId] = useState(null)

  useEffect(async () => {
      let data = await dispatch(getPrivateMessageRecipients(user.id))
      setRecipientList(data.recipients)
  }, [dispatch])

  const onClick = async (e) =>{
    let recipientId = e.target.id
    //socket.emit('leave_room', currentChannelId)
    await dispatch(getPrivateMessages(user.id, recipientId))
    await setCurrentRecipientId(recipientId)
  }
  useEffect(async () => {
    //socket.emit('join_room', currentChannelId)
}, [recipientsList])


  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div>
        <div>{user.username}</div>
        {recipientsList.length > 0 && recipientsList.map((recipient)=>(
          <div id={recipient.id}
            onClick={onClick}
          >
              {recipient.username}
          </div>
        ))}
        <PrivateMessagesDisplay currentRecipientId={currentRecipientId} />

      </div>
    </div>

  )
}
