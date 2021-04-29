import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getServer } from '../../store/server'
import { useParams } from 'react-router-dom'
import Channels from '../Channels'
import LeftNavBar from '../../components/Navbars/LeftNavBar';
import { delExistingServer } from '../../store/server_create'

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

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(delExistingServer(server.id));
    await history.push('/');
  }

  return (
    <div className='server_something_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div className='inner_server_container'>
        <div className="server-left">
          <div className='inner_server_left'>
            <div>{server.name}</div>
            <div>#{server.admin_id}</div>
            {
              (server?.admin_id == user?.id) &&
              <button type="submit" onClick={handleDelete}>Delete</button>
            }
          </div>
        </div>
        <div className="server_middle">
          <div className="server-middle">
            <Channels />
          </div>
        </div>
        <div className='server_right'>
          <div className="server-right">
            <h1>Users</h1>
            <ServerUsers />
          </div>
        </div>
      </div>
    </div>

  )
}
