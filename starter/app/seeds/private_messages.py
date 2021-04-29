from app.models import db, PrivateMessage
from datetime import datetime



def seed_private_messages():
    demo_privateMessage1 = PrivateMessage(messages='The Demo privateMessage1', sender_id=1, reciever_id=2, created_at=datetime.now())
    demo_privateMessage2 = PrivateMessage(messages='The Demo privateMessage2', sender_id=2, reciever_id=1, created_at=datetime.now())
    demo_privateMessage3 = PrivateMessage(messages='The Demo privateMessage3', sender_id=2, reciever_id=1, created_at=datetime.now())
    demo_privateMessage4 = PrivateMessage(messages='The Demo privateMessage4', sender_id=1, reciever_id=2, created_at=datetime.now())
    demo_privateMessage5 = PrivateMessage(messages='The Demo privateMessage5', sender_id=1, reciever_id=2, created_at=datetime.now())
    demo_privateMessage6 = PrivateMessage(messages='The Demo privateMessage6', sender_id=2, reciever_id=1, created_at=datetime.now())

    db.session.add(demo_privateMessage1)
    db.session.add(demo_privateMessage2)
    db.session.add(demo_privateMessage3)
    db.session.add(demo_privateMessage4)
    db.session.add(demo_privateMessage5)
    db.session.add(demo_privateMessage6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_private_messages():
    db.session.execute('TRUNCATE private_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
