"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_users():

    response_body = {
        "message": "Hello! This is your GET/ users request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        first_name = request.json.get("first_name", None)
        last_name = request.json.get("last_name", None)
        country = request.json.get("country", None)
        zip_code = request.json.get("zip_code", None)
        phone_number = request.json.get("phone_number", None)
        user = User(email = email, password = password, first_name = first_name, last_name = last_name, country = country, zip_code = zip_code, phone_number = phone_number)
        db.session.add(user)
        db.session.commit()

        return jsonify(user.serialize()), 200