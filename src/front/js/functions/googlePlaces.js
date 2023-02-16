// For more info, see google_places_api.py
// ! this methodology is for server-side. see https://developers.google.com/maps/documentation/javascript/places for client-side

const apiKey = process.env.GOOGLE_API_KEY;
const baseUrl = "https://maps.googleapis.com/maps/api/place";
const headers = new Headers({
  "Access-Control-Allow-Origin": "*",
});
const options = {
  headers: headers,
};

// Get Location data from IPAPI
// ---------------------------------------------
async function getLocation() {
  try {
    const url = "https://ipapi.co/json";
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Find Nearby Places from Google Places API by keyword
// ---------------------------------------------
async function getNearbyPlaces(
  keyword = "residencia canina",
  rankby = "distance"
) {
  try {
    const loc = await getLocation();
    const lat = loc.latitude;
    const lng = loc.longitude;
    keyword = keyword.replace(/\s/, "_");
    const url =
      baseUrl +
      `/nearbysearch/json?location=${lat},${lng}&rankby=${rankby}&keyword=${keyword}&key=${apiKey}`;
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Find a Place ID by Name using Google Places API
// ----------------------------------------------------------
async function findPlaceID(name) {
  try {
    name = name.replace(/\s/, "_");
    const url =
      baseUrl +
      `/findplacefromtext/json?input=${name}&inputtype=textquery&key=${apiKey}`;

    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Find Place Details by ID using Google Places API
// ---------------------------------------------
async function findPlaceDetails(place_id) {
  try {
    const url = baseUrl + `/details/json?place_id=${place_id}&key=${apiKey}`;
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { getNearbyPlaces, findPlaceID, findPlaceDetails };
