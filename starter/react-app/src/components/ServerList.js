import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import LeftNavBar from '../components/Navbars/LeftNavBar';


function User() {
  const allServers = useSelector(state => state.servers)

  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div>
      <h1 className="all_users_h1">All Servers: </h1>
        <div className="ten-servers">
          {
            allServers?.length && allServers.slice(0, 10).map((server) => (
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
  );
}
export default User;
