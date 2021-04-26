import React, { useState, useEffect } from "react";
// npm i socket,io-client and then import
import io from "socket.io-client";

/*  define where ours sockets will be sent to
    since we are running our backend on 5000 use the same one so we don't
    have to run 2 different ones
*/
let server = "http://localhost:5000";
let socket = io.connect(`${server}`);

const Messages = () => {
// useState to set the messages and the initial message
// later on we will load all previous messages through our db.Messages
  const [messages, setMessages] = useState(["First message"]);
  // the message from the input box
  const [message, setMessage] = useState("");

// useEffect for any change in our messages list

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", (msg) => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setMessages([...messages, msg]);
    });
  };

  // On Change
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <div>
      {messages.length > 0 &&
        messages.map((msg) => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
      <input value={message} name="message" onChange={(e) => onChange(e)} />
      <button onClick={() => onClick()}>Send Message</button>
    </div>
  );
};

export default Messages;
