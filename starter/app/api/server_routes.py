from flask import Blueprint, jsonify, request

from app.models import User, db, Server, Channel, Message, server_users
from app.forms import ServerForm
from app.helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from datetime import datetime

server_routes = Blueprint('server', __name__)


@server_routes.route('/<server_id>')
def server(server_id):
    server = Server.query.filter(Server.id == server_id).first()
    return {"server": server.to_dict()}


@server_routes.route('/<server_id>/channels')
def server_channels(server_id):
    channels = Channel.query.filter(Channel.server_id == server_id).all()
    return {"channels": [channel.to_dict() for channel in channels]}


@server_routes.route('/<server_id>/users')
def server_get_users(server_id):
    users = db.session.query(server_users).filter(
        server_id == server_users.c.server_id).all()
    user_list = []
    for user in users:
        add_user = User.query.filter(User.id == user[0]).first()
        user_list.append(add_user)
    return {"serverUsers": [user.to_dict() for user in user_list]}


@server_routes.route('/<server_id>/<channel_id>/messages')
def server_channels_messages(server_id, channel_id):
    # do a query through the messages looking for the messages that are in the channel_id and order
    # them from oldest to newest
    data = db.session.query(Message).filter(
        Message.channel_id == channel_id).order_by(Message.created_at.asc())
    # Method 2
    # data = db.session.query(Message).join(User)
    # channel_messages = [message for message in messages if message['channel_id'] == int(channel_id)]

    # sets up a list with dictionaries inside for all messages
    messages = [message.to_dict() for message in data]
    # do list comprehension to make sure we only return the messages with relation to the channel_id being passed in
    channel_messages = [message for message in messages]

    # Loop through the message dictionaries and for each one grab the user that created the message
    # then add a key-value to that specific message including the users name and picture
    for user in channel_messages:
        # Grab the user from the database with a query
        current_user = User.query.filter(User.id == user['user_id']).first()
        # turn it into an object
        user_object = current_user.to_dict()
        # add the key-value to the message dictionary
        user['username'] = user_object['username']
        if user_object['username'] == 'Jairo':
            print(user_object, 'this is the user ---------------------------')
        if "image" in user_object:
            print('I am here ******************************')
            user['image'] = user_object['image']
    return {"messages": channel_messages}


# do query on opening private messages


@server_routes.route('/create', methods=['POST'])
def create_server():
    form = ServerForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    if form.is_submitted():
        if ("image" in request.files):
            image = request.files["image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            url = upload["url"]
        else:
            url = ""
        server = Server(admin_id=form.data['admin_id'],
                        name=form.data['name'],
                        image=url,
                        public=form.data['public'],
                        created_at=form.data['created_at'])
        db.session.add(server)
        db.session.commit()
        return server.to_dict()
    return "did not go thru", 401


@server_routes.route('/', methods=["DELETE"])
def delete_server():
    serverId = request.json
    server = Server.query.get(serverId)
    serverDict = server.to_dict()
    channels = Channel.query.filter(Channel.server_id == serverId).all()
    for user in serverDict["server_users"]:
        arr = serverDict["server_users"]
        arr.pop()
    for channel in channels:
        currentChannelMsg = (Message.query.filter(
            Message.channel_id == channel.id))
        for message in currentChannelMsg:
            db.session.delete(message)
        db.session.delete(channel)

    db.session.delete(server)
    db.session.commit()
    server = Server.query.all()
    return {"server": [servers.to_dict() for servers in server]}


@server_routes.route('/adduser', methods=["POST"])
def addServerUser():

    data = request.get_json()
    user = User.query.get(data["user_id"])
    server = Server.query.get(data["server_id"])
    user.servers.append(server)
    db.session.commit()
    return {'hello': "hello"}


@server_routes.route('/<server_id>/<channel_name>')
def addChannel(server_id, channel_name):
    name = channel_name
    created_at = datetime.now()
    new_channel = Channel(name=name,
                          server_id=server_id,
                          created_at=created_at)
    db.session.add(new_channel)
    db.session.commit()
    return new_channel.to_dict()
