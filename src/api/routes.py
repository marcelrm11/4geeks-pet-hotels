"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pets, Hotel, Booking, Owner, Invoice, Favorite, Room
from api.forms import UserForm, ShortUserForm
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies
from sqlalchemy.exc import IntegrityError
import sys

api = Blueprint("api", __name__)

### ------------------- API ROUTES -------------------------- ###
### --------------------------------------------------------- ###

# AUTHENTICATION ----------------------------------------------
# Login -------------


@api.route("/login", methods=["POST"])
def handle_login():
    form = ShortUserForm(meta={"csrf": False})
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


@api.route("/user/account", methods=["GET"])
@jwt_required()
def access_account():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# Logout -----------------


@api.route("/logout")
def logout():
    return "You log out"

# USERS ----------------------------------------------------------
# CREATE: User (aka Signup) --------------


@api.route("/signup/user", methods=["POST"])
def create_user():
    # ! dangerous to disable the csrf protection
    form = UserForm(meta={"csrf": False})
    if form.validate_on_submit():
        try:
            user_data = {field: getattr(
                form, field).data for field in form._fields}
            print(user_data)
            user = User(**user_data)
            db.session.add(user)
            db.session.commit()

            # ? what are we doing with this token?
            access_token = create_access_token(identity=form.email.data)
            user_dict = user.serialize()
            user_dict["access_token"] = access_token

            response = jsonify(user_dict)
            response.headers["Access-Control-Allow-Credentials"] = "true"
            set_access_cookies(response, access_token)
            return response, 200
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({"error": "email already exists"}), 400
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# READ: all users -------------


@api.route("/users", methods=["GET"])
def get_users():
    try:
        users = User.query.all()
        print(users)
        users_list = [u.serialize() for u in users]
        response_body = {
            "msg": "Hey there, this is your GET /users response :)",
            "users": users_list
        }
        return jsonify(response_body), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# READ: one user -------------


@api.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    try:
        if not user_id:
            return jsonify({"error": "Bad Request: user_id is required"}), 400
        user = User.query.filter_by(id=user_id).first()
        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

# UPDATE: user info ------------


@api.route("/user/<int:user_id>/update", methods=["PUT"])
def update_user(user_id):

    updated_user = request.get_json()  # see signup for form validation
    user = User.query.filter_by(id=user_id).first()
    form = UserForm(obj=updated_user)

    if form.validate_on_submit():
        for field, value in updated_user.items():
            setattr(user, field, value)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()

        updated_user = User.query.filter_by(id=user_id).first()
        return jsonify({"updated user": updated_user.serialize()}), 200
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# DELETE: user account ---------


