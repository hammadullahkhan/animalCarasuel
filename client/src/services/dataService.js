import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.headers.common = {'Authorization': getSessionAuthToken()}

function getSessionAuthToken() {
    const sessionAuthToken = sessionStorage.getItem('authToken');    
    return sessionAuthToken ? sessionAuthToken : '';
}

export function getAuthToken() {
    return axios.get( '/auth' );
}

export function getCategories() {
    return axios.get( '/categories' );
}

export function getAnimals() {
    return axios.get( '/animals' );
}
    