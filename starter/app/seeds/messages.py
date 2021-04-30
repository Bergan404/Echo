from app.models import db, Message
from datetime import datetime
from faker import Faker
import random
fake = Faker()


def seed_messages():
    def auto_seed(count, user_count, channel_count):
        for i in range(count):
            messages = fake.paragraph(nb_sentences=random.randint(1,5))
            user_id = random.randint(1, user_count)
            channel_id = random.randint(1, channel_count)
            created_at = datetime.now()
            seed_message = Message(messages= messages, user_id=user_id, channel_id=channel_id, created_at=created_at)
            db.session.add(seed_message)
    auto_seed(1000, 50, 150)
    # demo_message = Message(messages='The Demo message', reply='', user_id=1, channel_id=1, created_at=datetime.now())
    # demo_message2 = Message(messages='The Demo message2', reply='', user_id=2, channel_id=1, created_at=datetime.now())
    # demo_message3 = Message(messages='The Demo message3', reply='', user_id=2, channel_id=1, created_at=datetime.now())
    # demo_message4 = Message(messages='The Demo message4', reply='', user_id=1, channel_id=1, created_at=datetime.now())
    # demo_message5 = Message(messages='The Demo message5', reply='', user_id=1, channel_id=1, created_at=datetime.now())
    # demo_message6 = Message(messages='The Demo message6', reply='', user_id=2, channel_id=2, created_at=datetime.now())

    # db.session.add(demo_message)
    # db.session.add(demo_message2)
    # db.session.add(demo_message3)
    # db.session.add(demo_message4)
    # db.session.add(demo_message5)
    # db.session.add(demo_message6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_messages():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
