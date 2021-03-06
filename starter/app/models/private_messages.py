from .db import db

# the ONE to the User
class PrivateMessage(db.Model):
    __tablename__ = 'private_messages'

    id = db.Column(db.Integer, primary_key = True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    reciever_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    messages = db.Column(db.Text, nullable = False)
    created_at = db.Column(db.DateTime)

    # since the table references the same foreign key twice we must specify what exactly we are referencing to fix the error as shown below
    # backref allows us to avoid creating the relationship on the the other table as well (cutting the work in half)
    sender= db.relationship('User', backref="sender_person", foreign_keys=[sender_id])
    reciever= db.relationship('User', backref="reciever_person", foreign_keys=[reciever_id])

    def to_dict(self):
        return {
      'id': self.id,
      'messages': self.messages,
      'sender_id': self.sender_id,
      'reciever_id': self.reciever_id,
      'created_at': self.created_at
        }
