"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.forms import UserForm
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

### ------------------- API ROUTES -------------------------- ###
### --------------------------------------------------------- ###
# Signup --------------
@api.route('/signup', methods=['POST'])
def create_user():
    form = UserForm()
    access_token = create_access_token(form) #! token
    if form.validate_on_submit():
        try:
            user_data = {field: getattr(form, field).data for field in form._fields}
            user = User(**user_data)
            # user.csrf_token = access_token #! token

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

# Login -------------
@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    try:
        user = User.query.filter_by(email=email).one_or_none()
    # will return None if there is no user with email in your database, or an instance of class User if there is exactly one, or raises an exception if there are multiple.
    except: #TODO user not found error
        if not user:
            return jsonify({"msg": "No user with this email"}), 401
    # except: #TODO password error
    #     if not user.check_password(password):
    #         return jsonify({"msg": "Wrong password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

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