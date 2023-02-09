# ENDPOINTS

## USERS

CREATE: /signup
READ: /user/<:id>
UPDATE: /user/<:id>/update
DELETE: /user/<:id>/delete
READ: /user/<:user_id>/bookings
READ: user/<:user_id>/favorites

## PETS

CREATE: /pet/create
READ: /pet/<:id>
UPDATE: /pet/<:id>/update
DELETE: /pet/<:id>/delete

## OWNER

CREATE: /owner/create
READ: /owner/<:id>
UPDATE: /owner/<:id>/update
DELETE: /owner/<:id>/delete
READ: /owner/<:owner_id>/bookings
READ: /owner/<:owner_id>/hotels

## HOTELS

CREATE: /hotel/create
READ: /hotels/
READ: /hotel/<:id>
UPDATE: /hotel/<:id>/update
DELETE: /hotel/<:id>/delete

## ROOMS

CREATE: /room/create
READ: /rooms
READ: /hotel/<:hotel_id>/rooms
READ: /rooms/<:pet_type>
DELETE: /rooms/<:room_id>/delete
UPDATE: /rooms/<:room_id>/update

## BOOKING

CREATE: /booking/create
READ: /booking/<:id>
UPDATE: /booking/<:id>/update
DELETE: /booking/<:id>/delete
READ: /booking/<:booking_id>/invoice

## FAVORITES

CREATE: /user/<:user_id>/favorite/create
DELETE: /favorite/<:id>/delete

## INVOICES

CREATE: /invoice/create
READ: /invoice/<:id>

## CHECK AVAILABILITY AND SEARCH FUNCTIONALITIES ??
