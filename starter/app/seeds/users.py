# from werkzeug.security import generate_password_hash
from app.models import db, User
from datetime import datetime

# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(username='Demo', email='demo@aa.io',
                hashed_password='password')

    bergan = User(username='Bergan', email='bergan@aa.io', password='password')
    mike = User(username='Mike', email='mike@aa.io', password='password')
    chris = User(username='Chris', email='chris@aa.io', password='password')
    jiaro = User(username='Jiaro', email='jiaro@aa.io', password='password')

    db.session.add(demo)
    db.session.add(bergan)
    db.session.add(mike)
    db.session.add(chris)
    db.session.add(jiaro)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
