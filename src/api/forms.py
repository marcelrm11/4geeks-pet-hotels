
import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, DateTimeField, DateField, DecimalField
from wtforms.validators import InputRequired, Email, Length, EqualTo, Regexp, ValidationError
import re

password_msg = "Password must contain at least one uppercase, one lowercase, one digit and one special character."
password_regex = re.compile(
    r"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)\-\_\+=\{\}\[\]\|;:\'\"<>,\.\?\/\\\^`~]).{8,32}$")
password_error_msg = "Passwords must match."
zip_code_regex = r"^\d{3,10}$"
phone_regex = r"^\d{8,14}$"


class UserForm(FlaskForm):
    email = StringField("Email", validators=[InputRequired(), Email()])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=8), Regexp(
        password_regex, message=password_msg), EqualTo("confirm_password", message=password_error_msg)])
    confirm_password = PasswordField("Confirm Password")
    first_name = StringField("First Name", validators=[InputRequired()])
    last_name = StringField("Last Name", validators=[InputRequired()])
    country = StringField("Country", validators=[InputRequired()])
    zip_code = StringField("Zip Code", validators=[
                           InputRequired(), Regexp(zip_code_regex)])
    phone_number = StringField("Phone Number", validators=[
                               InputRequired(), Regexp(phone_regex)])


class ShortUserForm(FlaskForm):
    email = StringField("Email", validators=[InputRequired(), Email()])
    password = PasswordField("Password", validators=[InputRequired(), Length(
        min=8), Regexp(password_regex, message=password_msg)])


def checkout_date_validator(form, field):
    if field.data < form.entry_date.data:
        raise ValidationError("Checkout date can't be earlier than entry date")


class BookingForm(FlaskForm):
    create_date = DateTimeField(
        "Creation Date", default=datetime.datetime.now())
    entry_date = DateField("Entry Date", validators=[InputRequired()])
    checkout_date = DateField("Checkout Date", validators=[
                              InputRequired(), checkout_date_validator])
    price = DecimalField("Price", validators=[InputRequired()])
    currency = StringField("Currency", validators=[
                           InputRequired()], default="euro")
