import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getServer } from '../../store/server'
import { useParams } from 'react-router-dom'
import Channels from '../Channels'
import LeftNavBar from '../../components/Navbars/LeftNavBar';

import './inner_server.css'

export default function Server() {
  const dispatch = useDispatch();
  const server = useSelector(state => state.server)
  let { serverId } = useParams()

  useEffect(async () => {
    await dispatch(getServer(serverId))
  }, [dispatch, serverId])

  return (
    <div className='server_something_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
          <Channels server={server}/>
    </div>

  )
}
