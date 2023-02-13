#!/usr/bin/env bash
# exit on error
set -o errexit

npm install

source ./.venv/Scripts/activate
pipenv install -r requirements.txt

pipenv run upgrade

pipenv run start
npm run build
