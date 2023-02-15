
import os
from flask_admin import Admin
from .models import db, User, Countries_zip_codes, Hotel, Pets, Booking, Owner, Invoice, Favorite, Room, Review, Photo
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Pets, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(ModelView(Owner, db.session))
    admin.add_view(ModelView(Hotel, db.session))
    admin.add_view(ModelView(Room, db.session))
    admin.add_view(ModelView(Booking, db.session))
    admin.add_view(ModelView(Invoice, db.session))
    admin.add_view(ModelView(Review, db.session))
    admin.add_view(ModelView(Photo, db.session))
    # admin.add_view(ModelView(Countries_zip_codes, db.session))
