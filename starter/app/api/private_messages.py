from flask import Blueprint, jsonify, request
from sqlalchemy import or_, and_
from app.models import User, db, PrivateMessage



private_messages_routes = Blueprint('private_messages', __name__)


@private_messages_routes.route('/<user_id>')
def private_messages_recipient_handler(user_id):
    private_messages = PrivateMessage.query.filter(or_(PrivateMessage.sender_id == user_id, PrivateMessage.reciever_id == user_id)).all()
    recipients = set()
    user_id = int(user_id)
    for private_message in private_messages:
        private_message = private_message.to_dict()
        if user_id != private_message['sender_id']
            current_recipient = User.query.filter(User.id == private_message['sender_id']).first()
            recipients.add(current_recipient)
        elif user_id != private_message['reciever_id']:
            current_recipient = User.query.filter(User.id == private_message['reciever_id']).first()
            recipients.add(current_recipient)
    recipients_list = (list(recipients))
    final_recipients = list()
    for recipient in recipients_list:
        current_recipient = recipient.to_dict()
        if current_recipient['id'] != int(user_id):
            final_recipients.append(current_recipient)
    return {"recipients": final_recipients}

@private_messages_routes.route('/<user_id>/<reciever_id>')
def get_private_messages_handler(user_id, reciever_id):
    user_id = int(user_id)
    reciever_id = int(reciever_id)
    private_messages = PrivateMessage.query.filter(or_(and_(PrivateMessage.sender_id == user_id, PrivateMessage.reciever_id == reciever_id), and_(PrivateMessage.sender_id == reciever_id, PrivateMessage.reciever_id == user_id))).order_by(PrivateMessage.created_at.asc()).all()
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
