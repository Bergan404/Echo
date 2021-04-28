import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getChannels } from '../../store/channels'
import {useParams} from 'react-router-dom'
import {getMessages} from '../../store/messages'
import Messages, {socket} from '../Messages'

export default function Server() {
  const [currentChannelId, setCurrentChannelId] = useState(2)
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels)
  let {serverId} = useParams()
  useEffect(async () => {
    const data = await dispatch(getChannels(serverId))
    if(data.channels[0]){
      await dispatch(getMessages(serverId, data.channels[0].id))
      setCurrentChannelId(data.channels[0].id)
    }
  }, [dispatch])
  const onClick = async (e) =>{
        let channelId = e.target.id
        socket.emit('leave_room', currentChannelId)
        setCurrentChannelId(channelId)
        socket.emit('join_room', currentChannelId)

        await dispatch(getMessages(serverId, channelId))
  }
  //useEffect(onClick(channels[0].id), [])
  return (
    <div>
      <ul>
          {channels.length > 0 && channels.map((channel) => (
            <button onClick={onClick} id={channel.id}>
                  {channel.name}
              </button>
          ))}
      </ul>
      <Messages currentChannelId={currentChannelId}/>
    </div>
  )
}
