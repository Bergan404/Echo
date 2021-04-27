import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { findAllServers } from '../store/servers'


export default function Home() {
  const dispatch = useDispatch();
  const servers = useSelector(state => state.servers)

  useEffect(async () => {
    await dispatch(findAllServers())
  }, [dispatch])

  return (
    <>
      <ul>
        {
          servers?.length && servers.map((server) => (
            <li>
              <NavLink to={`/server/${server.id}`}>
                {server.name}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </>
  )
}
