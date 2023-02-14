import requests
import os
from api.utils import replace_spaces_with_underscores

# Get Location data from IPAPI
# ---------------------------------------------------------------


def get_location():
    url = 'https://ipapi.co/json/'
    response = requests.get(url)
    data = response.json()
    return data
    # {
    #     "ip": "208.67.222.222",
    #     "city": "San Francisco",
    #     "region": "California",
    #     "region_code": "CA",
    #     "country": "US",
    #     "country_name": "United States",
    #     "continent_code": "NA",
    #     "in_eu": false,
    #     "postal": "94107",
    #     "latitude": 37.7697,
    #     "longitude": -122.3933,
    #     "timezone": "America/Los_Angeles",
    #     "utc_offset": "-0800",
    #     "country_calling_code": "+1",
    #     "currency": "USD",
    #     "languages": "en-US,es-US,haw,fr",
    #     "asn": "AS36692",
    #     "org": "OpenDNS, LLC"
    # }

# Find Nearby Places from Google Places API using a search keyword
# ---------------------------------------------------------------


def find_nearby_places(search_query="residencia canina", rankby="distance"):
    loc = get_location()
    print(loc)
    lat = loc['latitude']
    lng = loc['longitude']
    search_query = replace_spaces_with_underscores(search_query)
    api_key = os.getenv('GOOGLE_API_KEY')
    url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&rankby={rankby}&keyword={search_query}&key={api_key}'

    response = requests.get(url)
    data = response.json()
    return data

    # Search using a keyword and location with Google Places API - Nearby Search (don't need radius if rankby=distance)
    # https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&rankby=distance&keyword={search_query}&key={os.getenv('GOOGLE_API_KEY')}

    # response is a json containing a results list
    # within each element of the list, among others, find: name, photos (list), place_id, price_level, rating, user_ratings_total, vicinity (address), geometry.location (obj with lat and lng)
    # it will return up to 20 establishments per query. it can return up to 60 results, split in different pages. Pass the value of the next_page_token to the pagetoken parameter of a new request to see the next set of results
    # Note: The correct use of next_page_token is to request the next page of results only when requested by the user. We recommend that you either implement either true paging (showing 20 results at a time) or append additional places to the bottom of a results page once the user scrolls to the end.
    # To see the next set of results you can submit a new query, passing the result of the next_page_token to the pagetoken parameter. For example:
    # https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken={next_page_token}&key=YOUR_API_KEY

# Find a Place ID by Name using Google Places API
# ---------------------------------------------------------------


def find_place_id_by_name(place_name):
    api_key = os.getenv('GOOGLE_API_KEY')
    url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={place_name}&inputtype=textquery&key={api_key}"

    response = requests.get(url)
    data = response.json()
    return data

# Find Place Details by ID using Google Places API
# ---------------------------------------------------------------


def find_place_details(place_id):
    api_key = os.getenv('GOOGLE_API_KEY')
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={api_key}"

    response = requests.get(url)
    data = response.json()
    return data

# Get a Photo by Ref using Google Places API
# ---------------------------------------------------------------


def get_photo_by_ref(photo_ref, maxwidth="400"):
    api_key = os.getenv('GOOGLE_API_KEY')
    url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={maxwidth}&photo_reference={photo_ref}&key={api_key}"

    image = requests.get(url)
    return image
