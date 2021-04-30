import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getChannels } from "../../store/channels";
import { useParams } from "react-router-dom";
import { getMessages } from "../../store/messages";
import Messages, { socket } from "../Messages";
import { delExistingServer } from "../../store/server_create";
import ServerUsers from "../ServerUsers";
import "./channels.css";

export default function Channels(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const user = useSelector((state) => state.session.user);

  const [currentChannelId, setCurrentChannelId] = useState(null);
  const [currentChannelName, setCurrentChannelName] = useState(null);

  let { serverId } = useParams();
  useEffect(async () => {
    const data = await dispatch(getChannels(serverId));
    if (data.channels[0]) {
      await dispatch(getMessages(serverId, data.channels[0].id));
      setCurrentChannelId(data.channels[0].id);
      setCurrentChannelName(data.channels[0].name);
    }
  }, [dispatch, serverId]);
  const onClick = async (e) => {
    let channelId = e.target.id;
    socket.emit("leave_room", currentChannelId);
    await dispatch(getMessages(serverId, channelId));
    await setCurrentChannelId(Number(channelId));
    await setCurrentChannelName(e.target.classList[0]);
  };
  useEffect(async () => {
    socket.emit("join_room", currentChannelId);
  }, [currentChannelId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(delExistingServer(props.server.id));
    await history.push("/");
  };

  return (
    <div className="inner_server_container" width="100%">
      <div className="server-left">
        <div className="inner_server_left">
          <div>{props.server.name}</div>
          <div>#{props.server.admin_id}</div>
          {props.server?.admin_id == user?.id && (
            <button type="submit" onClick={handleDelete}>
              Delete
            </button>
          )}

          <ul className="channels_holder">
            {channels.length > 0 &&
              channels.map((channel) => (
                <div className="channels">
                  <p className={channel.name} onClick={onClick} id={channel.id}>
                    # {channel.name}
                  </p>
                </div>
              ))}
          </ul>
        </div>
      </div>

      <div className="server_middle">
        <div className="server-middle">
          <div className="server_messages">
            <Messages
              currentChannelId={currentChannelId}
              currentChannelName={currentChannelName}
            />
          </div>
        </div>
      </div>
      <div className="server_right">
        <div className="server-right">
          <h1>Users</h1>
          <ServerUsers />
        </div>
      </div>
    </div>
  );
}
