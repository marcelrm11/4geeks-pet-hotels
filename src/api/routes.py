"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pets, Hotel, Booking, Owner, Invoice, Favorite
from api.forms import UserForm, ShortUserForm, PetForm, HotelForm
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
    # csrf_token = form.csrf_token.data
    # print('CSRF token: {}'.format(csrf_token))
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
        user = User.query.filter_by(id=user_id).delete()
        db.session.commit()
        return jsonify({"msg": "user deleted successfully"}), 200
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
    try:
        pets = Pets.query.all()
        pets_list = [pet.serialize() for pet in pets]
        response_body = {
            "pets": pets_list
        }
        return jsonify(response_body), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# READ: one pet ---------------

@api.route("/pet/<int:pet_id>", methods=["GET"])
def get_pet(pet_id):
    try:
        if not pet_id:
            return jsonify({"error": "Bad Request: pet_id is required"}), 400
        pet = Pets.query.filter_by(id=pet_id).first()
        if pet:
            return jsonify(pet.serialize()), 200
        else:
            return jsonify({"error": "Pet not found"}), 404
    except Exception as e:
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500
    
# CREATE: Pet ----------------

@api.route("/pet/create", methods=["POST"])
def create_pet():
    # ! dangerous to disable the csrf protection
    form = PetForm(meta={"csrf": False})
    if form.validate_on_submit():
        try:
            pet_data = {field: getattr(
                form, field).data for field in form._fields}
            pet = Pets(**pet_data)
            db.session.add(pet)
            db.session.commit()

            # ? what are we doing with this token?
            # access_token = create_access_token(identity=form.email.data)
            # user_dict = user.serialize()
            # user_dict["access_token"] = access_token
            pet_dict = pet.serialize()
            response = jsonify(pet_dict)
            # response.headers["Access-Control-Allow-Credentials"] = "true"
            # set_access_cookies(response, access_token)
            return response, 200
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({"error": "database information check failed"}), 400
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400
    

# UPDATE: pet info ----------------

@api.route("/pet/<int:pet_id>/update", methods=["PUT"])
def update_pet(pet_id):

    update_pet = request.get_json()
    pet = Pets.query.filter_by(id=pet_id).first()
    form = PetForm(meta={"csrf": False}, obj=update_pet)

    if form.validate_on_submit():
        for field, value in update_pet.items():
            setattr(pet, field, value)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()

        updated_pet = Pets.query.filter_by(id=pet_id).first()
        return jsonify({"updated pet": updated_pet.serialize()}), 200
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400
    
# DELETE: Pet --------------

@api.route("/pet/<int:pet_id>/delete", methods=["DELETE"])
def delete_pet(pet_id):
    try:
        pet = Pets.query.filter_by(id=pet_id).first()
        if not pet:
            return jsonify({"msg": "Pet not found"}), 404
        Pets.query.filter_by(id=pet_id).delete()
        db.session.commit()
        return jsonify({"msg": "pet deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()

# HOTELS ----------------------------------------------------------
# READ: all hotels ---------------

@api.route("/hotels", methods=["GET"])
def get_hotels():
    try:
        hotels = Hotel.query.all()
        hotels_list = [hotel.serialize() for hotel in hotels]
        response_body = {
            "hotels": hotels_list
        }
        return jsonify(response_body), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# READ: one hotel ---------------

@api.route("/hotel/<int:hotel_id>", methods=["GET"])
def get_hotel(hotel_id):
    try:
        if not hotel_id:
            return jsonify({"error": "Bad Request: hotel_id is required"}), 400
        hotel = Hotel.query.filter_by(id=hotel_id).first()
        if hotel:
            return jsonify(hotel.serialize()), 200
        else:
            return jsonify({"error": "Hotel not found"}), 404
    except Exception as e:
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

# CREATE: Hotel ----------------

@api.route("/hotel/create", methods=["POST"])
def create_hotel():
    # ! dangerous to disable the csrf protection
    form = HotelForm(meta={"csrf": False})
    if form.validate_on_submit():
        try:
            hotel_data = {field: getattr(
                form, field).data for field in form._fields}
            hotel = Hotel(**hotel_data)
            db.session.add(hotel)
            db.session.commit()

            # ? what are we doing with this token?
            # access_token = create_access_token(identity=form.email.data)
            # user_dict = user.serialize()
            # user_dict["access_token"] = access_token
            hotel_dict = hotel.serialize()
            response = jsonify(hotel_dict)
            # response.headers["Access-Control-Allow-Credentials"] = "true"
            # set_access_cookies(response, access_token)
            return response, 200
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({"error": "database information check failed"}), 400
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# UPDATE: hotel info ----------------

@api.route("/hotel/<int:hotel_id>/update", methods=["PUT"])
def update_hotel(hotel_id):

    update_hotel = request.get_json()
    hotel = Hotel.query.filter_by(id=hotel_id).first()
    form = HotelForm(meta={"csrf": False}, obj=update_hotel)

    if form.validate_on_submit():
        for field, value in update_hotel.items():
            setattr(hotel, field, value)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()

        updated_hotel = Hotel.query.filter_by(id=hotel_id).first()
        return jsonify({"updated hotel": updated_hotel.serialize()}), 200
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# DELETE: Hotel ---------------
@api.route("/hotel/<int:hotel_id>/delete", methods=["DELETE"])
def delete_hotel(hotel_id):
    try:
        hotel = Hotel.query.filter_by(id=hotel_id).first()
        if not hotel:
            return jsonify({"msg": "Hotel not found"}), 404
        Hotel.query.filter_by(id=hotel_id).delete()
        db.session.commit()
        return jsonify({"msg": "hotel deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()