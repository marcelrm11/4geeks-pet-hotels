# ENDPOINTS

## USERS

- CREATE: /signup
- READ: /users
- READ: /user/<:id>
- UPDATE: /user/<:id>/update
- DELETE: /user/<:id>/delete

## PETS

CREATE: /pet/create
READ: /pets
READ: /pet/<:id>
UPDATE: /pet/<:id>/update
DELETE: /pet/<:id>/delete

## OWNERS

CREATE: /owner/create
READ: /owners
READ: /owner/<:id>
UPDATE: /owner/<:id>/update
DELETE: /owner/<:id>/delete

## HOTELS

CREATE: /hotel/create
READ: /hotels/
READ: /hotel/<:id>
UPDATE: /hotel/<:id>/update
DELETE: /hotel/<:id>/delete

## ROOMS

CREATE: /room/create
READ: /rooms
READ: /rooms/<:pet_type>
DELETE: /rooms/<:room_id>/delete
UPDATE: /rooms/<:room_id>/update

<!-- not sure about keeping update room if we can do it from hotel -->

## BOOKINGS

- CREATE: /booking/create
- READ: /bookings
- READ: /booking/<:id>
- UPDATE: /booking/<:id>/update
- DELETE: /booking/<:id>/delete

## FAVORITES

CREATE: /user/<:user_id>/favorite/create
DELETE: /favorite/<:id>/delete

## INVOICES

CREATE: /invoice/create
READ: /invoice/<:id>

## CHECK AVAILABILITY AND SEARCH FUNCTIONALITIES ??
