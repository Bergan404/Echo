import React, { useState, useEffect } from "react";
import LeftNavBar from '../components/Navbars/LeftNavBar';
import { findAllUsers } from '../store/all_users'
import { useSelector } from "react-redux";


function User({ user }) {
  const allUsers = useSelector(state => state.users)
  const loggedInUser = useSelector(state => state.session.user)
  const user_servers = useSelector(state => state.servers)



  const addUser = async (e) => {
    e.preventDefault();
    console.log(user_id, server_id)
    const response = await fetch("/api/server/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": user_id,
        "server_id": server_id
      })
    })

    const data = await response.json();
    console.log(data)
  }

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

  const [user_id, setUser_id] = useState(user.id);
  const [server_id, setServer_id] = useState(newArray[0].id);
  console.log(server_id);

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
          <form onSubmit={addUser}>
            <select onChange={(e) => setServer_id(e.target.value)}>{newArray.map((server) => {
              return <option value={server.id} >{server.name}{console.log(server.id)}</option>;
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
