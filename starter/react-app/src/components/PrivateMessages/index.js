import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LeftNavBar from '../Navbars/LeftNavBar';
import {getPrivateMessageRecipients} from '../../store/privateMessageRecipients'
import {getPrivateMessages} from '../../store/privateMessages'
import PrivateMessagesDisplay, {
  privateSocket,
} from "../PrivateMessagesDisplay";
import {useParams} from 'react-router-dom'


export default function Server() {
  const { reciever_id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [recipientsList, setRecipientList] = useState([])
  const [currentRecipientId, setCurrentRecipientId] = useState(null)
  const [roomId, setRoomId] = useState(null)

  useEffect(async () => {
    let data = await dispatch(getPrivateMessageRecipients(user.id))
    setRecipientList(data.recipients)
    console.log(user.id, data)
  }, [dispatch, reciever_id])

  const onClick = async (e) =>{
    let recipientId = e.target.id
    console.log(recipientId, "recipient IDd")
    let recipientName = e.target.classList[0]
    if(roomId !== null){
      privateSocket.emit('leave_room', roomId)
    }
    console.log(user.id, recipientId, "askldfjklasjdfklasdj")
    await dispatch(getPrivateMessages(user.id, recipientId))
    await setCurrentRecipientId(recipientId)
    let roomArray = [recipientName, user.username]
    let sortedRoomArray = roomArray.sort()
    await setRoomId(sortedRoomArray.join())
  }

  useEffect(async () => {
    if (roomId !== null) {
      privateSocket.emit('join_room', {roomId:roomId})
    }
    else {
      dispatch(getPrivateMessages(user.id, reciever_id))
    }
}, [roomId])


  return (
		<div className="server_something_container">
			<div className="left">
				<LeftNavBar />
			</div>
			<div className="inner_server_container">
				<div className="server-left">
					<div className="inner_server_left">
						<div>
							<h4>Direct Messages</h4>
							{recipientsList.length > 0 &&
								recipientsList.map((recipient) => (
									<div
										id={recipient.id}
										className={recipient.username}
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
						<PrivateMessagesDisplay
							currentRecipientId={currentRecipientId}
							roomId={roomId}
							reciever_id={reciever_id}
						/>
					</div>
				</div>
				<div className="server_right">
					<div className="server-right"></div>
				</div>
			</div>
		</div>
	);
}
