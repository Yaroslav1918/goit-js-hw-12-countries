export default class ApiService {
    constructor() {
    this.searchQuery = '';
}
fetchCountries() {
    const url = `https://restcountries.com/v2/name/${this.searchQuery}`
    return fetch(url)
        .then(r =>  r.json())
    };
    get query() {
        return this.searchQuery;
    };
    set query(newQuery) {
        return this.searchQuery = newQuery;
    };
};