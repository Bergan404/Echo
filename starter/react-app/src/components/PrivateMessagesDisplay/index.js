import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";

import "./private_messages_display.css";

const io = require("socket.io-client");
export const privateSocket = io("/private");

export default function PrivateMessagesDisplay(props) {
  const messages = useSelector((state) => state.privateMessages);
  const user = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");
  const [stateMessages, setStateMessages] = useState(messages);
  const [thing, setThing] = useState(null);

  const onClick = (e) => {
    e.preventDefault();
    if (message !== "") {
      user.messages = message;
      user.roomId = props.roomId;
      user.reciever_id = Number(props.currentRecipientId);
      user.sender_id = user.id;
      privateSocket.emit("private_message", user);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };
  useEffect(() => {
    setThing(null);
  }, [props.currentRecipientId]);
  useEffect(() => {
    if (thing === null) {
      setStateMessages(messages);
    } else {
      setStateMessages([...stateMessages, thing]);
    }
  }, [messages.length , thing]);
  useEffect(() => {
    privateSocket.on("private_room", (msg) => {
      setThing(msg);
    });
  }, [stateMessages]);
  console.log(stateMessages);

  return (
    <div>
      <ul>
        {stateMessages.length > 0 &&
          stateMessages.map((message) => (
            <div className="message_holder">
              <div className="user_image">
                <img
                  className="server_image"
                  src={
                    message.profile_picture
                      ? message.profile_picture
                      : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"
                  }
                ></img>
              </div>
              <div className="message_box">
                <div className="message_info">
                  {message.username}
                  {console.log(message.created_at)}
                  <Moment local date={message.created_at} format="hh:mm" tz="Atlantic/Reykjavik" />
                </div>
                <div className="message_content">{message.messages} </div>
              </div>
            </div>
          ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message..."
      ></input>
      <button onClick={onClick}>Send</button>
    </div>
  );
}
