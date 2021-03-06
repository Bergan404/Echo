import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { privateSocket } from "../components/PrivateMessagesDisplay";
import { useHistory } from "react-router-dom";

function User({ user }) {
  // const allUsers = useSelector(state => state.users)
  const loggedInUser = useSelector((state) => state.session.user);
  const user_servers = useSelector((state) => state.servers);
  const [trigger, setTrigger] = useState(false);
  const history = useHistory();

  const handlePrivateMessage = async (e) => {
    const recipientId = e.target.id;
    const recipientName = e.target.classList[0];
    const senderId = loggedInUser.id;
    const senderName = loggedInUser.username;
    const roomArray = [senderName, recipientName];
    const sortedRoomArray = roomArray.sort();
    const roomId = sortedRoomArray.join();
    loggedInUser.messages = `${senderName} would like to chat..`;
    loggedInUser.roomId = roomId;
    loggedInUser.reciever_id = Number(recipientId);
    loggedInUser.sender_id = senderId;
    setTrigger(!trigger);
  };

  useEffect(async () => {
    if (trigger === true) {
      await privateSocket.emit("join_room", { roomId: loggedInUser.roomId });
      await privateSocket.emit("private_message", loggedInUser);
      history.push(`/privatemessages/${user.id}`);
    }
  }, [trigger]);

  const addUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/server/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        server_id: server_id,
      }),
    });
    const data = await response.json();
    history.push(`/server/${server_id}`);
  };
  let newArray;
  function usersServers() {
    const ourServer = [];
    const values = Object.values(user_servers);
    for (let obj in values) {
      if (values[obj]?.admin_id == loggedInUser?.id) {
        ourServer.push(values[obj]);
      }
    }
    return ourServer;
  }
  newArray = usersServers();

  const [user_id, setUser_id] = useState(user.id);
  const [server_id, setServer_id] = useState(newArray[0]?.id);

  return (
    <div className="each_user">
      <div className="user_inputs">
        <strong>Username:</strong>
        <br></br>
        {user.username}
      </div>
      <div className="user_inputs">
        <strong>User Id:</strong>
        <br></br>#{user.id}
      </div>
      <div className="each_user_buttons">
        <div className="user_private">
          <button
            className={user.username}
            id={user.id}
            onClick={handlePrivateMessage}
          >
            Private Message
          </button>
        </div>
        <div className="user_invite">
          <form onSubmit={addUser}>
            <select onChange={(e) => setServer_id(e.target.value)}>
              {newArray.map((server) => {
                return <option value={server.id}>{server.name}</option>;
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
