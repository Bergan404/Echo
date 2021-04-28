import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getServer } from '../../store/server'
import { useParams } from 'react-router-dom'
import Channels from '../Channels'
import LeftNavBar from '../../components/Navbars/LeftNavBar';
import { delExistingServer } from '../../store/server_create'

import ServerUsers from '../ServerUsers'

export default function Server() {
  const history = useHistory();
  const dispatch = useDispatch();
  const server = useSelector(state => state.server)
  const user = useSelector(state => state.session.user)
  console.log(user);
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
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div>
        <div>{server.name}</div>
        <div>{server.admin_id}</div>
        {
          (server?.admin_id == user?.id) &&
          <button type="submit" onClick={handleDelete}>Delete</button>
        }
        <Channels />

        <ServerUsers />
      </div>
    </div>

  )
}
