from app.models import db, PrivateMessage
from datetime import datetime
from faker import Faker
import random
fake = Faker()


def seed_private_messages():
    def auto_seed(count, user_count):
        for i in range(count):
            messages = fake.paragraph(nb_sentences=random.randint(1,5))
            sender_id = random.randint(1, user_count)
            reciever_id = random.randint(1, user_count)
            created_at = datetime.now()
            while sender_id == reciever_id:
                reciever_id = random.randint(1, user_count)
            seed_private_message = PrivateMessage(messages=messages, sender_id=sender_id, reciever_id=reciever_id, created_at=created_at)
            db.session.add(seed_private_message)
    auto_seed(250, 51)

    # demo_privateMessage1 = PrivateMessage(messages='The Demo privateMessage1', sender_id=1, reciever_id=2, created_at=datetime.now())
    # demo_privateMessage2 = PrivateMessage(messages='The Demo privateMessage2', sender_id=2, reciever_id=1, created_at=datetime.now())
    # demo_privateMessage3 = PrivateMessage(messages='The Demo privateMessage3', sender_id=2, reciever_id=1, created_at=datetime.now())
    # demo_privateMessage4 = PrivateMessage(messages='The Demo privateMessage4', sender_id=1, reciever_id=2, created_at=datetime.now())
    # demo_privateMessage5 = PrivateMessage(messages='The Demo privateMessage5', sender_id=1, reciever_id=2, created_at=datetime.now())
    # demo_privateMessage6 = PrivateMessage(messages='The Demo privateMessage6', sender_id=2, reciever_id=1, created_at=datetime.now())

    # db.session.add(demo_privateMessage1)
    # db.session.add(demo_privateMessage2)
    # db.session.add(demo_privateMessage3)
    # db.session.add(demo_privateMessage4)
    # db.session.add(demo_privateMessage5)
    # db.session.add(demo_privateMessage6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_private_messages():
    db.session.execute('TRUNCATE private_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
