import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";
import "./Messages.css"
import { useParams } from "react-router-dom";

const io = require("socket.io-client");
export const socket = io();

export default function Messages(props) {
  const messages = useSelector((state) => state.messages);
  const user = useSelector((state) => state.session.user);
  const [message, setMessage] = useState("");
  const [stateMessages, setStateMessages] = useState(messages);
  const [thing, setThing] = useState(null);

  let { serverId } = useParams();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // the onClick handler for when we click on the submit button for a message
  const onClick = (e) => {
    e.preventDefault();
    if (message !== "") {
      user.messages = message;
      user.room = Number(props.currentChannelId);
      user.user_id = user.id;
      socket.send(user);
      setMessage("");
      scrollToBottom();
    } else {
      alert("Please Add A Message");
    }
  };
// When the current channel changes we set THING to be null
// This is a holder for our message
  useEffect(() => {
    scrollToBottom();
    setThing(null);
  }, [props.currentChannelId]);


  // when there is a change in THING, serverId, or the amount of
  // messages(redux store) we trigger this useEffect
  // the purpose of this useEffect is if thing is null then we set state messages to messages
  // from redux store. Else if thing is not null then we set stateMessages to the
  // stateMessages and add the new message (which is what the backend sends back to us through the emit "room")
  useEffect(() => {
    scrollToBottom();
    if (thing === null) {
      setStateMessages(messages);
    } else {
      setStateMessages([...stateMessages, thing]);
    }
  }, [messages.length , thing, serverId]);

  // the purpose of this useEffect is to check if there is a trigger in the stateMessages
  // then we use the socket.on method to receive the data passed in from the backend socket
  // which at this point we set it equal to the THING
  useEffect(() => {
    scrollToBottom();
    socket.on("room", (msg) => {
      setThing(msg);
    });
  }, [stateMessages]);


  return (
    <div className="message_container">
      <ul className="message_list">
        {stateMessages.length > 0 &&
          stateMessages.map((message) => (
            <div className="message_holder">
              <div className="user_image_box">
                <img
                  className="user_image_message"
                  src={
                    message.image
                      ? message.image
                      : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"
                  }
                ></img>
              </div>
              <div className="message_box">
                <div className="message_info">
                  <div className="message_username">{message.username}</div>
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
              <div ref={messagesEndRef} />
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
          <button className="message_send" onClick={onClick}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
