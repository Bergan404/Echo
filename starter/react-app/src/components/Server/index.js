import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getServer } from '../../store/server'
import {useParams} from 'react-router-dom'
import Channels from '../Channels'

export default function Server() {
  const dispatch = useDispatch();
  const server = useSelector(state => state.server)
  let {serverId} = useParams()
  useEffect(async () => {
    await dispatch(getServer(serverId))
  }, [dispatch])

  return (
    <>
        <div>{server.name}</div>
        <div>{server.admin_id}</div>
        <Channels />
    </>
  )
}
