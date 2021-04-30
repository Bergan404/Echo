import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";

import "./private_messages_display.css";

const io = require("socket.io-client");
export const privateSocket = io("http://localhost:5000/private");

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
			if (props.currentRecipientId !== null) {
				user.reciever_id = Number(props.currentRecipientId);
				console.log(props.currentRecipientId);
			} else {
				console.log(props.reciever_id);
				user.reciever_id = Number(props.reciever_id);
			}
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
			console.log(stateMessages, "state messages are here*************");
			setStateMessages([...stateMessages, thing]);
		}
	}, [messages.length, thing]);
	useEffect(() => {
		privateSocket.on("private_room", (msg) => {
			setThing(msg);
		});
	}, [stateMessages]);
	console.log(stateMessages);

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
										message.profile_picture
											? message.profile_picture
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
			</ul>
			<div className="message_bar">
				<form onSubmit={onClick} className="message_form">
					<textarea
						className="message_input"
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Message..."
					></textarea>
					<button className="message_send" onClick={onClick}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
