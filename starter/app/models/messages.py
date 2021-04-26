from .db import db

# the ONE that belongs to the MANY of User and Channel
class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key = True)
  messages = db.Column(db.Text, nullable = False)
  reply = db.Column(db.Text, nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable = False)
  created_at = db.Column(db.DateTime)

  users = db.relationship('User', back_populates='messages')
  channels = db.relationship('Channel', back_populates='messages')