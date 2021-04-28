import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LeftNavBar from '../Navbars/LeftNavBar';

export default function Server() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(async () => {
      
  }, [dispatch])

  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div>
        <div>{user.username}</div>

      </div>
    </div>

  )
}
