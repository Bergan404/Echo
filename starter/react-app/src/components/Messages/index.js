import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";

// import io from "socket.io-client"

// let server = "http://localhost:5000"
// export let socket = io.connect(`${server}`)
const io = require("socket.io-client");
export const socket = io("http://localhost:5000");

export default function Messages(props) {
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");
  const [stateMessages, setStateMessages] = useState(messages);
  const [thing, setThing] = useState(null);

  const onClick = (e) => {
    e.preventDefault();
    if (message !== "") {
      user.messages = message;
      user.room = Number(props.currentChannelId);
      user.user_id = user.id;
      socket.send(user);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };
  useEffect(() => {
    setThing(null);
  }, [props.currentChannelId]);
  useEffect(() => {
    if (thing === null) {
      setStateMessages(messages);
    } else {
      setStateMessages([...stateMessages, thing]);
    }
  }, [messages.length, thing]);
  useEffect(() => {
    socket.on("room", (msg) => {
      setThing(msg);
    });
  }, [stateMessages]);

  return (
    <div className="message_container">
      <ul>
        {stateMessages.length &&
          stateMessages.map((message) => (
            <div className="message_holder">
              <div className="user_image_box">
                <img
                  className="user_image user_image_message"
                  src={
                    message.image
                      ? message.image
                      : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"
                  }
                ></img>
              </div>
              <div className="message_box">
                <div className="message_info">
                <div className="message_username">
                  {message.username}
                </div>
                <div className="message_time">
                  <Moment
                    local
                    date={message.created_at}
                    format="hh:mm"
                    tz="Atlantic/Reykjavik"
                  />
                </div>
                </div>
                <div className="message_content">{message.messages} </div>
              </div>
            </div>
          ))}
      </ul>
      <div className="message_bar">
        <form onSubmit={onClick} className="message_form">
          <textarea
            className="message_input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Send a message to ${props.currentChannelName}...`}
          ></textarea>
          {/* <input type="submit" value="Submit" /> */}
          <button className="message_send" onClick={onClick}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
