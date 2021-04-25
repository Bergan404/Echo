from .db import db


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(
        'servers.id'), nullable=False)
    created_at = db.Column(db.Date)

    # relations
    messages = db.relationship('Message', back_populates='channels')
    servers = db.relationship('Server', back_populates='channels')
