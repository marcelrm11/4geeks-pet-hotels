import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(32), unique=False, nullable=False)
    confirm_password = db.Column(db.String(32), unique=False, nullable=False)
    # ? what is this doing here?
    is_active = db.Column(db.Boolean(), unique=False,
                          nullable=False, default=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.String(30), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    user_pets = db.relationship("Pets", backref=db.backref("user"))
    user_bookings = db.relationship("Booking", backref=db.backref("user"))
    invoices = db.relationship("Invoice", backref=db.backref("user"))
    favorites = db.relationship("Favorite", backref=db.backref("user"))

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "zip_code": self.zip_code,
            "user_pets": [pet.serialize() for pet in self.user_pets],
            # could we remove this?
            "user_bookings": [booking.serialize() for booking in self.user_bookings],
            # could we remove this?
            "favorites": [fav.serialize() for fav in self.favorites]
        }


class Pets(db.Model):
    __tablename__ = "pets"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    pet_type = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(50), nullable=False, default="N/A")
    birth_date = db.Column(db.String(), nullable=False)
    health = db.Column(db.String(50), nullable=False)
    pet_owner_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), nullable=False)
    bookings = db.relationship("Booking", backref=db.backref("pets"))

    def __repr__(self):
        return f"<Pet {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "pet_type": self.pet_type,
            "breed": self.breed,
            "birth_date": self.birth_date,
            "health": self.health,
            "pet_owner_id": self.pet_owner_id
        }


class Favorite(db.Model):
    __tablename__ = "favorite"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)

    def __repr__(self):
        return f"<Favorite_id {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "hotel": self.hotel.serialize(),
            "hotel_id": self.hotel_id
        }


class Owner(db.Model):
    __tablename__ = "owner"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(32), unique=False, nullable=False)
    confirm_password = db.Column(db.String(32), unique=False, nullable=False)
    # ? what is this doing here?
    is_active = db.Column(db.Boolean(), unique=False,
                          nullable=False, default=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.String(30), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    hotels = db.relationship("Hotel", backref=db.backref("owner"))
    bookings = db.relationship("Booking", backref=db.backref("owner"))

    def __repr__(self):
        return f"<Hotel_owner {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "zip_code": self.zip_code,
            "hotels": [h.serialize() for h in self.hotels],
            "bookings": [b.serialize() for b in self.bookings]
        }


class Hotel(db.Model):
    __tablename__ = "hotel"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.String(30), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    location = db.Column(db.String(70), nullable=False)
    services = db.Column(db.String(100), nullable=False)
    hotel_owner_id = db.Column(
        db.Integer, db.ForeignKey("owner.id"), nullable=False)
    hotel_bookings = db.relationship("Booking", backref=db.backref("hotel"))
    invoices = db.relationship("Invoice", backref=db.backref("hotel"))
    favorites = db.relationship("Favorite", backref=db.backref("hotel"))
    rooms = db.relationship("Room", backref=db.backref("hotel"))

    def __repr__(self):
        return f"<Hotel {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "location": self.location,
            "phone_number": self.phone_number,
            "country": self.country,
            "zip_code": self.zip_code,
            "rooms": [r.serialize() for r in self.rooms],
            "hotel_bookings": [booking.serialize() for booking in self.hotel_bookings],
            "hotel_owner_id": self.hotel_owner_id
        }


class Room(db.Model):
    __tablename__ = "room"
    id = db.Column(db.Integer, primary_key=True)
    pet_type = db.Column(db.String(30), nullable=False, default="any")
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)
    bookings = db.relationship("Booking", backref=db.backref("room"))

    def __repr__(self):
        return f"<Room_id {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "pet_type": self.pet_type,
            "hotel_id": self.hotel_id,
            "bookings": [booking.serialize() for booking in self.bookings]
        }


class Booking(db.Model):
    __tablename__ = "booking"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.id"), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("owner.id"), nullable=False)
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey("room.id"), nullable=False)
    create_date = db.Column(db.DateTime, nullable=False,
                            default=datetime.datetime.now)
    entry_date = db.Column(db.DateTime, nullable=False)
    checkout_date = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    currency = db.Column(db.String(20), nullable=False, default="euro")
    invoice = db.relationship("Invoice", backref=db.backref("booking"))

    def __repr__(self):
        return f"<Booking {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "create_date": self.create_date,
            "entry_date": self.entry_date,
            "checkout_date": self.checkout_date,
            "owner_id": self.owner_id,
            "hotel_id": self.hotel_id,
            "price": self.price,
            "currency": self.currency,
            "invoice": self.invoice.serialize()  # could we remove this?
        }


class Invoice(db.Model):
    __tablename__ = "invoice"
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey(
        "booking.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)
    amount = db.Column(db.Float(precision=2), nullable=False)
    currency = db.Column(db.String(20), nullable=False, default="euro")
    billing_address = db.Column(db.String(80), nullable=False)
    payment_ref = db.Column(db.String(), nullable=True)

    def __repr__(self):
        return f"<Invoice_id {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "currency": self.currency,
            "billing_address": self.billing_address,
            "payment_ref": self.payment_ref,
            "booking_id": self.booking_id,
            "user_id": self.user_id,
            "hotel_id": self.hotel_id
        }


class Countries_zip_codes(db.Model):
    __tablename__ = "countries_zip_codes"
    country = db.Column(db.String)
    country_iso = db.Column(db.String, primary_key=True)
    zip_regex = db.Column(db.String)

    def __repr__(self):
        return f"<{self.country_iso}: {self.country}>"


