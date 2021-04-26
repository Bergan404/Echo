from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# ---------------Joint Table (many to many connection)----------------
# when creating a joint table it is highly recommended to go about it by creating the table
# like this rather than with a class like any other normal table
server_users = db.Table(
    'server_users',
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'), nullable=False
    ),
    db.Column(
        "server_id", db.Integer, db.ForeignKey('servers.id'), nullable=False
    )
)


# -------------------- User Class Table --------------------------------
# the MANY TO ONE of verything else on the table
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(255))
    created_at = db.Column(db.Date)

    # one to many relationship
    server_admin = db.relationship('Server', back_populates='admin')
    messages = db.relationship('Message', back_populates='users')

    # the relationship for the joints table
    servers = db.relationship(
        'Server', secondary=server_users, back_populates='users', lazy='dynamic')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


# ------------------------------Servers Table ----------------------------------

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False, unique=True)
    image = db.Column(db.String(255))
    public = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.Date)

    # relations
    channels = db.relationship('Channel', back_populates='servers')
    admin = db.relationship('User', back_populates='server_admin')
    users = db.relationship('User', secondary=server_users,
                            back_populates='servers', lazy='dynamic')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "public": self.public,
            "admin_id": self.admin_id,
            'created_at': self.created_at
        }
