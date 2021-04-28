import React, { useState, useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { findAllServers } from '../../store/servers'
import LeftNavBar from '../../components/Navbars/LeftNavBar';
// import UsersList from '../UsersList'


import './homepage.css'


export default function Home() {
  const dispatch = useDispatch();

  const servers = useSelector(state => state.servers)
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    await dispatch(findAllServers())
  }, [dispatch])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.slice(0, 10).map((user) => {
    return (
      <div key={user.id} className="users_li">
        <NavLink className="users_nav" to={`/users/${user.id}`}>
          <img className='user_image' src={user.image ? user.image : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"}></img>
          <br></br>
          <p>{user.username}</p>
        </NavLink>
      </div>
    );
  });

  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div className='users_servers'>
        <img className='banner' src='https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5'></img>
        <div className='users_container'>
          <h2 className='user_h2'><NavLink to="/users" exact={true} activeClassName="active" className='user_a'>
            Users
            {/* Currently brings to all users but we can fix that */}
          </NavLink></h2>
          <div className="ten-servers">
            {userComponents}
          </div>
        </div>

        <div className='server_container'>
          <h2 className='server_h2'><NavLink to="/servers" exact={true} activeClassName="active" className='user_a'>
            Servers
          </NavLink></h2>
          <div className="ten-servers">
            {
              servers?.length && servers.slice(0, 10).map((server) => (
                <div className="servers_li">
                  <NavLink to={`/server/${server.id}`} className="servers_nav">
                    <img className='server_image' src={server.image ? server.image : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"}></img>
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
