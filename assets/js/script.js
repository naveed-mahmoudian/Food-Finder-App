//data source for CountQueuingStrategy, city and state: (https://github.com/dr5hn/countries-states-cities-database);
npm i country-state-city

import csc from 'country-state-city';

import { Country, State, City }  from 'country-state-city';
console.log(Country.getAllCountries())
console.log(State.getAllStates())

// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'