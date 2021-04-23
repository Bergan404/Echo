from .db import db
# from user import User

class Server(db.Model):
  __tablename__ = 'servers'

  id = db.Column(db.Integer, primary_key = True)
  admin_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  name = db.Column(db.String(255), nullable = False, unique = True)
  image = db.Column(db.String(255))
  public = db.Column(db.Boolean, default = True)
  created_at = db.Column(db.Date)
  channels = db.relationship('Channel', back_populates='servers')
  server_users = db.relationship('ServerUser', back_populates='servers')
