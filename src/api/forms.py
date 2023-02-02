from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, Length, EqualTo, Regexp

password_msg = 'Password must contain at least one uppercase, one lowercase, one digit and one special character.'
password_regex = r'^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$'
password_error_msg = 'Passwords must match.'
zip_code_regex = r'^\d{3,10}$'
phone_regex = r'^(\+\d{1,3}[- ]?)?\d{10,12}$'

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
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8), Regexp(password_regex, message=password_msg), EqualTo('confirm_password', message=password_error_msg)])
