// For more info, see google_places_api.py

// import "axios";

const apiKey = process.env.GOOGLE_API_KEY;
const baseUrl = "https://maps.googleapis.com/maps/api/place";
// Get Location data from IPAPI
// ---------------------------------------------
async function getLocation() {
  const url = "https://ipapi.co/json";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Find Nearby Places from Google Places API by keyword
// ---------------------------------------------
async function getNearbyPlaces(
  keyword = "residencia canina",
  rankby = "distance"
) {
  const loc = await getLocation();
  const lat = loc.latitude;
  const lng = loc.longitude;
  keyword = keyword.replace(/\s/, "_");
  const url =
    baseUrl +
    `/nearbysearch/json?location=${lat},${lng}&rankby=${rankby}&keyword=${keyword}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Find a Place ID by Name using Google Places API
// ----------------------------------------------------------
async function findPlaceID(name) {
  name = name.replace(/\s/, "_");
  const url =
    baseUrl +
    `/findplacefromtext/json?input=${name}&inputtype=textquery&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Find Place Details by ID using Google Places API
// ---------------------------------------------
async function findPlaceDetails(place_id) {
  const url = baseUrl + `/details/json?place_id=${place_id}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Get a Photo by Ref using Google Places API
// ---------------------------------------------
async function getPhoto(ref, maxwidth = "400") {
  const url =
    baseUrl +
    `/photo?maxwidth=${maxwidth}&photo_reference=${ref}&key=${apiKey}`;

  const image = await fetch(url);
  return image;
}
