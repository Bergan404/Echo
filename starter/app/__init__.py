import os
from flask import Flask, render_template, request, session, redirect
# from werkzeug.security import secure_filename
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
# flask socket
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from datetime import datetime
from .models import db, User, Message, PrivateMessage
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.main import main_routes
from .api.server_routes import server_routes
from .api.private_messages import private_messages_routes
from .seeds import seed_commands
import pytz

from .config import Config
import logging
import os


logging.basicConfig()
logging.getLogger('sqlalchemy').setLevel(logging.ERROR)

app = Flask(__name__)

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://echo-cord.herokuapp.com",
        "https://echo-cord.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(app, cors_allowed_origins=origins)



# socketio = SocketIO(app, cors_allowed_origins="*")
user_counter = 0

# Socket handler for receiving a message
@socketio.on('message')
def handleMessage(data):
    print(data, "-0-0-0-0-0-0-0-0--0-0-0-0-0-0-0-0-0-0")
    time = datetime.now()
    message = Message(messages = data['messages'], user_id = data['user_id'], created_at=time, channel_id = data['room'])
    db.session.add(message)
    db.session.commit()
    data['created_at'] = time.strftime("%d %b %y %H:%M:%S") + " GMT"

    emit('room', data, to=data['room'])
    #send(data, room=data['room'])


@socketio.on('join_room')
def handleJoinRoom(roomId):
    join_room(roomId)
    return None

@socketio.on('leave_room')
def handleLeaveRoom(roomId):
    leave_room(roomId)
    return None
@socketio.on('connect')
def handleConnect():
    print(request, 'I am from connect to socket')

#---------------------------private messages --------------------
@socketio.on('private_message', namespace='/private')
def handlePrivateMessage(data):
    time = datetime.now()
    private_message = PrivateMessage(messages = data['messages'], sender_id = data['sender_id'], reciever_id = data['reciever_id'], created_at=time)

    db.session.add(private_message)
    db.session.commit()
    data['created_at'] = time.strftime("%d %b %y %H:%M:%S") + " GMT"

    emit('private_room', data, to=data['roomId'], namespace='/private')
    #send(data, room=data['room'])


@socketio.on('join_room',namespace='/private')
def handlePrivateJoinRoom(roomId):
    print(roomId['roomId'], '------------------------------------------')
    join_room(roomId['roomId'])
    return None

@socketio.on('leave_room',namespace='/private')
def handlePrivateLeaveRoom(roomId):
    leave_room(roomId)
    return None

@socketio.on('connect',namespace='/private')
def handlePrivateConnect():
    print(request, 'I am from connect to private socket')






# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(main_routes, url_prefix='/api/main')
app.register_blueprint(server_routes, url_prefix='/api/server')
app.register_blueprint(private_messages_routes, url_prefix='/api/private_messages')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


if __name__ == '__main__':
    socketio.run(app)