@api.route("/user/<int:user_id>/delete", methods=["DELETE"])
def delete_user(user_id):

    try:
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        User.query.filter_by(id=user_id).delete()
        db.session.commit()
        return jsonify({"msg": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()

# PETS ----------------------------------------------------------
# READ: all pets ---------------


@api.route("/pets", methods=["GET"])
def get_pets():
    pets = Pets.query.all()
    pets_list = list(map(lambda obj: obj.serialize(), pets))
    response_body = {
        "msg": "Hey there, this is your GET /pets response :)",
        "pets": pets_list
    }
    return jsonify(response_body), 200

# OWNER -------------------------------------------------------------------------------------
# CREATE OWNER ------------------------------------------------------------------------------

@api.route("/signup/owner", methods=["POST"])
def create_owner():
    # ! dangerous to disable the csrf protection
    form = UserForm(meta={"csrf": False})
    if form.validate_on_submit():
        try:
            owner_data = {field: getattr(
                form, field).data for field in form._fields}
            print(owner_data)
            owner = Owner(**owner_data)
            db.session.add(owner)
            db.session.commit()

            # ? what are we doing with this token?
            access_token = create_access_token(identity=form.email.data)
            owner_dict = owner.serialize()
            owner_dict["access_token"] = access_token

            response = jsonify(owner_dict)
            response.headers["Access-Control-Allow-Credentials"] = "true"
            set_access_cookies(response, access_token)
            return response, 200
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({"error": "email already exists"}), 400
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# READ: ALL OWNERS -------------


@api.route("/owners", methods=["GET"])
def get_owners():
    try:
        owners = Owner.query.all()
        print(owners)
        owners_list = [o.serialize() for o in owners]
        response_body = {
            "msg": "Hey there, this is your GET /owners response :)",
            "owners": owners_list
        }
        return jsonify(response_body), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# READ: ONE OWNER ------------------------------------------------------


@api.route("/owner/<int:owner_id>", methods=["GET"])
def get_owner(owner_id):
    try:
        if not owner_id:
            return jsonify({"error": "Bad Request: owner_id is required"}), 400
        owner = Owner.query.filter_by(id=owner_id).first()
        if owner:
            return jsonify(owner.serialize()), 200
        else:
            return jsonify({"error": "Owner not found"}), 404
    except Exception as e:
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

# UPDATE: OWNER ------------------------------------------------------------------


@api.route("/owner/<int:owner_id>/update", methods=["PUT"])
def update_owner(owner_id):

    updated_owner = request.get_json()
    owner = Owner.query.filter_by(id=owner_id).first()
    form = UserForm(obj=updated_owner, meta={"csrf": False})

    if form.validate_on_submit():
        for field, value in updated_owner.items():
            setattr(owner, field, value)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()

        updated_owner = Owner.query.filter_by(id=owner_id).first()
        return jsonify({"updated owner": updated_owner.serialize()}), 200
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# DELETE: OWNER -----------------------------------------------------------------


@api.route("/owner/<int:owner_id>/delete", methods=["DELETE"])
def delete_owner(owner_id):

    try:
        owner = Owner.query.filter_by(id=owner_id).first()
        if not owner:
            return jsonify({"error": "Owner not found"}), 404
        
        Owner.query.filter_by(id=owner_id).delete()
        db.session.commit()
        return jsonify({"msg": "Owner deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()

# READ: ROOMS -----------------------------------------------------------------

@api.route("/rooms", methods=["GET"])
def get_rooms():
    try:
        rooms = Room.query.all()
        print(rooms)
        rooms_list = [r.serialize() for r in rooms]
        response_body = {
            "rooms": rooms_list
        }
        return jsonify(response_body), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# CREATE: ROOM -----------------------------------------------------------------

@api.route('/room/create', methods=['POST'])
def create_room():

    room_data = request.get_json()
    if not room_data:
        return "No data received", 400

    required_fields = ['pet_type']
    for field in required_fields:
        if field not in room_data:
            return f"Missing required field: {field}", 400
    
    # Create a new room object using the data
    new_room = Room(pet_type=room_data['pet_type'])
    db.session.add(new_room)
    db.session.commit()
    
    return "Room created successfully", 201

# READ: ROOMS PET TYPE -----------------------------------------------------------------

@api.route('/rooms/<pet_type>', methods=['GET'])
def get_rooms_pet_type(pet_type):

    try:
        rooms = Room.query.filter_by(pet_type=pet_type).all()
        if not rooms:
            return "No rooms found for pet type: " + pet_type, 404
    
        room_list = [r.serialize() for r in rooms]
        response_body = {
            "rooms_by_pet_type": room_list
        }

        return jsonify(response_body), 200

    except Exception as e:
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

# DELETE: ROOM -----------------------------------------------------------------

@api.route("/room/<int:room_id>/delete", methods=["DELETE"])
def delete_room(room_id):
    try:
        room = Room.query.filter_by(id=room_id).first()
        if not room:
            return jsonify({"error": "Room not found"}), 404
        
        Room.query.filter_by(id=room_id).delete()
        db.session.commit()
        return jsonify({"msg": "Room deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

@api.route("/room/<int:room_id>/update", methods=["PUT"])
def update_room(room_id):

        try:
            room = Room.query.filter_by(id=room_id).first()
            if not room:
                return jsonify({"error": "Room not found"}), 404
        
            data = request.get_json()
            if not data:
                return jsonify({"error": "Bad Request: No data provided"}), 400
        
            pet_type = data.get("pet_type")

            if pet_type:
                room.pet_type = pet_type

                db.session.commit()
                return jsonify(room.serialize()), 200
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()



