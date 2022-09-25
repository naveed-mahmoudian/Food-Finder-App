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
  "ZRKeED18Br6ViDtZ-9S7KlRe128BbbFVlU4gqgE9dhjZyih5noGK1ythaIBjt9yasSB-0ZpFYO8MqmpoYiL555G3ju-q-i9d0ijX7ietmDxhduW-n11dT_D9ACctY3Yx";

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

  // Geocoding API
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
    });
}

var sideHistory = document.createElement("li");
fetch(
  "https://api.yelp.com/v3/businesses/search?limit=" +
    5 +
    "&apikey=" +
    restaurantAPIKey
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    userLat = data.features[0].properties.lat;
    userLon = data.features[0].properties.lon;
  });

//var addressHistory = []

// function recentSearches() {
//     //var searchHistory = localStorage.getItem('fullAddress')
//     addressHistory.push(searchHistory);
//     localStorage.setItem("fullAddress", JSON.stringify(searchHistory));
//     console.log(localStorage.setItem(fullAddress))
// }

// recentSearches();
