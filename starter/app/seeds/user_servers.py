from app.models import db, Server, User, server_users
from datetime import datetime

# to seed a joints table seed it all under the same function
def seed_users_servers():
    # First the Server
    demo_server = Server(admin_id=1, name='The Demo Server', image='',
                         public=True, created_at=datetime.now())
    demo_server2 = Server(admin_id=2, name='The Demo Server2', image='',
                         public=True, created_at=datetime.now())

    # Second the Users
    demo = User(username='Demo', email='demo@aa.io',
                hashed_password='password', profile_picture='',
                created_at=datetime.now())
    
    # Third append them and commit
    demo.servers.append(demo_server)
    db.session.add(demo)

    # Repeat
    jairo = User(username='Jairo', email='jairo@aa.io', password='password', profile_picture='',
                created_at=datetime.now())

    jairo.servers.append(demo_server2)
    db.session.add(jairo)

    mike = User(username='Mike', email='mike@aa.io', password='password', profile_picture='',
                created_at=datetime.now())

    mike.servers.append(demo_server2)
    db.session.add(mike)

    bergan = User(username='Bergan', email='bergan@aa.io', password='password', profile_picture='',
                  created_at=datetime.now())
    chris = User(username='Chris', email='chris@aa.io', password='password', profile_picture='',
                created_at=datetime.now())

    db.session.add(bergan)
    db.session.add(chris)

    db.session.commit()

def undo_users_servers():
    db.session.execute('TRUNCATE server_users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()