from flask.cli import AppGroup
# from .users import seed_users, undo_users
# from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .user_servers import seed_users_servers, undo_users_servers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # seed_users()
    # seed_servers()
    seed_users_servers()
    seed_channels()
    seed_messages()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_users()
    # undo_servers()
    undo_users_servers()
    undo_servers()
    undo_messages()
    # Add other undo functions here
