import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getChannels } from '../../store/channels'
import {useParams} from 'react-router-dom'
import {getMessages} from '../../store/messages'
import Messages, {socket} from '../Messages'

export default function Server() {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels)
  const [currentChannelId, setCurrentChannelId] = useState(null)
  const [currentChannelName, setCurrentChannelName] = useState(null)

  let {serverId} = useParams()
  useEffect(async () => {
    const data = await dispatch(getChannels(serverId))
    if(data.channels[0]){
      await dispatch(getMessages(serverId, data.channels[0].id))
      setCurrentChannelId(data.channels[0].id)
      setCurrentChannelName(data.channels[0].name)
    }
  }, [dispatch])
  const onClick = async (e) =>{
        let channelId = e.target.id
        socket.emit('leave_room', currentChannelId)
        await dispatch(getMessages(serverId, channelId))
        await setCurrentChannelId(Number(channelId))
        await setCurrentChannelName(e.target.classList[0])
      }
      useEffect(async () => {
        socket.emit('join_room', currentChannelId)

  }, [currentChannelId])

  return (
    <div>
      <ul>
          {channels.length > 0 && channels.map((channel) => (
            <button className={channel.name} onClick={onClick} id={channel.id}>
                  {channel.name}
              </button>
          ))}
      </ul>
      <div className='server_messages'>
        <Messages currentChannelId={currentChannelId} currentChannelName={currentChannelName}/>
      </div>
    </div>
  )
}
