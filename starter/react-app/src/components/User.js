import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftNavBar from '../components/Navbars/LeftNavBar';
import { findAllUsers } from '../store/all_users'
import { useSelector } from "react-redux";


function User({ user }) {
  const allUsers = useSelector(state => state.users)
  const loggedInUser = useSelector(state => state.session.user)
  const user_servers = useSelector(state => state.servers)

  let newArray;
    function usersServers() {
      const ourServer = [];
      const values = Object.values(user_servers);
      for (let obj in values) {
        if (values[obj].admin_id == loggedInUser.id) {
          ourServer.push(values[obj])
        }
      }
      return ourServer;


    }
    newArray = usersServers();

  return (
    <div className="each_user">
      <div className="user_inputs">
        <strong>Username:</strong>
        <br></br>
        {user.username}
      </div>
      <div className="user_inputs">
        <strong>User Id:</strong>
        <br></br>
        #{user.id}
      </div>
      <div className="each_user_buttons">
        <div className="user_private">
          <button>Private Message</button>
        </div>
        <div className="user_invite">
          <form>
            <select>{newArray.map((server) => {
                  return <option>{server.name}</option>;
                })}
            </select>
            <button>Invite</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default User;
