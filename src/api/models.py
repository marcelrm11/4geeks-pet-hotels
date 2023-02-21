import datetime
from enum import Enum
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
    phone_number = db.Column(db.String(20), nullable=False)
    user_pets = db.relationship("Pets", backref=db.backref("user"))
    user_bookings = db.relationship("Booking", backref=db.backref("user"))
    invoices = db.relationship("Invoice", backref=db.backref("user"))
    favorites = db.relationship("Favorite", backref=db.backref("user"))
    reviews = db.relationship("Review", backref=db.backref("user"))

    def __repr__(self):
        return f"<User {self.id}: {self.first_name} {self.last_name}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "phone_number": self.phone_number,
            "zip_code": self.zip_code,
            "user_pets": [pet.serialize() for pet in self.user_pets],
            # could we remove this?
            "user_bookings": [booking.serialize() for booking in self.user_bookings],
            # could we remove this?
            "favorites": [fav.serialize() for fav in self.favorites]
        }


class PetType(Enum):
    DOG = 'dog',
    CAT = 'cat',
    RODENT = 'rodent',
    BIRD = 'bird',
    OTHER = 'other',
    ANY = 'any'


class Pets(db.Model):
    __tablename__ = "pets"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    pet_type = db.Column(db.Enum(PetType, name='pet_type'), nullable=False)
    breed = db.Column(db.String(50), nullable=False, default="N/A")
    birth_date = db.Column(db.String(), nullable=False)
    health = db.Column(db.String(50), nullable=False)
    pet_owner_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), nullable=False)
    bookings = db.relationship("Booking", backref=db.backref("pets"))

    def __repr__(self):
        return f"<Pet {self.id}: {self.name} ({self.pet_type})>"

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
        return f"<Favorite: User {self.user_id} - Hotel {self.hotel_id}>"

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
        return f"<Owner {self.id}: {self.first_name} {self.last_name}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "phone_number": self.phone_number,
            "zip_code": self.zip_code,
            "hotels": [h.serialize() for h in self.hotels],
            "bookings": {"id": b.id for b in self.bookings}
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
    profile_image_url = db.Column(db.String(255), unique=False, nullable=True)
    hotel_description = db.Column(db.String(500), nullable=False)
    hotel_owner_id = db.Column(
        db.Integer, db.ForeignKey("owner.id"), nullable=False)
    hotel_bookings = db.relationship("Booking", backref=db.backref("hotel"))
    invoices = db.relationship("Invoice", backref=db.backref("hotel"))
    favorites = db.relationship("Favorite", backref=db.backref("hotel"))
    rooms = db.relationship("Room", backref=db.backref("hotel"))
    reviews = db.relationship("Review", backref=db.backref("hotel"))

    def __repr__(self):
        return f"<Hotel {self.id}: {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "location": self.location,
            "phone_number": self.phone_number,
            "country": self.country,
            "zip_code": self.zip_code,
            "profile_image_url": self.profile_image_url,
            "rooms": [r.serialize() for r in self.rooms],
            "services": self.services,
            "hotel_description": self.hotel_description,
            "hotel_bookings": [booking.serialize() for booking in self.hotel_bookings],
            "hotel_owner_id": self.hotel_owner_id,
            "reviews": [rev.serialize() for rev in self.reviews],
        }


class Review(db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key=True)
    review_text = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Float(precision=2), nullable=False)
    date = db.Column(db.DateTime, nullable=False,
                     default=datetime.datetime.now)
    author_id = db.Column(
        db.Integer, db.ForeignKey("user.id"), nullable=False)
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)

    def __repr__(self):
        return f"<Review {self.id}: Hotel {self.hotel_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "review_text": self.review_text,
            "rating": self.rating,
            "date": self.date,
            "author_id": self.author_id,
            "hotel_id": self.hotel_id
        }


class Room(db.Model):
    __tablename__ = "room"
    id = db.Column(db.Integer, primary_key=True)
    pet_type = db.Column(db.Enum(PetType, name='pet_type'), default='any')
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)
    bookings = db.relationship("Booking", backref=db.backref("room"))

    def __repr__(self):
        return f"<Room {self.id}: Hotel {self.hotel_id} ({self.pet_type})>"

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
        return f"<Booking {self.id}: Hotel {self.hotel_id} - Entry: {self.entry_date}>"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "pet_id": self.pet_id,
            "owner_id": self.owner_id,
            "hotel_id": self.hotel_id,
            "room_id": self.room_id,
            "create_date": self.create_date,
            "entry_date": self.entry_date,
            "checkout_date": self.checkout_date,
            "price": self.price,
            "currency": self.currency,
            "invoice_id": self.invoice.id if self.invoice else None
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
        return f"<Invoice ID: {self.id} - Ref: {self.payment_ref}>"

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
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String)
    country_iso = db.Column(db.String, nullable=True)
    zip_regex = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"<{self.country}>"
