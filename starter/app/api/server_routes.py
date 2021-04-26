from flask import Blueprint, jsonify, request
from app.models import User, db, Server, Channel, Message

server_routes = Blueprint('server', __name__)


@server_routes.route('/<server_id>')
def server(server_id):
    server = Server.query.filter(Server.id == server_id).first()
    return {"server": server.to_dict()}

@server_routes.route('/<server_id>/channels')
def server_channels(server_id):
    channels = Channel.query.filter(Channel.server_id == server_id).all()
    return {"channels": [channel.to_dict() for channel in channels]}

# @server_routes.route('/<server_id>/users')
# def server_channels(server_id):
#     users = User.query.filter(User.server_id == server_id).all()
#     return {"channels": [channel.to_dict() for channel in channels]}

@server_routes.route('/<server_id>/<channel_id>/messages')
def server_channels_messages(server_id, channel_id):

    # messages = db.session.query(Message).filter(Message.channel_id == channel_id).order_by(
    #     Message.created_at.desc()
    # )
    # messages = db.session.query(User).join(subq, User.id == subq.c.user_id )
    messages = db.session.query(Message).join(User)
    # for message in messages.all():
    #     print(message, '****************************')
    # messages = Message.query.join(User, Message.user_id == User.id).add_columns(User.username)

    message = [message.to_dict() for message in messages]
    print(message)
    for user in message:
        current_user= User.query.filter(User.id == user['user_id']).first()
        user_object = current_user.to_dict()
        user['username']= user_object['username']
        try:
            user['profile_picture']= user_object['profile_picture']
        except:
            pass
    return {"message": message}


# do query on opening private messages