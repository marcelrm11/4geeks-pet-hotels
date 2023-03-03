
import click
from api.models import Hotel, Owner, db, User, Pets

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""


def setup_commands(app):
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users")  # name of our command
    @click.argument("count")  # argument of out command
    def insert_test_data(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

        # Insert the code to populate others tables if needed

    @app.cli.command("mock-users")
    def insert_mock_users():
        user1 = User(email='john.doe@example.com', password='P@ssword123', confirm_password='P@ssword123', is_active=True,
                     first_name='John', last_name='Doe', is_owner=False, country='USA', zip_code='12345', phone_number='123-456-7890')
        db.session.add(user1)
        user2 = User(email='jane.doe@example.com', password='Qwerty123$', confirm_password='Qwerty123$', is_active=True,
                     first_name='Jane', last_name='Doe', is_owner=False, country='Canada', zip_code='A1A 1A1', phone_number='555-555-5555')
        db.session.add(user2)
        user3 = User(email='bob.smith@example.com', password='Abcd@123', confirm_password='Abcd@123', is_active=True,
                     first_name='Bob', last_name='Smith', is_owner=False, country='Australia', zip_code='2000', phone_number='+61 2 1234 5678')
        db.session.add(user3)
        db.session.commit()
        print("3 mock users created")

    @app.cli.command("mock-pets")
    def insert_mock_pets():
        pet1 = Pets(name='Fido', pet_type='Dog', breed='Labrador Retriever',
                    birth_date="2019-03-15", age=3, health='Healthy', gender='Male', pet_owner_id=1)
        db.session.add(pet1)
        pet2 = Pets(name='Fluffy', pet_type='Cat', breed='Siamese', birth_date="2020-06-23",
                    age=4, health='Healthy', gender='Female', pet_owner_id=2)
        db.session.add(pet2)
        pet3 = Pets(name='Buddy', pet_type='Dog', breed='Golden Retriever',
                    birth_date="2018-11-30", age=2, health='Healthy', gender='Male', pet_owner_id=3)
        db.session.add(pet3)
        db.session.commit()
        print("3 pets created")

    @app.cli.command("mock-owners")
    def insert_mock_owners():
        # create an owner
        owner1 = Owner(
            email='owner1@example.com',
            password='password1',
            confirm_password='password1',
            is_active=True,
            first_name='John',
            last_name='Doe',
            is_owner=True,
            country='USA',
            zip_code='12345',
            phone_number='123-456-7890'
        )
        # create another owner
        owner2 = Owner(
            email='owner2@example.com',
            password='password2',
            confirm_password='password2',
            is_active=True,
            first_name='Jane',
            last_name='Doe',
            is_owner=True,
            country='Canada',
            zip_code='A1B2C3',
            phone_number='555-555-5555'
        )
        # add owners to the session
        db.session.add(owner1)
        db.session.add(owner2)
        # commit the session to the database
        db.session.commit()
        print("2 owners created")

    @app.cli.command("mock-hotels")
    def insert_mock_hotels():
        hotel_1 = Hotel(
            email='hotel1@example.com',
            name='Hotel One',
            country='United States',
            zip_code='10001',
            phone_number='555-1234',
            location='New York',
            services='Free Wi-Fi, fitness center, restaurant',
            base_price=150.00,
            hotel_description='A luxurious hotel in the heart of Manhattan.',
            hotel_owner_id=1,
            pet_type="cat,others"
        )

        hotel_2 = Hotel(
            email='hotel2@example.com',
            name='Hotel Two',
            country='France',
            zip_code='75001',
            phone_number='555-5678',
            location='Paris',
            services='Free breakfast, spa, rooftop terrace',
            base_price=200.00,
            hotel_description='Experience the magic of Paris from our elegant hotel.',
            hotel_owner_id=1,
            pet_type="dog,bird,rodent,others"
        )

        hotel_3 = Hotel(
            email='hotel3@example.com',
            name='Hotel Three',
            country='Japan',
            zip_code='100-0005',
            phone_number='555-2468',
            location='Tokyo',
            services='Indoor pool, hot tub, 24-hour room service',
            base_price=120.00,
            hotel_description='Discover the vibrant culture of Tokyo from our modern hotel.',
            hotel_owner_id=2,
            pet_type="dog,cat,bird"
        )

        hotel_4 = Hotel(
            email='hotel4@example.com',
            name='Hotel Four',
            country='Spain',
            zip_code='28013',
            phone_number='555-3698',
            location='Madrid',
            services='Bar, rooftop pool, laundry service',
            base_price=180.00,
            hotel_description='Experience the charm of Madrid from our boutique hotel.',
            hotel_owner_id=2,
            pet_type="dog,cat"
        )

        db.session.add_all([hotel_1, hotel_2, hotel_3, hotel_4])
        db.session.commit()
        print("4 hotels created")
