# PetHouse: pet boarding marketplace

> PetHouse is the first digital marketplace for users to find the best boarding facilities for their pets, whenever they are travelling or need to leave them in the best care. It is a full stack project built with React and Python/Flask.

## Background

This is the capstone group project for the Full Stack Development bootcamp at 4Geeks Academy. The other two members were @vicky22 and @Nicolettastr.

## Usage

There are two types of user: "users" and "owners". The former are those who have a pet and want to find a place to leave them during their absence; the latter are the people who manage the boarding facilities and want to get higher exposure to potential clients.
The idea is that owners register their "hotels" (boarding facilities) so that they appear in search results, where users can browse, search and filter hotels with different criteria.
Each hotel has a detailed view where the user can see all its information, including contact details.
Currently, the user should contact the hotel owner outside of the app. Plans to integrate booking and payment features are on the roadmap.
The user can also create a pet profile, although it is not still used to personalize the user experience.

## Installation

### Back-End Manual Installation:

It is recomended to install the backend first, make sure you have Python 3.10, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the values with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

1. Migrate the migrations: `$ pipenv run migrate`
2. Run the migrations: `$ pipenv run upgrade`
3. Run the application: `$ pipenv run start`

### Backend Populate Table Users

To insert mock data in the database execute the following commands:

```shell
$ flask mock-users
$ flask mock-pets
$ flask mock-owners
$ flask mock-hotels
```

### Front-End Manual Installation:

- Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start the webpack dev server `$ npm run start`

## Components aad Views

The frontend is distributed into composable view components. Some of the components are designed to be reusable throughout the app.

## Database Models

Data models are created using SQLAlchemy and PostgreSQL. Every element is represented by a model, which has relationships to the other models (actual sub-models). For instance, the owner model is the parent of the hotel model.
Database inputs are validated using WTForms.

## API endpoints

In general, there is an endpoint for every action of the CRUD in each model. For instance, it is possible to create a user (sign up), get the user details, edit user details and delete the user account.

## Authentication

Users and owners can log into their accounts to manage their profile and see private information, such as their details. They can also save favorites and create pet profiles. Owners can create and edit their hotels.
Log in authentication is handled with JWT-extended for Flask.

## Contact info

You can contact me at marcelrm11@gmail.com.

## License

[MIT](https://opensource.org/licenses/MIT)

## Credits

This project was built using a 4Geeks Academy boilerplate. For more information, see [this github repo](https://gitpod.io#https://github.com/4GeeksAcademy/react-flask-hello.git)
