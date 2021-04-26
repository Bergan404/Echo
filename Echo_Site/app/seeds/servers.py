# from werkzeug.security import generate_password_hash
from app.models import db, Server
from datetime import datetime

# Adds a demo user, you can add other users here if you want


def seed_servers():
    demo_server = Server(admin_id=1, name='The Demo Server', image='',
                         public=True, created_at=datetime.now())

    db.session.add(demo_server)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_servers():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
