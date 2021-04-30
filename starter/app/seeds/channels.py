from app.models import db, Channel
from datetime import datetime



def seed_channels():
    demo_channel = Channel(name='The Demo channel', server_id=1, created_at=datetime.now())
    demo_channel2 = Channel(name='The Demo channel2', server_id=1, created_at=datetime.now())
    demo_channel3 = Channel(name='The Demo channel', server_id=2, created_at=datetime.now())

    db.session.add(demo_channel)
    db.session.add(demo_channel2)
    db.session.add(demo_channel3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_channels():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
