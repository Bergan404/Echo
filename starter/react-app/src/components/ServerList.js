import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import LeftNavBar from '../components/Navbars/LeftNavBar';


function User() {
  const allServers = useSelector(state => state.servers)

  return (
    <>
      <div className='left'>
        <LeftNavBar />
      </div>
      <ul>
        {
          allServers?.length && allServers.map((server) => (
            <li className="servers_li">
              <img className='server_image' src="https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"></img>
              <br></br>
              <NavLink to={`/server/${server.id}`} className="servers_nav">
                {server.name}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </>
  );
}
export default User;
