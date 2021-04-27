import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getChannels } from '../../store/channels'
import {useParams} from 'react-router-dom'


export default function Server() {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels)
  let {serverId} = useParams()
  useEffect(async () => {
    await dispatch(getChannels(serverId))
  }, [dispatch])

  return (
    <ul>
        {channels.length && channels.map((channel) => (
            <li>
                {channel.name}
            </li>
        ))}
    </ul>
  )
}
