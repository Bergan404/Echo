from .db import db

# the ONE to Server
# the MANY to the Messages


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable = False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable = False)
    created_at = db.Column(db.Date)

    messages = db.relationship('Message', back_populates='channels')
    servers = db.relationship('Server', back_populates='channels')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'created_at': self.created_at
        }
