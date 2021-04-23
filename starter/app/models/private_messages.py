from .db import db


class PrivateMessage(db.Model):
  __tablename__ = 'private_messages'

  id = db.Column(db.Integer, primary_key = True)
  sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  reciever_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  messages = db.Column(db.Text, nullable = False)
  created_at = db.Column(db.DateTime)
