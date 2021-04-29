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
    privateSocket.emit('join_room', {roomId:roomId})
}, [roomId])


  return (
    <div className='server_something_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div className='inner_server_container'>
        <div className="server-left">
          <div className='inner_server_left'> 
            <div >
            <h4>Direct Messages</h4>
                {recipientsList.length > 0 && recipientsList.map((recipient)=>(
                  <div id={recipient.id} className={recipient.username}
                    onClick={onClick}
                      >
                    {recipient.username}
                  </div>
                ))}
              </div>
                </div>
              </div>
              <div className="server_middle">
                <div className="server-middle">
                <PrivateMessagesDisplay currentRecipientId={currentRecipientId} roomId={roomId}/>
                </div>
              </div>
              <div className='server_right'>
                <div className="server-right">
            </div>
         </div>
      </div>
    </div>
    
  )
}

