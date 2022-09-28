// Variables
var inputAddress = $("#inputAddress");
var inputCity = $("#inputCity");
var inputState = $("#inputState");
var mapBtn = $("#mapBtn");
var buttonContainer = $("#buttonContainer");
var tableContainer = $(".tableContainer");
var tableBody = $(".tableBody");
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

var restaurantAPIKey = "46d9ba4524msh1bfc5bf71bc0638p1f849fjsnb2b8ad21547f";

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

  buttonContainer.html("");
  buttonContainer.html(`<button class="btn btn-primary mt-3 col-12" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
   Finding Restaurants...
</button>`);

  var address = inputAddress.val();
  var city = inputCity.val();
  var state = inputState.val();

  fullAddress = address + ", " + city + ", " + state;

  saveAddress(fullAddress);

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

      var blLat = userLat - 0.1;
      var trLat = userLat + 0.1;
      var blLon = userLon - 0.1;
      var trLon = userLon + 0.1;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "014138bbc0msh855c75cd6b40a30p1e2482jsn5eadfd39bd84",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };
      fetch(
        "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=" +
          blLat +
          "&tr_latitude=" +
          trLat +
          "&bl_longitude=" +
          blLon +
          "&tr_longitude=" +
          trLon +
          "&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=15&currency=USD&open_now=false&lunit=mi&lang=en_US",
        options
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          restaurantDetails = [];

          for (i = 0; i < data.data.length; i++) {
            if (data.data[i].name) {
              var name = data.data[i].name;
              var distance = data.data[i].distance_string;
              var type = data.data[i].cuisine[0].name;
              var price = data.data[i].price_level;
              var address = data.data[i].address;
              var rating = data.data[i].rating;
              var website = data.data[i].website;

              restaurantDetails.push({
                restaurantName: name,
                restaurantDistance: distance,
                restaurantType: type,
                restaurantPrice: price,
                restaurantAddress: address,
                restaurantRating: rating,
                restaurantWebsite: website,
              });
            }
          }
          console.log(restaurantDetails);
          for (i = 0; i < restaurantDetails.length; i++) {
            var tableRow = document.createElement("tr");
            tableRow.innerHTML = `<th scope="row"><a href="${restaurantDetails[i].restaurantWebsite}" target="_blank">${restaurantDetails[i].restaurantName}</a></th>
            <td>${restaurantDetails[i].restaurantDistance}</td>
            <td>${restaurantDetails[i].restaurantType}</td>
            <td>${restaurantDetails[i].restaurantPrice}</td>
            <td>${restaurantDetails[i].restaurantAddress}</td>
            <td>${restaurantDetails[i].restaurantRating}</td>`;
            tableBody.append(tableRow);
          }
          $(".restaurant").remove();
          buttonContainer.html(
            `<button type="submit" class="btn btn-primary mt-3 col-12" id="mapBtn">Map It</button>`
          );
          createHistory();
        });
    });
}

function saveAddress(address) {
  localStorage.setItem("lastAddress", address);
}

function createHistory() {
  var historyButton = document.createElement("button");
  var historyItem = localStorage.getItem("lastAddress");
  historyButton.setAttribute("class", "btn btn-primary mt-3 col-12");
  historyButton.textContent = historyItem;
  var sideNavHistory = document.querySelector(".sideNavHistory");
  sideNavHistory.append(historyButton);
  historyButton.addEventListener("click", getAddress);
}
