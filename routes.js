const axios = require('axios');

let cache = require('./cache.js')

function getHome(request, response) {
  console.log('YOU ARE HOME');
  response.status(200).send('Welcome to the Void')
}

async function getForecast(request, response) {
  let searchQuery = request.query.searchQuery;
  let lat = request.query.latitude;
  let lon = request.query.longitude;
  const key = 'weather-' + lat +lon;

  console.log(searchQuery, '<---- FORECAST SEARCH QUERY LOG');
  
  const forecastURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 5000)) {
    console.log('--> CACHE HIT LOG <--')
  } else {
    console.log('--> CACHE MISS LOG <--');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(forecastURL)
    .then(response => parseWeather(response))
  }
  
  const forecastResponse = await axios.get(forecastURL);

  response.status(200).send(forecastResponse.data);

  return cache[key].data;
}

function parseWeather(weatherData) {
  console.log(weatherData, '<---- WEATHER DATA LOG ---<<<')
  // try {
  //   const weatherSummaries = weatherData.data.map(day => {
  //     return new Weather(day);
  //   });
  //   return Promise.resolve(weatherSummaries);
  // } catch (event) {
  //   return Promise.reject(event);
  // }
}

async function getMovies(request, response) {
  let {searchQuery} = request.query; 

  console.log(searchQuery, '<---- MOVIES searchQuery LOG ---<<<')

  const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchQuery}&page=1`;

  const moviesResponse = await axios.get(moviesURL);

  response.status(200).send(moviesResponse.data.results);
}

module.exports = {getHome, getForecast, getMovies}