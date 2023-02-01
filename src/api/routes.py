"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, current_user
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from forms import UserForm

api = Blueprint('api', __name__)

# API Routes
# ---------------------------------------------------------------
@api.route('/signup', methods=['POST'])
def create_user():
    form = UserForm()
    if form.validate_on_submit():
        try:
            user_data = {field: getattr(form, field).data for field in form._fields}
            user = User(**user_data)

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