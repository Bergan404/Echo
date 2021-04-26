# from werkzeug.security import generate_password_hash
from app.models import db, User
from datetime import datetime

# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(username='Demo', email='demo@aa.io',
                hashed_password='password', profile_picture='',
                created_at=datetime.now())

    bergan = User(username='Bergan', email='bergan@aa.io', password='password', profile_picture='',
                  created_at=datetime.now())
    mike = User(username='Mike', email='mike@aa.io', password='password', profile_picture='',
                created_at=datetime.now())
    chris = User(username='Chris', email='chris@aa.io', password='password', profile_picture='',
                created_at=datetime.now())
    jairo = User(username='Jairo', email='jairo@aa.io', password='password', profile_picture='',
                created_at=datetime.now())

    batman = User(username='Batman', email='batmgan@gmail.com',
                password='password', profile_picture='', created_at=datetime.now())

    db.session.add(demo)
    db.session.add(batman)
    db.session.add(bergan)
    db.session.add(mike)
    db.session.add(chris)
    db.session.add(jairo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
