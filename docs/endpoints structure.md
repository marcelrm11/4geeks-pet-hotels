# ENDPOINTS

## USERS

* CREATE: /signup **
* READ: /users ** 
* READ: /user/<:id>  **
* UPDATE: /user/<:id>/update **
* DELETE: /user/<:id>/delete **

## PETS VICTORIA

CREATE: /pet/create **
READ: /pet/<:id> **
UPDATE: /pet/<:id>/update **
DELETE: /pet/<:id>/delete **

## OWNER

CREATE: /owner/create **
READ: /owner/<:id> **
UPDATE: /owner/<:id>/update **
DELETE: /owner/<:id>/delete **

## HOTELS VICTORIA

CREATE: /hotel/create
READ: /hotels/
READ: /hotel/<:id>
UPDATE: /hotel/<:id>/update
DELETE: /hotel/<:id>/delete

## ROOMS

CREATE: /room/create **
READ: /rooms **
READ: /rooms/<:pet_type> **
DELETE: /rooms/<:room_id>/delete **
UPDATE: /rooms/<:room_id>/update **

<!-- not sure about keeping update room if we can do it from hotel -->

## BOOKING

CREATE: /booking/create **
READ: /booking/<:id> **
UPDATE: /booking/<:id>/update **
DELETE: /booking/<:id>/delete **
READ: /booking/<:booking_id>/invoice **

## FAVORITES

CREATE: /user/<:user_id>/favorite/create **
DELETE: /favorite/<:id>/delete **

## INVOICES

CREATE: /invoice/create
READ: /invoice/<:id>

## CHECK AVAILABILITY AND SEARCH FUNCTIONALITIES ??
