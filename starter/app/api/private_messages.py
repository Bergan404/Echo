from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from app.models import User, db, PrivateMessage



private_messages_routes = Blueprint('private_messages', __name__)


@private_messages_routes.route('/<user_id>')
def private_messages_recipient_handler(user_id):
    private_messages = PrivateMessage.query.filter(PrivateMessage.sender_id == user_id or PrivateMessage.reciever_id == user_id).all()
    recipients = []
    for private_message in private_messages:
        if user_id != private_message.sender_id:
            current_recipient = User.query.filter(User.id == private_message.sender_id).first()
            if current_recipient not in recipients:
                recipients.append(current_recipient)
        elif user_id != user_private_message.reciever_id:
            current_recipient = User.query.filter(User.id == private_message.reciever_id).first()
            if current_recipient not in recipients:
                recipients.append(current_recipient)
    return {"recipients": [recipient.to_dict() for recipient in recipients]}

@private_messages_routes.route('/<user_id>/<reciever_id>')
def get_private_messages_handler(user_id, reciever_id):
    private_messages = PrivateMessage.query.filter(or_(PrivateMessage.sender_id == user_id and PrivateMessage.reciever_id == reciever_id, PrivateMessage.sender_id == reciever_id and PrivateMessage.reciever_id == user_id)).order_by(PrivateMessage.created_at.asc()).all()
    private_messages_dict = [private_message.to_dict() for private_message in private_messages]
    for message in private_messages_dict:
        # Grab the user from the database with a query
        current_user= User.query.filter(User.id == message['sender_id']).first()
        # turn it into an object
        user_object = current_user.to_dict()
        # add the key-value to the message dictionary
        message['username']= user_object['username']
        try:
            message['profile_picture']= user_object['profile_picture']
        except:
            pass


    return {"privateMessages": private_messages_dict}
