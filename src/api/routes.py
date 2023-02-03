"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.forms import UserForm
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)
# API Routes
# ---------------------------------------------------------------
@api.route('/signup', methods=['POST'])
def create_user():
    form = UserForm()
    if form.validate_on_submit():
        try:
            user_data = {field: getattr(form, field).data for field in form._fields}
            user = User(**user_data)

            db.session.add(user)
            db.session.commit()
            return jsonify(user.serialize()), 200
        except:
            db.session.rollback()
            return jsonify({'error': 'something went wrong'})
        finally:
            db.session.close()
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({'error': 'validation error', 'errors': errors}), 400

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/user/account', methods=['POST'])
def handle_account():
        return 'Succesfully log in'

@api.route('/logout')
def logout():
        return 'You log out'