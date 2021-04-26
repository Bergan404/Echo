from app.models import db, Message
from datetime import datetime



def seed_messages():
    demo_message = Message(messages='The Demo message', reply='', user_id=1, channel_id=1, created_at=datetime.now())
    demo_message2 = Message(messages='The Demo message2', reply='', user_id=2, channel_id=1, created_at=datetime.now())
    demo_message3 = Message(messages='The Demo message3', reply='', user_id=2, channel_id=1, created_at=datetime.now())
    demo_message4 = Message(messages='The Demo message4', reply='', user_id=1, channel_id=1, created_at=datetime.now())
    demo_message5 = Message(messages='The Demo message5', reply='', user_id=1, channel_id=1, created_at=datetime.now())

    db.session.add(demo_message)
    db.session.add(demo_message2)
    db.session.add(demo_message3)
    db.session.add(demo_message4)
    db.session.add(demo_message5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_messages():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
