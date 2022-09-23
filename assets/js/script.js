//data source for CountQueuingStrategy, city and state: (https://github.com/dr5hn/countries-states-cities-database);
// npm i country-state-city

// import csc from 'country-state-city';

// import { Country, State, City }  from 'country-state-city';
// console.log(Country.getAllCountries())
// console.log(State.getAllStates())

// // Import Interfaces`
// import { ICountry, IState, ICity } from 'country-state-city'

// Variables
var inputAddress = document.querySelector("#inputAddress");
var inputCity = document.querySelector("#inputCity");
var inputState = document.querySelector("#inputState");
var mapBtn = document.querySelector("#mapBtn");
var tableContainer = document.querySelector(".table-container");

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

getStates();
function getStates() {
  for (i = 0; i < states.length; i++) {
    var state = document.createElement("option");
    state.innerHTML = states[i];
    inputState.append(state);
  }
}
