from .db import db


class ServerUser(db.Model):
  __tablename__ = 'server_users'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable = False)

  user = db.relationship("User", back_populates='server_users')
  servers = db.relationship("Server", back_populates='server_users')
