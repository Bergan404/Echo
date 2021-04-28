from flask import Blueprint, jsonify, session, request
from app.models import User, db, Server

main_routes = Blueprint('main', __name__)


@main_routes.route('/')
def main():
    servers = Server.query.all()
    return {"servers": [server.to_dict() for server in servers]}
