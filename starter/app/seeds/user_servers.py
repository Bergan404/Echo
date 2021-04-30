from app.models import db, Server, User, server_users
from datetime import datetime
from faker import Faker
import random
fake = Faker()
# to seed a joints table seed it all under the same function
def seed_users_servers():

    def auto_seed(count):
        for i in range(count):
            admin_id = random.randint(1 ,count)
            name = fake.slug()
            image = fake.image_url(width=80, height=80)
            public = True
            created_at=datetime.now()
            while image == "https://dummyimage.com/80x80" or image == "https://www.lorempixel.com/80x80" or image == "https://www.lorempixel.com/80/80":
                image = fake.image_url(width=80, height=80)

            seed_server = Server(admin_id=admin_id, name=name, image=image, public=public, created_at=created_at)

            username = fake.name()
            email = fake.email()
            password = 'password'
            profile_picture = fake.image_url(width=80, height=80)
            while profile_picture == "https://dummyimage.com/80x80" or profile_picture == "https://www.lorempixel.com/80x80" or profile_picture =="https://www.lorempixel.com/80/80":
                profile_picture = fake.image_url(width=80, height=80)

            seed_user = User(username=username, email=email, password=password, profile_picture=profile_picture, created_at=created_at)

            seed_user.servers.append(seed_server)
            db.session.add(seed_user)


    auto_seed(50)



    # # First the Server
    # demo_server = Server(admin_id=1, name='The Demo Server', image='',
    #                      public=True, created_at=datetime.now())
    # demo_server2 = Server(admin_id=2, name='The Demo Server2', image='',
    #                      public=True, created_at=datetime.now())

    # # Second the Users
    # demo = User(username='Demo', email='demo@aa.io',
    #             password='password', profile_picture='https://www.pinkvilla.com/files/styles/contentpreview/public/rr_main.jpg?itok=jL1UvFpi',
    #             created_at=datetime.now())

    # # Third append them and commit
    # demo.servers.append(demo_server)
    # db.session.add(demo)

    # # Repeat
    # jairo = User(username='Jairo', email='jairo@aa.io', password='password', profile_picture='https://avatarfiles.alphacoders.com/128/thumb-128984.png',
    #             created_at=datetime.now())

    # jairo.servers.append(demo_server2)
    # db.session.add(jairo)

    # mike = User(username='Mike', email='mike@aa.io', password='password', profile_picture='',
    #             created_at=datetime.now())

    # mike.servers.append(demo_server2)
    # db.session.add(mike)

    # bergan = User(username='Bergan', email='bergan@aa.io', password='password', profile_picture='',
    #               created_at=datetime.now())
    # chris = User(username='Chris', email='chris@aa.io', password='password', profile_picture='',
    #             created_at=datetime.now())

    # db.session.add(bergan)
    # db.session.add(chris)

    db.session.commit()

def undo_users_servers():
    db.session.execute('TRUNCATE server_users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
