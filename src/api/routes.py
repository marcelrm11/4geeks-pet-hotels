"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, current_user
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

@api.route('/users', methods=['GET'])
def get_users():
    pass

@api.route('/who_am_i', methods=['GET'])
@jwt_required()
def get_user():
    # We can now access our sqlalchemy User object via `current_user`.
    return jsonify(
        id=current_user.id,
        first_name=current_user.first_name,
        last_name=current_user.last_name
    ), 200


@api.route('/signup', methods=['POST'])
def create_user():
    try:
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
    except:
        return jsonify({'error': 'something wrong'})

