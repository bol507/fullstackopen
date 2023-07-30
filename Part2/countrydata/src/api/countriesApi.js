import api from './api'

const URLS =  {
    fetchCountries: 'v3.1/name/:search'
    
}

export const fetchCountries = (search) => {
    const url = URLS.fetchCountries.replace(':search',search);
    return api.get(url,{
        baseURL: 'https://restcountries.com/',
    })
}

export default {
    fetchCountries
  };