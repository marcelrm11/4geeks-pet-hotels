
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, HiddenField, DateField
from wtforms.validators import DataRequired, Email, Length, EqualTo, Regexp, NumberRange
import re

password_msg = 'Password must contain at least one uppercase, one lowercase, one digit and one special character.'
password_regex = re.compile(r'^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)\-\_\+=\{\}\[\]\|;:\'\"<>,\.\?\/\\\^`~]).{8,32}$')
# r'.*'
password_error_msg = 'Passwords must match.'
zip_code_regex = r'^\d{3,10}$'
phone_regex = r'^\d{8,14}$'
# r'^(\+\d{1,3}[- ]?)?\d{10,12}$'

class UserForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8), Regexp(password_regex, message=password_msg), EqualTo('confirm_password', message=password_error_msg)])
    confirm_password = PasswordField('Confirm Password')
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    zip_code = StringField('Zip Code', validators=[DataRequired(), Regexp(zip_code_regex)])
    phone_number = StringField('Phone Number', validators=[DataRequired(), Regexp(phone_regex)])


class ShortUserForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8), Regexp(password_regex, message=password_msg)])


class PetForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    pet_type = StringField("Pet Type", validators=[DataRequired()])
    breed = StringField("Breed", validators=[DataRequired()])
    birth_date = StringField("Birth Date", validators=[DataRequired()])
    health = StringField("Health", validators=[DataRequired()])
