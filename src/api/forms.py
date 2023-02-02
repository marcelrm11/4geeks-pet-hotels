
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, Length, EqualTo, Regexp

password_msg = 'Password must contain at least one uppercase, one lowercase, one digit and one special character.'
password_regex = r'[A-Za-z0-9@#$%^&+=]'
password_error_msg = 'Passwords must match.'

class UserForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8), Regexp(password_regex, message=password_msg), EqualTo('confirm_password', message=password_error_msg)])
    confirm_password = PasswordField('Confirm Password')
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    zip_code = StringField('Zip Code', validators=[DataRequired()])
    phone_number = StringField('Phone Number', validators=[DataRequired()])

class ShortUserForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8), Regexp(password_regex, message=password_msg), EqualTo('confirm_password', message=password_error_msg)])
