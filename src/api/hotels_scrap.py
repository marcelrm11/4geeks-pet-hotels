from bs4 import BeautifulSoup
import requests

# Extract hotels data from https://www.hogarmania.com/mascotas/mejores-hoteles-residencias-para-mascotas.html


def scrap_hotels_info():
    hotels = {}
    # Step 1: Send a GET request to the URL of the web page
    url = "https://www.hogarmania.com/mascotas/mejores-hoteles-residencias-para-mascotas.html"
    response = requests.get(url)
    response.encoding = 'utf-8'

    # Step 2: Parse the HTML content of the page
    soup = BeautifulSoup(response.text, "html.parser")

    # Step 3: Extract the information of the hotels
    # in div class = articulo
    article = soup.find('div', {'class': 'articulo'})
    # extract h2 id = 'region'
    regions_tags = article.find_all('h2')
    regions_text = [tag.text for tag in regions_tags]
    # in ul
    ul_tags = article.find_all('ul')
    # in li
    for ul_tag in ul_tags:
        li_tags = ul_tag.find_all('li')
        for li_tag in li_tags:
            # extract href and title
            a_tag = li_tag.find('a')
            href = a_tag.get('href')
            title = a_tag.get('title')
            hotels[title] = href

    print(hotels)

    # Step 4: Search the places in Google Places API - Find Place
    # included only Basic field to avoid overcharges
    # https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={title}&inputtype=textquery&key={os.getenv('GOOGLE_API_KEY')}
    # and extract place ID from response

    # Step 5: Search place details in Google Places API - Place Details by ID
    # https://maps.googleapis.com/maps/api/place/details/json?fields=address_components%2Cadr_address%2Cbusiness_status%2Cformatted_address%2Cgeometry%2Cicon%2Cicon_mask_base_uri%2Cicon_background_color%2Cname%2Cphotos%2Cplace_id%2Cplus_code%2Ctype%2Curl%2Cutc_offset%2Cvicinity%2Cwheelchair_accessible_entrance&place_id={place_id}&key={os.getenv('GOOGLE_API_KEY')}

    # Step 6: Store the relevant information in your database
    # (You can use a library or API of your choice to do this)
scrap_hotels_info()
