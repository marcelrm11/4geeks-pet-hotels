from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(32), unique=False, nullable=False)
    confirm_password = db.Column(db.String(32), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True) #? what is this doing here?
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.String(30), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    def __repr__(self):
        return f'<User {self.email}>'

    # # NOTE: In a real application make sure to properly hash and salt passwords
    # def check_password(self, password):
    #     return check_password(password, "password")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "zip_code": self.zip_code
            # do not serialize the password, its a security breach
        }

class Countries_zip_codes(db.Model):
    __tablename__ = 'countries_zip_codes'
    country = db.Column(db.String)
    country_iso = db.Column(db.String, primary_key=True)
    zip_regex = db.Column(db.String)

    def __repr__(self):
        return f'<{self.country_iso}: {self.country}>'

class Pets(db.Model):
    __tablename__ = 'pets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    pet_type = db.Column(db.String(50), nullable=False)
    race = db.Column(db.String(50), nullable=True)
    age = db.Column(db.Integer, nullable=False)
    health = db.Column(db.String(50), nullable=False)
    pet_owner = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user_pet = db.relationship('User', backref=db.backref("pets"))


    def __repr__(self):
        return f'<Pets {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "Name": self.name,
            "Pet_type": self.pet_type,
            "Race": self.race,
            "Age": self.age,
            "Health": self.health
            # do not serialize the password, its a security breach
        }
    
class Hotel(db.Model):
    __tablename__ = 'hotel'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.String(30), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    location = db.Column(db.String(70), nullable=False)
    services = db.Column(db.String(100), nullable=False)
    hotel_owner = db.Column(db.Integer, db.ForeignKey("owner.id"), nullable=False)
    owner = db.relationship("Owner", backref=db.backref("hotels"))

   

    def __repr__(self):
        return f'<Hotel {self.name}>'

    # # NOTE: In a real application make sure to properly hash and salt passwords
    # def check_password(self, password):
    #     return check_password(password, "password")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "location": self.location,
            "phone_number": self.phone_number,
            "country": self.country,
            "zip_code": self.zip_code
            # do not serialize the password, its a security breach
        }
        
class Booking(db.Model):
    __tablename__ = 'booking'
    id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # user_name = db.Column(db.String(50), db.ForeignKey("user.first_name"), nullable=False)
    # user_email = db.Column(db.String(50), db.ForeignKey("user.email"), nullable=False)
    hotel_id = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)
    create_date = db.Column(db.Integer, nullable=True)
    stay_date = db.Column(db.Integer, nullable=True)
    # hotel_email = db.Column(db.String(50), db.ForeignKey("hotel.email"),nullable=False)
    # hotel_name = db.Column(db.String(50), db.ForeignKey("hotel.name"),nullable=False)
    price = db.Column(db.Integer, nullable=False)
    user = db.relationship("User", backref=db.backref("bookings", lazy='dynamic'))
    hotel = db.relationship("Hotel", backref=db.backref("bookings", lazy='dynamic'))


    def __repr__(self):
        return f'<Booking {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "User_id": self.user_id,
            "User_name": self.user_name,
            "User_email": self.user_email,
            "Create_date": self.create_date,
            "Stay_date": self.stay_date,
            "Hotel_id": self.hotel_id,
            "Hotel_email": self.hotel_email,
            "Hotel_name": self.hotel_name,
            "Price": self.price
            # do not serialize the password, its a security breach
        }


class Owner(db.Model):
    __tablename__ = 'owner'
    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(32), unique=False, nullable=False)
    confirm_password = db.Column(db.String(32), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True) #? what is this doing here?
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.String(30), nullable=False)
    phone_number = db.Column(db.String(), nullable=False)
    
    def __repr__(self):
        return f'<Hotel_owner {self.email}>'

    # # NOTE: In a real application make sure to properly hash and salt passwords
    # def check_password(self, password):
    #     return check_password(password, "password")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "country": self.country,
            "zip_code": self.zip_code
            # do not serialize the password, its a security breach
        }