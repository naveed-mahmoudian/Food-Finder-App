// Variables
var inputAddress = $("#inputAddress");
var inputCity = $("#inputCity");
var inputState = $("#inputState");
var mapBtn = $("#mapBtn");
var tableContainer = $(".table-container");
var states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
var fullAddress = "";
var geocodeAPIKey = "4635cb96e24846fe9f2272b65e5deea4";
var userLat;
var userLon;

var restaurantAPIKey =
  "46d9ba4524msh1bfc5bf71bc0638p1f849fjsnb2b8ad21547f";

getStates();

function getStates() {
  for (i = 0; i < states.length; i++) {
    var state = document.createElement("option");
    state.innerHTML = states[i];
    inputState.append(state);
  }
}

mapBtn.click(getAddress);
function getAddress(event) {
  event.preventDefault();
  var address = inputAddress.val();
  var city = inputCity.val();
  var state = inputState.val();

  fullAddress = address + ", " + city + ", " + state;

  // Clear form values after saving them to fullAddress variable
  inputAddress.val("");
  inputCity.val("");
  inputState.val("Choose...");

  // Geocoding API then inputting data into Yelp API
  fetch(
    "https://api.geoapify.com/v1/geocode/search?text=" +
      fullAddress +
      "&apiKey=" +
      geocodeAPIKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      userLat = data.features[0].properties.lat;
      userLon = data.features[0].properties.lon;


      // tripadvisor api

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '46d9ba4524msh1bfc5bf71bc0638p1f849fjsnb2b8ad21547f',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    
    fetch('https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude='+ blLat +'&tr_latitude=' + trLat + '&bl_longitude=' + blLon + '&tr_longitude=' + trLon + '&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=10&currency=USD&open_now=false&lunit=mi&lang=en_US', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    })

};