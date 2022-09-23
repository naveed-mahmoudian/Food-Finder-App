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
  //console.log(fullAddress);
  
    function recentSearches() {
        var searchHistory = localStorage.getItem('fullAddress')
        fullAddresss.push(searchHistory);
        localStorage.setItem("fullAddress", JSON.stringify(searchHistory));
        console.log(localStorage.setItem(fullAddress))
    }

  // Clear form values after saving them to fullAddress variable
  inputAddress.val("");
  inputCity.val("");
  inputState.val("Choose...");

}

