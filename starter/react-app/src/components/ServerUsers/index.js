import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getServerUsers } from "../../store/serverUsers";
import { useParams } from "react-router-dom";
import "./serverUsers.css";
export default function ServerUsers() {
  const dispatch = useDispatch();
  const serverUsers = useSelector((state) => state.serverUsers);

  let { serverId } = useParams();

  useEffect(async () => {
    await dispatch(getServerUsers(serverId));
  }, [dispatch, serverId]);
  console.log(serverUsers);
  return (
    <div>
      {serverUsers.length > 0 &&
        serverUsers.map((user) => (
          <div className="server_users">
            <div>
              <img
                className="user_image user_image_bar"
                src={
                  user.image
                    ? user.image
                    : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"
                }
              ></img>
            </div>
            <div className="server_username">{user.username}</div>
          </div>
        ))}
    </div>
  );
}
