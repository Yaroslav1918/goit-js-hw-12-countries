import './sass/main.scss';
import nameCountries from './templates/countries.hbs';
import card from './templates/country.hbs';
import ApiService from './js/fetchCountries.js';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
const debounce = require('lodash.debounce');

const refs = {
    ul: document.querySelector('#ul'),
    input: document.querySelector('#input'),

};
const apiService = new ApiService();

refs.input.addEventListener('input', debounce(onSearchCountries, 1000));
function onSearchCountries(e) {
    e.preventDefault()
    apiService.query = e.target.value;
    clearInput()
   return  apiService.fetchCountries()
    .then(toSortCountries)
    .catch(console.log)    
};
function toSortCountries(data) {
    if (data.length > 10) { return error({ text: 'Too many matches found. Please enter a more specific query' }); }
     if (data.length === 1) {return renderNameCountries(data);}
    if (data.length <= 10) { return renderCardCountry(data);}
   
    if (data.status === 404) {return error({text: 'wrong query'});}
};

function clearInput() {
    refs.ul.innerHTML = '';
};

function renderCardCountry(country) {
  refs.ul.innerHTML = card(country);
  
};
function renderNameCountries(country) {
  refs.ul.innerHTML = nameCountries(country);
};


