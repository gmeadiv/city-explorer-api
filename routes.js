const axios = require('axios');

function getHome(request, response) {
  console.log('YOU ARE HOME');
  response.status(200).send('Welcome to the Void')
}

async function getForecast(request, response) {
  let searchQuery = request.query.searchQuery;
  let lat = request.query.latitude;
  let lon = request.query.longitude;

  console.log(searchQuery, '<---- FORECAST SEARCH QUERY LOG');
  
  const forecastURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  // console.log(forecastURL, '<---- FORECAST URL LOG ---<<<');

  const forecastResponse = await axios.get(forecastURL);

  // console.log(forecastResponse, '<---- FORECAST RESPONSE LOG ---<<<');

  response.status(200).send(forecastResponse.data);
}

async function getMovies(request, response) {
  let {searchQuery} = request.query; 

  console.log(searchQuery, '<---- MOVIES searchQuery LOG ---<<<')

  const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchQuery}&page=1`;

  // console.log(moviesURL, '<---- MOVIES URL LOG ---<<<');

  const moviesResponse = await axios.get(moviesURL);

  // console.log(moviesResponse.data, '<---- MOVIES RESPONSE LOG ---<<<')

  response.status(200).send(moviesResponse.data.results);
}

module.exports = {getHome, getForecast, getMovies}