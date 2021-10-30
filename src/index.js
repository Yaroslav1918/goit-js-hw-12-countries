import './sass/main.scss';
import nameCountries from './templates/countries.hbs';
import card from './templates/country.hbs'
import fetchCountries from './js/fetchCountries.js';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
const debounce = require('lodash.debounce');

const refs = {
    ul: document.querySelector('#ul'),
    input: document.querySelector('#input'),

}
refs.input.addEventListener('input', debounce(onSearchCountries, 1000))

function onSearchCountries(e) {
    e.preventDefault()
    const inputValue = e.target.value;
    clearInput()
   return  fetchCountries(inputValue)
    .then(toSortCountries)
    .catch(console.log)
     
   
        
}
function toSortCountries(data) {
    if (data.length > 10) { return error({ text: 'Too many matches found. Please enter a more specific query' }); }
     if (data.length === 1) {return renderNameCountries(data);}
    if (data.length <= 10) { return renderCardCountry(data);}
   
    if (data.status === 404) {return error({text: 'wrong query'});}
}

function clearInput() {
    refs.ul.innerHTML = '';
}

function renderCardCountry(country) {
    const markUp = card(country)
  refs.ul.innerHTML = markUp;
  
}
function renderNameCountries(country) {
    const markUp = nameCountries(country)
  
  refs.ul.innerHTML = markUp;
  
}





   