import React, { useState, useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { findAllServers } from '../../store/servers'
import { findAllUsers } from '../../store/all_users'
import LeftNavBar from '../../components/Navbars/LeftNavBar';
import UserDivs from './UserDivs'
// import UsersList from '../UsersList'
import header from '../Echo-header.png'
import defaultImage from '../default-echo-photo1.png'


import './homepage.css'


export default function Home() {
  const dispatch = useDispatch();

  const servers = useSelector(state => state.servers)
  const allUsers = useSelector(state => state.users)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    await dispatch(findAllServers())
    await dispatch(findAllUsers())
  }, [dispatch])

  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div className='users_servers'>
        <img className='banner' src={header}></img>
        <div className='users_container'>
          <h2 className='user_h2'><NavLink to="/users" exact={true} activeClassName="active" className='user_a'>
            Users
            {/* Currently brings to all users but we can fix that */}
          </NavLink></h2>
          <div className="ten-servers">
            {
              allUsers?.length && allUsers.slice(0, 10).map((user) => (
                <div key={user.id}>
                  <UserDivs user={user}  />
                </div>
              ))
            }
          </div>
        </div>

        <div className='server_container'>
          <h2 className='server_h2'><NavLink to="/servers" exact={true} activeClassName="active" className='user_a'>
            Servers
          </NavLink></h2>
          <div className="ten-servers">
            {
              servers?.length && servers.slice(0, 10).map((server) => (
                <div key={server.id} className="servers_li">
                  <NavLink to={`/server/${server.id}`} className="servers_nav">
                    <img className='server_image' src={server.image ? server.image : {defaultImage}} alt="server_image"></img>
                    <br></br>
                    <p>{server.name}</p>
                  </NavLink>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
