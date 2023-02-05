"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.forms import UserForm
import sys
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from sqlalchemy.exc import IntegrityError

api = Blueprint('api', __name__)

### ------------------- API ROUTES -------------------------- ###
### --------------------------------------------------------- ###
# Signup --------------
@api.route('/signup', methods=['POST'])
def create_user():
    form = UserForm(meta={'csrf': False}) #! to disable the csrf protection
    if form.validate_on_submit():
        try:
            user_data = {field: getattr(form, field).data for field in form._fields}
            print(user_data)
            user = User(**user_data)
            # with db.session.begin_nested():
            db.session.add(user)
            db.session.commit()

            access_token = create_access_token(identity=form.email.data)
            response = jsonify(user.serialize())
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
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    try:
        user = User.query.filter_by(email=email).one_or_none()
        
        if not user:
            return jsonify({"msg": "No user with this email"}), 401
        elif user.password != password:# will return None if there is no user with email in your database, or an instance of class User if there is exactly one, or raises an exception if there are multiple.
            return jsonify({"msg": "Wrong password"}), 401
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    
    except: #TODO user not found error
        return jsonify({"msg": "error"})

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
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# Logout -----------------
@api.route('/logout')
def logout():
    return 'You log out'