const axios = require('axios');

const cache = require('./cache.js')

function getHome(request, response) {
  console.log('YOU ARE HOME');
  response.status(200).send('Welcome to the Void')
}

async function getForecast(request, response) {
  const searchQuery = request.query.searchQuery;
  const lat = request.query.latitude;
  const lon = request.query.longitude;
  const key = 'weather-' + {searchQuery};
  
  const forecastURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('--> WEATHER CACHE HIT LOG <--')
  } else {
    console.log('--> WEATHER CACHE MISS LOG <--');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(forecastURL)
    .then(response => parseWeather(response))
  }

  response.status(200).send(cache[key].data);
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = new Weather(weatherData.data);
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  } 
}

class Weather {
  constructor(weather) {
    this.date = weather.data[0].datetime;
    this.forecast = weather.data[0].weather
  }
}

async function getYelp(request, response) {
  let searchQuery = request.query.searchQuery;
  let lat = request.query.latitude;
  let lon = request.query.longitude;

  console.log(searchQuery, lat, lon, '<---- YELP SEARCH QUERY LOG');

  // const yelpURL = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;





  https://api.yelp.com/v3/businesses/search?=latitude=47.6038321&longitude=-122.3300624





  // console.log(yelpURL, '<---- YELP URL LOG ---<<<');

  // const yelpResponse = await axios.get(yelpURL);

  // console.log(yelpResponse, '<---- YELP RESPONSE LOG ---<<<');

  response.status(200).send('WELCOME TO YELP REVIEW')
}

async function getMovies(request, response) {
  const {searchQuery} = request.query;
  const key = 'movies-' + {searchQuery};

  console.log(searchQuery, '<---- MOVIES SEARCH QUERY LOG ---<<<')

  const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchQuery}&page=1`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('--> MOVIE CACHE HIT LOG <--')
  } else {
    console.log('--> MOVIE CACHE MISS LOG <--');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(moviesURL)
    .then(response => parseMovies(response));
  }

  response.status(200).send(cache[key].data);
}

function parseMovies(movieData) {
  try {
    const movieSummaries = movieData.data.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  } 
}

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.image = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    this.avgVote = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.popularity = movie.popularity;
    this.releaseDate = movie.release_date;
  }
}

module.exports = {getHome, getForecast, getMovies, getYelp}