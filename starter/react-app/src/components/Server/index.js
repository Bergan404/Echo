import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getServer } from '../../store/server'
import { useParams } from 'react-router-dom'
import Channels from '../Channels'
import LeftNavBar from '../../components/Navbars/LeftNavBar';

import ServerUsers from '../ServerUsers'

import './inner_server.css'

export default function Server() {
  const history = useHistory();
  const dispatch = useDispatch();
  const server = useSelector(state => state.server)
  const user = useSelector(state => state.session.user)
  let { serverId } = useParams()
  useEffect(async () => {
    await dispatch(getServer(serverId))
  }, [dispatch])

  return (
    <div className='server_something_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
          <Channels server={server}/>
    </div>

  )
}
