"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pets, Hotel, Booking, Owner, Invoice, Favorite, Room
from api.forms import BookingForm, InvoiceForm, UserForm, ShortUserForm, PetForm, HotelForm
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
    user = User.query.filter_by(id=user_id).one_or_none()
    if not user:
        return jsonify({"error": "no user with this id"}), 404
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
            return jsonify({"error": "no user with this id"}), 404
        user.delete()
        db.session.commit()
        return jsonify({"msg": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()

# PETS ----------------------------------------------------------

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

            pet_dict = pet.serialize()
            response = jsonify(pet_dict)
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


# OWNER --------------------------------------------------------------
# CREATE OWNER -------------------------------------

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

# HOTELS ----------------------------------------------------------
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

            hotel_dict = hotel.serialize()
            response = jsonify(hotel_dict)
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


# ROOMS --------------------------------------------------------
# CREATE: ROOM ---------------------------------


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

    return "Room created successfully", 200

# READ: ROOMS ---------------------------------


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

# UPDATE: ROOM -------------------------------------


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
    finally:
        db.session.close()


# BOOKINGS ------------------------------------------------------
# CREATE: a booking ------------

@api.route("/booking/create", methods=["POST"])
def create_booking():
    form = BookingForm()
    if form.validate_on_submit():
        try:
            booking_data = {field: getattr(
                form, field).data for field in form._fields}
            booking = Booking(**booking_data)
            db.session.add(booking)
            db.session.commit()
            return jsonify({"msg": "booking created successfully", "data": booking.serialize()}), 200
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# READ: all bookings ------------


@api.route("/bookings", methods=["GET"])
def get_all_bookings():
    try:
        bookings = Booking.query.all()
        bookings_list = [b.serialize() for b in bookings]
        return jsonify({"bookings": bookings_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# READ: one booking ---------------


@api.route("/booking/<int:booking_id>", methods=["GET"])
def get_booking(booking_id):
    try:
        if not booking_id:
            return jsonify({"error": "Bad Request: booking_id is required"}), 400
        booking = Booking.query.filter_by(id=booking_id).one_or_none()

        if not booking:
            return jsonify({"error": "no booking with this id"}), 404

        return jsonify({"booking": booking.serialize()}), 200

    except Exception as e:
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

# UPDATE: edit a booking ------------


@api.route("/booking/<int:booking_id>/update", methods=["PUT"])
def update_booking(booking_id):

    updated_booking = request.get_json()
    booking = Booking.query.filter_by(id=booking_id).one_or_none()
    if not booking:
        return jsonify({"error": "no booking with this id"}), 404
    form = BookingForm(obj=updated_booking)

    if form.validate_on_submit():
        for field, value in updated_booking.items():
            setattr(booking, field, value)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()

        updated_booking = Booking.query.filter_by(id=booking_id).first()
        return jsonify({"updated booking": updated_booking.serialize()}), 200
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# DELETE: remove a booking -------------


@api.route("/booking/<int:booking_id>/delete", methods=["DELETE"])
def delete_booking(booking_id):
    try:
        booking = Booking.query.filter_by(id=booking_id).one_or_none()
        if not booking:
            return jsonify({"error": "no booking with this id"}), 404
        booking.delete()
        db.session.commit()
        return jsonify({"success": "booking deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()

# FAVORITES -----------------------------------------------------------
# CREATE: add favorite -------------


@api.route("/user/<int:user_id>/hotel/<int:hotel_id>/favorite", methods=["POST"])
def add_favorite(user_id, hotel_id):
    try:
        favorite = Favorite(user_id=user_id, hotel_id=hotel_id)
        db.session.add(favorite)
        db.session.commit()
        return jsonify({"success": "favorite added successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

# DELETE: remove favorite --------------


@api.route("/favorite/<int:favorite_id>/delete", methods=["DELETE"])
def delete_favorite(favorite_id):
    try:
        del_favorite = Favorite.query.filter_by(id=favorite_id).one_or_none()
        if not del_favorite:
            return jsonify({"error": "favorite not found"}), 404
        del_favorite.delete()
        db.session.commit()
        return jsonify({"success": "favorite deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

# INVOICES -----------------------------------------------------------
# CREATE: new invoice -------------


@api.route("/invoice/create", methods=["POST"])
def create_invoice():
    form = InvoiceForm()
    if form.validate_on_submit():
        try:
            invoice_data = {field: getattr(
                form, field).data for field in form._fields}
            invoice = Invoice(**invoice_data)
            db.session.add(invoice)
            db.session.commit()
            return jsonify({"success": "invoice created successfully"}), 200
        except Exception as e:
            db.session.rollback()
            print(sys.exc_info())
            return jsonify({"error": str(e)}), 500
        finally:
            db.session.close()
    else:
        errors = {field: errors[0] for field, errors in form.errors.items()}
        return jsonify({"error": "validation error", "errors": errors}), 400

# READ: get invoice --------------


@api.route("/invoice/<int:invoice_id>", methods=["GET"])
def get_invoice(invoice_id):
    try:
        if not invoice_id:
            return jsonify({"error": "Bad Request: invoice_id is required"}), 400
        invoice = Invoice.query.filter_by(id=invoice_id).one_or_none()
        if invoice:
            return jsonify(invoice.serialize()), 200
        else:
            return jsonify({"error": "invoice not found"}), 404
    except Exception as e:
        print(sys.exc_info())
        return jsonify({"error": str(e)}), 500

