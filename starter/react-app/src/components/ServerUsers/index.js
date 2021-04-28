import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getServerUsers } from '../../store/serverUsers'
import {useParams} from 'react-router-dom'

export default function ServerUsers() {
  const dispatch = useDispatch();
  const serverUsers = useSelector(state => state.serverUsers)
  let {serverId} = useParams()
  useEffect(async () => {
    await dispatch(getServerUsers(serverId))
  }, [dispatch])

  return (
    <>
        {serverUsers.length > 0 && serverUsers.map((user) =>(
            <div>
                {user.username}
            </div>
        ))}
    </>
  )
}
