"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.forms import UserForm, ShortUserForm
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from sqlalchemy.exc import IntegrityError
import sys

api = Blueprint('api', __name__)

### ------------------- API ROUTES -------------------------- ###
### --------------------------------------------------------- ###

# Signup --------------
@api.route('/signup', methods=['POST'])
def create_user():
    form = UserForm(meta={'csrf': False}) #! dangerous to disable the csrf protection
    if form.validate_on_submit():
        try:
            user_data = {field: getattr(form, field).data for field in form._fields}
            print(user_data)
            user = User(**user_data)
            db.session.add(user)
            db.session.commit()

            access_token = create_access_token(identity=form.email.data)
            user_dict = user.serialize()
            user_dict['access_token'] = access_token

            response = jsonify(user_dict)
            response.headers["Access-Control-Allow-Credentials"] = "true"
            set_access_cookies(response, access_token)
            print(access_token)
            return response, 200
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({'error': 'email already exists'}), 400
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({'error': str(e)}), 500
        finally:
            db.session.close()
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({'error': 'validation error', 'errors': errors}), 400

# Login -------------
@api.route('/login', methods=['POST'])
def handle_login():
    form = ShortUserForm(meta={'csrf': False})
    if form.validate_on_submit():
        try:
            email = form.email.data
            password = form.password.data
            user = User.query.filter_by(email=email).one_or_none()

            if not user:
                raise Exception("No user with this email")
            elif user.password != password:
                raise Exception("Wrong password")

            access_token = create_access_token(identity=email)
            response = jsonify({
                "msg": "login successful", 
                "access_token": access_token
            })
            response.access_token = access_token
            set_access_cookies(response, access_token)
            return response, 200
        except Exception as e:
            return jsonify({"error": str(e)}), 401

# Get all users in the database -------------
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    print(users)
    users_list = list(map(lambda object : object.serialize(), users))
    response_body = {
        "msg": "Hey there, this is your GET /users response :)",
        "users": users_list
    }
    return jsonify(response_body), 200

# User Profile ------------
@api.route('/user/account', methods=['GET'])
@jwt_required()
def access_account():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# Logout -----------------
@api.route('/logout')
def logout():
    return 'You log out'