# ENDPOINTS

## USERS

- CREATE: /signup/user
- READ: /users
- READ: /user/<:id>
- UPDATE: /user/<:id>/update
- DELETE: /user/<:id>/delete

## PETS VICTORIA

CREATE: /pet/create
READ: /pets
READ: /pet/<:id>
UPDATE: /pet/<:id>/update
DELETE: /pet/<:id>/delete

## OWNERS

<<<<<<< HEAD
CREATE: /owner/create **
READ: /owner/<:id> **
UPDATE: /owner/<:id>/update **
DELETE: /owner/<:id>/delete **
=======
CREATE: /signup/owner
READ: /owners
READ: /owner/<:id>
UPDATE: /owner/<:id>/update
DELETE: /owner/<:id>/delete
>>>>>>> development

## HOTELS VICTORIA

CREATE: /hotel/create
READ: /hotels/
READ: /hotel/<:id>
UPDATE: /hotel/<:id>/update
DELETE: /hotel/<:id>/delete

## ROOMS

<<<<<<< HEAD
CREATE: /room/create **
READ: /rooms **
READ: /rooms/<:pet_type> **
DELETE: /rooms/<:room_id>/delete **
UPDATE: /rooms/<:room_id>/update **
=======
CREATE: /room/create
READ: /rooms
READ: /rooms/<:pet_type>
UPDATE: /rooms/<:room_id>/update
DELETE: /rooms/<:room_id>/delete
>>>>>>> development

<!-- not sure about keeping update room if we can do it from hotel -->

## BOOKINGS

<<<<<<< HEAD
CREATE: /booking/create **
READ: /booking/<:id> **
UPDATE: /booking/<:id>/update **
DELETE: /booking/<:id>/delete **
READ: /booking/<:booking_id>/invoice **

## FAVORITES

CREATE: /user/<:user_id>/favorite/create **
DELETE: /favorite/<:id>/delete **
=======
- CREATE: /booking/create
- READ: /bookings
- READ: /booking/<:id>
- UPDATE: /booking/<:id>/update
- DELETE: /booking/<:id>/delete

## FAVORITES

- CREATE: /user/<:user_id>/hotel/<:hotel_id>/favorite
- DELETE: /favorite/<:id>/delete
>>>>>>> development

## INVOICES

- CREATE: /invoice/create
- READ: /invoice/<:id>

## CHECK AVAILABILITY AND SEARCH FUNCTIONALITIES ??
