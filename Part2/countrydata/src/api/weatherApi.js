import api from './api';

const URLS = {
  fetchWeather: 'current',
};

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchWeather = (query) => {
  const url = `${URLS.fetchWeather}?access_key=${apiKey}&query=${query}`;
  return api.get(url, {
    baseURL: 'http://api.weatherstack.com/',
  });
};

export default {
  fetchWeather,
};