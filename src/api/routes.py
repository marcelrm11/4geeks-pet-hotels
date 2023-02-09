"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pets, Hotel, Booking, Owner, Invoice, Favorite
from api.forms import UserForm, ShortUserForm
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from sqlalchemy.exc import IntegrityError
import sys

api = Blueprint('api', __name__)

### ------------------- API ROUTES -------------------------- ###
### --------------------------------------------------------- ###

### AUTHENTICATION ----------------------------------------------
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
                "access_token": access_token,
                "user": user.serialize()
            })
            response.headers["Access-Control-Allow-Credentials"] = "true"
            set_access_cookies(response, access_token)
            return response, 200
        except Exception as e:
            return jsonify({"error": str(e)}), 401

# Get User ID ------------
@api.route('/user/account', methods=['GET'])
@jwt_required()
def access_account():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# Logout -----------------
@api.route('/logout')
def logout():
    return 'You log out'

### USERS ----------------------------------------------------------
# CREATE: User (aka Signup) --------------
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

            #? what are we doing with this token?
            access_token = create_access_token(identity=form.email.data)
            user_dict = user.serialize()
            user_dict['access_token'] = access_token

            response = jsonify(user_dict)
            response.headers["Access-Control-Allow-Credentials"] = "true"
            set_access_cookies(response, access_token)
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

# READ: all users -------------
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

# READ: one user -------------
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        if not user_id:
            return jsonify({'error': 'Bad Request: user_id is required'}), 400
        user = User.query.filter_by(id=user_id).first()
        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        print(sys.exc_info())
        return jsonify({'error': str(e)}), 500

# UPDATE: user info ------------   
@api.route('/user/<int:user_id>/update', methods=['PUT'])
def update_user(user_id):
    updated_user = request.get_json() # see signup for form validation
    user = User.query.filter_by(id=user_id).first()
    for field, value in updated_user.items():
        setattr(user, field, value)
    db.session.commit()
    updated_user = User.query.filter_by(id=user_id).first()
    return jsonify({'updated user': updated_user.serialize()}), 200

# DELETE: user account ---------
@api.route('/user/<int:user_id>/delete', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).delete()
    db.session.commit()
    return jsonify({'msg': 'user deleted successfully'}), 200

# READ: all pets ---------------
@api.route('/pets', methods=['GET'])
def get_pets():
    pets = Pets.query.all()
    pets_list = list(map(lambda obj : obj.serialize(), pets))
    response_body = {
        "msg": "Hey there, this is your GET /pets response :)",
        "pets": pets_list
    }
    return jsonify(response_body), 200
